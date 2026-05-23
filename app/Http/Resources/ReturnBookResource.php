<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ReturnBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $loanDetail = $this->relationLoaded('loanDetail') ? $this->loanDetail : null;
        $book = $this->relationLoaded('book') && $this->book
            ? $this->book
            : ($loanDetail && $loanDetail->relationLoaded('book') ? $loanDetail->book : null);
        $loan = $this->relationLoaded('loan') && $this->loan
            ? $this->loan
            : ($loanDetail && $loanDetail->relationLoaded('loan') ? $loanDetail->loan : null);
        $user = $loan && $loan->relationLoaded('user') ? $loan->user : null;

        $data = [
            'id' => $this->when(isset($this->id), $this->id),
            'return_book_code' => $this->when(isset($this->return_book_code), $this->return_book_code),
            'loan_user_id' => $this->when(isset($this->loan_user_id), $this->loan_user_id),
            'book_id' => $this->when((bool) $book, fn() => $book?->id),
            'user_id' => $this->when((bool) $user, fn() => $user?->id),
            'return_date' => $this->when(isset($this->return_date), $this->return_date ? Carbon::parse($this->return_date)->format('d F Y') : null),
            'status' => $this->when(isset($this->status), $this->status instanceof \BackedEnum ? $this->status->value : $this->status),
            'return_status_label' => $this->when(
                isset($this->return_status_label),
                fn() => $this->return_status_label
            ),

            'return_status_color' => $this->when(
                isset($this->return_status_color),
                fn() => $this->return_status_color
            ),

            'has_fine' => $this->when(
                isset($this->has_fine),
                fn() => $this->has_fine
            ),

            'fine_amount' => $this->when(
                isset($this->fine_amount),
                fn() => $this->fine_amount
            ),

            'payment_status' => $this->when(
                isset($this->payment_status),
                fn() => $this->payment_status instanceof \BackedEnum ? $this->payment_status->value : $this->payment_status
            ),
        ];

        if ($loanDetail) {
            $data['loan_detail'] = [
                'id' => $loanDetail->id,
                'loan_date' => $loanDetail->loan_date ? Carbon::parse($loanDetail->loan_date)->format('d F Y') : null,
                'due_date' => $loanDetail->due_date ? Carbon::parse($loanDetail->due_date)->format('d F Y') : null,
            ];
        }

        if ($loan) {
            $data['loan'] = LoanResource::make($loan)->resolve();
        }

        if ($user) {
            $data['user'] = UserResource::make($user)->resolve();
        }

        if ($book) {
            $data['book'] = BookResource::make($book)->resolve();
        }

        if ($this->relationLoaded('fine') && $this->fine) {
            $data['fine'] = FineResource::make($this->fine)->resolve();
        }
        if ($this->relationLoaded('returnBookCheck') && $this->returnBookCheck) {
            $data['returnBookCheck'] = ReturnBookCheckResource::make($this->returnBookCheck)->resolve();
        }

        if ($this->relationLoaded('review') && $this->review) {
            $data['review'] = ReviewResource::make($this->review)->resolve();
        }
        return $data;
    }
}
