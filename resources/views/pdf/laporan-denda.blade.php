<x-pdf.laporan-layout
    title="Laporan Denda"
    :report="$report"
    :chart-image="$chartImage"
    :chart-title="'Grafik Denda (' . ($report['metric'] === 'amount' ? 'Total Nominal Rp' : 'Jumlah') . ') — ' . $report['periodLabel']"
>
    <x-slot name="summary">
        <div class="period-box">
            <div><strong>Periode</strong>: {{ $report['periodLabel'] }} — {{ $report['periodRange'] }}</div>
            <div><strong>Tipe</strong>: {{ ucfirst($report['mode']) }} — Metrik: {{ $report['metric'] === 'amount' ? 'Total Nominal' : 'Jumlah Denda' }}</div>
            <div><strong>Jumlah Denda</strong>: {{ $report['total'] }} transaksi</div>
            <div><strong>Total Nominal</strong>: Rp {{ number_format($report['totalAmount'], 0, ',', '.') }}</div>
            <div><strong>Lunas / Belum Lunas</strong>: {{ $report['paid'] }} / {{ $report['unpaid'] }}</div>
        </div>
    </x-slot>

    <div class="section-title">B. Daftar Data Denda</div>
    <table class="data">
        <thead>
            <tr>
                <th style="width:4%;">No</th>
                <th style="width:16%;">Order ID</th>
                <th style="width:18%;">Peminjam</th>
                <th style="width:18%;">Buku</th>
                <th style="width:10%;">Tgl Denda</th>
                <th style="width:10%;">Late Fee</th>
                <th style="width:10%;">Other</th>
                <th style="width:14%;">Status Bayar</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['rows'] as $i => $r)
                @php
                    $user = $r->returnBook?->loanDetail?->loan?->user;
                    $book = $r->returnBook?->loanDetail?->book;
                    $isEnum = $r->payment_status instanceof \App\Enums\PaymentStatus;
                    $status = $isEnum ? $r->payment_status->value : (string) $r->payment_status;
                    $isPaid = $isEnum && $r->payment_status === \App\Enums\PaymentStatus::SUCCESS;
                    $badge = $isPaid ? 'green' : 'amber';
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td>{{ $r->order_id ?? '-' }}</td>
                    <td>{{ $user?->name ?? '-' }}</td>
                    <td>{{ $book?->title ?? '-' }}</td>
                    <td class="center">{{ optional($r->fine_date)->translatedFormat('d M Y') }}</td>
                    <td class="right">Rp {{ number_format($r->late_fee, 0, ',', '.') }}</td>
                    <td class="right">Rp {{ number_format($r->other_fee, 0, ',', '.') }}</td>
                    <td class="center"><span class="badge {{ $badge }}">{{ $status }}</span></td>
                </tr>
            @empty
                <tr><td colspan="8" class="center">Tidak ada data.</td></tr>
            @endforelse
        </tbody>
        <tfoot>
            <tr>
                <td colspan="7" class="right" style="background:#1f2937;color:#fff;font-weight:bold;">TOTAL</td>
                <td class="right" style="background:#1f2937;color:#fff;font-weight:bold;">Rp {{ number_format($report['totalAmount'], 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>
</x-pdf.laporan-layout>
