<?php

namespace App\Filament\Pages\Concerns;

use Carbon\Carbon;

trait BuildsLaporan
{
    /**
     * Build the period buckets based on mode (daily/weekly/monthly).
     * For 'daily' the buckets are days in a selected month.
     * For 'weekly' the buckets are weeks of the selected year.
     * For 'monthly' the buckets are 12 months of the selected year.
     *
     * @return array{
     *   mode:string,
     *   buckets: array<int, array{label:string, range:string, start:Carbon, end:Carbon, value:int|float}>,
     *   rangeStart:Carbon,
     *   rangeEnd:Carbon,
     *   periodLabel:string,
     *   periodRange:string,
     * }
     */
    public function buildPeriodBuckets(string $mode, int $year, ?int $month, callable $counter): array
    {
        $mode = in_array($mode, ['daily', 'weekly', 'monthly'], true) ? $mode : 'monthly';
        $year  = (int) ($year ?: now()->year);
        $month = (int) ($month ?: now()->month);

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
            $periodLabel = 'Mingguan ' . $year;
            $periodRange = '01 Jan ' . $year . ' - 31 Des ' . $year;
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
            $periodLabel = 'Harian ' . $base->translatedFormat('F Y');
            $periodRange = $rangeStart->format('d M Y') . ' - ' . $rangeEnd->format('d M Y');
        }

        return [
            'mode'        => $mode,
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
            'daily'   => 'Harian (per hari dalam 1 bulan)',
            'weekly'  => 'Mingguan (per minggu dalam 1 tahun)',
            'monthly' => 'Bulanan (per bulan dalam 1 tahun)',
        ];
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
}
