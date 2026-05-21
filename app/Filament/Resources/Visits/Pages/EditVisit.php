<?php

namespace App\Filament\Resources\Visits\Pages;

use App\Filament\Resources\Visits\VisitResource;
use App\Models\User;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVisit extends EditRecord
{
    protected static string $resource = VisitResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (! empty($data['user_id'])) {
            $user = User::query()->find($data['user_id']);
            if ($user) {
                $data['type'] = $user->type;
                $data['type_other'] = $user->type_other;
            }
        }

        return $data;
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
