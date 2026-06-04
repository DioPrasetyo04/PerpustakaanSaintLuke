<?php

namespace App\Filament\Resources\Books\Pages;

use App\Filament\Resources\Books\BookResource;
use App\Filament\Resources\Books\Widgets\BookStatsOverview;
use App\Filament\Resources\Books\Widgets\BooksByCategoryChart;
use App\Services\BookImportService;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\FileUpload;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\HtmlString;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use OpenSpout\Common\Entity\Row;
use OpenSpout\Writer\XLSX\Writer as XlsxWriter;

class ListBooks extends ListRecords
{
    protected static string $resource = BookResource::class;

    /** Judul kolom template import (urutan sesuai contoh). */
    protected const IMPORT_HEADERS = [
        'DDC',
        'Judul Buku',
        'Pengarang',
        'Jilid',
        'Tahun',
        'Penerbit',
        'Total Exemplar',
    ];

    protected function getHeaderActions(): array
    {
        return [
            $this->importExcelAction(),
            $this->downloadTemplateAction(),
            CreateAction::make(),
        ];
    }

    protected function importExcelAction(): Action
    {
        return Action::make('importExcel')
            ->label('Import Excel')
            ->icon('heroicon-o-arrow-up-tray')
            ->color('success')
            ->modalHeading('Import Data Buku dari Excel')
            ->modalDescription('Unggah file .xlsx atau .csv. Baris pertama harus berisi nama kolom.')
            ->modalSubmitActionLabel('Import')
            ->form([
                FileUpload::make('file')
                    ->label('File Excel / CSV')
                    ->acceptedFileTypes([
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-excel',
                        'text/csv',
                        'application/csv',
                    ])
                    ->storeFiles(false)
                    ->required()
                    ->helperText('Kolom: ' . implode(', ', self::IMPORT_HEADERS) . '. Judul Buku & Total Exemplar wajib diisi.'),
            ])
            ->action(function (array $data): void {
                $file = $data['file'] ?? null;

                if (is_array($file)) {
                    $file = reset($file);
                }

                if (! $file instanceof TemporaryUploadedFile) {
                    Notification::make()
                        ->title('File tidak valid')
                        ->body('File yang diunggah tidak dapat dibaca. Silakan coba lagi.')
                        ->danger()
                        ->send();

                    return;
                }

                try {
                    $result = app(BookImportService::class)->import(
                        $file->getRealPath(),
                        $file->getClientOriginalExtension(),
                    );
                } catch (\Throwable $e) {
                    Notification::make()
                        ->title('Gagal membaca file')
                        ->body($e->getMessage())
                        ->danger()
                        ->persistent()
                        ->send();

                    return;
                }

                Notification::make()
                    ->title('Import selesai')
                    ->body("{$result['success']} dari {$result['total']} buku berhasil diimpor.")
                    ->success()
                    ->send();

                if (! empty($result['skipped'])) {
                    Notification::make()
                        ->title(count($result['skipped']) . ' buku dilewati (judul sudah ada)')
                        ->body($this->formatSkipped($result['skipped']))
                        ->warning()
                        ->persistent()
                        ->send();
                }

                if (! empty($result['failed'])) {
                    Notification::make()
                        ->title(count($result['failed']) . ' baris gagal diimpor')
                        ->body($this->formatFailures($result['failed']))
                        ->danger()
                        ->persistent()
                        ->send();
                }
            });
    }

    protected function downloadTemplateAction(): Action
    {
        return Action::make('downloadTemplate')
            ->label('Download Template')
            ->icon('heroicon-o-arrow-down-tray')
            ->color('gray')
            ->action(function () {
                $path = tempnam(sys_get_temp_dir(), 'book_template_');

                $writer = new XlsxWriter();
                $writer->openToFile($path);
                $writer->addRow(Row::fromValues(self::IMPORT_HEADERS));
                $writer->addRow(Row::fromValues([
                    '813.54',
                    'Laskar Pelangi',
                    'Andrea Hirata',
                    '1',
                    'Bentang Pustaka',
                    '5',
                    '2005',
                ]));
                $writer->close();

                return response()
                    ->download($path, 'template-import-buku.xlsx')
                    ->deleteFileAfterSend();
            });
    }

    /**
     * @param  array<int, string>  $failures
     */
    protected function formatFailures(array $failures): HtmlString
    {
        $lines = collect($failures)
            ->take(10)
            ->map(fn(string $message, int $row) => 'Baris ' . $row . ': ' . e($message))
            ->values();

        if (count($failures) > 10) {
            $lines->push('...dan ' . (count($failures) - 10) . ' baris lainnya.');
        }

        return new HtmlString($lines->implode('<br>'));
    }

    /**
     * @param  array<int, string>  $skipped
     */
    protected function formatSkipped(array $skipped): HtmlString
    {
        $lines = collect($skipped)
            ->take(10)
            ->map(fn(string $title, int $row) => 'Baris ' . $row . ': ' . e($title))
            ->values();

        if (count($skipped) > 10) {
            $lines->push('...dan ' . (count($skipped) - 10) . ' buku lainnya.');
        }

        return new HtmlString($lines->implode('<br>'));
    }

    protected function getHeaderWidgets(): array
    {
        return [
            BookStatsOverview::class,
            BooksByCategoryChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
