<x-pdf.laporan-layout
    title="Laporan Peminjaman Buku"
    :report="$report"
    :chart-image="$chartImage"
    :chart-title="'Grafik Peminjaman — ' . $report['periodLabel']"
>
    <x-slot name="summary">
        <div class="period-box">
            <div><strong>Periode</strong>: {{ $report['periodLabel'] }} — {{ $report['periodRange'] }}</div>
            <div><strong>Tipe</strong>: {{ ucfirst($report['mode']) }}</div>
            <div><strong>Total Peminjaman</strong>: {{ $report['total'] }} transaksi buku</div>
            <div><strong>Sedang Dipinjam</strong>: {{ $report['borrowed'] }} buku</div>
            <div><strong>Sudah Dikembalikan</strong>: {{ $report['returned'] }} buku</div>
        </div>
    </x-slot>

    <div class="section-title">B. Daftar Data Peminjaman</div>
    <table class="data">
        <thead>
            <tr>
                <th style="width:4%;">No</th>
                <th style="width:18%;">Kode Pinjam</th>
                <th style="width:20%;">Peminjam</th>
                <th style="width:22%;">Buku</th>
                <th style="width:12%;">Tgl Pinjam</th>
                <th style="width:12%;">Jatuh Tempo</th>
                <th style="width:12%;">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['rows'] as $i => $r)
                @php
                    $st = $r->status instanceof \BackedEnum ? $r->status->value : (string) $r->status;
                    $badge = $st === 'returned' ? 'green' : 'amber';
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td>{{ $r->loan?->loan_code ?? '-' }}</td>
                    <td>{{ $r->loan?->user?->name ?? '-' }}</td>
                    <td>{{ $r->book?->title ?? '-' }}</td>
                    <td class="center">{{ optional($r->loan_date)->translatedFormat('d M Y') }}</td>
                    <td class="center">{{ optional($r->due_date)->translatedFormat('d M Y') }}</td>
                    <td class="center"><span class="badge {{ $badge }}">{{ ucfirst($st) }}</span></td>
                </tr>
            @empty
                <tr><td colspan="7" class="center">Tidak ada data.</td></tr>
            @endforelse
        </tbody>
    </table>
</x-pdf.laporan-layout>
