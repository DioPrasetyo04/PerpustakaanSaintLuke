<?php

namespace App\Filament\Pages\Auth;

use App\Filament\Support\PasswordStrength;
use App\Models\User;
use App\Notifications\AdminApprovalRequestNotification;
use DanHarrin\LivewireRateLimiting\Exceptions\TooManyRequestsException;
use Filament\Auth\Http\Responses\Contracts\RegistrationResponse;
use Filament\Auth\Pages\Register as BaseRegister;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Model;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;

class Register extends BaseRegister
{
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                $this->getAvatarFormComponent(),
                $this->getNameFormComponent(),
                $this->getEmailFormComponent(),
                $this->getPhoneFormComponent(),
                $this->getRoleFormComponent(),
                PasswordStrength::wrap($this->getPasswordFormComponent()),
                $this->getPasswordConfirmationFormComponent(),
            ]);
    }

    protected function getAvatarFormComponent(): Component
    {
        return FileUpload::make('avatar')
            ->label('Foto Profil')
            ->avatar()
            ->image()
            ->imageEditor()
            ->circleCropper()
            ->disk('public')
            ->directory('avatars')
            ->nullable()
            ->alignCenter();
    }

    protected function getPhoneFormComponent(): Component
    {
        return  PhoneInput::make('phone')
                            ->label('Nomor Telepon')
                            ->defaultCountry('id')
                            ->separateDialCode()
                            ->showFlags()
                            ->nullable()
            ->unique($this->getUserModel(), 'phone');
    }

    protected function getRoleFormComponent(): Component
    {
        return Select::make('role')
            ->label('Daftar Sebagai')
            ->options([
                'admin'   => 'Admin',
                'writer'  => 'Penulis',
                'manager' => 'Staff',
            ])
            ->native(false)
            ->required()
            ->in(['admin', 'writer', 'manager'])
            ->dehydrated(true);
    }

    public function register(): ?RegistrationResponse
    {
        try {
            $this->rateLimit(2);
        } catch (TooManyRequestsException $exception) {
            $this->getRateLimitedNotification($exception)?->send();

            return null;
        }

        $user = $this->wrapInDatabaseTransaction(function (): Model {
            $this->callHook('beforeValidate');

            $data = $this->form->getState();

            $this->callHook('afterValidate');

            $role = $data['role'] ?? 'user';
            unset($data['role']);

            $data['username'] = generateUsername($data['name']);
            $data['is_approved'] = false;

            $this->callHook('beforeRegister');

            /** @var User $user */
            $user = $this->handleRegistration($data);

            $user->assignRole($role);

            $this->form->model($user)->saveRelationships();

            $this->callHook('afterRegister');

            return $user;
        });

        $this->notifyAdmins($user);

        Notification::make()
            ->title('Pendaftaran Berhasil')
            ->body('Akun Anda menunggu persetujuan admin. Anda akan menerima email setelah disetujui.')
            ->success()
            ->persistent()
            ->send();

        $this->form->fill();

        $this->redirect(filament()->getLoginUrl());

        return null;
    }

    protected function notifyAdmins(User $user): void
    {
        $admins = User::role('admin')->whereNotNull('email')->get();

        foreach ($admins as $index => $admin) {
            if ($index > 0) {
                sleep(1);
            }
            $admin->notify(new AdminApprovalRequestNotification($user));
        }
    }
}
