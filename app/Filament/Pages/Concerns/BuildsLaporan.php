<?php

namespace App\Filament\Pages\Concerns;

use Carbon\Carbon;

trait BuildsLaporan
{
    /**
     * Build the period buckets based on mode.
     *   - 'monthly'      : 12 months of the selected year.
     *   - 'weekly'       : weeks of the selected year.
     *   - 'weekly_month' : weeks within the selected month.
     *   - 'daily'        : days in the selected month.
     *   - 'daily_week'   : 7 days of the selected week (within the selected month).
     *
     * @return array{
     *   mode:string,
     *   modeLabel:string,
     *   buckets: array<int, array{label:string, range:string, start:Carbon, end:Carbon, value:int|float}>,
     *   rangeStart:Carbon,
     *   rangeEnd:Carbon,
     *   periodLabel:string,
     *   periodRange:string,
     * }
     */
    public function buildPeriodBuckets(string $mode, int $year, ?int $month, callable $counter, ?int $week = null): array
    {
        $mode = in_array($mode, ['daily', 'daily_week', 'weekly', 'weekly_month', 'monthly'], true) ? $mode : 'monthly';
        $year  = (int) ($year ?: now()->year);
        $month = (int) ($month ?: now()->month);
        $week  = (int) ($week ?: 1);

        $buckets = [];

        if ($mode === 'monthly') {
            $rangeStart = Carbon::create($year, 1, 1)->startOfYear();
            $rangeEnd   = Carbon::create($year, 12, 31)->endOfYear();
            for ($m = 1; $m <= 12; $m++) {
                $start = Carbon::create($year, $m, 1)->startOfMonth();
                $end   = $start->copy()->endOfMonth();
                $buckets[] = [
                    'label' => $start->translatedFormat('M'),
                    'range' => $start->format('d M') . ' - ' . $end->format('d M'),
                    'start' => $start,
                    'end'   => $end,
                    'value' => $counter($start, $end),
                ];
            }
            $modeLabel   = 'Bulanan';
            $periodLabel = 'Bulanan ' . $year;
            $periodRange = '01 Jan ' . $year . ' - 31 Des ' . $year;
        } elseif ($mode === 'weekly') {
            $rangeStart = Carbon::create($year, 1, 1)->startOfYear();
            $rangeEnd   = Carbon::create($year, 12, 31)->endOfYear();
            $cursor = $rangeStart->copy()->startOfWeek();
            $i = 1;
            while ($cursor->lte($rangeEnd)) {
                $start = $cursor->copy();
                $end   = $cursor->copy()->endOfWeek();
                if ($start->lt($rangeStart)) $start = $rangeStart->copy();
                if ($end->gt($rangeEnd))   $end   = $rangeEnd->copy();
                $buckets[] = [
                    'label' => 'W' . $i,
                    'range' => $start->format('d M') . ' - ' . $end->format('d M'),
                    'start' => $start,
                    'end'   => $end,
                    'value' => $counter($start, $end),
                ];
                $cursor->addWeek();
                $i++;
            }
            $modeLabel   = 'Mingguan';
            $periodLabel = 'Mingguan ' . $year;
            $periodRange = '01 Jan ' . $year . ' - 31 Des ' . $year;
        } elseif ($mode === 'weekly_month') {
            $monthStart = Carbon::create($year, $month, 1)->startOfMonth();
            $monthEnd   = $monthStart->copy()->endOfMonth();
            $rangeStart = $monthStart->copy();
            $rangeEnd   = $monthEnd->copy();
            $cursor = $monthStart->copy()->startOfWeek();
            $i = 1;
            while ($cursor->lte($monthEnd)) {
                $start = $cursor->copy();
                $end   = $cursor->copy()->endOfWeek();
                if ($start->lt($monthStart)) $start = $monthStart->copy();
                if ($end->gt($monthEnd))     $end   = $monthEnd->copy();
                $buckets[] = [
                    'label' => 'M' . $i,
                    'range' => $start->format('d M') . ' - ' . $end->format('d M'),
                    'start' => $start,
                    'end'   => $end,
                    'value' => $counter($start, $end),
                ];
                $cursor->addWeek();
                $i++;
            }
            $modeLabel   = 'Mingguan per Bulan';
            $periodLabel = 'Mingguan ' . $monthStart->translatedFormat('F Y');
            $periodRange = $monthStart->format('d M Y') . ' - ' . $monthEnd->format('d M Y');
        } elseif ($mode === 'daily_week') {
            $monthStart = Carbon::create($year, $month, 1)->startOfMonth();
            $monthEnd   = $monthStart->copy()->endOfMonth();

            // Enumerate the (full Mon–Sun) weeks that touch the month, then pick week #$week.
            $weekStarts = [];
            $cursor = $monthStart->copy()->startOfWeek();
            while ($cursor->lte($monthEnd)) {
                $weekStarts[] = $cursor->copy();
                $cursor->addWeek();
            }
            $idx = max(0, min($week - 1, count($weekStarts) - 1));
            $weekStart = $weekStarts[$idx];

            $rangeStart = $weekStart->copy()->startOfDay();
            $rangeEnd   = $weekStart->copy()->endOfWeek()->endOfDay();

            $dayNamesId = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']; // Mon..Sun (ISO)
            $day = $weekStart->copy();
            for ($d = 0; $d < 7; $d++) {
                $start = $day->copy()->startOfDay();
                $end   = $day->copy()->endOfDay();
                $buckets[] = [
                    'label' => $dayNamesId[$start->dayOfWeekIso - 1] ?? $start->format('D'),
                    'range' => $start->format('d M'),
                    'start' => $start,
                    'end'   => $end,
                    'value' => $counter($start, $end),
                ];
                $day->addDay();
            }
            $modeLabel   = 'Harian per Minggu';
            $periodLabel = 'Harian Minggu ke-' . ($idx + 1) . ' ' . $monthStart->translatedFormat('F Y');
            $periodRange = $rangeStart->format('d M Y') . ' - ' . $rangeEnd->format('d M Y');
        } else { // daily
            $base = Carbon::create($year, $month, 1);
            $rangeStart = $base->copy()->startOfMonth();
            $rangeEnd   = $base->copy()->endOfMonth();
            $cursor = $rangeStart->copy();
            while ($cursor->lte($rangeEnd)) {
                $start = $cursor->copy()->startOfDay();
                $end   = $cursor->copy()->endOfDay();
                $buckets[] = [
                    'label' => $start->format('d'),
                    'range' => $start->format('d M'),
                    'start' => $start,
                    'end'   => $end,
                    'value' => $counter($start, $end),
                ];
                $cursor->addDay();
            }
            $modeLabel   = 'Harian';
            $periodLabel = 'Harian ' . $base->translatedFormat('F Y');
            $periodRange = $rangeStart->format('d M Y') . ' - ' . $rangeEnd->format('d M Y');
        }

        return [
            'mode'        => $mode,
            'modeLabel'   => $modeLabel,
            'buckets'     => $buckets,
            'rangeStart'  => $rangeStart,
            'rangeEnd'    => $rangeEnd,
            'periodLabel' => $periodLabel,
            'periodRange' => $periodRange,
        ];
    }

