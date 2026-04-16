<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\FineSettings;
use App\Models\ReviewBook;
use App\Traits\HandleReturnBook;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Exceptions\Halt;

class CreateReturnBooks extends CreateRecord
{
    protected static string $resource = ReturnBooksResource::class;

    use HandleReturnBook;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (!FineSettings::exists()) {

            Notification::make()
                ->title('Pengaturan denda belum dibuat')
                ->body('Silakan buat pengaturan denda terlebih dahulu.')
                ->danger()
                ->persistent()
                ->send();

            $this->redirectRoute(
                'filament.admin.resources.fine-settings.create'
            );

            throw new Halt();
        }

        return $data;
    }

    protected function afterCreate(): void
    {
        $this->record->refresh();

        $this->handleReturnBookCheck($this->record);

        $data = $this->data;

        if (isset($data['rating']) && $data['rating'] !== null) {
            ReviewBook::create([
                'return_book_id' => $this->record->id,
                'user_id' => $this->record->user_id,
                'book_id' => $this->record->book_id,
                'rating' => $data['rating'],
                'comment' => !empty($data['comment'])
                    ? tiptapToHtml($data['comment'])
                    : null,
            ]);
        }
    }

    protected function fillForm(): void
    {
        parent::fillForm();

        $userId = request()->query('user_id');

        if (filled($userId)) {
            $this->form->fill([
                'user_id' => (int) $userId,
            ]);
        }
    }
}
