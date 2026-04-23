<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'publisher' => $this->whenLoaded('publisher', function () {
                return [
                    'id' => $this->publisher->id,
                    'name' => $this->publisher->name,
                    'slug' => $this->publisher->slug,
                    'icon' => $this->publisher->icon ? Storage::url($this->publisher->icon) : null,
                ];
            }),
            'language' => $this->whenLoaded('language', function () {
                return [
                    'id' => $this->language->id,
                    'photo' => $this->language->photo ? Storage::url($this->language->photo) : null,
                    'language' => $this->language->language
                ];
            }),
            'authors' => $this->whenLoaded('authors', function () {
                return $this->authors->map(function ($author) {
                    return [
                        'id' => $author->id,
                        'name' => $author->name,
                        'username' => $author->username,
                        'avatar' => $author->avatar ? Storage::url($author->avatar) : null,
                    ];
                })->values()->toArray();
            }),
            'categories' => $this->whenLoaded('categories', function () {
                return $this->categories->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'icon' => $category->icon ? Storage::url($category->icon) : null,
                        'name' => $category->name,
                        'slug' => $category->slug,
                    ];
                })->values()->toArray();
            }),
            'book_code' => $this->book_code,
            'title' => $this->title,
            'slug' => $this->slug,
            'publication_year' => Carbon::parse($this->publication_year)->format('Y'),
            'isbn' => $this->isbn,
            'synopsis' => $this->synopsis,
            'number_of_pages' => $this->number_of_pages,
            'status' => $this->status,
            'cover' => $this->cover ? Storage::url($this->cover) : null,
            'price' => $this->price,
            'is_published' => $this->is_published,
            'avg_rating' => $this->avg_rating ?? 0,
            'rating' => $this->whenLoaded('reviews', function () {
                return $this->reviews->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'user' => $review->user ? [
                            'id' => $review->user->id,
                            'name' => $review->user->name,
                            'username' => $review->user->username,
                            'avatar' => $review->user->avatar
                                ? Storage::url($review->user->avatar)
                                : null,
                        ] : null,
                        'rating' => $review->rating ?? 0,
                        'comment' => $review->comment ?? null,
                    ];
                })->values()->toArray();
            }),
        ];
    }
}