    /**
     * Build SVG bar chart from buckets and return data URI.
     */
    public function buildBarChart(array $buckets, string $color = '#3b82f6'): string
    {
        $count = max(1, count($buckets));

        $width  = $count > 30 ? 1100 : 800;
        $height = 320;
        $padding = ['top' => 30, 'right' => 30, 'bottom' => 70, 'left' => 60];
        $innerW = $width - $padding['left'] - $padding['right'];
        $innerH = $height - $padding['top'] - $padding['bottom'];

        $max = max(1, max(array_column($buckets, 'value')));
        $barSpace = $innerW / $count;
        $barWidth = $barSpace * ($count > 40 ? 0.7 : 0.55);
        $showRange = $count <= 20;
        $rotateLabels = $count > 16;

        $svg  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' . $width . ' ' . $height . '" width="' . $width . '" height="' . $height . '">';
        $svg .= '<rect x="0" y="0" width="' . $width . '" height="' . $height . '" fill="#ffffff"/>';

        for ($g = 0; $g <= 4; $g++) {
            $y = $padding['top'] + ($innerH * $g / 4);
            $value = round($max - ($max * $g / 4), 2);
            $svg .= '<line x1="' . $padding['left'] . '" y1="' . $y . '" x2="' . ($width - $padding['right']) . '" y2="' . $y . '" stroke="#e5e7eb" stroke-width="1"/>';
            $svg .= '<text x="' . ($padding['left'] - 8) . '" y="' . ($y + 4) . '" font-size="11" fill="#6b7280" text-anchor="end" font-family="Arial">' . $value . '</text>';
        }

        foreach ($buckets as $i => $b) {
            $val = (float) $b['value'];
            $h = $val > 0 ? ($val / $max) * $innerH : 0;
            $x = $padding['left'] + $i * $barSpace + ($barSpace - $barWidth) / 2;
            $y = $padding['top'] + $innerH - $h;
            $svg .= '<rect x="' . $x . '" y="' . $y . '" width="' . $barWidth . '" height="' . $h . '" fill="' . $color . '" rx="3"/>';
            if ($count <= 30) {
                $svg .= '<text x="' . ($x + $barWidth / 2) . '" y="' . ($y - 5) . '" font-size="10" fill="#111827" text-anchor="middle" font-family="Arial" font-weight="bold">' . (is_float($val) && fmod($val, 1.0) !== 0.0 ? number_format($val, 0) : (int) $val) . '</text>';
            }
            $labelY = $padding['top'] + $innerH + 16;
            $cx = $x + $barWidth / 2;
            if ($rotateLabels) {
                $svg .= '<text x="' . $cx . '" y="' . $labelY . '" font-size="9" fill="#374151" text-anchor="end" font-family="Arial" transform="rotate(-45 ' . $cx . ' ' . $labelY . ')">' . e($b['label']) . '</text>';
            } else {
                $svg .= '<text x="' . $cx . '" y="' . $labelY . '" font-size="10" fill="#374151" text-anchor="middle" font-family="Arial">' . e($b['label']) . '</text>';
                if ($showRange) {
                    $svg .= '<text x="' . $cx . '" y="' . ($labelY + 14) . '" font-size="8" fill="#6b7280" text-anchor="middle" font-family="Arial">' . e($b['range']) . '</text>';
                }
            }
        }

        $svg .= '<line x1="' . $padding['left'] . '" y1="' . ($padding['top'] + $innerH) . '" x2="' . ($width - $padding['right']) . '" y2="' . ($padding['top'] + $innerH) . '" stroke="#374151" stroke-width="1.5"/>';
        $svg .= '<line x1="' . $padding['left'] . '" y1="' . $padding['top'] . '" x2="' . $padding['left'] . '" y2="' . ($padding['top'] + $innerH) . '" stroke="#374151" stroke-width="1.5"/>';
        $svg .= '</svg>';

        return 'data:image/svg+xml;base64,' . base64_encode($svg);
    }

