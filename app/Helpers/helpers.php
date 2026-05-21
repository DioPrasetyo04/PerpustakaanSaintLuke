<?php

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use PragmaRX\Countries\Package\Countries;

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

if (!function_exists('generateUsername')) {
    function generateUsername(string $name)
    {
        $username = Str::lower(preg_replace('/\s+/', '_', trim($name)) . random_int(100, 999));

        $origimal_username = $username;

        $count = 1;

        while (User::where('username', $username)->exists()) {
            $username = $origimal_username . '-' . $count;

            $count++;
        }

        return $username;
    }
}

// generate password random
if (!function_exists('generateRandomPassword')) {
    function generateRandomPassword(int $length = 8): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomPassword = '';
        for ($i = 0; $i < $length; $i++) {
            $randomPassword .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomPassword;
    }
}

if (!function_exists('countryOptions')) {
    function countryOptions(): array
    {
        return collect((new Countries())->all())->mapWithKeys(function ($country) {
            $code = $country->cca2;
            $name = $country->name->common;
            $flagUrl = "https://flagcdn.com/w20/" . strtolower($code) . ".png";

            return [$code => "<div style='display:flex;align-items:center;gap:6px'><img src='{$flagUrl}' width='20' height='15' style='border-radius:3px' /><span>{$name}</span></div>"];
        })->toArray();
    }
}

if (!function_exists('moneyFormatter')) {
    function moneyFormatter($value)
    {
        $formatter = new NumberFormatter('id_ID', NumberFormatter::CURRENCY);

        $formatter->setAttribute(NumberFormatter::FRACTION_DIGITS, 2);

        $formatter->setSymbol(NumberFormatter::CURRENCY_SYMBOL, 'Rp. ');
        return $formatter->formatCurrency($value, 'IDR');
    }
}

if (!function_exists('generateRouteName')) {
    function generateRoute(string $input, Model $model): string
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
}

if (!function_exists('tiptapToHtml')) {
    function tiptapToHtml($content)
    {
        if (is_string($content)) {
            $content = json_decode($content, true);
        }

        if (!is_array($content) || !isset($content['content'])) {
            return null;
        }

        $html = '';

        foreach ($content['content'] as $node) {
            if ($node['type'] === 'paragraph') {
                $text = '';

                if (isset($node['content'])) {
                    foreach ($node['content'] as $child) {
                        if ($child['type'] === 'text') {
                            $text .= $child['text'];
                        }
                    }
                }

                $html .= "<p>{$text}</p>";
            }
        }

        return $html;
    }
}

if (!function_exists('signatureMidtrans')) {
    function signatureMidtrans($order_id, $status_code, $gross_amount, $server_key)
    {
        return hash("sha512", $order_id . $status_code . $gross_amount . $server_key);
    }
}

if (!function_exists('paginateResource')) {
    function paginateResource($paginator, string $resource)
    {
        return [
            'data' => collect($paginator->items())->map(function ($item) use ($resource) {
                return (new $resource($item))->toArray(request());
            })->toArray(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'from' => $paginator->firstItem(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
                'has_pages' => $paginator->hasPages(),
            ],
            'links' => [
                'next' => $paginator->nextPageUrl(),
                'prev' => $paginator->previousPageUrl(),
            ]
        ];
    }
}

if (!function_exists('formatLast12Months')) {
    function formatLast12Months(array $data, string $key): array
    {
        $result = [];
        $start = now()->subMonths(11)->startOfMonth();

        for ($i = 0; $i < 12; $i++) {
            $date = $start->copy()->addMonths($i);
            $yearMonth = $date->format('Y-m');
            $result[] = [
                'bulan' => ucfirst($date->translatedFormat('M')),
                $key => $data[$yearMonth] ?? 0
            ];
        }
        return $result;
    }
}

if (!function_exists('transformData')) {
    function transformData($data, $resource)
    {
        if ($data instanceof LengthAwarePaginator) {
            return $resource::collection($data)->resolve();
        }

        if ($data instanceof Collection) {
            return $resource::collection($data)->resolve();
        }

        return $resource::make($data)->resolve();
    }
}
