<?php

namespace App\Filament\Widgets;

use Filament\Widgets\AccountWidget;
use Filament\Widgets\Widget;

class CustomAccountWidget extends AccountWidget
{
    protected int|string|array $columnSpan = 'full';
}