    /** Mode options for filter Select. */
    public function laporanModeOptions(): array
    {
        return [
            'daily'        => 'Harian (per hari dalam 1 bulan)',
            'daily_week'   => 'Harian (per hari dalam 1 minggu)',
            'weekly'       => 'Mingguan (per minggu dalam 1 tahun)',
            'weekly_month' => 'Mingguan (per minggu dalam 1 bulan)',
            'monthly'      => 'Bulanan (per bulan dalam 1 tahun)',
        ];
    }

    /**
     * Week options for the selected month, used by the 'daily_week' mode.
     * Each option is a full Mon–Sun week that touches the month.
     */
    public function weekOptions(?int $year, ?int $month): array
    {
        $year  = (int) ($year ?: now()->year);
        $month = (int) ($month ?: now()->month);

        $monthStart = Carbon::create($year, $month, 1)->startOfMonth();
        $monthEnd   = $monthStart->copy()->endOfMonth();

        $opts = [];
        $cursor = $monthStart->copy()->startOfWeek();
        $i = 1;
        while ($cursor->lte($monthEnd)) {
            $start = $cursor->copy();
            $end   = $cursor->copy()->endOfWeek();
            $opts[$i] = 'Minggu ke-' . $i . ' (' . $start->format('d M') . ' – ' . $end->format('d M') . ')';
            $cursor->addWeek();
            $i++;
        }

        return $opts;
    }

    /** Year options for last 5 years up to current. */
    public function yearOptions(): array
    {
        $cur = (int) now()->year;
        $opts = [];
        for ($y = $cur; $y >= $cur - 4; $y--) {
            $opts[$y] = (string) $y;
        }
        return $opts;
    }

    /** Month options (1..12) Indonesian names. */
    public function monthOptions(): array
    {
        $names = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $opts = [];
        foreach ($names as $i => $n) {
            $opts[$i + 1] = $n;
        }
        return $opts;
    }

    /**
     * Default isi surat (penerima, salam pembuka, kalimat penutup).
     * Dapat di-merge ke form->fill() pada mount().
     *
     * @return array<string, string>
     */
    public function suratDefaults(): array
    {
        return [
            'kepada'  => "Kepala Yayasan Pendidikan Umum Santo Lukas\ndi Tempat",
            'salam'   => 'Semoga Tuhan Yesus selalu memberkati dan menyertai Bapak/Ibu sekalian dalam menjalankan aktivitas sehari-hari.',
            'penutup' => 'Demikian laporan ini kami sampaikan untuk dapat menjadi bahan evaluasi dan pengambilan keputusan. Atas perhatian dan kerja samanya kami ucapkan terima kasih.',
        ];
    }

    /**
     * Field "Isi Surat" yang sama untuk semua laporan: penerima (Kepada Yth.),
     * salam pembuka, dan kalimat penutup — bisa diubah per laporan.
     *
     * @return array<int, \Filament\Schemas\Components\Component>
     */
    public function suratFields(): array
    {
        return [
            \Filament\Schemas\Components\Section::make('Isi Surat')
                ->description('Bagian pembuka & penutup surat laporan — dapat diubah sesuai konteks tiap laporan.')
                ->columns(1)
                ->schema([
                    \Filament\Forms\Components\Textarea::make('kepada')
                        ->label('Kepada Yth.')
                        ->rows(2)
                        ->placeholder("Nama / jabatan penerima\nmis. Kepala Yayasan Pendidikan Umum Santo Lukas\ndi Tempat")
                        ->helperText('Penerima surat (boleh beberapa baris). Kosongkan bila tidak perlu menampilkan bagian "Kepada Yth.".'),

                    \Filament\Forms\Components\Textarea::make('salam')
                        ->label('Salam Pembuka')
                        ->rows(2)
                        ->helperText('Kalimat setelah "Dengan Hormat,".'),

                    \Filament\Forms\Components\Textarea::make('penutup')
                        ->label('Kalimat Penutup')
                        ->rows(3),
                ]),
        ];
    }
}
