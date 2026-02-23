<?php

use Illuminate\Support\Str;

if (!function_exists('generateSlug')) {
    function generateSlug(string $input, string $model): string
    {
        $slug = Str::slug(Str::lower($input));

        $slugWithRandomInt = $slug . '-' . random_int(1000, 9999);

        $count = 1;

        while ($model::where('slug', $slugWithRandomInt)->exists()) {
            $slugWithRandomInt = $slug . '-' . random_int(1000, 9999) . '-' . $count;
            $count++;
        }

        return $slugWithRandomInt;
    }

    if (!function_exists('generateUniqueCode')) {
        function generateUniqueCode(string $prefix, string $model, string $field): string
        {
            $prefixLibrary = 'SAINT-LUKE-LIBRARY';

            $Title = Str::lower($prefix);

            $replaceSpaces = preg_replace('/\s+/', '', $Title);

            $code = $prefixLibrary . '-' . $replaceSpaces . '-' . random_int(1000, 9999);

            $codeWithRandomInt = $code;

            $count = 1;

            while ($model::where($field, $codeWithRandomInt)->exists()) {
                $codeWithRandomInt = $code . '-' . random_int(1000, 9999) . '-' . $count;
                $count++;
            }

            return $codeWithRandomInt;
        }
    }

    if (!function_exists('RupiahFormatted')) {
        function RupiahFormatted(?int $value)
        {
            if (!$value) {
                return 'Rp. 0';
            }

            return 'Rp ' . number_format($value, 0, ',', '.');
        }
    }
}
