@php
    use App\Enums\PaymentStatus;

    $record = $getRecord();
    $loanDetails = $record?->loanDetails ?? collect();

    $totalUnpaid = 0;
    $totalPaid = 0;
    $totalFeeAll = 0;

    foreach ($loanDetails as $detail) {
        $fine = $detail->returnBook?->fine ?? null;
        if ($fine) {
            $totalFeeAll += $fine->total_fee;
            $isPaid = $fine->payment_status === PaymentStatus::SUCCESS;
            if ($isPaid) {
                $totalPaid += $fine->total_fee;
            } else {
                $totalUnpaid += $fine->total_fee;
            }
        }
    }
@endphp

<style>
    .denda-container {
        font-family: inherit;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background-color: #ffffff;
        overflow: hidden;
        margin-top: 1rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    }
    .fi-theme-dark .denda-container,
    .dark .denda-container {
        border-color: #2d3748;
        background-color: #1a202c;
    }
    .denda-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.875rem;
    }
    .denda-table th {
        background-color: #f9fafb;
        color: #374151;
        font-weight: 600;
        padding: 14px 20px;
        border-bottom: 1px solid #e5e7eb;
    }
    .fi-theme-dark .denda-table th,
    .dark .denda-table th {
        background-color: #2d3748;
        color: #e2e8f0;
        border-bottom-color: #4a5568;
    }
    .denda-table td {
        padding: 16px 20px;
        color: #4b5563;
        border-bottom: 1px solid #f3f4f6;
        vertical-align: middle;
    }
    .fi-theme-dark .denda-table td,
    .dark .denda-table td {
        color: #cbd5e0;
        border-bottom-color: #2d3748;
    }
    .denda-table tr:hover {
        background-color: #f9fafb;
    }
    .fi-theme-dark .denda-table tr:hover,
    .dark .denda-table tr:hover {
        background-color: #2d3748;
    }
    .denda-table td.text-right, .denda-table th.text-right {
        text-align: right;
    }
    .denda-table td.text-center, .denda-table th.text-center {
        text-align: center;
    }
    .denda-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 9999px;
    }
    .denda-badge-success {
        background-color: #d1fae5;
        color: #065f46;
    }
    .fi-theme-dark .denda-badge-success,
    .dark .denda-badge-success {
        background-color: rgba(16, 185, 129, 0.2);
        color: #34d399;
    }
    .denda-badge-warning {
        background-color: #fef3c7;
        color: #92400e;
    }
    .fi-theme-dark .denda-badge-warning,
    .dark .denda-badge-warning {
        background-color: rgba(245, 158, 11, 0.2);
        color: #fbbf24;
    }
    .denda-summary-box {
        padding: 24px;
        background-color: #f9fafb;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
    }
    .fi-theme-dark .denda-summary-box,
    .dark .denda-summary-box {
        background-color: #2d3748;
        border-top-color: #4a5568;
    }
    .denda-total-label {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }
    .fi-theme-dark .denda-total-label,
    .dark .denda-total-label {
        color: #a0aec0;
    }
    .denda-total-val {
        font-size: 1.625rem;
        font-weight: 700;
        color: #111827;
        margin-top: 4px;
    }
    .fi-theme-dark .denda-total-val,
    .dark .denda-total-val {
        color: #ffffff;
    }
    .denda-status-desc {
        font-size: 0.75rem;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
    }
    .denda-status-desc.unpaid {
        color: #d97706;
    }
    .fi-theme-dark .denda-status-desc.unpaid,
    .dark .denda-status-desc.unpaid {
        color: #fbbf24;
    }
    .denda-status-desc.paid {
        color: #059669;
    }
    .fi-theme-dark .denda-status-desc.paid,
    .dark .denda-status-desc.paid {
        color: #34d399;
    }
    .denda-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background-color: #10b981;
        color: #ffffff;
        font-weight: 600;
        font-size: 0.875rem;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .denda-btn:hover {
        background-color: #059669;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .denda-btn:active {
        transform: translateY(0);
    }
    .denda-btn svg {
        width: 18px;
        height: 18px;
    }
</style>

<div class="denda-container">
    <div class="overflow-x-auto">
        <table class="denda-table">
            <thead>
                <tr>
                    <th scope="col">Judul Buku</th>
                    <th scope="col" class="text-right">Denda Keterlambatan</th>
                    <th scope="col" class="text-right">Denda Lain</th>
                    <th scope="col" class="text-right">Total Denda</th>
                    <th scope="col" class="text-center">Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($loanDetails as $detail)
                    @if ($detail->returnBook?->fine)
                        @php
                            $fine = $detail->returnBook->fine;
                            $status = $fine->payment_status;
                        @endphp
                        <tr>
                            <td style="font-weight: 600; color: inherit;">
                                {{ $detail->book?->title ?? 'Buku' }}
                            </td>
                            <td class="text-right">
                                Rp {{ number_format($fine->late_fee, 0, ',', '.') }}
                            </td>
                            <td class="text-right">
                                Rp {{ number_format($fine->other_fee, 0, ',', '.') }}
                            </td>
                            <td class="text-right" style="font-weight: 700; color: inherit;">
                                Rp {{ number_format($fine->total_fee, 0, ',', '.') }}
                            </td>
                            <td class="text-center">
                                @if ($status === PaymentStatus::SUCCESS)
                                    <span class="denda-badge denda-badge-success">
                                        Lunas
                                    </span>
                                @else
                                    <span class="denda-badge denda-badge-warning">
                                        Belum Lunas
                                    </span>
                                @endif
                            </td>
                        </tr>
                    @endif
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Summary and Payment Action -->
    <div class="denda-summary-box">
        <div>
            <div class="denda-total-label">Grand Total Denda</div>
            <div class="denda-total-val">
                Rp {{ number_format($totalFeeAll, 0, ',', '.') }}
            </div>
            @if ($totalUnpaid > 0)
                <div class="denda-status-desc unpaid">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; display: inline;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    Terdapat Rp {{ number_format($totalUnpaid, 0, ',', '.') }} denda yang belum dibayar.
                </div>
            @else
                <div class="denda-status-desc paid">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px; display: inline;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Semua denda telah lunas dibayarkan.
                </div>
            @endif
        </div>

        @if ($totalUnpaid > 0)
            <button type="button" class="denda-btn" wire:click="payAllFines">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                Bayar Denda (Rp {{ number_format($totalUnpaid, 0, ',', '.') }})
            </button>
        @endif
    </div>
</div>
