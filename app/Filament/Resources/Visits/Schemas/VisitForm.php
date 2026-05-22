<?php

namespace App\Filament\Resources\Visits\Schemas;

use App\Enums\UserType;
use App\Models\User;
use App\Models\Visit;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class VisitForm
{
    /** Nilai sentinel untuk opsi "tamu / pengunjung non-terdaftar". */
    private const GUEST = 'guest';

    private const GUEST_LABEL = '➕ User Lain (Tamu / Non-terdaftar)';

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Kunjungan')
                    ->description('Catat kunjungan pengguna terdaftar maupun tamu (pengunjung luar Sekolah Santo Lukas).')
                    ->icon(Heroicon::OutlinedUserGroup)
                    ->schema([
                        // Penentu pengunjung: cari user terdaftar (non-staf) ATAU pilih "User Lain" (tamu).
                        // Field detail di bawah baru muncul setelah ada pilihan.
                        Select::make('visitor_selector')
                            ->label('Pilih / Cari Pengunjung')
                            ->dehydrated(false)
                            ->required()
                            ->live()
                            ->allowHtml()
                            ->searchable()
                            ->placeholder('Cari pengguna terdaftar, atau pilih "User Lain"...')
                            ->options([self::GUEST => self::GUEST_LABEL])
                            ->getSearchResultsUsing(function (string $search): array {
                                $users = User::query()
                                    ->whereDoesntHave('roles', function ($q) {
                                        $q->whereIn('name', ['admin', 'manager', 'writer']);
                                    })
                                    ->where(function ($q) use ($search) {
                                        $q->where('name', 'like', "%{$search}%")
                                            ->orWhere('username', 'like', "%{$search}%")
                                            ->orWhere('email', 'like', "%{$search}%");
                                    })
                                    ->limit(20)
                                    ->get()
                                    ->mapWithKeys(fn(User $u) => [$u->id => self::userOptionHtml($u)])
                                    ->all();

                                return [self::GUEST => self::GUEST_LABEL] + $users;
                            })
                            ->getOptionLabelUsing(function ($value): ?string {
                                if ($value === self::GUEST) {
                                    return self::GUEST_LABEL;
                                }
                                $user = User::query()->find($value);
                                return $user ? self::userOptionHtml($user) : null;
                            })
                            ->afterStateHydrated(function (Set $set, ?Visit $record) {
                                // Edit: pulihkan pilihan dari record (user terdaftar atau tamu).
                                if ($record) {
                                    $set('visitor_selector', $record->user_id ? (string) $record->user_id : self::GUEST);
                                }
                            })
                            ->afterStateUpdated(function (Set $set, $state) {
                                // Reset semua field detail tiap pilihan berubah (memperbaiki data yang "nyangkut").
                                $set('user_id', null);
                                $set('name', null);
                                $set('address', null);
                                $set('type', null);
                                $set('type_other', null);
                                $set('needs', null);

                                // Kosong / tamu → biarkan field manual kosong (atau tersembunyi).
                                if (blank($state) || $state === self::GUEST) {
                                    return;
                                }

                                $user = User::query()->find($state);
                                if (! $user) {
                                    return;
                                }

                                // User terdaftar → isi otomatis dari profil.
                                $set('user_id', $user->id);
                                $set('name', $user->name);
                                $set('address', $user->address ?: '-');
                                $set('type', $user->type);
                                $set('type_other', $user->type_other);
                            })
                            ->helperText('Pilih "User Lain" untuk mencatat pengunjung tamu yang tidak terdaftar.')
                            ->columnSpanFull(),

                        Hidden::make('user_id'),

                        // Field detail kunjungan — hanya tampil setelah pengunjung dipilih.
                        Grid::make(2)
                            ->visible(fn(Get $get) => filled($get('visitor_selector')))
                            ->schema([
                                Placeholder::make('user_preview')
                                    ->hiddenLabel()
                                    ->dehydrated(false)
                                    ->visible(fn(Get $get) => filled($get('user_id')))
                                    ->content(fn(Get $get) => self::renderUserPreview($get('user_id')))
                                    ->columnSpanFull(),

                                TextInput::make('name')
                                    ->label('Nama Pengunjung')
                                    ->placeholder('Nama lengkap pengunjung')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                TextInput::make('address')
                                    ->label('Alamat Pengunjung')
                                    ->placeholder('Alamat pengunjung (kosongkan bila tidak ada)')
                                    ->maxLength(255)
                                    ->columnSpanFull(),

                                Select::make('type')
                                    ->label('Tingkat Pendidikan / Jenis')
                                    ->options(UserType::options())
                                    ->native(false)
                                    ->live()
                                    ->placeholder('Pilih tingkat, atau kosongkan untuk isi Status manual'),

                                DateTimePicker::make('visit_date')
                                    ->label('Tanggal Kunjungan')
                                    ->seconds(false)
                                    ->native(false)
                                    ->timezone('Asia/Jakarta')
                                    ->displayFormat('d M Y H:i')
                                    ->default(fn() => \Carbon\Carbon::now('Asia/Jakarta'))
                                    ->required(),

                                TextInput::make('type_other')
                                    ->label('Status')
                                    ->placeholder('mis. Umum, Orang Tua, Guru Tamu, Alumni')
                                    ->maxLength(100)
                                    ->visible(fn(Get $get) => blank($get('type')) || $get('type') === UserType::OTHER->value)
                                    ->required(fn(Get $get) => $get('type') === UserType::OTHER->value)
                                    ->helperText('Diisi bila pengunjung bukan murid atau anggota perpustakaan (tingkat pendidikan tidak tersedia).')
                                    ->columnSpanFull(),

                                TextInput::make('needs')
                                    ->label('Keperluan')
                                    ->placeholder('mis. Membaca di tempat, Penelitian, Meminjam fasilitas')
                                    ->maxLength(255)
                                    ->visible(fn(Get $get) => $get('type') === UserType::OTHER->value)
                                    ->helperText('Keperluan / tujuan kunjungan pengunjung.')
                                    ->columnSpanFull(),

                                Textarea::make('note')
                                    ->label('Keterangan')
                                    ->placeholder('Catatan opsional terkait kunjungan')
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    /** Label opsi Select: foto + nama + email (HTML). */
    private static function userOptionHtml(User $user): string
    {
        $avatar = self::resolveAvatarUrl($user);
        $name = e($user->name);
        $email = e($user->email);

        return <<<HTML
            <div style="display:flex;align-items:center;gap:10px;">
                <img src="{$avatar}" alt="" style="height:32px;width:32px;border-radius:9999px;object-fit:cover;"/>
                <div style="line-height:1.25;">
                    <div style="font-weight:600;">{$name}</div>
                    <div style="font-size:11px;color:#6b7280;">{$email}</div>
                </div>
            </div>
        HTML;
    }

    private static function renderUserPreview(mixed $userId): HtmlString
    {
        if (! $userId) {
            return new HtmlString(
                '<div class="text-sm italic text-gray-500 dark:text-gray-400">'
                    . 'Isi data tamu secara manual.'
                    . '</div>'
            );
        }

        $user = User::query()->find($userId);

        if (! $user) {
            return new HtmlString(
                '<div class="text-sm font-medium text-danger-600 dark:text-danger-400">'
                    . 'User tidak ditemukan.'
                    . '</div>'
            );
        }

        $avatarUrl = self::resolveAvatarUrl($user);
        $name = e($user->name);
        $email = e($user->email);
        $verified = (bool) $user->email_verified_at;
        $badge = $verified
            ? '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:9999px;background:#dcfce7;color:#166534;font-size:11px;font-weight:600;">✔ Terverifikasi</span>'
            : '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:9999px;background:#fee2e2;color:#991b1b;font-size:11px;font-weight:600;">✖ Belum Verifikasi</span>';

        return new HtmlString(<<<HTML
            <div class="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
                <img src="{$avatarUrl}" alt="avatar"
                     style="height:56px;width:56px;border-radius:9999px;object-fit:cover;box-shadow:0 0 0 2px #fff;"/>
                <div class="flex-1">
                    <div class="text-base font-semibold text-gray-950 dark:text-white">{$name}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300 break-all">{$email}</div>
                    <div style="margin-top:6px;">{$badge}</div>
                </div>
            </div>
        HTML);
    }

    private static function resolveAvatarUrl(User $user): string
    {
        $avatar = $user->avatar;

        if (! $avatar) {
            return 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random&color=fff';
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        return Storage::url($avatar);
    }
}
