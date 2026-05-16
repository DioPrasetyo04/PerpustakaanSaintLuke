<?php

namespace App\Filament\Resources\Roles\Pages;

use App\Filament\Resources\Roles\RoleResource;
use App\Models\Author;
use App\Models\User;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\HtmlString;

class EditRole extends EditRecord
{
    protected static string $resource = RoleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $roleName = $this->record->name;

        $data['users']   = User::role($roleName)->pluck('id')->all();
        $data['authors'] = Author::role($roleName)->pluck('id')->all();

        return $data;
    }

    protected function afterSave(): void
    {
        $roleName = $this->record->name;

        $selectedUserIds   = collect($this->data['users']   ?? [])->map(fn($v) => (int) $v)->all();
        $selectedAuthorIds = collect($this->data['authors'] ?? [])->map(fn($v) => (int) $v)->all();

        $currentUserIds   = User::role($roleName)->pluck('id')->all();
        $currentAuthorIds = Author::role($roleName)->pluck('id')->all();

        $userAttachIds = array_values(array_diff($selectedUserIds, $currentUserIds));
        $userDetachIds = array_values(array_diff($currentUserIds, $selectedUserIds));

        $authorAttachIds = array_values(array_diff($selectedAuthorIds, $currentAuthorIds));
        $authorDetachIds = array_values(array_diff($currentAuthorIds, $selectedAuthorIds));

        $userAttachNames   = User::whereIn('id', $userAttachIds)->pluck('name')->all();
        $userDetachNames   = User::whereIn('id', $userDetachIds)->pluck('name')->all();
        $authorAttachNames = Author::whereIn('id', $authorAttachIds)->pluck('name')->all();
        $authorDetachNames = Author::whereIn('id', $authorDetachIds)->pluck('name')->all();

        foreach ($userAttachIds as $id) {
            User::find($id)?->assignRole($roleName);
        }
        foreach ($userDetachIds as $id) {
            User::find($id)?->removeRole($roleName);
        }

        foreach ($authorAttachIds as $id) {
            Author::find($id)?->assignRole($roleName);
        }
        foreach ($authorDetachIds as $id) {
            Author::find($id)?->removeRole($roleName);
        }

        $totalChanges = count($userAttachIds) + count($userDetachIds) + count($authorAttachIds) + count($authorDetachIds);

        if ($totalChanges === 0) {
            return;
        }

        $lines = [];

        if (! empty($userAttachNames)) {
            $lines[] = '<div><strong style="color:#15803d;">+ Users added:</strong> ' . e(implode(', ', $userAttachNames)) . '</div>';
        }
        if (! empty($userDetachNames)) {
            $lines[] = '<div><strong style="color:#b91c1c;">- Users removed:</strong> ' . e(implode(', ', $userDetachNames)) . '</div>';
        }
        if (! empty($authorAttachNames)) {
            $lines[] = '<div><strong style="color:#15803d;">+ Authors added:</strong> ' . e(implode(', ', $authorAttachNames)) . '</div>';
        }
        if (! empty($authorDetachNames)) {
            $lines[] = '<div><strong style="color:#b91c1c;">- Authors removed:</strong> ' . e(implode(', ', $authorDetachNames)) . '</div>';
        }

        Notification::make()
            ->title("Role assignments for \"{$roleName}\" updated")
            ->body(new HtmlString(implode('', $lines)))
            ->success()
            ->duration(8000)
            ->send();
    }
}
