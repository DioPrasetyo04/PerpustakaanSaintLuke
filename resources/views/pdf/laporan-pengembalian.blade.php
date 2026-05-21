<x-pdf.laporan-layout
    title="Laporan Pengembalian Buku"
    :report="$report"
    :chart-image="$chartImage"
    :chart-title="'Grafik Pengembalian — ' . $report['periodLabel']"
>
    <x-slot name="summary">
        <div class="period-box">
            <div><strong>Periode</strong>: {{ $report['periodLabel'] }} — {{ $report['periodRange'] }}</div>
            <div><strong>Tipe</strong>: {{ ucfirst($report['mode']) }}</div>
            <div><strong>Total Pengembalian</strong>: {{ $report['total'] }} buku</div>
            <div><strong>Total Denda Tercatat</strong>: Rp {{ number_format($report['totalFine'], 0, ',', '.') }}</div>
        </div>
    </x-slot>

    <div class="section-title">B. Daftar Data Pengembalian</div>
    <table class="data">
        <thead>
            <tr>
                <th style="width:4%;">No</th>
                <th style="width:18%;">Kode Kembali</th>
                <th style="width:20%;">Peminjam</th>
                <th style="width:22%;">Buku</th>
                <th style="width:12%;">Tgl Kembali</th>
                <th style="width:12%;">Status</th>
                <th style="width:12%;">Denda</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['rows'] as $i => $r)
                @php
                    $user = $r->loanDetail?->loan?->user;
                    $book = $r->loanDetail?->book;
                    $statusLabel = $r->status instanceof \BackedEnum ? $r->status->value : (string) ($r->status ?? '-');
                    $fine = optional($r->fine)->total_fee ?? 0;
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td>{{ $r->return_book_code }}</td>
                    <td>{{ $user?->name ?? '-' }}</td>
                    <td>{{ $book?->title ?? '-' }}</td>
                    <td class="center">{{ optional($r->return_date)->translatedFormat('d M Y') }}</td>
                    <td class="center"><span class="badge green">{{ $statusLabel }}</span></td>
                    <td class="right">{{ $fine > 0 ? 'Rp ' . number_format($fine, 0, ',', '.') : '-' }}</td>
                </tr>
            @empty
                <tr><td colspan="7" class="center">Tidak ada data.</td></tr>
            @endforelse
        </tbody>
    </table>
</x-pdf.laporan-layout>
