<x-pdf.laporan-layout
    title="Laporan Kunjungan Perpustakaan"
    :report="$report"
    :chart-image="$chartImage"
    :chart-title="'Grafik Kunjungan — ' . $report['periodLabel']"
>
    <x-slot name="summary">
        <div class="period-box">
            <div><strong>Periode</strong>: {{ $report['periodLabel'] }} — {{ $report['periodRange'] }}</div>
            <div><strong>Tipe</strong>: {{ ucfirst($report['mode']) }}</div>
            <div><strong>Total Kunjungan</strong>: {{ $report['totalVisits'] }} pengunjung</div>
        </div>
    </x-slot>

    <style>
        table.data img.avatar { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; }
    </style>
    <div class="section-title">B. Daftar Data Kunjungan</div>
    <table class="data">
        <thead>
            <tr>
                <th style="width:5%;">No</th>
                <th style="width:8%;">Avatar</th>
                <th style="width:22%;">Nama Pengunjung</th>
                <th style="width:22%;">Email</th>
                <th style="width:13%;">Tanggal</th>
                <th style="width:10%;">Jam</th>
                <th style="width:12%;">Tingkat</th>
                <th style="width:8%;">Verif.</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($report['visits'] as $i => $v)
                @php
                    $user = $v->user;
                    $avatarSrc = '';
                    if ($user?->avatar && !str_starts_with($user->avatar, 'http')) {
                        $path = storage_path('app/public/' . $user->avatar);
                        if (file_exists($path)) {
                            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
                            $mime = $ext === 'png' ? 'image/png' : ($ext === 'webp' ? 'image/webp' : 'image/jpeg');
                            $avatarSrc = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($path));
                        }
                    } elseif ($user?->avatar) {
                        $avatarSrc = $user->avatar;
                    }
                    if (! $avatarSrc) {
                        $avatarSrc = 'https://ui-avatars.com/api/?name=' . urlencode($user?->name ?? 'U') . '&background=random&color=fff';
                    }
                    $typeLabel = $v->type === 'other' ? ($v->type_other ?: 'Lainnya') : ($v->type ?: '-');
                @endphp
                <tr>
                    <td class="no">{{ $i + 1 }}</td>
                    <td class="center"><img class="avatar" src="{{ $avatarSrc }}" alt=""></td>
                    <td>{{ $user?->name ?? '-' }}</td>
                    <td>{{ $user?->email ?? '-' }}</td>
                    <td class="center">{{ $v->visit_date->copy()->setTimezone('Asia/Jakarta')->translatedFormat('d M Y') }}</td>
                    <td class="center">{{ $v->visit_date->copy()->setTimezone('Asia/Jakarta')->format('H:i') }}</td>
                    <td class="center"><span class="badge">{{ $typeLabel }}</span></td>
                    <td class="center">{{ $user?->email_verified_at ? '✔' : '—' }}</td>
                </tr>
            @empty
                <tr><td colspan="8" class="center">Tidak ada data kunjungan pada periode ini.</td></tr>
            @endforelse
        </tbody>
    </table>
</x-pdf.laporan-layout>
