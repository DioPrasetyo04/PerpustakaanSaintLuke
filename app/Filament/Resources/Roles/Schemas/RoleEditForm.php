<?php

namespace App\Filament\Resources\Roles\Schemas;

use App\Models\Author;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class RoleEditForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Role Information')
                    ->description('Provide the necessary information for the role')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('name')
                                ->label('Role Name')
                                ->formatStateUsing(fn($state) => Str::title($state))
                                ->dehydrateStateUsing(fn($state) => Str::title($state))
                                ->required(),
                            Select::make('guard_name')
                                ->label('Type Role')
                                ->options(['web' => 'Web', 'api' => 'Api'])
                                ->required(),
                            Select::make('permissions')
                                ->label('Role Permissions')
                                ->relationship('permissions', 'name')
                                ->multiple()
                                ->preload()
                                ->searchable()
                                ->required(),
                        ])->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('Role Assignments')
                    ->description('Assign users and authors to this role')
                    ->schema([
                        Select::make('users')
                            ->label('Users')
                            ->helperText('Users assigned to this role')
                            ->multiple()
                            ->preload()
                            ->searchable(['name', 'username', 'email'])
                            ->options(fn() => User::query()
                                ->orderBy('name')
                                ->get()
                                ->mapWithKeys(fn($u) => [
                                    $u->id => self::userOptionHtml($u),
                                ])
                                ->toArray())
                            ->getOptionLabelUsing(fn($value) => self::userOptionHtml(User::find($value)))
                            ->allowHtml()
                            ->dehydrated(false)
                            ->columnSpan(1),

                        Select::make('authors')
                            ->label('Authors')
                            ->helperText('Authors assigned to this role (only "writer" role authors appear in Book form)')
                            ->multiple()
                            ->preload()
                            ->searchable(['name', 'username'])
                            ->options(fn() => Author::query()
                                ->orderBy('name')
                                ->get()
                                ->mapWithKeys(fn($a) => [
                                    $a->id => self::authorOptionHtml($a),
                                ])
                                ->toArray())
                            ->getOptionLabelUsing(fn($value) => self::authorOptionHtml(Author::find($value)))
                            ->allowHtml()
                            ->dehydrated(false)
                            ->columnSpan(1),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),
            ]);
    }

    protected static function userOptionHtml(?User $user): string
    {
        if (! $user) {
            return '';
        }

        $avatarUrl = $user->avatar ? asset('storage/' . $user->avatar) : null;
        $avatar = $avatarUrl
            ? '<img src="' . e($avatarUrl) . '" style="width:26px;height:26px;border-radius:9999px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" alt="">'
            : '<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:#dbeafe;color:#1e40af;font-weight:600;font-size:11px;flex-shrink:0;">'
                . e(mb_strtoupper(mb_substr((string) $user->name, 0, 1)))
                . '</span>';

        $secondary = $user->email ?: ($user->username ? '@' . $user->username : '');

        return '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
            . $avatar
            . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                . '<span style="font-weight:600;color:#111827;">' . e($user->name) . '</span>'
                . ($secondary ? '<span style="font-size:11px;color:#6b7280;">' . e($secondary) . '</span>' : '')
            . '</span>'
        . '</span>';
    }

    protected static function authorOptionHtml(?Author $author): string
    {
        if (! $author) {
            return '';
        }

        $avatarUrl = $author->avatar ? asset('storage/' . $author->avatar) : null;
        $avatar = $avatarUrl
            ? '<img src="' . e($avatarUrl) . '" style="width:26px;height:26px;border-radius:9999px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" alt="">'
            : '<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:#fef3c7;color:#92400e;font-weight:600;font-size:11px;flex-shrink:0;">'
                . e(mb_strtoupper(mb_substr((string) $author->name, 0, 1)))
                . '</span>';

        $username = $author->username ? '@' . $author->username : '';

        $verifiedBadge = $author->verified_at
            ? '<span style="font-size:10px;padding:1px 6px;border-radius:9999px;background:#dcfce7;color:#15803d;margin-left:6px;font-weight:500;">Verified</span>'
            : '<span style="font-size:10px;padding:1px 6px;border-radius:9999px;background:#fee2e2;color:#b91c1c;margin-left:6px;font-weight:500;">Unverified</span>';

        return '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
            . $avatar
            . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                . '<span style="font-weight:600;color:#111827;display:inline-flex;align-items:center;">'
                    . e($author->name) . $verifiedBadge
                . '</span>'
                . ($username ? '<span style="font-size:11px;color:#6b7280;">' . e($username) . '</span>' : '')
            . '</span>'
        . '</span>';
    }
}
