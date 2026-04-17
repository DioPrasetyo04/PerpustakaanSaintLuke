<?php

namespace App\Filament\Widgets;

use App\Models\Stock;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

class StatusOfBooks extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Stock Book Status Detail';

    protected int|string|array $columnSpan = 'full';

    // protected int|string|array $sort = 1;

    protected function getData(): array
    {
        $bookIds     = $this->filters['book_ids'] ?? [];
        $categoryId  = $this->filters['category_id'] ?? null;
        $publisherId = $this->filters['publisher_id'] ?? null;

        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();

        $query = Stock::query()->with('book');

        // 🔍 filter multi buku
        if (!empty($bookIds)) {
            $query->whereIn('book_id', $bookIds);
        }

        // 🔍 kategori
        if ($categoryId) {
            $query->whereHas('book.categories', function ($q) use ($categoryId) {
                $q->where('categories.id', $categoryId);
            });
        }

        // 🔍 publisher
        if ($publisherId) {
            $query->whereHas('book', function ($q) use ($publisherId) {
                $q->where('publisher_id', $publisherId);
            });
        }

        // 🔍 tanggal
        $query->whereHas('book', function ($q) use ($start, $end) {
            $q->whereBetween('created_at', [
                Carbon::parse($start)->startOfDay(),
                Carbon::parse($end)->endOfDay(),
            ]);
        });

        $stocks = $query->get();

        // 🔥 kalau filter buku dipilih → multi dataset
        if (!empty($bookIds)) {

            $datasets = [];

            foreach ($stocks as $stock) {
                $datasets[] = [
                    'label' => $stock->book->title,
                    'data' => [
                        $stock->available,
                        $stock->loan,
                        $stock->lost,
                        $stock->damaged,
                    ],
                ];
            }

            return [
                'datasets' => $datasets,
                'labels' => ['Available', 'Loan', 'Lost', 'Damaged'],
            ];
        }

        // 🔥 default (global summary)
        $available = $stocks->sum('available');
        $loan      = $stocks->sum('loan');
        $lost      = $stocks->sum('lost');
        $damaged   = $stocks->sum('damaged');

        static $alreadyNotified = false;

        if (!$alreadyNotified) {
            if ($lost > 5 || $damaged > 5) {
                $alreadyNotified = true;

                Notification::make()
                    ->title('⚠️ Stock Warning')
                    ->body("Lost: {$lost}, Damaged: {$damaged}")
                    ->danger()
                    ->send();
            }
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Stock',
                    'data' => [$available, $loan, $lost, $damaged],
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(234, 179, 8, 0.7)',
                    ],
                ],
            ],
            'labels' => ['Available', 'Loan', 'Lost', 'Damaged'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([

            // 🔥 MULTI SELECT BUKU
            Select::make('book_ids')
                ->label('Pilih Buku')
                ->multiple()
                ->searchable()
                ->options(Book::pluck('title', 'id')->toArray())
                ->placeholder('Semua Buku'),

            Select::make('category_id')
                ->label('Kategori')
                ->searchable()
                ->options(Category::pluck('name', 'id')->toArray())
                ->placeholder('Semua Kategori'),

            Select::make('publisher_id')
                ->label('Publisher')
                ->searchable()
                ->options(Publisher::pluck('name', 'id')->toArray())
                ->placeholder('Semua Publisher'),

            DatePicker::make('startDate')
                ->default(now()->startOfMonth()),

            DatePicker::make('endDate')
                ->default(now()),
        ]);
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
            'tooltip' => [
                'callbacks' => [
                    'label' => \Filament\Support\RawJs::make(<<<'JS'
                function(context) {
                    const dataset = context.dataset.data;
                    const total = dataset.reduce((a, b) => a + b, 0);
                    const value = context.raw;
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

                    return context.label + ': ' + value + ' (' + percentage + '%)';
                }
            JS),
                ],
            ],
        ];
    }
}
