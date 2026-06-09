<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
{
    /**
     * Cache id-buku yang di-bookmark oleh user, di-key per user id, agar
     * status bookmark dihitung sekali per request (hindari N+1) dan TIDAK
     * ikut ter-cache di payload buku (mencegah bocor antar user).
     *
     * @var array<int, array<int, int>>
     */
    protected static array $bookmarkedIdsCache = [];

    /**
     * @return array<int, int>
     */
    protected static function bookmarkedBookIds(): array
    {
        $userId = auth()->id();

        if ($userId === null) {
            return [];
        }

        if (! array_key_exists($userId, static::$bookmarkedIdsCache)) {
            static::$bookmarkedIdsCache[$userId] = DB::table('bookmarks')
                ->where('user_id', $userId)
                ->pluck('book_id')
                ->map(fn ($id) => (int) $id)
                ->all();
        }

        return static::$bookmarkedIdsCache[$userId];
    }
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

            'location_book' => $this->when(isset($this->location_book), $this->location_book),
            'classification_number' => $this->when(isset($this->classification_number), $this->classification_number),

            'cover' => $this->when(
                isset($this->cover),
                $this->cover ? Storage::url($this->cover) : null
            ),

            'price' => $this->when(isset($this->price), $this->price),

            'is_published' => $this->when(isset($this->is_published), $this->is_published),

            'avg_rating' => $this->when(isset($this->avg_rating), (float) $this->avg_rating),

            // Status bookmark untuk user yang sedang login (false bila tamu).
            'is_bookmarked' => in_array((int) $this->id, static::bookmarkedBookIds(), true),
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

        if ($this->relationLoaded('authors')) {
            $data['authors'] = $this->authors->isNotEmpty()
                ? AuthorResource::collection($this->authors)->resolve()
                : [];
        }

        if ($this->relationLoaded('categories')) {
            $data['categories'] = $this->categories->isNotEmpty()
                ? CategoryResource::collection($this->categories)->resolve()
                : [];
        }

        if ($this->relationLoaded('types')) {
            $data['types'] = $this->types
                ->map(fn ($type) => [
                    'id' => $type->id,
                    'type' => $type->type,
                ])
                ->values()
                ->all();
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
