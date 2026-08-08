<?php

namespace App\Filament\Resources\Books\Pages;

use App\Enums\BookType;
use App\Filament\Resources\Books\BookResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

use Filament\Notifications\Notification;
use Filament\Support\Exceptions\Halt;

class EditBook extends EditRecord
{
    protected static string $resource = BookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->before(function (DeleteAction $action) {
                    if ($this->record->hasActiveLoans()) {
                        Notification::make()
                            ->danger()
                            ->title('Buku Tidak Bisa Dihapus')
                            ->body("Buku \"{$this->record->title}\" masih aktif dipinjam dan tidak dapat dihapus. Harap selesaikan seluruh peminjaman (fisik maupun digital) sebelum menghapus buku ini.")
                            ->persistent()
                            ->send();

                        throw new Halt();
                    }
                }),
            ForceDeleteAction::make()
                ->before(function (ForceDeleteAction $action) {
                    if ($this->record->hasActiveLoans()) {
                        Notification::make()
                            ->danger()
                            ->title('Buku Tidak Bisa Dihapus')
                            ->body("Buku \"{$this->record->title}\" masih aktif dipinjam dan tidak dapat dihapus. Harap selesaikan seluruh peminjaman (fisik maupun digital) sebelum menghapus buku ini.")
                            ->persistent()
                            ->send();

                        throw new Halt();
                    }
                }),
            RestoreAction::make(),
        ];
    }

    /**
     * Step "Asset Books" hanya tampil untuk buku Digital. Saat buku diubah
     * menjadi Fisik-saja, step tersebut tersembunyi sehingga relationship
     * "assets" tidak ikut disinkronkan dan menyisakan aset orphan di DB.
     * Bersihkan di sini: detach aset, lalu hapus record + filenya bila aset
     * tersebut sudah tidak dipakai buku lain.
     */
    protected function afterSave(): void
    {
        $record = $this->record;

        $isDigital = $record->types()
            ->where('type', BookType::DIGITAL->value)
            ->exists();

        if ($isDigital) {
            return;
        }

        $assets = $record->assets()->get();

        if ($assets->isEmpty()) {
            return;
        }

        $record->assets()->detach($assets->pluck('id')->all());

        foreach ($assets as $asset) {
            // Jangan hapus bila aset masih dipakai buku lain.
            if ($asset->books()->exists()) {
                continue;
            }

            if (filled($asset->utility_path) && Storage::disk('public')->exists($asset->utility_path)) {
                Storage::disk('public')->delete($asset->utility_path);
            }

            $asset->delete();
        }
    }
}
