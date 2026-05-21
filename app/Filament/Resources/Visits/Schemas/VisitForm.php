<?php

namespace App\Filament\Resources\Visits\Schemas;

use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class VisitForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Kunjungan')
                    ->description('Catat data kunjungan pengguna ke perpustakaan.')
                    ->icon(Heroicon::OutlinedUserGroup)
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('user_id')
                                ->label('Nama Pengguna')
                                ->relationship('user', 'name', function (Builder $query) {
                                    $query->whereDoesntHave('roles', function ($q) {
                                        $q->whereIn('name', ['admin', 'manager', 'writer']);
                                    });
                                })
                                ->getOptionLabelFromRecordUsing(fn(User $record): string => "{$record->name} — {$record->email}")
                                ->searchable(['name', 'username', 'email', 'phone'])
                                ->preload()
                                ->live()
                                ->required()
                                ->columnSpanFull(),

                            Placeholder::make('user_preview')
                                ->hiddenLabel()
                                ->dehydrated(false)
                                ->content(fn(Get $get) => self::renderUserPreview($get('user_id')))
                                ->columnSpanFull(),

                            DateTimePicker::make('visit_date')
                                ->label('Tanggal Kunjungan')
                                ->seconds(false)
                                ->native(false)
                                ->timezone('Asia/Jakarta')
                                ->displayFormat('d M Y H:i')
                                ->default(fn() => \Carbon\Carbon::now('Asia/Jakarta'))
                                ->required(),

                            Placeholder::make('user_type')
                                ->label('Tingkat Pendidikan (dari profil user)')
                                ->dehydrated(false)
                                ->content(function (Get $get) {
                                    $user = User::query()->find($get('user_id'));
                                    if (! $user) {
                                        return new HtmlString('<span class="text-sm italic text-gray-500">Pilih user terlebih dahulu.</span>');
                                    }
                                    $label = $user->type === 'other' ? ($user->type_other ?: 'Lainnya') : ($user->type ?: '-');
                                    return new HtmlString('<span class="text-sm font-semibold text-gray-950 dark:text-white">' . e($label) . '</span>');
                                }),
                        ]),

                        Textarea::make('note')
                            ->label('Keterangan')
                            ->placeholder('Catatan opsional terkait kunjungan')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }

    private static function renderUserPreview(mixed $userId): HtmlString
    {
        if (! $userId) {
            return new HtmlString(
                '<div class="text-sm italic text-gray-500 dark:text-gray-400">'
                    . 'Pilih pengguna terlebih dahulu untuk melihat detail.'
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
