<?php

namespace Database\Factories;

use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Language>
 */
class LanguageFactory extends Factory
{
    protected $model = Language::class;

    private static array $languages = [
        ['code' => 'id', 'language' => 'Indonesia'],
        ['code' => 'en', 'language' => 'English'],
        ['code' => 'ar', 'language' => 'Arabic'],
        ['code' => 'de', 'language' => 'German'],
        ['code' => 'fr', 'language' => 'French'],
        ['code' => 'ja', 'language' => 'Japanese'],
        ['code' => 'zh', 'language' => 'Chinese'],
        ['code' => 'es', 'language' => 'Spanish'],
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = self::$languages[self::$index % count(self::$languages)];
        self::$index++;

        return [
            'code'     => $data['code'],
            'language' => $data['language'],
            'photo'    => null,
        ];
    }
}
