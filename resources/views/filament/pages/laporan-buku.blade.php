<x-filament-panels::page>
    <form wire:submit.prevent class="space-y-6">
        {{ $this->form }}
    </form>

    <div class="mt-6 flex justify-end gap-2">
        <x-filament::button color="primary" icon="heroicon-o-arrow-down-tray" wire:click="downloadPdf">
            Download PDF
        </x-filament::button>
    </div>
</x-filament-panels::page>
