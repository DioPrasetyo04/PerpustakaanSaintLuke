<?php

namespace App\Filament\Pages\Auth;

use App\Filament\Support\PasswordStrength;
use Filament\Auth\Pages\PasswordReset\ResetPassword as BaseResetPassword;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Schema;

class ResetPassword extends BaseResetPassword
{
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                $this->getEmailFormComponent(),
                PasswordStrength::wrap($this->getPasswordFormComponent()),
                $this->getPasswordConfirmationFormComponent(),
            ]);
    }
}
