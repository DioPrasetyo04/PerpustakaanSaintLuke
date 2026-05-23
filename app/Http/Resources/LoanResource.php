<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $primaryDetail = $this->relationLoaded('loanDetails')
            ? $this->loanDetails->first()
            : null;

        $loanDate = $primaryDetail?->loan_date ?? $this->loan_date;
        $dueDate  = $primaryDetail?->due_date  ?? $this->due_date;
        $book = $primaryDetail?->book ?? ($this->relationLoaded('book') ? $this->book : null);

        $data = [
            'id' => $this->when(isset($this->id), $this->id),
            'user_id' => $this->when(isset($this->user_id), $this->user_id),
            'book_id' => $this->when((bool) $book, fn() => $book?->id),
            'loan_code' => $this->when(isset($this->loan_code), $this->loan_code),
            'loan_date' => $this->when(
                (bool) $loanDate,
                fn() => Carbon::parse($loanDate)->format('d F Y')
            ),
            'due_date' => $this->when(
                (bool) $dueDate,
                fn() => Carbon::parse($dueDate)->format('d F Y')
            ),

            // OPTIONAL ATTRIBUTE
            'days_left' => $this->when(
                isset($this->days_left),
                fn() => $this->days_left
            ),

            'hours_left' => $this->when(
                isset($this->hours_left),
                fn() => $this->hours_left
            ),

            'minutes_left' => $this->when(
                isset($this->minutes_left),
                fn() => $this->minutes_left
            ),

            'deadline_status' => $this->when(
                isset($this->deadline_status),
                fn() => $this->deadline_status
            ),
        ];

        if ($this->relationLoaded('user') && $this->user) {
            $data['user'] = UserResource::make($this->user)->resolve();
        }

        if ($book) {
            $data['book'] = BookResource::make($book)->resolve();
        }

        if ($this->relationLoaded('loanDetails')) {
            $data['loan_details'] = $this->loanDetails->map(fn($detail) => [
                'id' => $detail->id,
                'book_id' => $detail->book_id,
                'loan_date' => $detail->loan_date ? Carbon::parse($detail->loan_date)->format('d F Y') : null,
                'due_date' => $detail->due_date ? Carbon::parse($detail->due_date)->format('d F Y') : null,
                'status' => $detail->status?->value ?? $detail->status,
                'book' => $detail->relationLoaded('book') && $detail->book
                    ? BookResource::make($detail->book)->resolve()
                    : null,
            ])->values()->all();
        }

        return $data;
    }
}
