<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBookCheck;
use App\Traits\HandleReturnBook;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Carbon;

class CreateReturnBooks extends CreateRecord
{
    protected static string $resource = ReturnBooksResource::class;

    use HandleReturnBook;

    protected function afterCreate(): void
    {
        $this->handleReturnBookCheck($this->record);
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
