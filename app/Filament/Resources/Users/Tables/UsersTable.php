<?php

namespace App\Filament\Resources\Users\Tables;

use App\Models\User;
use App\Services\MemberCardService;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Support\Enums\Width;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')->size(50)->disk('public')->visibility('public')->circular(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('username')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->sortable(),
                TextColumn::make('date_of_birth')->searchable()->sortable()->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null),
                TextColumn::make('roles.name')->label('Role')->searchable()->sortable()->badge()->color('success')->icon('heroicon-s-cog-8-tooth'),
                TextColumn::make('permissions.name')->label('Permissions')->searchable()->sortable()->badge()->color('warning')->icon('heroicon-s-pencil-square'),
                IconColumn::make('member_card_issued_at')
                    ->label('Kartu Anggota')
                    ->boolean()
                    ->trueIcon('heroicon-s-identification')
                    ->falseIcon('heroicon-o-identification')
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->tooltip(fn($record) => $record->member_card_issued_at ? 'Sudah punya kartu' : 'Belum punya kartu')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                // Buat kartu anggota — hanya muncul jika user BELUM punya kartu.
                Action::make('createCard')
                    ->label('Buat Kartu')
                    ->icon('heroicon-o-identification')
                    ->color('success')
                    ->visible(fn(User $record): bool => ! $record->hasMemberCard())
                    ->modalHeading(fn(User $record): string => 'Buat Kartu Anggota — ' . $record->name)
                    ->modalDescription('Tinjau pratinjau kartu di bawah. Klik "Terbitkan Kartu" untuk menyimpan & menerbitkan kartu anggota.')
                    ->modalIcon('heroicon-o-identification')
                    ->modalWidth(Width::TwoExtraLarge)
                    ->modalContent(fn(User $record) => view(
                        'filament.member-card.preview',
                        MemberCardService::payload($record),
                    ))
                    ->modalSubmitActionLabel('Terbitkan Kartu')
                    ->action(function (User $record, $livewire): void {
                        $record->issueMemberCard(Auth::user());

                        Notification::make()
                            ->success()
                            ->icon('heroicon-o-check-circle')
                            ->title('Kartu Anggota Berhasil Dibuat')
                            ->body('Kartu anggota untuk ' . $record->name . ' telah diterbitkan. Silakan unduh kartunya di bawah.')
                            ->send();

                        // Lanjutkan ke modal "Lihat Kartu" agar kartu langsung tampil & bisa diunduh.
                        $livewire->replaceMountedAction('viewCard', [], ['recordKey' => $record->getKey()]);
                    }),

                // Lihat kartu anggota — hanya muncul jika user SUDAH punya kartu.
                Action::make('viewCard')
                    ->label('Lihat Kartu')
                    ->icon('heroicon-o-identification')
                    ->color('info')
                    ->visible(fn(User $record): bool => $record->hasMemberCard())
                    ->modalHeading(fn(User $record): string => 'Kartu Anggota — ' . $record->name)
                    ->modalIcon('heroicon-o-identification')
                    ->modalWidth(Width::TwoExtraLarge)
                    ->modalContent(fn(User $record) => view(
                        'filament.member-card.preview',
                        [
                            ...MemberCardService::payload($record),
                            'downloadUrl' => route('admin.users.member-card.download', $record),
                        ],
                    ))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Tutup'),

                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make()
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                ForceDeleteAction::make(),
                RestoreAction::make()
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
