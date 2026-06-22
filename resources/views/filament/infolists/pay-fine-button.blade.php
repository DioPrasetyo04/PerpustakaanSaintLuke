@php
use App\Enums\PaymentStatus;

$status = $getState()?->payment_status;
@endphp

@if(
    in_array(
        $status?->value ?? $status,
        [
            PaymentStatus::PENDING->value,
            PaymentStatus::FAILED->value,
            PaymentStatus::ERROR->value,
        ]
    )
)

<x-filament::button
    color="success"
    icon="heroicon-o-credit-card"
    wire:click="payFine({{ $getState()->id }})">

    Bayar Denda

</x-filament::button>

@endif
