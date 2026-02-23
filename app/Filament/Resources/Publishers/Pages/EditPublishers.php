<?php

namespace App\Filament\Resources\Publishers\Pages;

use App\Filament\Resources\Publishers\PublishersResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditPublishers extends EditRecord
{
    protected static string $resource = PublishersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
