<?php

namespace App\Filament\Support;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\View;

class PasswordStrength
{
    public static function wrap(Component $input): Group
    {
        /** @var TextInput $input */
        return Group::make([
            $input->extraInputAttributes([
                'x-on:input' => 'update($event.target.value)',
            ], merge: true),
            View::make('filament.forms.password-strength')->columnSpanFull(),
        ])->extraAttributes(['x-data' => self::alpineData()]);
    }

    private static function alpineData(): string
    {
        return <<<'JS'
        {
            show: false,
            percent: 0,
            label: '',
            barColor: '#e5e7eb',
            textColor: '#9ca3af',
            reqs: [
                { text: 'Minimal 8 karakter', ok: false },
                { text: 'Satu huruf kapital (A-Z)', ok: false },
                { text: 'Satu huruf kecil (a-z)', ok: false },
                { text: 'Satu angka (0-9)', ok: false },
                { text: 'Satu karakter spesial (!@#$...)', ok: false }
            ],
            update(v) {
                this.show = v.length > 0;
                this.reqs[0].ok = v.length >= 8;
                this.reqs[1].ok = /[A-Z]/.test(v);
                this.reqs[2].ok = /[a-z]/.test(v);
                this.reqs[3].ok = /[0-9]/.test(v);
                this.reqs[4].ok = /[^A-Za-z0-9]/.test(v);
                const s = this.reqs.filter(r => r.ok).length;
                this.percent = s * 20;
                const m = [
                    ['',           '#e5e7eb', '#9ca3af'],
                    ['Lemah',      '#ef4444', '#ef4444'],
                    ['Sedang',     '#f97316', '#f97316'],
                    ['Cukup',      '#eab308', '#ca8a04'],
                    ['Kuat',       '#3b82f6', '#2563eb'],
                    ['Sangat Kuat','#22c55e', '#16a34a']
                ];
                this.barColor  = m[s][1];
                this.textColor = m[s][2];
                this.label     = m[s][0];
            }
        }
        JS;
    }
}
