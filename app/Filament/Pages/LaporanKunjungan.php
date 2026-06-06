<?php

namespace App\Filament\Pages;

use App\Filament\Pages\Concerns\BuildsLaporan;
use App\Models\Visit;
use BackedEnum;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class LaporanKunjungan extends Page implements HasForms
{
    use InteractsWithForms;
    use BuildsLaporan;
    use HasPageShield;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::DocumentChartBar;

    protected static ?string $title = 'Laporan Kunjungan';

    protected static ?string $navigationLabel = 'Laporan Kunjungan';

    protected static string|\UnitEnum|null $navigationGroup = 'Kunjungan';

    protected static ?int $navigationSort = 20;

    protected string $view = 'filament.pages.laporan-kunjungan';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'mode'  => 'monthly',
            'year'  => (string) now()->year,
            'month' => (string) now()->month,
            'week'  => '1',
            'judul' => 'LAPORAN KUNJUNGAN PERPUSTAKAAN SAINT LUKE',
            'nomor' => '001/LAP-KJG/' . now()->format('m') . '/' . now()->format('Y'),
            'kota'  => 'Jakarta',
            'penandatangan_kiri'  => 'Petugas Perpustakaan',
            'nama_kiri'           => 'Dio Prasetyo',
            'penandatangan_kanan' => 'Kepala Perpustakaan',
            'nama_kanan'          => 'Ariesta Francisco Ratu',
            ...$this->suratDefaults(),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    Select::make('mode')
                        ->label('Tipe Laporan')
                        ->native(false)
                        ->options($this->laporanModeOptions())
                        ->default('monthly')
                        ->required()
                        ->live()
                        ->columnSpan(
                            fn(\Filament\Schemas\Components\Utilities\Get $get) =>
                            in_array($get('mode'), ['daily', 'daily_week', 'weekly_month'], true) ? 1 : 2
                        ),

                    Select::make('year')
                        ->label('Tahun')
                        ->native(false)
                        ->options($this->yearOptions())
                        ->default((string) now()->year)
                        ->required()
                        ->live(),

                    Select::make('month')
                        ->label('Bulan')
                        ->native(false)
                        ->options($this->monthOptions())
                        ->default((string) now()->month)
                        ->required()
                        ->live()
                        ->visible(fn(\Filament\Schemas\Components\Utilities\Get $get) => in_array($get('mode'), ['daily', 'daily_week', 'weekly_month'], true)),

                    Select::make('week')
                        ->label('Minggu')
                        ->native(false)
                        ->options(fn(\Filament\Schemas\Components\Utilities\Get $get) => $this->weekOptions((int) $get('year'), (int) $get('month')))
                        ->default('1')
                        ->required()
                        ->live()
                        ->visible(fn(\Filament\Schemas\Components\Utilities\Get $get) => $get('mode') === 'daily_week'),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('judul')->label('Judul Laporan')->required(),
                    TextInput::make('nomor')->label('Nomor Surat')->required(),
                    TextInput::make('kota')->label('Kota')->default('Jakarta')->columnSpanFull(),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('penandatangan_kiri')->label('Jabatan (Kiri)'),
                    TextInput::make('nama_kiri')->label('Nama (Kiri)'),
                    TextInput::make('penandatangan_kanan')->label('Jabatan (Kanan)'),
                    TextInput::make('nama_kanan')->label('Nama (Kanan)'),
                ]),

                ...$this->suratFields(),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [];
    }

    public function getReportData(): array
    {
        $state = $this->form->getState();
        $mode  = $state['mode']  ?? 'monthly';
        $year  = (int) ($state['year']  ?? now()->year);
        $month = (int) ($state['month'] ?? now()->month);
        $week  = (int) ($state['week']  ?? 1);

        $period = $this->buildPeriodBuckets($mode, $year, $month, function ($start, $end) {
            return Visit::query()
                ->whereBetween('visit_date', [$start, $end])
                ->count();
        }, $week);

        $visits = Visit::query()
            ->with('user')
            ->whereBetween('visit_date', [$period['rangeStart'], $period['rangeEnd']])
            ->orderBy('visit_date')
            ->get();

        return [
            'state'        => $state,
            'buckets'      => $period['buckets'],
            'rangeStart'   => $period['rangeStart'],
            'rangeEnd'     => $period['rangeEnd'],
            'periodLabel'  => $period['periodLabel'],
            'periodRange'  => $period['periodRange'],
            'mode'         => $period['mode'],
            'visits'       => $visits,
            'totalVisits'  => $visits->count(),
        ];
    }

    public function downloadPdf()
    {
        $report = $this->getReportData();

        if ($report['totalVisits'] === 0) {
            Notification::make()
                ->title('Tidak ada data')
                ->body('Tidak ada kunjungan pada periode yang dipilih.')
                ->warning()
                ->send();
            return null;
        }

        $chartImage = $this->buildBarChart($report['buckets'], '#3b82f6');

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan-kunjungan', [
            'report'     => $report,
            'chartImage' => $chartImage,
        ])->setPaper('a4', 'portrait');

        $filename = 'Laporan-Kunjungan-' . $report['mode'] . '-' . ($report['state']['year'] ?? now()->year) . '.pdf';

        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, $filename);
    }
}
