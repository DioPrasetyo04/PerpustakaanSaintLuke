<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBookInfolist;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use Filament\Schemas\Schema;
use App\Models\Fine;
use App\Services\MidtransService;
use Filament\Notifications\Notification;
use App\Enums\PaymentStatus;

class ViewReturnBooks extends ViewRecord
{
    protected static string $resource = ReturnBooksResource::class;

    protected function resolveRecord(int | string $key): \Illuminate\Database\Eloquent\Model
    {
        return parent::resolveRecord($key)->load([
            'user',
            'loanDetails.book.authors',
            'loanDetails.returnBook.returnBookCheck',
            'loanDetails.returnBook.fine',
            'loanDetails.returnBook.review',
        ]);
    }

    public function infolist(Schema $schema): Schema
    {
        return ReturnBookInfolist::configure($schema);
    }

    public function payFine(int $fineId): void
    {
        try {

            $fine = Fine::findOrFail($fineId);

            $snapToken = MidtransService::getSnapToken($fine);

            $this->dispatch(
                'midtrans-pay',
                snapToken: $snapToken
            );
        } catch (\Exception $e) {

            Notification::make()
                ->title('Error Midtrans')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }

    public function payAllFines(): void
    {
        try {
            $loan = $this->getRecord();
            
            $unpaidFines = Fine::whereIn('payment_status', [
                PaymentStatus::PENDING,
                PaymentStatus::FAILED,
                PaymentStatus::ERROR,
            ])
            ->whereHas('returnBook.loanDetail', function ($query) use ($loan) {
                $query->where('loan_id', $loan->id);
            })
            ->get();

            if ($unpaidFines->isEmpty()) {
                Notification::make()
                    ->title('Tidak Ada Denda')
                    ->body('Semua denda untuk peminjaman ini telah lunas.')
                    ->info()
                    ->send();
                return;
            }

            $totalFee = $unpaidFines->sum('total_fee');
            $amount = (int) round((float) $totalFee);

            if ($amount < 1) {
                Notification::make()
                    ->title('Nominal Tidak Valid')
                    ->body('Nominal denda Rp0 tidak dapat diproses.')
                    ->warning()
                    ->send();
                return;
            }

            $orderId = 'FINE-LOAN-' . $loan->id . '-' . time();

            foreach ($unpaidFines as $fine) {
                $fine->update([
                    'order_id' => $orderId
                ]);
            }

            $firstFine = $unpaidFines->first();
            $user = $firstFine->user;

            MidtransService::init();
            
            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => $amount,
                ],
                'customer_details' => [
                    'first_name' => $user->username ?? 'User',
                    'email' => $user->email ?? '',
                    'phone' => $user->phone ?? '',
                ]
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            $this->dispatch(
                'midtrans-pay',
                snapToken: $snapToken
            );
        } catch (\Exception $e) {
            Notification::make()
                ->title('Error Midtrans')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
