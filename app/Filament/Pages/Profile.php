<?php

namespace App\Filament\Pages;

use App\Enums\SocialMedia as SocialMediaEnum;
use App\Filament\Support\PasswordStrength;
use Filament\Actions\Action;
use Filament\Auth\Pages\EditProfile;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;

class Profile extends EditProfile
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-circle';

    protected static ?string $title = 'Profil Saya';

    protected static ?int $navigationSort = 99;

    public static function isSimple(): bool
    {
        return false;
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Foto & Informasi Utama')
                    ->description('Kelola foto dan data utama akun Anda')
                    ->columns(3)
                    ->schema([
                        FileUpload::make('avatar')
                            ->label('Foto Profil')
                            ->image()
                            ->disk('public')
                            ->directory('users')
                            ->visibility('public')
                            ->avatar()
                            ->imageEditor()
                            ->columnSpanFull(),
                        TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->string()
                            ->minLength(3)
                            ->maxLength(255)
                            ->live()
                            ->afterStateUpdated(function (\Filament\Schemas\Components\Utilities\Set $set, $state) {
                                if (filled($state)) {
                                    $set('username', generateUsername($state));
                                }
                            }),
                        TextInput::make('username')
                            ->label('Username')
                            ->readOnly()
                            ->disabled()
                            ->dehydrated(),
                        $this->getEmailFormComponent(),
                    ]),

                Section::make('Informasi Tambahan')
                    ->description('Lengkapi data diri Anda')
                    ->columns(2)
                    ->schema([
                        PhoneInput::make('phone')
                            ->label('Nomor Telepon')
                            ->defaultCountry('id')
                            ->separateDialCode()
                            ->showFlags()
                            ->nullable(),
                        DatePicker::make('date_of_birth')
                            ->label('Tanggal Lahir')
                            ->nullable(),
                        Textarea::make('address')
                            ->label('Alamat')
                            ->nullable()
                            ->columnSpanFull(),
                    ]),

                Section::make('Social Media')
                    ->description('Kelola akun media sosial Anda')
                    ->schema([
                        Repeater::make('socialmedia')
                            ->relationship()
                            ->schema([
                                Select::make('platform')
                                    ->label('Platform')
                                    ->options(SocialMediaEnum::options())
                                    ->allowHtml()
                                    ->getOptionLabelUsing(fn($value) => SocialMediaEnum::from($value)->html())
                                    ->searchable()
                                    ->required()
                                    ->native(false)
                                    ->columnSpan(1),
                                TextInput::make('url')
                                    ->label('URL')
                                    ->url()
                                    ->columnSpan(1),
                                TextInput::make('username')
                                    ->label('Username / Text')
                                    ->columnSpan(1),
                            ])
                            ->columns(3)
                            ->addActionLabel('Tambah Social Media')
                            ->reorderable()
                            ->collapsible()
                            ->defaultItems(0),
                    ]),

                Section::make('Keamanan Akun')
                    ->description('Ubah password akun Anda. Kosongkan jika tidak ingin mengubah.')
                    ->columns(1)
                    ->inlineLabel(false)
                    ->schema([
                        PasswordStrength::wrap($this->getPasswordFormComponent()),
                        $this->getPasswordConfirmationFormComponent(),
                    ]),
            ]);
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $record->update($data);
        $this->form->saveRelationships();
        return $record;
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Profil berhasil diperbarui';
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('logout')
                ->label('Keluar')
                ->icon('heroicon-o-arrow-right-on-rectangle')
                ->color('danger')
                ->outlined()
                ->requiresConfirmation()
                ->modalHeading('Konfirmasi Keluar')
                ->modalDescription('Apakah Anda yakin ingin keluar dari sistem?')
                ->modalSubmitActionLabel('Ya, Keluar')
                ->action(function () {
                    Auth::logout();
                    session()->invalidate();
                    session()->regenerateToken();
                    $this->redirect(filament()->getLoginUrl(), navigate: false);
                }),
        ];
    }
}
