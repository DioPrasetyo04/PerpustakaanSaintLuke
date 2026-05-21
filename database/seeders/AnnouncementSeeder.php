<?php

namespace Database\Seeders;

use App\Enums\Days;
use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    public function run(): void
    {
        $announcements = [
            [
                'days'        => Days::MONDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Selamat datang di Perpustakaan Saint Luke! Hari Senin perpustakaan kami buka untuk melayani kebutuhan literasi Anda. Koleksi buku terbaru telah tersedia — jangan ragu untuk meminjam dan memperluas wawasan Anda.</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '16:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::TUESDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Hari Selasa perpustakaan kami siap melayani Anda! Nikmati suasana membaca yang nyaman dan temukan koleksi buku terbaik kami. Program bimbingan membaca untuk siswa TK hingga SMA tersedia setiap hari Selasa.</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '16:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::WEDNESDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Selamat datang di hari Rabu! Perpustakaan Saint Luke hadir untuk mendukung semangat belajar Anda. Hari ini ada sesi diskusi buku dan rekomendasi bacaan pilihan dari tim pustakawan kami.</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '16:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::THURSDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Kamis yang produktif dimulai dari Perpustakaan Saint Luke! Manfaatkan fasilitas perpustakaan digital kami untuk mengakses e-book dan sumber belajar daring. Staf kami siap membantu pencarian koleksi.</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '16:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::FRIDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Hari Jumat, perpustakaan kami tutup lebih awal untuk kegiatan ibadah. Jangan lupa kembalikan buku pinjaman tepat waktu agar tidak dikenakan denda. Selamat beribadah dan selamat berakhir pekan!</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '12:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::SATURDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Sabtu ceria bersama Perpustakaan Saint Luke! Hari ini perpustakaan buka dengan jam lebih singkat. Manfaatkan waktu Anda untuk membaca buku favorit atau mengajak keluarga menikmati koleksi kami.</p>',
                'photo'       => null,
                'open_time'   => '08:00:00',
                'close_time'  => '13:00:00',
                'is_active'   => true,
            ],
            [
                'days'        => Days::SUNDAY->value,
                'title'       => 'Announcement Perpustakaan',
                'description' => '<p>Perpustakaan Saint Luke <strong>tutup pada hari Minggu</strong>. Nikmati hari istirahat Anda bersama keluarga. Kami akan kembali melayani Anda mulai hari Senin. Sampai jumpa!</p>',
                'photo'       => null,
                'open_time'   => '00:00:00',
                'close_time'  => '00:00:00',
                'is_active'   => false,
            ],
        ];

        foreach ($announcements as $data) {
            Announcement::updateOrCreate(
                ['days' => $data['days']],
                $data,
            );
        }
    }
}
