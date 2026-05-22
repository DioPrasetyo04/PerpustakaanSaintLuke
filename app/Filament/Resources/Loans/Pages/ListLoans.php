<?php

namespace App\Filament\Resources\Loans\Pages;

use App\Filament\Resources\Loans\Concerns\InteractsWithMemberScan;
use App\Filament\Resources\Loans\LoanResource;
use App\Filament\Resources\Loans\Widgets\LoanStatsOverview;
use App\Filament\Resources\Loans\Widgets\LoanTrendChart;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLoans extends ListRecords
{
    use InteractsWithMemberScan;

    protected static string $resource = LoanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Pindai kartu anggota lalu langsung membuka form peminjaman dengan peminjam terisi.
            Action::make('scanToCreate')
                ->label('Pinjam (Scan Kartu)')
                ->icon('heroicon-o-qr-code')
                ->color('success')
                ->modalHeading('Scan Kartu Anggota')
                ->modalDescription('Pindai kartu anggota untuk membuka form peminjaman dengan peminjam yang sudah terisi otomatis.')
                ->modalIcon('heroicon-o-qr-code')
                ->modalContent(fn() => view('filament.loan.scanner', ['wireMethod' => 'redirectScannedMemberToCreate']))
                ->modalSubmitAction(false)
                ->modalCancelActionLabel('Tutup'),

            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            LoanStatsOverview::class,
            LoanTrendChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
