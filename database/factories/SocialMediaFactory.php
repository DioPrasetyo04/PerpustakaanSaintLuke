<?php

namespace Database\Factories;

use App\Enums\SocialMedia as SocialMediaEnum;
use App\Models\Author;
use App\Models\SocialMedia;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialMedia>
 */
class SocialMediaFactory extends Factory
{
    protected $model = SocialMedia::class;

    /**
     * Define the model's default state.
     *
     * Polymorphic relation: socialable_id + socialable_type → Author (default)
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $author   = Author::inRandomOrder()->first() ?? Author::factory()->create();
        $handle   = Str::slug($author->name, '');
        $platform = fake()->randomElement(SocialMediaEnum::cases());

        $url = match ($platform) {
            SocialMediaEnum::INSTAGRAM => 'https://instagram.com/' . $handle,
            SocialMediaEnum::TWITTER   => 'https://twitter.com/' . $handle,
            SocialMediaEnum::FACEBOOK  => 'https://facebook.com/' . $handle,
            SocialMediaEnum::TIKTOK    => 'https://tiktok.com/@' . $handle,
            SocialMediaEnum::LINKEDIN  => 'https://linkedin.com/in/' . $handle,
            SocialMediaEnum::WHATSAPP  => 'https://wa.me/62' . fake()->numerify('8##########'),
            SocialMediaEnum::GMAIL     => 'https://mail.google.com',
            default                    => 'https://social.example.com/' . $handle,
        };

        return [
            'socialable_id'   => $author->id,
            'socialable_type' => Author::class,
            'platform'        => $platform->value,
            'url'             => $url,
            'username'        => $handle,
        ];
    }
}
