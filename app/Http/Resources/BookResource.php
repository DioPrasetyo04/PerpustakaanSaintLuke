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
        $data = [
            'id' => $this->id,

            'book_code' => $this->when(isset($this->book_code), $this->book_code),
            'title' => $this->when(isset($this->title), $this->title),
            'slug' => $this->when(isset($this->slug), $this->slug),

            'publication_year' => $this->when(
                isset($this->publication_year),
                $this->publication_year
                    ? Carbon::parse($this->publication_year)->format('Y')
                    : null
            ),

            'status' => $this->when(isset($this->status), $this->status),

            'isbn' => $this->when(isset($this->isbn), $this->isbn),
            'synopsis' => $this->when(isset($this->synopsis), $this->synopsis),
            'number_of_pages' => $this->when(isset($this->number_of_pages), $this->number_of_pages),

            'cover' => $this->when(
                isset($this->cover),
                $this->cover ? Storage::url($this->cover) : null
            ),

            'price' => $this->when(isset($this->price), $this->price),

            'is_published' => $this->when(isset($this->is_published), $this->is_published),

            'avg_rating' => $this->when(isset($this->avg_rating), (float) $this->avg_rating),
        ];

        if ($this->relationLoaded('reviews') && $this->reviews->isNotEmpty()) {
            $data['reviews'] = ReviewResource::collection($this->reviews)->resolve();
        }

        if ($this->relationLoaded('language') && $this->language) {
            $data['language'] = LanguageResource::make($this->language)->resolve();
        }

        if ($this->relationLoaded('publisher') && $this->publisher) {
            $data['publisher'] = PublisherResource::make($this->publisher)->resolve();
        }

        if ($this->relationLoaded('authors') && $this->authors->isNotEmpty()) {
            $data['authors'] = AuthorResource::collection($this->authors)->resolve();
        }

        if ($this->relationLoaded('categories') && $this->categories->isNotEmpty()) {
            $data['categories'] = CategoryResource::collection($this->categories)->resolve();
        }

        if ($this->relationLoaded('addedBy') && $this->addedBy) {
            $data['addedBy'] = UserResource::make($this->addedBy)->resolve();
        }

        if ($this->relationLoaded('stock') && $this->stock) {
            $data['stock'] = StockResource::make($this->stock)->resolve();
        }

        if ($this->relationLoaded('loan') && $this->loan->isNotEmpty()) {
            $data['loan'] = LoanResource::collection($this->loan)->resolve();
        }

        return $data;
    }
}
