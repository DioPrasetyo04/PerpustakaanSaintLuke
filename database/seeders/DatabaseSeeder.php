<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Urutan seeder wajib diikuti untuk menjaga konsistensi foreign key:
     *
     * Tier 1 — Master Data (tidak ada dependensi)
     *   RolePermissionSeeder → roles & permissions
     *   AdminUserSeeder      → user admin + route accesses
     *   StaffUsersSeeder     → user staff (manager, writer)
     *   MemberUserSeeder     → user anggota perpustakaan
     *   LanguageSeeder       → tabel languages
     *   CategorySeeder       → tabel categories
     *   PublisherSeeder      → tabel publishers
     *   AuthorsSeeder        → tabel authors
     *   TypeSeeder           → tabel types (digital/fisik)
     *   AnnouncementSeeder   → tabel announcements (jadwal buka perpustakaan)
     *   FineSettingsSeeder   → tabel fine_settings (konfigurasi denda)
     *
     * Tier 2 — Koleksi Buku (butuh Tier 1)
     *   BookSeeder           → tabel books + pivot author_of_books, book_of_types
     *   StockSeeder          → tabel stocks (per buku)
     *   BookOfCategorySeeder → pivot book_of_categories
     *   AssetSeeder          → tabel assets + pivot book_of_assets (buku digital)
     *   LocationOfBooksSeeder→ tabel location_of_books
     *
     * Tier 3 — Konten & Informasi (butuh Tier 1-2)
     *   SocialMediaSeeder        → tabel social_media (polymorphic ke Author)
     *   InformationSeeder        → tabel informations
     *   OnlineResourceSeeder     → tabel online_resources
     *   TestimonialSeeder        → tabel testimonials
     *   EventSeeder              → tabel events
     *   OrganizationMemberSeeder → tabel organization_members
     *
     * Tier 4 — Transaksi Peminjaman (butuh Tier 1-2)
     *   LoanFlowSeeder       → tabel loans + loan_details (anggota meminjam buku)
     *   ReturnBookSeeder     → tabel return_books
     *   ReturnBookChecksSeeder → tabel return_book_checks
     *   FineSeeder           → tabel fines (denda keterlambatan)
     *   ReviewBookSeeder     → tabel review_books (ulasan buku)
     *   BookmarkSeeder       → pivot bookmarks
     *   VisitSeeder          → tabel visits
     */
    public function run(): void
    {
        $this->call([
            // ── Tier 1: Master Data ───────────────────────────────────────
            RolePermissionSeeder::class,
            AdminUserSeeder::class,
            StaffUsersSeeder::class,
            MemberUserSeeder::class,
            LanguageSeeder::class,
            CategorySeeder::class,
            PublisherSeeder::class,
            AuthorsSeeder::class,
            TypeSeeder::class,
            AnnouncementSeeder::class,
            FineSettingsSeeder::class,

            // ── Tier 2: Koleksi Buku ──────────────────────────────────────
            BookSeeder::class,
            StockSeeder::class,
            BookOfCategorySeeder::class,
            AssetSeeder::class,
            LocationOfBooksSeeder::class,

            // ── Tier 3: Konten & Informasi ───────────────────────────────
            SocialMediaSeeder::class,
            InformationSeeder::class,
            OnlineResourceSeeder::class,
            TestimonialSeeder::class,
            EventSeeder::class,
            OrganizationMemberSeeder::class,

            // ── Tier 4: Transaksi Peminjaman ─────────────────────────────
            LoanFlowSeeder::class,
            ReturnBookSeeder::class,
            ReturnBookChecksSeeder::class,
            FineSeeder::class,
            ReviewBookSeeder::class,
            BookmarkSeeder::class,
            VisitSeeder::class,
        ]);
    }
}
