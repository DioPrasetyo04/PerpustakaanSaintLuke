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

    function countryCodeToEmoji($countryCode)
    {
        return collect(str_split(strtoupper($countryCode)))
            ->map(fn($char) => mb_chr(127397 + ord($char)))
            ->join('');
    }
}
