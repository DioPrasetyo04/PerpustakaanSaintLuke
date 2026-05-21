<?php

namespace App\Filament\Pages;

use App\Enums\PaymentStatus;
use App\Filament\Pages\Concerns\BuildsLaporan;
use App\Models\Fine;
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

class LaporanDenda extends Page implements HasForms
{
    use InteractsWithForms;
    use BuildsLaporan;
    use HasPageShield;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ClipboardDocumentList;

    protected static ?string $title = 'Laporan Denda';

    protected static ?string $navigationLabel = 'Laporan Denda';

    protected static string|\UnitEnum|null $navigationGroup = 'Keuangan';

    protected static ?int $navigationSort = 23;

    protected string $view = 'filament.pages.laporan-denda';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'mode'   => 'monthly',
            'year'   => (string) now()->year,
            'month'  => (string) now()->month,
            'metric' => 'count',
            'judul'  => 'LAPORAN DENDA PERPUSTAKAAN SAINT LUKE',
            'nomor'  => '001/LAP-DND/' . now()->format('m') . '/' . now()->format('Y'),
            'kota'   => 'Jakarta',
            'penandatangan_kiri'  => 'Petugas Perpustakaan',
            'nama_kiri'           => 'Dio Prasetyo',
            'penandatangan_kanan' => 'Kepala Perpustakaan',
            'nama_kanan'          => 'Ariesta Francisco Ratu',
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
                            $get('mode') !== 'daily' ? 2 : 1
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
                        ->visible(fn(\Filament\Schemas\Components\Utilities\Get $get) => $get('mode') === 'daily'),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('judul')->label('Judul Laporan')->required(),
                    TextInput::make('nomor')->label('Nomor Surat')->required(),
                    TextInput::make('kota')->label('Kota')->default('Jakarta'),
                    Select::make('metric')
                        ->label('Metrik Grafik')
                        ->native(false)
                        ->options([
                            'count'  => 'Jumlah Denda',
                            'amount' => 'Total Nominal (Rp)',
                        ])
                        ->default('count')
                        ->required()
                        ->live(),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('penandatangan_kiri')->label('Jabatan (Kiri)'),
                    TextInput::make('nama_kiri')->label('Nama (Kiri)'),
                    TextInput::make('penandatangan_kanan')->label('Jabatan (Kanan)'),
                    TextInput::make('nama_kanan')->label('Nama (Kanan)'),
                ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [];
    }

    public function getReportData(): array
    {
        $state  = $this->form->getState();
        $mode   = $state['mode']  ?? 'monthly';
        $year   = (int) ($state['year']  ?? now()->year);
        $month  = (int) ($state['month'] ?? now()->month);
        $metric = $state['metric'] ?? 'count';

        $period = $this->buildPeriodBuckets($mode, $year, $month, function ($start, $end) use ($metric) {
            $q = Fine::query()->whereBetween('fine_date', [$start, $end]);
            return $metric === 'amount' ? (float) $q->sum('total_fee') : $q->count();
        });

        $rows = Fine::query()
            ->with(['returnBook.loanDetail.book', 'returnBook.loanDetail.loan.user'])
            ->whereBetween('fine_date', [$period['rangeStart'], $period['rangeEnd']])
            ->orderBy('fine_date')
            ->get();

        $totalAmount = (float) $rows->sum('total_fee');
        $paid    = $rows->where('payment_status', PaymentStatus::SUCCESS)->count();
        $unpaid  = $rows->count() - $paid;

        return [
            'state'        => $state,
            'metric'       => $metric,
            'buckets'      => $period['buckets'],
            'rangeStart'   => $period['rangeStart'],
            'rangeEnd'     => $period['rangeEnd'],
            'periodLabel'  => $period['periodLabel'],
            'periodRange'  => $period['periodRange'],
            'mode'         => $period['mode'],
            'rows'         => $rows,
            'total'        => $rows->count(),
            'totalAmount'  => $totalAmount,
            'paid'         => $paid,
            'unpaid'       => $unpaid,
        ];
    }

    public function downloadPdf()
    {
        $report = $this->getReportData();

        if ($report['total'] === 0) {
            Notification::make()
                ->title('Tidak ada data')
                ->body('Tidak ada data denda pada periode yang dipilih.')
                ->warning()
                ->send();
            return null;
        }

        $chartImage = $this->buildBarChart($report['buckets'], '#ef4444');

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan-denda', [
            'report'     => $report,
            'chartImage' => $chartImage,
        ])->setPaper('a4', 'portrait');

        $filename = 'Laporan-Denda-' . $report['mode'] . '-' . ($report['state']['year'] ?? now()->year) . '.pdf';

        return response()->streamDownload(function () use ($pdf) {
            echo $pdf->output();
        }, $filename);
    }
}
