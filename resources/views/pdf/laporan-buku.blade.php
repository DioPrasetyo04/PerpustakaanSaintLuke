<x-pdf.laporan-layout
    title="Laporan Data Buku"
    :report="$report"
    :chart-image="$chartTrend"
    :chart-title="'Tren Penambahan Buku — ' . $report['periodLabel']"
>
    <x-slot name="summary">
        <div class="period-box">
            <div><strong>Periode</strong>: {{ $report['periodLabel'] }} — {{ $report['periodRange'] }}</div>
            <div><strong>Tipe</strong>: {{ ucfirst($report['mode']) }}</div>
            <div><strong>Total Buku Ditambahkan</strong>: {{ $report['total'] }} judul</div>
            @foreach ($report['byStatus'] as $status => $count)
                <div><strong>{{ ucfirst($status) }}</strong>: {{ $count }} buku</div>
            @endforeach
        </div>
    </x-slot>

    @if ($chartCategory)
        <div class="section-title">B. Distribusi Buku per Kategori</div>
        <div class="chart-wrap">
            <img src="{{ $chartCategory }}" alt="Grafik Kategori">
        </div>
    @endif

    @if ($chartPublisher)
        <div class="section-title">{{ $chartCategory ? 'C' : 'B' }}. Distribusi Buku per Penerbit</div>
        <div class="chart-wrap">
            <img src="{{ $chartPublisher }}" alt="Grafik Penerbit">
        </div>
    @endif

    @php
        $tableSection = ($chartCategory ? 1 : 0) + ($chartPublisher ? 1 : 0) + 1;
        $sectionLetter = ['B', 'C', 'D', 'E'][$tableSection - 1] ?? 'D';
    @endphp

    <div class="section-title">{{ $sectionLetter }}. Daftar Data Buku</div>

    {{-- Category & Publisher breakdown side by side --}}
    @if ($report['categoryStats']->isNotEmpty() || $report['publisherStats']->isNotEmpty())
        <table style="width:100%; margin-bottom:12px; border-collapse:collapse; font-size:10px;">
            <tr>
                @if ($report['categoryStats']->isNotEmpty())
                    <td style="width:50%; vertical-align:top; padding-right:8px;">
                        <table class="data" style="width:100%;">
                            <thead>
                                <tr>
                                    <th colspan="2" style="text-align:center;">Rekap per Kategori</th>
                                </tr>
                                <tr>
                                    <th style="width:75%;">Kategori</th>
                                    <th style="width:25%;">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($report['categoryStats'] as $cat)
                                    <tr>
                                        <td>{{ $cat->name }}</td>
                                        <td class="center">{{ $cat->books_count }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </td>
                @endif
                @if ($report['publisherStats']->isNotEmpty())
                    <td style="width:50%; vertical-align:top; padding-left:8px;">
                        <table class="data" style="width:100%;">
                            <thead>
                                <tr>
                                    <th colspan="2" style="text-align:center;">Rekap per Penerbit</th>
                                </tr>
                                <tr>
                                    <th style="width:75%;">Penerbit</th>
                                    <th style="width:25%;">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($report['publisherStats'] as $pub)
                                    <tr>
                                        <td>{{ $pub->name }}</td>
                                        <td class="center">{{ $pub->books_count }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </td>
                @endif
            </tr>
        </table>
    @endif

    <table class="data">
        <thead>
            <tr>
                <th style="width:3%;">No</th>
                <th style="width:9%;">Kode</th>
                <th style="width:22%;">Judul Buku</th>
                <th style="width:14%;">Penulis</th>
                <th style="width:13%;">Kategori</th>
                <th style="width:13%;">Penerbit</th>
                <th style="width:5%;">Tahun</th>
                <th style="width:7%;">Bahasa</th>
                <th style="width:8%;">Status</th>
                <th style="width:6%;">Stok</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['rows'] as $i => $book)
                @php
                    $statusVal = $book->status instanceof \BackedEnum ? $book->status->value : (string) ($book->status ?? '-');
                    $statusColor = match ($statusVal) {
                        'Tersedia'       => 'green',
                        'Dipinjam'       => '',
                        'Hilang'         => 'red',
                        'Rusak'          => 'amber',
                        default          => '',
                    };
                    $authors    = $book->authors->pluck('name')->join(', ') ?: '-';
                    $categories = $book->categories->pluck('name')->join(', ') ?: '-';
                    $stokTotal  = optional($book->stock)->total ?? '-';
                    $stokAvail  = optional($book->stock)->available ?? '-';
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td>{{ $book->book_code }}</td>
                    <td>{{ $book->title }}</td>
                    <td>{{ $authors }}</td>
                    <td>{{ $categories }}</td>
                    <td>{{ optional($book->publisher)->name ?? '-' }}</td>
                    <td class="center">{{ $book->publication_year ?? '-' }}</td>
                    <td class="center">{{ optional($book->language)->name ?? '-' }}</td>
                    <td class="center">
                        <span class="badge {{ $statusColor }}">{{ $statusVal }}</span>
                    </td>
                    <td class="center">{{ $stokAvail }}/{{ $stokTotal }}</td>
                </tr>
            @empty
                <tr><td colspan="10" class="center">Tidak ada data buku pada periode ini.</td></tr>
            @endforelse
        </tbody>
    </table>
</x-pdf.laporan-layout>
