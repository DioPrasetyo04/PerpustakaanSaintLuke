<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Enums\BookCondition;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReviewBook;
use App\Traits\HandleReturnBook;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Filament\Support\Exceptions\Halt;
use Illuminate\Support\Facades\DB;

class EditReturnBooks extends EditRecord
{
    protected static string $resource = ReturnBooksResource::class;

    use HandleReturnBook;

    protected ?BookCondition $oldCondition = null;

    protected function mutateFormDataBeforeSave(array $data): array
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

    protected function beforeSave(): void
    {
        $this->record?->load('returnBookCheck');

        $this->oldCondition = $this->record
            ?->returnBookCheck
            ?->condition;
    }

    protected function afterSave(): void
    {
        $this->record->refresh();

        $this->handleReturnBookCheck(
            $this->record,
            $this->oldCondition
        );

        $data = $this->data;

        if (isset($data['rating']) && $data['rating'] !== null) {
            ReviewBook::updateOrCreate(
                [
                    'return_book_id' => $this->record->id
                ],
                [
                    'user_id' => $this->record->user_id,
                    'book_id' => $this->record->book_id,
                    'rating' => $data['rating'],
                    'comment' => isset($data['comment'])
                        ? tiptapToHtml($data['comment'])
                        : null,
                ]
            );
        }
    }

    protected function beforeDelete(): void
    {
        DB::transaction(function () {

            $this->record->load(['returnBookCheck', 'book']);

            $condition = $this->record->returnBookCheck?->condition;
            $bookId = $this->record->book_id;

            if ($condition) {
                match ($condition) {
                    BookCondition::GOOD => DB::table('stocks')
                        ->where('book_id', $bookId)
                        ->update([
                            'available' => DB::raw('GREATEST(available - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),

                    BookCondition::DAMAGED => DB::table('stocks')
                        ->where('book_id', $bookId)
                        ->update([
                            'damaged' => DB::raw('GREATEST(damaged - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),

                    BookCondition::LOST => DB::table('stocks')
                        ->where('book_id', $bookId)
                        ->update([
                            'lost' => DB::raw('GREATEST(lost - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),
                };
            }

            Fine::where('return_book_id', $this->record->id)->delete();
        });
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
