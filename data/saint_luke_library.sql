-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2026 at 06:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saint_luke_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `days` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu') NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `days`, `title`, `description`, `photo`, `open_time`, `close_time`, `is_active`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Senin', 'Announcement Perpustakaan', '<p><strong>Jadwal Buka Perpustakaan Senin:<br>Buka: 07.00 WIB (Pagi)<br>Tutup: 13.00 WIB (Siang)</strong></p>', 'announcements/01KTVBBCGZEPBAN17GHFQ79226.jpeg', '07:00:00', '15:00:00', 1, NULL, '2026-06-11 12:43:41', '2026-06-11 12:43:41'),
(2, 'Selasa', 'Announcement Perpustakaan', '<p><strong>Jadwal Perpustakaan Hari Selasa:</strong><br><strong>Buka: 07.00 WIB (Pagi)</strong><br><strong>Tutup: 13.00 WIB (Sore)</strong></p>', 'announcements/01KTVBE0WTBAE9161YVXA61R1T.png', '07:00:00', '15:00:00', 1, NULL, '2026-06-11 12:45:07', '2026-06-11 12:45:07'),
(3, 'Kamis', 'Announcement Perpustakaan', '<p><strong>Jadwal Perpustakaan Hari Kamis:</strong><br><strong>Buka: 07.00 WIB (Pagi)</strong><br><strong>Tutup: 15.00 WIB (Sore)</strong></p>', 'announcements/01KTVBGGJ19X8VRQS3MDWR9H46.png', '07:00:00', '15:00:00', 1, NULL, '2026-06-11 12:46:29', '2026-06-11 12:46:29'),
(4, 'Jumat', 'Announcement Perpustakaan', '<p>Perpustakaan Buka Pukul 08.00 WIB</p>', 'announcements/01KX55XA42WBNM1YR9WX7195PJ.png', '08:00:00', '15:00:00', 1, NULL, '2026-07-10 04:52:25', '2026-07-10 04:52:25');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('Asset-File','Asset-Resources') DEFAULT NULL,
  `utility_path` varchar(255) DEFAULT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `type`, `utility_path`, `pdf_path`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Asset-File', 'books/assets/01KTVEXBK3KKFMKPMEXBSEJF81.pdf', NULL, 'Ready', '2026-06-11 03:18:05', '2026-06-11 13:45:56'),
(2, 'Asset-Resources', 'books/assets/01KTVEXBKPYW6787K11T84H30E.mp3', NULL, 'Ready', '2026-06-11 03:18:06', '2026-06-11 13:45:56'),
(3, 'Asset-File', 'books/assets/01KTTR7T0PE9DAWGM1PVGCR5X3.pdf', NULL, NULL, '2026-06-11 07:09:41', '2026-06-11 07:09:41'),
(4, 'Asset-File', 'books/assets/01KTV16WBAGXD69RDGME7GNQFP.docx', 'books/converted/01KTV16WBAGXD69RDGME7GNQFP.pdf', 'Ready', '2026-06-11 09:46:28', '2026-06-27 20:53:02'),
(5, 'Asset-File', 'books/assets/01KTVG2TV8GFRVYQ5V2S89RCER.pdf', NULL, 'Ready', '2026-06-11 14:06:24', '2026-06-11 14:10:55'),
(6, 'Asset-File', 'books/assets/01KTX2KMQN76G442DKDSCTYGB5.docx', 'books/converted/01KTX2KMQN76G442DKDSCTYGB5.pdf', 'Ready', '2026-06-12 04:49:23', '2026-06-12 08:28:56'),
(7, 'Asset-Resources', 'books/assets/01KTX2TEBPMSMR3H12YA9G9CTE.jpg', NULL, 'Ready', '2026-06-12 04:53:06', '2026-06-12 04:56:45'),
(8, 'Asset-Resources', 'books/assets/01KVC91P76VAKRJ03ADAJDYSKJ.webp', NULL, NULL, '2026-06-18 02:30:32', '2026-06-18 02:30:32'),
(9, 'Asset-Resources', 'books/assets/01KX4ZPJWM65GPNER65HC6CJM7.png', NULL, 'Ready', '2026-07-10 03:03:53', '2026-07-10 03:29:48'),
(10, 'Asset-File', 'books/assets/01KXNJWJ43BJB5Z1BEMFX89E65.docx', NULL, NULL, '2026-07-16 13:47:03', '2026-07-16 13:47:03'),
(11, 'Asset-Resources', 'books/assets/01KXNJWJ4KM7B6RR378KMGW3WW.png', NULL, NULL, '2026-07-16 13:47:03', '2026-07-16 13:47:03'),
(12, 'Asset-File', 'books/assets/01KXNPE8H8C35BBBG4Y9EMJH8M.docx', 'books/converted/01KXNPE8H8C35BBBG4Y9EMJH8M.pdf', 'Ready', '2026-07-16 14:49:08', '2026-07-16 14:49:53'),
(13, 'Asset-File', 'books/assets/01KXQ0X4HCQ108MJKD91NSP09G.docx', NULL, NULL, '2026-07-17 03:11:16', '2026-07-17 03:11:16'),
(14, 'Asset-Resources', 'books/assets/01KXQ0X4HNHSE12AAPEV2SJD0Y.png', NULL, NULL, '2026-07-17 03:11:16', '2026-07-17 03:11:16');

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('Laki-laki','Perempuan') DEFAULT 'Laki-laki',
  `date_of_birth` date DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `username`, `phone`, `gender`, `date_of_birth`, `nationality`, `avatar`, `bio`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 'Nazarudin', 'nazarudin295', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-10 17:35:57', '2026-06-10 17:35:57'),
(2, 'Nazar', 'nazar229', NULL, NULL, NULL, NULL, NULL, '<p></p>', '2026-06-10 17:00:00', '2026-06-10 18:00:30', '2026-06-10 18:00:30'),
(3, 'Drs. Budi Suhono', 'drs._budi_suhono626', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(4, 'H. Martin', 'h._martin938', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(5, 'Prof. Drs. Radiopoetra', 'prof._drs._radiopoetra741', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(6, 'Renni Diastuti', 'renni_diastuti799', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(7, 'Fictor Ferdinand P. dkk', 'fictor_ferdinand_p._dkk637', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(8, 'Bob Foster', 'bob_foster109', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(9, 'Diah Aryulina dkk', 'diah_aryulina_dkk305', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(10, 'Deswaty Furqonita', 'deswaty_furqonita522', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(11, 'Slamet Prawirohhartono', 'slamet_prawirohhartono731', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(12, 'Drs. Gordo Mikrodo', 'drs._gordo_mikrodo405', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(13, 'Irene Maria Juli Astut', 'irene_maria_juli_astut935', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(14, 'dkk', 'dkk434', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(15, 'Hilda Karli', 'hilda_karli581', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(16, 'Angi St. Anggari', 'angi_st._anggari547', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(17, 'Wini Kristianti', 'wini_kristianti366', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(18, 'Fransiska A Susilawati', 'fransiska_a_susilawati366', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(19, 'Tom dkk', 'tom_dkk280', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(20, 'Michael Foreman', 'michael_foreman134', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(21, 'Eric Kincaid', 'eric_kincaid672', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(22, 'Stanley dkk', 'stanley_dkk847', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(23, 'Spencer Strange dkk.', 'spencer_strange_dkk.705', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(24, 'Mary Packard dkk.', 'mary_packard_dkk.265', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(25, 'Andrew Griffin', 'andrew_griffin613', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(26, 'Anne Marie Dalmais', 'anne_marie_dalmais250', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(27, 'Lucia Triundari', 'lucia_triundari645', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(28, 'Widi Krastawan', 'widi_krastawan498', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(29, 'Betty Birney', 'betty_birney400', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(30, 'Lynn Wilson', 'lynn_wilson391', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(31, 'David Bedford', 'david_bedford125', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(32, 'Preeta Vyas', 'preeta_vyas774', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(33, 'Per Christiansen', 'per_christiansen299', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(34, 'H. Witdarmono', 'h._witdarmono807', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(35, 'Covin Lumban Gaol', 'covin_lumban_gaol592', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(36, 'O.Carm', 'o.carm224', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(37, 'R. Sugihartanto', 'r._sugihartanto143', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(38, 'Anne de Graaf', 'anne_de_graaf543', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(39, 'Jose Perez Montero', 'jose_perez_montero792', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(40, 'Thomas h. Tobin', 'thomas_h._tobin196', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(41, 'Mahapandita Khemanyana', 'mahapandita_khemanyana495', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(42, 'Eddy Kristiyanto', 'eddy_kristiyanto610', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(43, 'Agustinus Gianto', 'agustinus_gianto865', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(44, 'Julius Kardinal Darmaatmadja', 'julius_kardinal_darmaatmadja776', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(45, 'Raja Oloan tumanggor', 'raja_oloan_tumanggor400', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(46, 'Agnes Widyanti', 'agnes_widyanti594', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(47, 'Tim Gray', 'tim_gray738', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(48, 'Dorothy Day', 'dorothy_day690', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(49, 'Albertus Sujoko', 'albertus_sujoko538', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(50, 'Zaim El Mubarok', 'zaim_el_mubarok535', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(51, 'Singgih Santosa', 'singgih_santosa493', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(52, 'Siswanto', 'siswanto963', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(53, 'Bayu Pratama', 'bayu_pratama545', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(54, 'Onno W. Purbo', 'onno_w._purbo693', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(55, 'Saruri', 'saruri480', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(56, 'Lucita Triundari', 'lucita_triundari385', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(57, 'Yannis Stephanides', 'yannis_stephanides809', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(58, 'Siti Badriyah Rushayati', 'siti_badriyah_rushayati224', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(59, 'Kiki Anggraini', 'kiki_anggraini366', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(60, 'E.K.S. Harini Muntasib', 'e.k.s._harini_muntasib984', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(61, 'Judith Miller', 'judith_miller320', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(62, 'Sumarah Adhyatman', 'sumarah_adhyatman872', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(63, 'S.S. Vainker', 's.s._vainker889', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(64, 'Santoso Soegondho', 'santoso_soegondho440', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(65, 'Anggota IKAPI', 'anggota_ikapi570', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(66, 'Harry Gon', 'harry_gon975', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(67, 'Gunawan', 'gunawan824', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(68, 'Tuyet Nguyet', 'tuyet_nguyet381', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(69, 'A. Iskandarsjah Latief', 'a._iskandarsjah_latief867', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(70, 'Nuryadi', 'nuryadi570', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(71, 'Pustaka Bahasa Asing', 'pustaka_bahasa_asing110', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(72, 'Tim Perkamusan : Universitas Peking', 'tim_perkamusan_:_universitas_peking125', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(73, 'Yuniar Istiyani', 'yuniar_istiyani706', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(74, 'LBM Sino', 'lbm_sino872', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(75, 'Maryanto', 'maryanto710', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(76, 'Joana Kosta', 'joana_kosta983', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(77, 'Garan Holcombe', 'garan_holcombe438', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(78, 'Niki Joseph', 'niki_joseph793', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(79, 'Nurhadi', 'nurhadi220', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(80, 'Agus Trianto', 'agus_trianto165', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(81, 'Titik Harsiati', 'titik_harsiati697', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(82, 'E. Koasasih', 'e._koasasih935', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(83, 'Paul A. Samuelson', 'paul_a._samuelson207', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(84, 'Sukardi', 'sukardi231', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(85, 'Alam S.', 'alam_s.480', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(86, 'Rusdarti', 'rusdarti795', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(87, 'Catherine Coucom', 'catherine_coucom119', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(88, 'Gary Skinner', 'gary_skinner220', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(89, 'et al', 'et_al696', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(90, 'Dwi A. listiyani', 'dwi_a._listiyani729', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(91, 'Ratna Hapsari', 'ratna_hapsari854', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(92, 'Wardaya', 'wardaya382', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(93, 'Suad Husnan', 'suad_husnan662', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(94, 'Sudarsono', 'sudarsono477', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(95, 'Christopher Pass', 'christopher_pass929', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(96, 'Budiyanto', 'budiyanto382', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(97, 'Yusnawan Lubis', 'yusnawan_lubis481', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(98, 'Sri Sudarmi', 'sri_sudarmi326', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(99, 'Dra. Kun  Maryati', 'dra._kun_maryati120', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(100, 'Sumadi', 'sumadi177', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(101, 'Bagja Waluya', 'bagja_waluya122', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(102, 'Danang Endarto', 'danang_endarto401', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(103, 'Bambang Utoyo', 'bambang_utoyo152', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(104, 'Pabundu Tika', 'pabundu_tika178', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(105, 'Alicia Brown', 'alicia_brown498', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(106, 'Donatus A. Nogroho', 'donatus_a._nogroho417', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(107, 'Umi A. Fananie', 'umi_a._fananie178', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(108, 'Elisabeth Kubler-Ross', 'elisabeth_kubler-ross255', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(109, 'Dirgantara Sedaya', 'dirgantara_sedaya679', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(110, 'Richard Templar', 'richard_templar458', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(111, 'Cristopher Gleeson', 'cristopher_gleeson540', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(112, 'Anand Krishna', 'anand_krishna214', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(113, 'Wallace D. Wattles', 'wallace_d._wattles265', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(114, 'James A. Ray', 'james_a._ray450', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(115, 'Mike Dooley', 'mike_dooley293', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(116, 'Richard Carlson', 'richard_carlson715', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(117, 'Dr. Margareth Asley', 'dr._margareth_asley907', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(118, 'Yance Chan', 'yance_chan417', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(119, 'Eni Setiati', 'eni_setiati363', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(120, 'Nanang Qosim Yusuf', 'nanang_qosim_yusuf925', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(121, 'Reymond Buckland', 'reymond_buckland402', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(122, 'Herman Musakabe', 'herman_musakabe941', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(123, 'Caro Handley', 'caro_handley461', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(124, 'Utami Munandar', 'utami_munandar461', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(125, 'Kathy Buckworth', 'kathy_buckworth487', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(126, 'T. Berry Brazleton', 't._berry_brazleton774', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(127, 'Dr. Sylvia Rim', 'dr._sylvia_rim829', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(128, 'Deni Karsana', 'deni_karsana934', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(129, 'Timothy S. Stuart', 'timothy_s._stuart358', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(130, 'Irene Maria Juli Astuti', 'irene_maria_juli_astuti515', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(131, 'Utami Widiati', 'utami_widiati143', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(132, 'Aberson M. Sihaloho', 'aberson_m._sihaloho857', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(133, 'Edy Budiyarso', 'edy_budiyarso218', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(134, 'Abdurrahman Wahid', 'abdurrahman_wahid831', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(135, 'Marwati D.P', 'marwati_d.p238', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(136, 'Iman Toto K. Rahardjo', 'iman_toto_k._rahardjo898', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(137, 'H. Rosihab Anwar', 'h._rosihab_anwar156', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(138, 'H. Mangil Martowidjojo', 'h._mangil_martowidjojo139', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(139, 'Th. M. Sandarwati', 'th._m._sandarwati706', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(140, 'Joko Priyana', 'joko_priyana773', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(141, 'Marian Cox', 'marian_cox657', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(142, 'Graham Elsdon', 'graham_elsdon684', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(143, 'Saeful Karim', 'saeful_karim804', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(144, 'Agung Sulistyono', 'agung_sulistyono868', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(145, 'Siti Zubaidah', 'siti_zubaidah481', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(146, 'Agus Triyono', 'agus_triyono997', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(147, 'Wahono Widodo', 'wahono_widodo803', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(148, 'Peter D Riley', 'peter_d_riley516', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(149, 'Supardianningsih', 'supardianningsih734', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(150, 'Sumantoro', 'sumantoro939', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(151, 'Haryanto', 'haryanto320', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(152, 'Tim Bina Karya Guru', 'tim_bina_karya_guru853', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(153, 'Tim Cipta Prestasi Prima', 'tim_cipta_prestasi_prima742', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(154, 'Ita Syuri', 'ita_syuri713', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(155, 'Bill Handley', 'bill_handley452', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(156, 'Abdur Rahman As\'ari', 'abdur_rahman_as\'ari626', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(157, 'M. Cholik A.', 'm._cholik_a.219', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(158, 'Kurniawan', 'kurniawan505', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(159, 'Muhamad Rohmadi', 'muhamad_rohmadi304', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(160, 'Wes Magee', 'wes_magee969', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(161, 'Celia Warren', 'celia_warren583', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(162, 'Anne Faundez', 'anne_faundez534', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(163, 'Disney Enterprises', 'disney_enterprises538', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(164, 'Mathias Hariyadi', 'mathias_hariyadi614', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(165, 'Benny Rachmadi', 'benny_rachmadi139', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(166, 'Muhammad M. misrad', 'muhammad_m._misrad981', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(167, 'Marcy Kelman', 'marcy_kelman483', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(168, 'PAWS', 'paws148', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(169, 'Alain Jost', 'alain_jost624', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(170, 'Kim Shin-Joong', 'kim_shin-joong385', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(171, 'Aaron Jolly', 'aaron_jolly219', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(172, 'et al.', 'et_al.897', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(173, 'Jose L. Morales', 'jose_l._morales185', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(174, 'Laura Miller', 'laura_miller889', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(175, 'Caroline Nixon', 'caroline_nixon575', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(176, 'Liana Robinson', 'liana_robinson351', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(177, 'Mary Tomlain', 'mary_tomlain546', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(178, 'Linnette A. Erocak', 'linnette_a._erocak124', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(179, 'Mario Herrera', 'mario_herrera914', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(180, 'Jhon Wiltshier', 'jhon_wiltshier849', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(181, 'F.X Dapiyanta', 'f.x_dapiyanta557', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(182, 'RD Stefanus T. Prasetyo', 'rd_stefanus_t._prasetyo770', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(183, 'Cung M. Ciao', 'cung_m._ciao775', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(184, 'Sri Artini', 'sri_artini759', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(185, 'Elia Setiana', 'elia_setiana316', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(186, 'Nam Chunja', 'nam_chunja368', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(187, 'Jeanette L - Clark', 'jeanette_l_-_clark887', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(188, 'Nur Zaida', 'nur_zaida371', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(189, 'Dra. Rita Kurniawan dkk', 'dra._rita_kurniawan_dkk493', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(190, 'A.Indradi', 'a.indradi681', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(191, 'M.Pd', 'm.pd499', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(192, 'Zhou Huiyan', 'zhou_huiyan190', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(193, 'at al', 'at_al138', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(194, 'Pinyin', 'pinyin207', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(195, 'Tim Indonesia Maritime', 'tim_indonesia_maritime760', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(196, 'Charles Dickens', 'charles_dickens513', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(197, 'Victor Hugo', 'victor_hugo152', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(198, 'Marion Bradley', 'marion_bradley756', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(199, 'Frank Muir', 'frank_muir962', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(200, 'Clive Cussler', 'clive_cussler831', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(201, 'Sir Arthur Conan Doyle', 'sir_arthur_conan_doyle198', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(202, 'Martin A. Miller', 'martin_a._miller488', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(203, 'P.G. Wodehose', 'p.g._wodehose557', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(204, 'Frederick Forsyth', 'frederick_forsyth564', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(205, 'Kathy Wollard', 'kathy_wollard986', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(206, 'Helen Charpman', 'helen_charpman653', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(207, 'Lee Kwang Woong', 'lee_kwang_woong569', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(208, 'Larry Gonick', 'larry_gonick995', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(209, 'Kim Rin', 'kim_rin700', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(210, 'Kim Seok-Ho', 'kim_seok-ho300', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(211, 'Karla M. Nashar', 'karla_m._nashar824', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(212, 'Ilana Tan', 'ilana_tan269', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(213, 'Neil Gaiman', 'neil_gaiman776', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(214, 'Andrea Hirata', 'andrea_hirata865', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(215, 'Robert Galbraith', 'robert_galbraith679', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(216, 'Philip Pullman', 'philip_pullman189', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(217, 'Stephenie Meyer', 'stephenie_meyer879', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(218, 'Hiromi Mashiba', 'hiromi_mashiba549', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(219, 'Kimiko Uehara', 'kimiko_uehara952', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(220, 'Kitagawa Miyuki', 'kitagawa_miyuki921', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(221, 'Megumi Mizusawa', 'megumi_mizusawa932', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(222, 'Watase Yuu', 'watase_yuu853', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(223, 'Asuka Sasada', 'asuka_sasada618', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(224, 'Ono Eriko', 'ono_eriko918', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(225, 'Enid Blyton', 'enid_blyton762', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(226, 'Washio Mie', 'washio_mie651', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(227, 'Nagisa Yuu', 'nagisa_yuu815', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(228, 'Chiaki Karasawa', 'chiaki_karasawa136', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(229, 'Atsuko Namba', 'atsuko_namba310', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(230, 'Akaihi Michiyo', 'akaihi_michiyo840', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(231, 'Reiko Momochi', 'reiko_momochi119', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(232, 'Bambang K. Karnoto', 'bambang_k._karnoto568', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(233, 'Marthen Kanginan', 'marthen_kanginan982', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(234, 'M. Cholik Adinawan', 'm._cholik_adinawan243', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(235, 'Subroto Rahardjo', 'subroto_rahardjo796', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(236, 'Agung S. Nugroho', 'agung_s._nugroho353', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(237, 'Khilya Fa\'izia', 'khilya_fa\'izia501', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(238, 'Nugroho Notosusanto', 'nugroho_notosusanto978', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(239, 'A. Yani', 'a._yani813', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(240, 'Dai Sijie', 'dai_sijie343', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(241, 'Steve Lopez', 'steve_lopez349', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(242, 'Ursula K.Le Guin', 'ursula_k.le_guin509', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(243, 'Roald Dahl', 'roald_dahl797', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(244, 'Alice Sebold', 'alice_sebold627', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(245, 'Scott Adams', 'scott_adams622', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(246, 'Mortimer J. Adler', 'mortimer_j._adler761', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(247, 'Lucy M. Montgomery', 'lucy_m._montgomery611', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(248, 'Ann M. Martin', 'ann_m._martin132', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(249, 'Henry Fielding', 'henry_fielding887', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(250, 'M.M Kaye', 'm.m_kaye166', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(251, 'James Herriot\'s', 'james_herriot\'s209', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(252, 'Larry Shapiro', 'larry_shapiro623', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(253, 'Arnold Lobel', 'arnold_lobel682', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(254, 'Walt Disney\'s', 'walt_disney\'s267', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(255, 'TIM', 'tim956', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(256, 'Theo Ledieg', 'theo_ledieg154', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(257, 'Disney', 'disney792', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(258, 'Wilbur Smith', 'wilbur_smith861', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(259, 'Jeffrey Archer', 'jeffrey_archer185', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(260, 'Natzir Said', 'natzir_said155', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(261, 'Susanna Ronchi', 'susanna_ronchi174', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(262, 'Parni Hadi', 'parni_hadi435', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(263, 'Menglong Feng', 'menglong_feng302', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(264, 'Marwati Djoened Poesponegoro', 'marwati_djoened_poesponegoro330', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(265, 'Haley Alex', 'haley_alex628', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(266, 'Cookson Catrerin', 'cookson_catrerin113', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(267, 'Andrei Aksana', 'andrei_aksana763', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(268, 'Chin Ning Chu', 'chin_ning_chu784', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(269, 'Wolff Virginia Euwer', 'wolff_virginia_euwer116', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(270, 'Hamlin Alan Michael', 'hamlin_alan_michael515', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(271, 'Fitzgerald Scott', 'fitzgerald_scott812', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(272, 'Forster E.M', 'forster_e.m447', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(273, 'Masashi Ueda', 'masashi_ueda561', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(274, 'Fujiko.F. Fujio', 'fujiko.f._fujio337', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(275, 'Falconer Colin', 'falconer_colin260', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(276, 'Brown Dan', 'brown_dan765', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(277, 'Haring Bernhard', 'haring_bernhard676', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(278, 'Rimm Sylvia', 'rimm_sylvia576', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(279, 'Maskalyk James', 'maskalyk_james979', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(280, 'Gibbs Abigail', 'gibbs_abigail116', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(281, 'Bawazier Fathi', 'bawazier_fathi393', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(282, 'Golden Arthur', 'golden_arthur438', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(283, 'Collins Jackie', 'collins_jackie972', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(284, 'Falafu', 'falafu979', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(285, 'Gorbachev Michail', 'gorbachev_michail510', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(286, 'Jahja Junus', 'jahja_junus370', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(287, 'Waringin Tung Desem', 'waringin_tung_desem863', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(288, 'Har Yap Ban', 'har_yap_ban349', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(289, 'Wyckof Jerry', 'wyckof_jerry835', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(290, 'et.al', 'et.al258', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(291, 'Kennedy Marilyn', 'kennedy_marilyn483', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(292, 'Fam', 'fam498', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(293, 'Iva Yuliana', 'iva_yuliana249', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(294, 'Bao Vincent', 'bao_vincent463', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(295, 'Soetoprawiro Koerniatmanto', 'soetoprawiro_koerniatmanto273', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(296, 'Budiman Dr. Arief', 'budiman_dr._arief827', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(297, 'Fiske Edward B.', 'fiske_edward_b.401', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(298, 'A. Prasetyantoko', 'a._prasetyantoko490', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(299, 'Emaha Yudhistira', 'emaha_yudhistira824', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(300, 'Martina Anna', 'martina_anna946', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(301, 'Indah Nurdiana', 'indah_nurdiana513', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(302, 'Devar', 'devar425', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(303, 'Malam John', 'malam_john694', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(304, 'Morley Jacqeline', 'morley_jacqeline351', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(305, 'Hicks Peter', 'hicks_peter417', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(306, 'Graham Ian', 'graham_ian537', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(307, 'Langley Andrew', 'langley_andrew846', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(308, 'Somar Lambertus', 'somar_lambertus223', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(309, 'Joko Budi Susanto', 'joko_budi_susanto989', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(310, 'Subchan', 'subchan614', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(311, 'Khafid M.', 'khafid_m.284', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(312, 'Rosihan A.Y', 'rosihan_a.y410', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(313, 'Sutrima', 'sutrima304', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(314, 'Sri Rernanigsih', 'sri_rernanigsih873', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(315, 'Ueda Masashi', 'ueda_masashi756', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(316, 'Siti Wachidah', 'siti_wachidah235', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(317, 'Cox Marian', 'cox_marian767', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(318, 'Suzuki Shinichi', 'suzuki_shinichi791', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(319, 'Mann Richard', 'mann_richard480', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(320, 'Jhonson Spencer', 'jhonson_spencer373', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(321, 'Chand S.', 'chand_s.631', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(322, 'Demaria Rusal', 'demaria_rusal611', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36');
INSERT INTO `authors` (`id`, `name`, `username`, `phone`, `gender`, `date_of_birth`, `nationality`, `avatar`, `bio`, `verified_at`, `created_at`, `updated_at`) VALUES
(323, 'Mstthews Andrew', 'mstthews_andrew901', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(324, 'Kuroyanagi Tetsuko', 'kuroyanagi_tetsuko910', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(325, 'Rojonay Lisa', 'rojonay_lisa580', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(326, 'Pradipta Gianti', 'pradipta_gianti976', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(327, 'Oliver Jane', 'oliver_jane873', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(328, 'Tillu Meg', 'tillu_meg777', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(329, 'Musakabe Herman', 'musakabe_herman563', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(330, 'Oldfield Tom', 'oldfield_tom901', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(331, 'Susilo Leo J.', 'susilo_leo_j.256', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(332, 'Magnais Franz', 'magnais_franz513', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(333, 'Packard', 'packard785', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(334, 'Snell Nigel', 'snell_nigel973', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(335, 'kristy wyer', 'kristy_wyer753', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(336, 'Krishnasamy Shayna', 'krishnasamy_shayna332', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(337, 'Dahl Roald', 'dahl_roald909', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(338, 'Tan Ilana', 'tan_ilana640', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(339, 'Novianti Irma', 'novianti_irma384', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(340, 'Clavell\'s James', 'clavell\'s_james214', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(341, 'Chang Jung', 'chang_jung655', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(342, 'Rutherfurt Edward', 'rutherfurt_edward920', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(343, 'Krantz Judith', 'krantz_judith901', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(344, 'Listyowati Anies', 'listyowati_anies528', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(345, 'Stierle Cynthia', 'stierle_cynthia616', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(346, 'Higginson Sheila Sweeny', 'higginson_sheila_sweeny882', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(347, 'Matheis Mickie', 'matheis_mickie118', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(348, 'Driggs Scout', 'driggs_scout806', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(349, 'Kristiani Dian', 'kristiani_dian460', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(350, 'Kasri M. Khafid', 'kasri_m._khafid492', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(351, 'Surya Yohanes', 'surya_yohanes894', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(352, 'Purnomo Eko', 'purnomo_eko759', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(353, 'Paresti Suci', 'paresti_suci946', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(354, 'Kristiani Wini', 'kristiani_wini431', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(355, 'Dinara', 'dinara800', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(356, 'Handayani Dian', 'handayani_dian712', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(357, 'Howard Linda', 'howard_linda217', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(358, 'Khrisna Brian', 'khrisna_brian650', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(359, 'Ninkzichtheea', 'ninkzichtheea650', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(360, 'Du Shirley', 'du_shirley671', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(361, 'Yusma Ranti', 'yusma_ranti186', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(362, 'Indrawahyuni', 'indrawahyuni189', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(363, 'Nelson Charlies', 'nelson_charlies912', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(364, 'Sari Septi Nofia', 'sari_septi_nofia843', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(365, 'Dewi Mega', 'dewi_mega844', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(366, 'Yuliani Kusumadewi', 'yuliani_kusumadewi447', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(367, 'West Cindy', 'west_cindy605', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(368, 'Hastuti Erni', 'hastuti_erni854', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(369, 'David Erika', 'david_erika740', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(370, 'Bridwell Norman', 'bridwell_norman225', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(371, 'Amerikaner Susan', 'amerikaner_susan809', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(372, 'Laurie', 'laurie270', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(373, 'Jeunesse Hachette', 'jeunesse_hachette203', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(374, 'Rantissi M.', 'rantissi_m.115', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(375, 'Hendyar Ambar', 'hendyar_ambar352', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(376, 'Anggraeni Atik Dian', 'anggraeni_atik_dian513', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(377, 'Wohnoutka Mike', 'wohnoutka_mike301', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(378, 'Weinberger Kimberly', 'weinberger_kimberly234', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(379, 'S.S Sisilia', 's.s_sisilia546', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(380, 'Raksanagara A.', 'raksanagara_a.305', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(381, 'Budhi Setya Wono', 'budhi_setya_wono359', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(382, 'Priyanto Nur', 'priyanto_nur317', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(383, 'Darmawan Ardi', 'darmawan_ardi447', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(384, 'Tim EFK', 'tim_efk303', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(385, 'Prameswary Ayu', 'prameswary_ayu420', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(386, 'Darmaatmadja Julius K.', 'darmaatmadja_julius_k.528', NULL, 'Laki-laki', NULL, NULL, NULL, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(387, 'Kak Getri', 'kak_getri966', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 06:55:02', '2026-06-11 06:55:02'),
(388, 'Wallace D. Wattless', 'wallace_d._wattless700', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 06:58:33', '2026-06-11 06:58:33'),
(389, 'Daud Berthus', 'daud_berthus329', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 09:30:28', '2026-06-11 09:30:28'),
(390, 'Daniel', 'daniel232', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 09:50:55', '2026-06-11 09:50:55'),
(391, 'Daniel', 'daniel892', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 09:55:40', '2026-06-11 09:55:40'),
(392, 'Daud', 'daud774', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-11 10:02:24', '2026-06-11 10:02:24'),
(393, 'Mr. X', 'mr._x458', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-06-12 04:45:02', '2026-06-12 04:45:02'),
(394, 'Kairos Bonjour', 'kairos_bonjour867', NULL, 'Laki-laki', NULL, 'ID', NULL, '<p></p>', NULL, '2026-07-10 02:39:03', '2026-07-10 02:39:03'),
(395, 'Penulis 1', 'penulis_1993', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-07-17 03:03:19', '2026-07-17 03:03:19'),
(396, 'Amir Murtako', 'amir_murtako716', NULL, NULL, NULL, NULL, NULL, '<p></p>', NULL, '2026-07-17 03:03:51', '2026-07-17 03:03:51');

-- --------------------------------------------------------

--
-- Table structure for table `author_of_books`
--

CREATE TABLE `author_of_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `author_of_books`
--

INSERT INTO `author_of_books` (`id`, `author_id`, `book_id`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 5, 4),
(5, 6, 5),
(6, 7, 6),
(7, 8, 7),
(8, 9, 8),
(9, 10, 9),
(10, 11, 10),
(11, 12, 11),
(12, 13, 12),
(13, 14, 12),
(14, 15, 13),
(15, 14, 13),
(16, 15, 14),
(17, 14, 14),
(18, 15, 15),
(19, 14, 15),
(20, 15, 16),
(21, 14, 16),
(22, 16, 17),
(23, 14, 17),
(24, 17, 18),
(25, 14, 18),
(26, 17, 19),
(27, 14, 19),
(28, 13, 20),
(29, 14, 20),
(30, 18, 21),
(31, 19, 22),
(32, 20, 23),
(33, 21, 24),
(34, 22, 25),
(35, 23, 26),
(36, 24, 27),
(37, 25, 28),
(38, 26, 29),
(39, 27, 30),
(40, 28, 31),
(41, 29, 32),
(42, 30, 33),
(43, 31, 34),
(44, 32, 35),
(45, 32, 36),
(46, 33, 37),
(47, 34, 38),
(48, 35, 39),
(49, 36, 39),
(50, 35, 40),
(51, 36, 40),
(52, 37, 41),
(53, 38, 42),
(54, 39, 43),
(55, 40, 44),
(56, 41, 45),
(57, 41, 46),
(58, 42, 47),
(59, 43, 48),
(60, 44, 49),
(61, 14, 49),
(62, 45, 50),
(63, 46, 51),
(64, 47, 52),
(65, 48, 53),
(66, 49, 54),
(67, 50, 55),
(68, 51, 56),
(69, 52, 57),
(70, 53, 58),
(71, 14, 58),
(72, 54, 59),
(73, 55, 60),
(74, 56, 61),
(75, 56, 62),
(76, 56, 63),
(77, 56, 64),
(78, 57, 65),
(79, 57, 66),
(80, 57, 67),
(81, 57, 68),
(82, 56, 69),
(83, 56, 70),
(84, 56, 71),
(85, 56, 72),
(86, 58, 73),
(87, 59, 74),
(88, 14, 74),
(89, 60, 75),
(90, 61, 76),
(91, 62, 77),
(92, 63, 78),
(93, 62, 79),
(94, 64, 80),
(95, 65, 81),
(96, 66, 82),
(97, 14, 82),
(98, 62, 83),
(99, 62, 84),
(100, 67, 85),
(101, 68, 86),
(102, 69, 87),
(103, 70, 88),
(104, 14, 88),
(105, 70, 89),
(106, 14, 89),
(107, 71, 90),
(108, 72, 91),
(109, 73, 92),
(110, 14, 92),
(111, 73, 93),
(112, 14, 93),
(113, 74, 94),
(114, 75, 95),
(115, 76, 96),
(116, 14, 96),
(117, 77, 97),
(118, 76, 98),
(119, 14, 98),
(120, 78, 99),
(121, 79, 100),
(122, 14, 100),
(123, 80, 101),
(124, 81, 102),
(125, 14, 102),
(126, 82, 103),
(127, 83, 104),
(128, 84, 105),
(129, 85, 106),
(130, 85, 107),
(131, 85, 108),
(132, 86, 109),
(133, 14, 109),
(134, 87, 110),
(135, 88, 111),
(136, 89, 111),
(137, 90, 112),
(138, 91, 113),
(139, 14, 113),
(140, 92, 114),
(141, 92, 115),
(142, 93, 116),
(143, 94, 117),
(144, 95, 118),
(145, 14, 118),
(146, 96, 119),
(147, 97, 120),
(148, 14, 120),
(149, 97, 121),
(150, 14, 121),
(151, 98, 122),
(152, 14, 122),
(153, 99, 123),
(154, 14, 123),
(155, 99, 124),
(156, 14, 124),
(157, 99, 125),
(158, 14, 125),
(159, 100, 126),
(160, 14, 126),
(161, 101, 127),
(162, 102, 128),
(163, 14, 128),
(164, 103, 129),
(165, 104, 130),
(166, 14, 130),
(167, 105, 131),
(168, 106, 132),
(169, 107, 133),
(170, 108, 134),
(171, 109, 135),
(172, 110, 136),
(173, 111, 137),
(174, 112, 138),
(175, 113, 139),
(176, 114, 140),
(177, 115, 141),
(178, 116, 142),
(179, 117, 143),
(180, 118, 144),
(181, 112, 145),
(182, 112, 146),
(183, 118, 147),
(184, 112, 148),
(185, 119, 149),
(186, 112, 150),
(187, 120, 151),
(188, 121, 152),
(189, 14, 152),
(190, 112, 153),
(191, 122, 154),
(192, 123, 155),
(193, 123, 156),
(194, 124, 157),
(195, 125, 159),
(196, 126, 160),
(197, 127, 161),
(198, 128, 162),
(199, 129, 163),
(200, 130, 164),
(201, 14, 164),
(202, 130, 165),
(203, 14, 165),
(204, 18, 166),
(205, 17, 167),
(206, 14, 167),
(207, 130, 168),
(208, 14, 168),
(209, 131, 169),
(210, 132, 170),
(211, 133, 171),
(212, 134, 172),
(213, 135, 173),
(214, 14, 173),
(215, 135, 174),
(216, 14, 174),
(217, 135, 175),
(218, 14, 175),
(219, 135, 176),
(220, 14, 176),
(221, 136, 177),
(222, 14, 177),
(223, 136, 178),
(224, 14, 178),
(225, 137, 179),
(226, 138, 180),
(227, 139, 181),
(228, 14, 181),
(229, 139, 182),
(230, 14, 182),
(231, 140, 183),
(232, 89, 183),
(233, 141, 184),
(234, 141, 185),
(235, 142, 186),
(236, 89, 186),
(237, 142, 187),
(238, 89, 187),
(239, 142, 188),
(240, 143, 189),
(241, 14, 189),
(242, 144, 190),
(243, 14, 190),
(244, 145, 191),
(245, 14, 191),
(246, 146, 192),
(247, 14, 192),
(248, 145, 193),
(249, 14, 193),
(250, 147, 194),
(251, 14, 194),
(252, 148, 195),
(253, 149, 196),
(254, 14, 196),
(255, 150, 197),
(256, 14, 197),
(257, 151, 198),
(258, 152, 199),
(259, 152, 200),
(260, 153, 201),
(261, 154, 202),
(262, 14, 202),
(263, 154, 203),
(264, 14, 203),
(265, 155, 204),
(266, 156, 205),
(267, 14, 205),
(268, 157, 206),
(269, 157, 207),
(270, 158, 208),
(271, 156, 209),
(272, 14, 209),
(273, 159, 210),
(274, 160, 211),
(275, 161, 212),
(276, 162, 213),
(277, 161, 214),
(278, 163, 215),
(279, 163, 216),
(280, 163, 217),
(281, 163, 218),
(282, 163, 219),
(283, 163, 220),
(284, 163, 221),
(285, 164, 222),
(286, 164, 223),
(287, 164, 224),
(288, 164, 225),
(289, 164, 226),
(290, 164, 227),
(291, 164, 228),
(292, 164, 229),
(293, 164, 230),
(294, 164, 231),
(295, 164, 232),
(296, 165, 233),
(297, 14, 233),
(298, 165, 234),
(299, 165, 235),
(300, 165, 236),
(301, 166, 237),
(302, 167, 238),
(303, 168, 239),
(304, 168, 240),
(305, 169, 241),
(306, 14, 241),
(307, 170, 242),
(308, 171, 243),
(309, 172, 243),
(310, 173, 244),
(311, 173, 245),
(312, 174, 246),
(313, 89, 246),
(314, 175, 247),
(315, 172, 247),
(316, 176, 248),
(317, 177, 249),
(318, 174, 250),
(319, 89, 250),
(320, 171, 251),
(321, 172, 251),
(322, 171, 252),
(323, 172, 252),
(324, 173, 253),
(325, 178, 254),
(326, 172, 254),
(327, 173, 255),
(328, 179, 257),
(329, 180, 258),
(330, 181, 259),
(331, 14, 259),
(332, 182, 260),
(333, 14, 260),
(334, 183, 261),
(335, 184, 262),
(336, 14, 262),
(337, 185, 263),
(338, 186, 264),
(339, 14, 264),
(340, 183, 265),
(341, 185, 266),
(342, 182, 267),
(343, 14, 267),
(344, 187, 268),
(345, 188, 269),
(346, 189, 270),
(347, 176, 271),
(348, 179, 272),
(349, 89, 272),
(350, 152, 273),
(351, 190, 274),
(352, 191, 274),
(353, 152, 275),
(354, 152, 276),
(355, 192, 277),
(356, 193, 277),
(357, 192, 278),
(358, 193, 278),
(359, 194, 279),
(360, 183, 280),
(361, 195, 281),
(362, 91, 282),
(363, 14, 282),
(364, 196, 283),
(365, 197, 284),
(366, 198, 285),
(367, 199, 286),
(368, 200, 287),
(369, 201, 288),
(370, 202, 289),
(371, 89, 289),
(372, 203, 290),
(373, 89, 290),
(374, 204, 291),
(375, 205, 292),
(376, 206, 293),
(377, 207, 294),
(378, 208, 295),
(379, 89, 295),
(380, 208, 296),
(381, 89, 296),
(382, 209, 297),
(383, 209, 298),
(384, 209, 299),
(385, 89, 299),
(386, 170, 300),
(387, 210, 301),
(388, 211, 302),
(389, 212, 303),
(390, 212, 304),
(391, 212, 305),
(392, 213, 306),
(393, 214, 307),
(394, 214, 308),
(395, 214, 309),
(396, 215, 310),
(397, 216, 311),
(398, 217, 312),
(399, 218, 313),
(400, 219, 314),
(401, 220, 315),
(402, 221, 316),
(403, 222, 317),
(404, 223, 318),
(405, 224, 319),
(406, 222, 320),
(407, 225, 321),
(408, 226, 322),
(409, 227, 323),
(410, 228, 324),
(411, 229, 325),
(412, 230, 326),
(413, 231, 327),
(414, 232, 328),
(415, 14, 328),
(416, 233, 329),
(417, 233, 330),
(418, 234, 331),
(419, 14, 331),
(420, 234, 332),
(421, 14, 332),
(422, 184, 333),
(423, 14, 333),
(424, 235, 334),
(425, 236, 335),
(426, 237, 336),
(427, 14, 336),
(428, 238, 337),
(429, 14, 337),
(430, 136, 338),
(431, 14, 338),
(432, 239, 339),
(433, 240, 340),
(434, 241, 341),
(435, 242, 342),
(436, 243, 343),
(437, 244, 344),
(438, 245, 345),
(439, 246, 346),
(440, 89, 346),
(441, 247, 347),
(442, 248, 348),
(443, 249, 349),
(444, 250, 350),
(445, 251, 351),
(446, 252, 352),
(447, 253, 353),
(448, 163, 354),
(449, 254, 355),
(450, 254, 356),
(451, 255, 357),
(452, 163, 358),
(453, 256, 359),
(454, 257, 360),
(455, 257, 361),
(456, 258, 362),
(457, 259, 363),
(458, 260, 364),
(459, 261, 365),
(460, 262, 366),
(461, 14, 366),
(462, 263, 367),
(463, 264, 368),
(464, 265, 369),
(465, 266, 370),
(466, 267, 371),
(467, 268, 372),
(468, 269, 373),
(469, 270, 374),
(470, 271, 375),
(471, 272, 376),
(472, 273, 377),
(473, 274, 378),
(474, 275, 379),
(475, 276, 380),
(476, 277, 381),
(477, 278, 382),
(478, 279, 383),
(479, 280, 384),
(480, 281, 385),
(481, 282, 386),
(482, 283, 387),
(483, 284, 388),
(484, 285, 389),
(485, 286, 390),
(486, 287, 391),
(487, 288, 392),
(488, 288, 393),
(489, 288, 394),
(490, 288, 395),
(491, 289, 396),
(492, 290, 396),
(493, 291, 397),
(494, 290, 397),
(495, 292, 398),
(496, 293, 399),
(497, 255, 400),
(498, 294, 401),
(499, 257, 402),
(500, 257, 403),
(501, 295, 404),
(502, 296, 405),
(503, 297, 406),
(504, 298, 407),
(505, 299, 408),
(506, 300, 409),
(507, 301, 410),
(508, 302, 411),
(509, 303, 412),
(510, 304, 413),
(511, 305, 414),
(512, 306, 415),
(513, 307, 416),
(514, 308, 417),
(515, 309, 418),
(516, 14, 418),
(517, 309, 419),
(518, 14, 419),
(519, 310, 420),
(520, 14, 420),
(521, 311, 421),
(522, 312, 422),
(523, 255, 423),
(524, 313, 424),
(525, 14, 424),
(526, 314, 425),
(527, 14, 425),
(528, 313, 426),
(529, 14, 426),
(530, 315, 427),
(531, 315, 428),
(532, 316, 429),
(533, 317, 430),
(534, 317, 431),
(535, 255, 432),
(536, 318, 433),
(537, 319, 434),
(538, 320, 435),
(539, 321, 436),
(540, 257, 437),
(541, 322, 438),
(542, 323, 439),
(543, 324, 440),
(544, 325, 441),
(545, 326, 442),
(546, 327, 443),
(547, 328, 444),
(548, 315, 445),
(549, 329, 446),
(550, 330, 447),
(551, 331, 448),
(552, 14, 448),
(553, 332, 449),
(554, 14, 449),
(555, 333, 451),
(556, 334, 452),
(557, 335, 453),
(558, 336, 454),
(559, 337, 455),
(560, 338, 456),
(561, 339, 457),
(562, 340, 458),
(563, 341, 459),
(564, 342, 460),
(565, 343, 461),
(566, 344, 462),
(567, 345, 463),
(568, 346, 464),
(569, 347, 465),
(570, 257, 466),
(571, 348, 467),
(572, 349, 468),
(573, 346, 469),
(574, 311, 470),
(575, 89, 470),
(576, 350, 471),
(577, 14, 471),
(578, 351, 472),
(579, 351, 473),
(580, 351, 474),
(581, 352, 475),
(582, 14, 475),
(583, 352, 476),
(584, 14, 476),
(585, 353, 477),
(586, 14, 477),
(587, 354, 478),
(588, 14, 478),
(589, 355, 479),
(590, 356, 480),
(591, 357, 481),
(592, 358, 482),
(593, 356, 483),
(594, 359, 484),
(595, 360, 485),
(596, 361, 486),
(597, 362, 487),
(598, 363, 488),
(599, 364, 489),
(600, 364, 490),
(601, 365, 491),
(602, 257, 492),
(603, 366, 493),
(604, 367, 494),
(605, 368, 495),
(606, 369, 496),
(607, 370, 497),
(608, 371, 498),
(609, 372, 499),
(610, 193, 499),
(611, 373, 500),
(612, 374, 501),
(613, 375, 502),
(614, 376, 503),
(615, 377, 504),
(616, 378, 505),
(617, 379, 506),
(618, 380, 507),
(619, 380, 508),
(620, 380, 509),
(621, 381, 510),
(622, 311, 511),
(623, 14, 511),
(624, 313, 512),
(625, 14, 512),
(626, 257, 513),
(627, 257, 514),
(628, 255, 515),
(629, 382, 516),
(630, 383, 517),
(631, 14, 517),
(632, 384, 518),
(633, 385, 519),
(634, 14, 519),
(635, 386, 520),
(636, 113, 521),
(637, 1, 522),
(638, 2, 522),
(639, 1, 523),
(640, 2, 523),
(641, 393, 524),
(642, 1, 525),
(643, 2, 525),
(644, 394, 526),
(647, 396, 528);

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `book_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 4, '2026-06-11 03:22:30', '2026-06-11 03:22:30'),
(2, 32, 20, '2026-07-16 14:54:14', '2026-07-16 14:54:14');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `publisher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `added_by` bigint(20) UNSIGNED NOT NULL,
  `language_id` bigint(20) UNSIGNED NOT NULL,
  `book_code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `publication_year` year(4) DEFAULT NULL,
  `isbn` text DEFAULT NULL,
  `synopsis` text DEFAULT NULL,
  `number_of_pages` bigint(20) UNSIGNED DEFAULT NULL,
  `location_of_book_id` bigint(20) UNSIGNED DEFAULT NULL,
  `classification_number` varchar(255) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Tersedia',
  `cover` varchar(255) DEFAULT NULL,
  `price` bigint(20) UNSIGNED DEFAULT NULL,
  `is_published` enum('Published','Unpublished') NOT NULL DEFAULT 'Unpublished',
  `is_spotlight` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `publisher_id`, `added_by`, `language_id`, `book_code`, `title`, `slug`, `publication_year`, `isbn`, `synopsis`, `number_of_pages`, `location_of_book_id`, `classification_number`, `volume`, `status`, `cover`, `price`, `is_published`, `is_spotlight`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 'SAINT-LUKE-LIBRARY-rumahkentang-7181', 'Rumah Kentang', 'rumah-kentang-7975', '2026', '978-979-256-908-7', '<p>Buku menceritakan hal mistis</p>', 108, NULL, '810.Ind.l', '1', 'Tidak Tersedia', NULL, 100000, 'Published', 1, '2026-08-05 03:52:58', '2026-06-11 03:18:05', '2026-08-05 03:52:58'),
(2, 2, 3, 1, 'SAINT-LUKE-LIBRARY-kamusbotani-3672', 'Kamus Botani', 'kamus-botani-5447', '2002', NULL, '<p></p>', NULL, NULL, '580 SUH b', NULL, 'Tersedia', NULL, 0, 'Published', 0, '2026-08-05 03:53:44', '2026-06-11 04:26:22', '2026-08-05 03:53:44'),
(3, 3, 3, 1, 'SAINT-LUKE-LIBRARY-petunjukgurubelajarbiologi-3331', 'Petunjuk Guru Belajar Biologi', 'petunjuk-guru-belajar-biologi-6676', '2002', NULL, NULL, NULL, NULL, '570.1 MAR p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(4, 4, 3, 1, 'SAINT-LUKE-LIBRARY-zoologi-9552', 'Zoologi', 'zoologi-6417', '1991', NULL, '<p></p>', NULL, NULL, '590 RAD z', NULL, 'Tersedia', NULL, 100000, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-08-08 18:32:28'),
(5, 5, 3, 1, 'SAINT-LUKE-LIBRARY-biologikelasxii-6286', 'Biologi Kelas XII', 'biologi-kelas-xii-7025', '2009', NULL, NULL, NULL, NULL, '574.07 DIA b (2)', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(6, 5, 3, 1, 'SAINT-LUKE-LIBRARY-biologikelasx-8066', 'Biologi Kelas X', 'biologi-kelas-x-1644', '2009', NULL, NULL, NULL, NULL, '574.07 FER b (1)', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(7, 4, 3, 1, 'SAINT-LUKE-LIBRARY-1001plussoaldanpembahasanbiologi-9263', '1001 Plus Soal dan Pembahasan Biologi', '1001-plus-soal-dan-pembahasan-biologi-3974', '2002', NULL, NULL, NULL, NULL, '570.76 FOS s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(8, 6, 3, 1, 'SAINT-LUKE-LIBRARY-biologikelasxii-6071', 'Biologi Kelas XII', 'biologi-kelas-xii-6980', '2006', NULL, NULL, NULL, NULL, '570 DIA b (3)', '3', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(9, 7, 3, 1, 'SAINT-LUKE-LIBRARY-seriipabiologikelasvii-3991', 'Seri IPA Biologi kelas VII', 'seri-ipa-biologi-kelas-vii-6748', '2007', NULL, NULL, NULL, NULL, '574 DES b (2)', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(10, 8, 3, 1, 'SAINT-LUKE-LIBRARY-sainsbiologikelasxii-7426', 'Sains Biologi Kelas XII', 'sains-biologi-kelas-xii-3019', '2017', NULL, NULL, NULL, NULL, '574 PRA s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(11, 4, 3, 1, 'SAINT-LUKE-LIBRARY-ipasdkelasv-5414', 'IPA SD KELAS V', 'ipa-sd-kelas-v-1208', '2007', NULL, NULL, NULL, NULL, '507 MIK I (5)', '5', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(12, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadukewajibandanhakku-4328', 'Tematik Terpadu kewajiban dan hakku', 'tematik-terpadu-kewajiban-dan-hakku-4680', '2018', NULL, NULL, NULL, NULL, '507 IRE t (3)', '3', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(13, 4, 3, 1, 'SAINT-LUKE-LIBRARY-bukukerjatematikpengetahuanalam,kelas1-5569', 'Buku Kerja Tematik Pengetahuan Alam, kelas 1', 'buku-kerja-tematik-pengetahuan-alam-kelas-1-8234', '2004', NULL, NULL, NULL, NULL, '507 KAR a (1) a', '1A', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(14, 4, 3, 1, 'SAINT-LUKE-LIBRARY-bukukerjatematikpengetahuanalam,kelas1-9058', 'Buku Kerja Tematik Pengetahuan Alam, kelas 1', 'buku-kerja-tematik-pengetahuan-alam-kelas-1-4751', '2007', NULL, NULL, NULL, NULL, '508 KAR a (1) b', '1B', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(15, 4, 3, 1, 'SAINT-LUKE-LIBRARY-bukukerjatematikmatematika,kelas1-2404', 'Buku Kerja Tematik Matematika, kelas 1', 'buku-kerja-tematik-matematika-kelas-1-4198', '2004', NULL, NULL, NULL, NULL, '510 KAR m (1) a', '1A', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(16, 4, 3, 1, 'SAINT-LUKE-LIBRARY-bukukerjatematikmatematika,kelas1-8502', 'Buku Kerja Tematik Matematika, kelas 1', 'buku-kerja-tematik-matematika-kelas-1-2746', '2007', NULL, NULL, NULL, NULL, '511 KAR m (1) b', '1B', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(17, 9, 3, 1, 'SAINT-LUKE-LIBRARY-indahnyakebersamaan:bukutematikterpadukurikulum2013-7689', 'Indahnya Kebersamaan : buku tematik terpadu kurikulum 2013', 'indahnya-kebersamaan-buku-tematik-terpadu-kurikulum-2013-9112', '2019', NULL, NULL, NULL, NULL, '371 ANG k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(18, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:wirausaha-1469', 'Tematik Terpadu : Wirausaha', 'tematik-terpadu-wirausaha-3121', '2018', NULL, NULL, NULL, NULL, '372 ANG w', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(19, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:globalisasi-2949', 'Tematik Terpadu : Globalisasi', 'tematik-terpadu-globalisasi-6260', '2018', NULL, NULL, NULL, NULL, '372.1 KRI g', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(20, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:hiduprukun-7305', 'Tematik Terpadu : Hidup Rukun', 'tematik-terpadu-hidup-rukun-6399', '2016', NULL, NULL, NULL, NULL, '372.1 MAR r', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(21, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:pahlawanku-8882', 'Tematik Terpadu : Pahlawanku', 'tematik-terpadu-pahlawanku-9870', '2018', NULL, NULL, NULL, NULL, '372.1 SUS p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(22, 10, 3, 1, 'SAINT-LUKE-LIBRARY-storyofthethreelittlekittens-3394', 'Story of the Three little kittens', 'story-of-the-three-little-kittens-5038', '1984', NULL, NULL, NULL, NULL, '823 TOM t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(23, 11, 3, 1, 'SAINT-LUKE-LIBRARY-catonthehill-8212', 'Cat on the Hill', 'cat-on-the-hill-4244', '2010', NULL, NULL, NULL, NULL, '823 FOR c', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(24, 12, 3, 1, 'SAINT-LUKE-LIBRARY-snowwhiteandthesevendwarfs-4307', 'Snow white and the seven dwarfs', 'snow-white-and-the-seven-dwarfs-9267', '1992', NULL, NULL, NULL, NULL, '823 ERI s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(25, 13, 3, 1, 'SAINT-LUKE-LIBRARY-thebighoneyhunt-1736', 'The big honey hunt', 'the-big-honey-hunt-4906', '1966', NULL, NULL, NULL, NULL, '823 STA t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(26, 14, 3, 1, 'SAINT-LUKE-LIBRARY-operationkangarootrap-8351', 'Operation kangaroo trap', 'operation-kangaroo-trap-1018', '2004', NULL, NULL, NULL, NULL, '823 STR o', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(27, 14, 3, 1, 'SAINT-LUKE-LIBRARY-springishere-5038', 'Spring is here', 'spring-is-here-6493', '2002', NULL, NULL, NULL, NULL, '823 PAC s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(28, NULL, 3, 1, 'SAINT-LUKE-LIBRARY-tiger-timeforstanley-2037', 'Tiger - Time for Stanley', 'tiger-time-for-stanley-2316', NULL, NULL, NULL, NULL, NULL, 'F GRI t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(29, 15, 3, 1, 'SAINT-LUKE-LIBRARY-kumpulandongengbinatang1-5880', 'Kumpulan dongeng binatang 1', 'kumpulan-dongeng-binatang-1-1109', NULL, NULL, NULL, NULL, NULL, 'F DAL k (2)', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(30, 16, 3, 1, 'SAINT-LUKE-LIBRARY-donalnostalgia:seminggukedinginan-3811', 'Donal Nostalgia : Seminggu kedinginan', 'donal-nostalgia-seminggu-kedinginan-4377', NULL, NULL, NULL, NULL, NULL, '800 TRI s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(31, 16, 3, 1, 'SAINT-LUKE-LIBRARY-donalnostalgia:kapallayarkeberuntungan-3297', 'Donal Nostalgia : Kapal layar keberuntungan', 'donal-nostalgia-kapal-layar-keberuntungan-9551', NULL, NULL, NULL, NULL, NULL, '800 KRA s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(32, 17, 3, 1, 'SAINT-LUKE-LIBRARY-winniethepooh:themerrychristmasmystery-3040', 'Winnie the pooh : the merry christmas mystery', 'winnie-the-pooh-the-merry-christmas-mystery-6593', '1993', NULL, NULL, NULL, NULL, 'E BIR w', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(33, 18, 3, 1, 'SAINT-LUKE-LIBRARY-bayipaus-4103', 'Bayi Paus', 'bayi-paus-3654', '2005', NULL, NULL, NULL, NULL, '599.51 WUL p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(34, NULL, 3, 1, 'SAINT-LUKE-LIBRARY-bigbearscan-9583', 'Big bears can', 'big-bears-can-7557', '2001', NULL, NULL, NULL, NULL, '599.78 BED b', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(35, 19, 3, 1, 'SAINT-LUKE-LIBRARY-learnwithbubu:timestory-1913', 'Learn with bubu : Time Story', 'learn-with-bubu-time-story-2911', '2002', NULL, NULL, NULL, NULL, '899.2 VYA i', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(36, 19, 3, 1, 'SAINT-LUKE-LIBRARY-learnwithbubu:triptothezoo-6527', 'Learn with bubu : trip to the zoo', 'learn-with-bubu-trip-to-the-zoo-9922', '2003', NULL, NULL, NULL, NULL, '899.2 VYA t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(37, 18, 3, 1, 'SAINT-LUKE-LIBRARY-monsteralampalingmenakutkan-4589', 'Monster alam paling menakutkan', 'monster-alam-paling-menakutkan-4516', '2015', NULL, NULL, NULL, NULL, '567.9 CHR m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(38, 20, 3, 1, 'SAINT-LUKE-LIBRARY-akuanakbumi-ku-9962', 'Aku Anak bumi-ku', 'aku-anak-bumi-ku-1127', '2015', NULL, NULL, NULL, NULL, '235 WIT a', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(39, 21, 3, 1, 'SAINT-LUKE-LIBRARY-ruah2024-4650', 'Ruah 2024', 'ruah-2024-3721', '2024', NULL, NULL, NULL, NULL, '220 CAR r 2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(40, 21, 3, 1, 'SAINT-LUKE-LIBRARY-ruah2021-6349', 'Ruah 2021', 'ruah-2021-5500', '2021', NULL, NULL, NULL, NULL, '221 CAR r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(41, 22, 3, 1, 'SAINT-LUKE-LIBRARY-logicoilovebibel-5947', 'Logico I love Bibel', 'logico-i-love-bibel-9174', NULL, NULL, NULL, NULL, NULL, '220.5 SUG l', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(42, 22, 3, 1, 'SAINT-LUKE-LIBRARY-kitabsuciuntukanak-anak-2127', 'Kitab Suci Untuk Anak-anak', 'kitab-suci-untuk-anak-anak-5858', '1999', NULL, NULL, NULL, NULL, '220.9 GRA k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(43, 22, 3, 1, 'SAINT-LUKE-LIBRARY-kitabsuciuntukanak-anak-4596', 'Kitab Suci Untuk Anak-anak', 'kitab-suci-untuk-anak-anak-6916', '1997', NULL, NULL, NULL, NULL, '220.9 MON k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(44, 23, 3, 1, 'SAINT-LUKE-LIBRARY-wartarohanirasulpaulus-9958', 'WARTA ROHANI RASUL PAULUS', 'warta-rohani-rasul-paulus-1438', '2006', NULL, NULL, NULL, NULL, '220.5 TOB w', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(45, 24, 3, 1, 'SAINT-LUKE-LIBRARY-dasarbudha-dhamma-2884', 'Dasar Budha-Dhamma', 'dasar-budha-dhamma-3842', '1966', NULL, NULL, NULL, NULL, '294.3 KHE d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(46, 24, 3, 1, 'SAINT-LUKE-LIBRARY-dasarbudha-dhamma-1066', 'Dasar Budha-Dhamma', 'dasar-budha-dhamma-4508', '1966', NULL, NULL, NULL, NULL, '294.3 KHE d/2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(47, 22, 3, 1, 'SAINT-LUKE-LIBRARY-selilitsangnabi:bisik-bisikaliransesat-4340', 'Selilit Sang Nabi : Bisik-bisik aliran sesat', 'selilit-sang-nabi-bisik-bisik-aliran-sesat-6811', '2007', NULL, NULL, NULL, NULL, '291.9 KRI s', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(48, 22, 3, 1, 'SAINT-LUKE-LIBRARY-kumpulanulasaninjilbersamadia-7494', 'Kumpulan ulasan Injil Bersama Dia', 'kumpulan-ulasan-injil-bersama-dia-9827', '2006', NULL, NULL, NULL, NULL, '220.5 GIA k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(49, 25, 3, 1, 'SAINT-LUKE-LIBRARY-tanggungjawabsosialumatberiman-1827', 'Tanggungjawab Sosial Umat Beriman', 'tanggungjawab-sosial-umat-beriman-1441', '2009', NULL, NULL, NULL, NULL, '220.5 TIM t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(50, 26, 3, 1, 'SAINT-LUKE-LIBRARY-misimasyarakatmajemuk-7944', 'Misi Masyarakat Majemuk', 'misi-masyarakat-majemuk-5135', '2014', NULL, NULL, NULL, NULL, '266 TUM m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(51, 27, 3, 1, 'SAINT-LUKE-LIBRARY-diahadir:45kisahkehadirantuhandalamkeluargabesarasak-9742', 'Dia Hadir : 45 Kisah kehadiran Tuhan dalam keluarga besar ASAK', 'dia-hadir-45-kisah-kehadiran-tuhan-dalam-keluarga-besar-asak-2691', '2014', NULL, NULL, NULL, NULL, '248 WID d', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(52, 28, 3, 1, 'SAINT-LUKE-LIBRARY-sacramentsinscripture-1510', 'Sacraments in scripture', 'sacraments-in-scripture-7680', '2007', NULL, NULL, NULL, NULL, '265 TIM s', '4', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(53, 28, 3, 1, 'SAINT-LUKE-LIBRARY-fromunionsquaretorome-8028', 'From union square to Rome', 'from-union-square-to-rome-5230', '2007', NULL, NULL, NULL, NULL, '248.2 DAY f', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(54, 22, 3, 1, 'SAINT-LUKE-LIBRARY-prakteksakramenpertobatandalamgerjakatolik-6007', 'Praktek Sakramen Pertobatan dalam Gerja Katolik', 'praktek-sakramen-pertobatan-dalam-gerja-katolik-1845', '2008', NULL, NULL, NULL, NULL, '265.6 SUJ p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(55, 29, 3, 1, 'SAINT-LUKE-LIBRARY-30hariberburuberkah-3001', '30 Hari Berburu Berkah', '30-hari-berburu-berkah-9341', '2009', NULL, NULL, NULL, NULL, '297.5 MUB 3', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(56, 30, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasi-9576', 'Teknologi Informasi dan Komunikasi', 'teknologi-informasi-dan-komunikasi-3110', '2006', NULL, NULL, NULL, NULL, '004 SAN t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(57, 31, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksmaxii-semesteri-1454', 'Teknologi Informasi dan Komunikasi Untuk SMA XII- Semester I', 'teknologi-informasi-dan-komunikasi-untuk-sma-xii-semester-i-7040', '2008', NULL, NULL, NULL, NULL, '005.3 SIS t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(58, 31, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksmaxii-semesterii-3015', 'Teknologi Informasi dan Komunikasi Untuk SMA XII- Semester II', 'teknologi-informasi-dan-komunikasi-untuk-sma-xii-semester-ii-1981', '2008', NULL, NULL, NULL, NULL, '005.3 PRA t 2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(59, 31, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksmaxi-semesterii-9665', 'Teknologi Informasi dan Komunikasi Untuk SMA XI- Semester II', 'teknologi-informasi-dan-komunikasi-untuk-sma-xi-semester-ii-6556', '2008', NULL, NULL, NULL, NULL, '005.54 PUR t', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(60, 31, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksmax-semesterii-6293', 'Teknologi Informasi dan Komunikasi Untuk SMA X- Semester II', 'teknologi-informasi-dan-komunikasi-untuk-sma-x-semester-ii-1241', '2008', NULL, NULL, NULL, NULL, '005.52 SAR t', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(61, 16, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopediaanak:kisahmasalampau-9367', 'Ensiklopedia Anak : Kisah Masa Lampau', 'ensiklopedia-anak-kisah-masa-lampau-7801', '2009', NULL, NULL, NULL, NULL, '039 DIS k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(62, 16, 3, 1, 'SAINT-LUKE-LIBRARY-dinosaurus-4635', 'Dinosaurus', 'dinosaurus-2108', '2009', NULL, NULL, NULL, NULL, '039 DIS d', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(63, 16, 3, 1, 'SAINT-LUKE-LIBRARY-lukisandanpahatan-9349', 'Lukisan dan Pahatan', 'lukisan-dan-pahatan-5283', '2009', NULL, NULL, NULL, NULL, '039 DIS l', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(64, 16, 3, 1, 'SAINT-LUKE-LIBRARY-temuanbesar-5113', 'Temuan Besar', 'temuan-besar-9150', '2009', NULL, NULL, NULL, NULL, '039 DIS t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(65, 32, 3, 1, 'SAINT-LUKE-LIBRARY-mitologiyunani:orfeusdaneridike-1496', 'Mitologi Yunani : Orfeus dan Eridike', 'mitologi-yunani-orfeus-dan-eridike-7709', '1997', NULL, NULL, NULL, NULL, '291.13 STE m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(66, 32, 3, 1, 'SAINT-LUKE-LIBRARY-mitologiyunani:mudikdewa-dewa-8542', 'Mitologi Yunani : Mudik Dewa-Dewa', 'mitologi-yunani-mudik-dewa-dewa-9831', '1996', NULL, NULL, NULL, NULL, '291.13 STE m 2', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(67, 32, 3, 1, 'SAINT-LUKE-LIBRARY-mitologiyunani:dedalusdanikarus-3852', 'Mitologi Yunani : Dedalus dan Ikarus', 'mitologi-yunani-dedalus-dan-ikarus-7950', '1997', NULL, NULL, NULL, NULL, '291.13 STE m 3', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(68, 32, 3, 1, 'SAINT-LUKE-LIBRARY-mitologiyunani:kisahpersorone-9942', 'Mitologi Yunani : Kisah Persorone', 'mitologi-yunani-kisah-persorone-9911', '1996', NULL, NULL, NULL, NULL, '291.13 STE m 4', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(69, 16, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopediaanak:komunikasi-8244', 'Ensiklopedia Anak : Komunikasi', 'ensiklopedia-anak-komunikasi-5387', '2009', NULL, NULL, NULL, NULL, '039 DIS k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(70, 16, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopediaanak:seranggadanlaba-laba-5098', 'Ensiklopedia Anak : Serangga dan Laba-laba', 'ensiklopedia-anak-serangga-dan-laba-laba-3464', '2009', NULL, NULL, NULL, NULL, '039 DIS s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(71, 16, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopediaanak:angkasaluar-5172', 'Ensiklopedia Anak : Angkasa Luar', 'ensiklopedia-anak-angkasa-luar-9944', '2009', NULL, NULL, NULL, NULL, '039 DIS', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(72, 16, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopediaanak:planetbumi-5094', 'Ensiklopedia Anak : Planet Bumi', 'ensiklopedia-anak-planet-bumi-6539', '2009', NULL, NULL, NULL, NULL, '039 DIS', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(73, 33, 3, 1, 'SAINT-LUKE-LIBRARY-mengenalkeanekaragamanhayati-5460', 'Mengenal Keanekaragaman Hayati', 'mengenal-keanekaragaman-hayati-4745', '2003', NULL, NULL, NULL, NULL, '577.27 RUS m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(74, 33, 3, 1, 'SAINT-LUKE-LIBRARY-mengenalekosistemperairan-3763', 'Mengenal Ekosistem Perairan', 'mengenal-ekosistem-perairan-9915', '2003', NULL, NULL, NULL, NULL, '577.6 ANG m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(75, 33, 3, 1, 'SAINT-LUKE-LIBRARY-mengenalekosistemhutandanekosistemagro-9563', 'Mengenal Ekosistem Hutan dan Ekosistem Agro', 'mengenal-ekosistem-hutan-dan-ekosistem-agro-3709', '2003', NULL, NULL, NULL, NULL, '577.31 MUN m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(76, 34, 3, 1, 'SAINT-LUKE-LIBRARY-miller\'schinese&japaneseantiquesbuyer\'sguide-5198', 'Miller\'s Chinese & Japanese Antiques Buyer\'s Guide', 'millers-chinese-japanese-antiques-buyers-guide-1020', '1999', NULL, NULL, NULL, NULL, '745.107 MIL m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(77, 35, 3, 1, 'SAINT-LUKE-LIBRARY-zhangzhao(swatow)ceramics-1165', 'Zhangzhao (Swatow) Ceramics', 'zhangzhao-swatow-ceramics-9660', NULL, NULL, NULL, NULL, NULL, '738.095 ADH  z', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(78, 36, 3, 1, 'SAINT-LUKE-LIBRARY-chinesepotteryandporcelain-5953', 'Chinese Pottery and Porcelain', 'chinese-pottery-and-porcelain-2460', '1995', NULL, NULL, NULL, NULL, '738.095 VAI c', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(79, 35, 3, 1, 'SAINT-LUKE-LIBRARY-kendi-3099', 'Kendi', 'kendi-6049', '2004', NULL, NULL, NULL, NULL, '738.3 ADH k', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(80, 35, 3, 1, 'SAINT-LUKE-LIBRARY-tradisigerabahdiindonesia-6804', 'Tradisi Gerabah di Indonesia', 'tradisi-gerabah-di-indonesia-4061', '1995', NULL, NULL, NULL, NULL, '738.3 SOE t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(81, 37, 3, 1, 'SAINT-LUKE-LIBRARY-tangan-tanganterampil:senikerajinanaceh-5798', 'Tangan-tangan Terampil : Seni Kerajinan Aceh', 'tangan-tangan-terampil-seni-kerajinan-aceh-9569', '1989', NULL, NULL, NULL, NULL, '745.5 TIM t', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(82, 1, 3, 1, 'SAINT-LUKE-LIBRARY-serialrumahspesialkombinasiwarna-5839', 'Serial Rumah Spesial Kombinasi Warna', 'serial-rumah-spesial-kombinasi-warna-3899', '2005', NULL, NULL, NULL, NULL, '747.94 GON s', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(83, 35, 3, 1, 'SAINT-LUKE-LIBRARY-japaneseporcelainfromtheseventeenthcenturyfoundinindonesia-2336', 'Japanese Porcelain From The Seventeenth Century Found In Indonesia', 'japanese-porcelain-from-the-seventeenth-century-found-in-indonesia-3992', '1988', NULL, NULL, NULL, NULL, '738.30 ADH j', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(84, 35, 3, 1, 'SAINT-LUKE-LIBRARY-notesonearlyolivegreenwaresfoundinindonesia-2380', 'Notes on early Olive Green Wares Found  In Indonesia', 'notes-on-early-olive-green-wares-found-in-indonesia-9455', '1983', NULL, NULL, NULL, NULL, '738.3 ADH n', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(85, 1, 3, 1, 'SAINT-LUKE-LIBRARY-mebelpraktis:disainkayulapisyangunikdanserbaguna-8494', 'Mebel Praktis : Disain Kayu Lapis Yang Unik dan Serba Guna', 'mebel-praktis-disain-kayu-lapis-yang-unik-dan-serba-guna-1131', '1985', NULL, NULL, NULL, NULL, '749.31 GUN m', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(86, 38, 3, 1, 'SAINT-LUKE-LIBRARY-artsofasia:treasuresofthetopkapipalacemuseumcollections-8674', 'Arts of Asia : Treasures of the Topkapi Palace Museum Collections', 'arts-of-asia-treasures-of-the-topkapi-palace-museum-collections-9418', '2001', NULL, NULL, NULL, NULL, '709.56 NGU a', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(87, 39, 3, 1, 'SAINT-LUKE-LIBRARY-bentengheritagewarisanbudayaperanakantionghoa-6349', 'Benteng Heritage Warisan Budaya Peranakan Tionghoa', 'benteng-heritage-warisan-budaya-peranakan-tionghoa-6689', '2012', NULL, NULL, NULL, NULL, '725.91 LAT b', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(88, 40, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanpancasiladankewarganegaraan:smakelasx-semester1-8139', 'Pendidikan Pancasila dan Kewarganegaraan : SMA Kelas X - semester 1', 'pendidikan-pancasila-dan-kewarganegaraan-sma-kelas-x-semester-1-5438', '2014', NULL, NULL, NULL, NULL, '323 TIM p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(89, 40, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanpancasiladankewarganegaraan:smakelasx-semester2-1264', 'Pendidikan Pancasila dan Kewarganegaraan : SMA Kelas X - semester 2', 'pendidikan-pancasila-dan-kewarganegaraan-sma-kelas-x-semester-2-6020', '2014', NULL, NULL, NULL, NULL, '320 TIM p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(90, 41, 3, 1, 'SAINT-LUKE-LIBRARY-kamusbesar:tionhoa-indonesia-3147', 'Kamus Besar :Tionhoa - Indonesia', 'kamus-besar-tionhoa-indonesia-9218', '1995', NULL, NULL, NULL, NULL, '495.132 KAM K', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(91, 42, 3, 1, 'SAINT-LUKE-LIBRARY-kamuslengkap:indonesiationghoa-3144', 'Kamus Lengkap : Indonesia Tionghoa', 'kamus-lengkap-indonesia-tionghoa-2865', '2000', NULL, NULL, NULL, NULL, '495.132 KAM K 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(92, 43, 3, 1, 'SAINT-LUKE-LIBRARY-bahasamandarinsmpkelasvii-4108', 'Bahasa Mandarin SMP Kelas VII', 'bahasa-mandarin-smp-kelas-vii-7275', '2014', NULL, NULL, NULL, NULL, '495.1 IST b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(93, 43, 3, 1, 'SAINT-LUKE-LIBRARY-bahasamandarinsmpkelasix-8981', 'Bahasa Mandarin SMP Kelas IX', 'bahasa-mandarin-smp-kelas-ix-8460', '2014', NULL, NULL, NULL, NULL, '495.1 IST b 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(94, 44, 3, 1, 'SAINT-LUKE-LIBRARY-mandarindasarsdkelas1-6465', 'Mandarin dasar SD Kelas 1', 'mandarin-dasar-sd-kelas-1-3454', '2008', NULL, NULL, NULL, NULL, '495.1 SIN m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(95, 45, 3, 1, 'SAINT-LUKE-LIBRARY-bahasaindonesia:ekspresidiridanakademik-7813', 'Bahasa Indonesia : Ekspresi diri dan Akademik', 'bahasa-indonesia-ekspresi-diri-dan-akademik-2820', '2014', NULL, NULL, NULL, NULL, '499.221 MAR b', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(96, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambrideenglishpreparestudent\'sbook-level2-5993', 'Cambride English Prepare Student\'s Book - Level 2', 'cambride-english-prepare-students-book-level-2-8393', '2015', NULL, NULL, NULL, NULL, '428.24 KOS  c', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(97, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambrideenglishprepareworkbook-level3-5458', 'Cambride English Prepare WorkBook -Level 3', 'cambride-english-prepare-workbook-level-3-7918', '2015', NULL, NULL, NULL, NULL, '428.24 HOL  c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(98, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambrideenglishpreparestudent\'sbook-level3-5494', 'Cambride English Prepare Student\'s Book - Level 3', 'cambride-english-prepare-students-book-level-3-2050', '2015', NULL, NULL, NULL, NULL, '428.24 KOS  c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(99, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambrideenglishprepareworkbook-level5-6838', 'Cambride English Prepare WorkBook - Level 5', 'cambride-english-prepare-workbook-level-5-5477', '2015', NULL, NULL, NULL, NULL, '428.24 JOS  c', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(100, 4, 3, 1, 'SAINT-LUKE-LIBRARY-piawaiberbahasaindonesia-5615', 'Piawai Berbahasa Indonesia', 'piawai-berbahasa-indonesia-7538', '2020', NULL, NULL, NULL, NULL, '499.221 NUR p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(101, 4, 3, 1, 'SAINT-LUKE-LIBRARY-pastibisapembahasantuntaskompetensibahasaindonesiauntuksmpdanmtskelasviii-4505', 'Pasti Bisa Pembahasan Tuntas Kompetensi Bahasa Indonesia untuk SMP dan MTs kelas VIII', 'pasti-bisa-pembahasan-tuntas-kompetensi-bahasa-indonesia-untuk-smp-dan-mts-kelas-viii-6244', '2007', NULL, NULL, NULL, NULL, '499.221 TRI p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(102, 47, 3, 1, 'SAINT-LUKE-LIBRARY-bahasaindonesiasmpkelasvii-7059', 'Bahasa Indonesia SMP Kelas VII', 'bahasa-indonesia-smp-kelas-vii-9345', '2017', NULL, NULL, NULL, NULL, '499.221 HAR b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(103, 47, 3, 1, 'SAINT-LUKE-LIBRARY-bahasaindonesiasmpkelasviii-1214', 'Bahasa Indonesia SMP Kelas VIII', 'bahasa-indonesia-smp-kelas-viii-9863', '2017', NULL, NULL, NULL, NULL, '499.221 KOA p', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(104, 48, 3, 1, 'SAINT-LUKE-LIBRARY-economicseleventhedition-1982', 'ECONOMICS Eleventh Edition', 'economics-eleventh-edition-9881', '1980', NULL, NULL, NULL, NULL, '330. SAM e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(105, 3, 3, 1, 'SAINT-LUKE-LIBRARY-ekonomi1untuksma/makelasx-6943', 'Ekonomi 1 Untuk SMA/MA kelas X', 'ekonomi-1-untuk-smama-kelas-x-6693', '2009', NULL, NULL, NULL, NULL, '330.07 SUK e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(106, 6, 3, 1, 'SAINT-LUKE-LIBRARY-akuntasi1untuksmukelas1-8910', 'Akuntasi 1 Untuk SMU Kelas 1', 'akuntasi-1-untuk-smu-kelas-1-4601', '2003', NULL, NULL, NULL, NULL, '657 ALA a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(107, 6, 3, 1, 'SAINT-LUKE-LIBRARY-ekonomi1untuksma/makelasx-ktsp-7933', 'Ekonomi 1 Untuk SMA/MA kelas X - KTSP', 'ekonomi-1-untuk-smama-kelas-x-ktsp-9028', '2007', NULL, NULL, NULL, NULL, '330.07 ALA e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(108, 6, 3, 1, 'SAINT-LUKE-LIBRARY-ekonomi1untuksma/makelasx-kurikulum2013-6232', 'Ekonomi 1 Untuk SMA/MA kelas X -Kurikulum 2013', 'ekonomi-1-untuk-smama-kelas-x-kurikulum-2013-6235', '2013', NULL, NULL, NULL, NULL, '330.07 ALA e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(109, 49, 3, 1, 'SAINT-LUKE-LIBRARY-ekonomi3fenomenadisekitarkita,untukkelasxiisma-4550', 'Ekonomi 3 Fenomena di Sekitar Kita, untuk kelas XII SMA', 'ekonomi-3-fenomena-di-sekitar-kita-untuk-kelas-xii-sma-8754', '2008', NULL, NULL, NULL, NULL, '330.07 RUS e', '3', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(110, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgeigcseandolevelacountingcoursebook-3368', 'Cambridge IGCSE and O Level Acounting Coursebook', 'cambridge-igcse-and-o-level-acounting-coursebook-5519', '2018', NULL, NULL, NULL, NULL, '657.07 COU c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(111, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgeigcseandolevelenvironmentalmanagementcoursebook-3175', 'Cambridge IGCSE and O Level Environmental Management Coursebook', 'cambridge-igcse-and-o-level-environmental-management-coursebook-3777', '2017', NULL, NULL, NULL, NULL, '333.7 SKI c', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(112, 3, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahuntuksma/makelasxiprogramips-1908', 'Sejarah Untuk SMA/MA Kelas XI Program IPS', 'sejarah-untuk-smama-kelas-xi-program-ips-7104', '2009', NULL, NULL, NULL, NULL, '959.8 LIS s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(113, 4, 3, 1, 'SAINT-LUKE-LIBRARY-sejarah1:kelompokpemintaanilmu-ilmusosial-9271', 'SEJARAH 1: Kelompok Pemintaan Ilmu-Ilmu Sosial', 'sejarah-1-kelompok-pemintaan-ilmu-ilmu-sosial-1934', '2013', NULL, NULL, NULL, NULL, '959.8 HAP s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(114, 3, 3, 1, 'SAINT-LUKE-LIBRARY-cakrawalasejarahuntuksma/makelasx,semester1-8198', 'Cakrawala Sejarah Untuk SMA/MA Kelas X, Semester 1', 'cakrawala-sejarah-untuk-smama-kelas-x-semester-1-2336', '2009', NULL, NULL, NULL, NULL, '959.8 WAR c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(115, 3, 3, 1, 'SAINT-LUKE-LIBRARY-cakrawalasejarahuntuksma/makelasx,semester2-4016', 'Cakrawala Sejarah Untuk SMA/MA Kelas X, Semester 2', 'cakrawala-sejarah-untuk-smama-kelas-x-semester-2-7211', '2009', NULL, NULL, NULL, NULL, '959.8 WAR c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(116, 50, 3, 1, 'SAINT-LUKE-LIBRARY-manajemenkeuangan-3381', 'Manajemen Keuangan', 'manajemen-keuangan-9639', '2013', NULL, NULL, NULL, NULL, '658.15 HUS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(117, 51, 3, 1, 'SAINT-LUKE-LIBRARY-pengantarekonomimikro-2350', 'Pengantar Ekonomi Mikro', 'pengantar-ekonomi-mikro-8413', '1991', NULL, NULL, NULL, NULL, '338.5 SUD p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(118, 4, 3, 1, 'SAINT-LUKE-LIBRARY-kamuslengkapekonomi:edisikedua-7033', 'Kamus Lengkap Ekonomi : Edisi Kedua', 'kamus-lengkap-ekonomi-edisi-kedua-8154', '1994', NULL, NULL, NULL, NULL, '330.3 PAS k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(119, 4, 3, 1, 'SAINT-LUKE-LIBRARY-pendididikankewarganegaraan:untuksmakelasxi-1871', 'Pendididikan Kewarganegaraan : Untuk SMA Kelas XI', 'pendididikan-kewarganegaraan-untuk-sma-kelas-xi-1134', '2007', NULL, NULL, NULL, NULL, '320.4 BUD p 1', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(120, 47, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanpancasiladankewarganegaraan:sma/ma,smk/mak-kelasxisemester1-6597', 'Pendidikan Pancasila dan Kewarganegaraan  : SMA/MA,SMK/MAK -Kelas XI Semester 1', 'pendidikan-pancasila-dan-kewarganegaraan-smamasmkmak-kelas-xi-semester-1-5438', '2014', NULL, NULL, NULL, NULL, '320.4 LUB p /1', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(121, 9, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanpancasiladankewarganegaraan:sma/ma,smk/mak-kelasxisemester2-6081', 'Pendidikan Pancasila dan Kewarganegaraan  : SMA/MA,SMK/MAK -Kelas XI Semester 2', 'pendidikan-pancasila-dan-kewarganegaraan-smamasmkmak-kelas-xi-semester-2-8010', '2014', NULL, NULL, NULL, NULL, '320.4 LUB p /2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(122, 3, 3, 1, 'SAINT-LUKE-LIBRARY-sosiologi1untuksma/makelasx-8798', 'Sosiologi 1 untuk SMA/MA  kelas  X', 'sosiologi-1-untuk-smama-kelas-x-6489', '2009', NULL, NULL, NULL, NULL, '301.07 SUD s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(123, 6, 3, 1, 'SAINT-LUKE-LIBRARY-sosiologi3untuksma/makelasxii-1298', 'Sosiologi 3  untuk SMA/MA  kelas  XII', 'sosiologi-3-untuk-smama-kelas-xii-5803', '2001', NULL, NULL, NULL, NULL, '301 MAR s /3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(124, 6, 3, 1, 'SAINT-LUKE-LIBRARY-sosiologi1kelompokpeminatanilmu-ilmusosial:untuksmakelasx-9348', 'Sosiologi 1  Kelompok Peminatan Ilmu-ilmu Sosial  : Untuk SMA kelas X', 'sosiologi-1-kelompok-peminatan-ilmu-ilmu-sosial-untuk-sma-kelas-x-8986', '2013', NULL, NULL, NULL, NULL, '301 MAR s/1', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(125, 4, 3, 1, 'SAINT-LUKE-LIBRARY-sosiologi2kelompokpeminatanilmu-ilmusosial:untuksmakelasxi-4184', 'Sosiologi  2 Kelompok Peminatan Ilmu-ilmu Sosial : Untuk SMA kelas XI', 'sosiologi-2-kelompok-peminatan-ilmu-ilmu-sosial-untuk-sma-kelas-xi-2396', '2014', NULL, NULL, NULL, NULL, '301 MAR s/2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(126, 52, 3, 1, 'SAINT-LUKE-LIBRARY-geografi2lingkunganfisikdansosial:sma/makelasxi-5414', 'Geografi 2 Lingkungan Fisik dan Sosial : SMA/MA Kelas XI', 'geografi-2-lingkungan-fisik-dan-sosial-smama-kelas-xi-7139', '2009', NULL, NULL, NULL, NULL, '910.07 SUS g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(127, 52, 3, 1, 'SAINT-LUKE-LIBRARY-memahamigeografi3:programilmupengetahuansosial-sma/makelasxi-8533', 'Memahami Geografi 3 : Program Ilmu Pengetahuan Sosial-  SMA/MA Kelas XI', 'memahami-geografi-3-program-ilmu-pengetahuan-sosial-smama-kelas-xi-5514', '2009', NULL, NULL, NULL, NULL, '910.7 WAL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(128, 52, 3, 1, 'SAINT-LUKE-LIBRARY-geografi2:sma/makelasxi-2807', 'Geografi 2  : SMA/MA Kelas XI', 'geografi-2-smama-kelas-xi-6873', '2009', NULL, NULL, NULL, NULL, '910.07 END g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(129, 3, 3, 1, 'SAINT-LUKE-LIBRARY-geografi1membukacakrawaladunia:untukkelasxsma/ma-1345', 'Geografi 1 Membuka Cakrawala Dunia : untuk kelas X SMA/MA', 'geografi-1-membuka-cakrawala-dunia-untuk-kelas-x-smama-2148', '2009', NULL, NULL, NULL, NULL, '910.07 UTO g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(130, 53, 3, 1, 'SAINT-LUKE-LIBRARY-jelajahdunia:geografi-sma/makelasx-9113', 'JELAJAH DUNIA : GEOGRAFI - SMA/MA KELAS X', 'jelajah-dunia-geografi-smama-kelas-x-4885', NULL, NULL, NULL, NULL, NULL, '910.07 TIK g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(131, 54, 3, 1, 'SAINT-LUKE-LIBRARY-geographyenvironmentandresources-6699', 'Geography Environment and Resources', 'geography-environment-and-resources-3450', '2017', NULL, NULL, NULL, NULL, '910 BRO g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(132, 55, 3, 1, 'SAINT-LUKE-LIBRARY-stacato:pilihmana?nge-gengataucinta?-9167', 'Stacato : Pilih mana ? Nge-geng atau cinta?', 'stacato-pilih-mana-nge-geng-atau-cinta-2345', '2010', NULL, NULL, NULL, NULL, '177 NUG s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(133, 55, 3, 1, 'SAINT-LUKE-LIBRARY-it\'stimetomakefriend-9446', 'It\'s Time to Make Friend', 'its-time-to-make-friend-5305', '2008', NULL, NULL, NULL, NULL, '177 FAN i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(134, 15, 3, 1, 'SAINT-LUKE-LIBRARY-questionsandanswersondeathanddying-2401', 'Questions and Answers on Death and Dying', 'questions-and-answers-on-death-and-dying-4443', '1998', NULL, NULL, NULL, NULL, '128.5 KUB t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(135, 55, 3, 1, 'SAINT-LUKE-LIBRARY-cricleoflove-4683', 'Cricle of Love', 'cricle-of-love-3340', '2009', NULL, NULL, NULL, NULL, '152.4 SED c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(136, 54, 3, 1, 'SAINT-LUKE-LIBRARY-therulesofwealth-7077', 'The Rules of Wealth', 'the-rules-of-wealth-4037', '2007', NULL, NULL, NULL, NULL, '332.04 TEM t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(137, 44, 3, 1, 'SAINT-LUKE-LIBRARY-menciptakankeseimbangan:mengajarkannilaidnkebebasan-5373', 'Menciptakan Keseimbangan : Mengajarkan Nilai dn Kebebasan', 'menciptakan-keseimbangan-mengajarkan-nilai-dn-kebebasan-9706', '1997', NULL, NULL, NULL, NULL, '170 GLE m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(138, 15, 3, 1, 'SAINT-LUKE-LIBRARY-sandisutasoma:menemukankepinganjiwamputantular-2348', 'Sandi SUTASOMA : Menemukan Kepingan Jiwa Mpu Tantular', 'sandi-sutasoma-menemukan-kepingan-jiwa-mpu-tantular-9546', '2008', NULL, NULL, NULL, NULL, '128 KRI s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(139, 15, 3, 1, 'SAINT-LUKE-LIBRARY-thescienceofbeinggreat:mencapaihiduppenuhkeagungan-6281', 'The Science of Being Great : MENCAPAI HIDUP PENUH KEAGUNGAN', 'the-science-of-being-great-mencapai-hidup-penuh-keagungan-7189', '2007', NULL, NULL, NULL, NULL, '153.2 WAT m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(140, 15, 3, 1, 'SAINT-LUKE-LIBRARY-thescienceofsuccess:rahasiasuksesdenganmemanfaatkanhukum-hukumuniversal-4774', 'The Science of Success : Rahasia Sukses dengan Memanfaatkan Hukum-hukum Universal', 'the-science-of-success-rahasia-sukses-dengan-memanfaatkan-hukum-hukum-universal-4835', '2008', NULL, NULL, NULL, NULL, '153.2 RAY t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(141, 15, 3, 1, 'SAINT-LUKE-LIBRARY-notesfromtheuniverse:pesan-pesaninspirasidarisemesta-9769', 'Notes From The Universe : Pesan-pesan Inspirasi dari Semesta', 'notes-from-the-universe-pesan-pesan-inspirasi-dari-semesta-4919', '2007', NULL, NULL, NULL, NULL, '153.2 DOO p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(142, 56, 3, 1, 'SAINT-LUKE-LIBRARY-don\'tsweatthesmallstuffwithyourfamily-4183', 'Don\'t Sweat the Small Stuff with Your Family', 'dont-sweat-the-small-stuff-with-your-family-8089', '1998', NULL, NULL, NULL, NULL, '158.1 DOO d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(143, 57, 3, 1, 'SAINT-LUKE-LIBRARY-pdajalagi-2459', 'PD Aja Lagi', 'pd-aja-lagi-8925', '2006', NULL, NULL, NULL, NULL, '158.1 ASL p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(144, 15, 3, 1, 'SAINT-LUKE-LIBRARY-getreadyforsuccess-9447', 'Get Ready For Success', 'get-ready-for-success-7116', '2008', NULL, NULL, NULL, NULL, '152.5 CHA g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(145, 15, 3, 1, 'SAINT-LUKE-LIBRARY-kehidupan:panduanuntukmenitijalankedalamdiri-7553', 'KEHIDUPAN : Panduan untuk Meniti Jalan ke dalam Diri', 'kehidupan-panduan-untuk-meniti-jalan-ke-dalam-diri-6894', '2008', NULL, NULL, NULL, NULL, '128 KRI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(146, 15, 3, 1, 'SAINT-LUKE-LIBRARY-bersamabungkarno:menggapaijiwamerdeka-4063', 'Bersama Bung Karno : Menggapai Jiwa Merdeka', 'bersama-bung-karno-menggapai-jiwa-merdeka-6196', '1999', NULL, NULL, NULL, NULL, '158.4 KRI g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(147, 15, 3, 1, 'SAINT-LUKE-LIBRARY-2inspireu:menjadikancacat&kekurangansebagaimotivasiuntuklebihmaju-8270', '2 Inspire U : Menjadikan Cacat & Kekurangan Sebagai Motivasi untuk Lebih Maju', '2-inspire-u-menjadikan-cacat-kekurangan-sebagai-motivasi-untuk-lebih-maju-8852', '2007', NULL, NULL, NULL, NULL, '152.5 CHA t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(148, 15, 3, 1, 'SAINT-LUKE-LIBRARY-fearmangement:mengelolaketakutan,memacuevolusidiri-6248', 'Fear Mangement : Mengelola ketakutan, memacu evolusi diri', 'fear-mangement-mengelola-ketakutan-memacu-evolusi-diri-6354', '2008', NULL, NULL, NULL, NULL, '152.4 KRI f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(149, 55, 3, 1, 'SAINT-LUKE-LIBRARY-latakafur:kisah-kisahinspiratifpenggugahkeimanan-2481', 'LA TAKAFUR : Kisah-kisah Inspiratif Penggugah Keimanan', 'la-takafur-kisah-kisah-inspiratif-penggugah-keimanan-6035', '2009', NULL, NULL, NULL, NULL, '158.2 SET l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(150, 15, 3, 1, 'SAINT-LUKE-LIBRARY-simfoniilahihazratinayatkhan-2318', 'Simfoni Ilahi Hazrat Inayat Khan', 'simfoni-ilahi-hazrat-inayat-khan-6025', '2003', NULL, NULL, NULL, NULL, '153.2 KRI s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(151, 58, 3, 1, 'SAINT-LUKE-LIBRARY-the7awarness:7kesadaranhatidanjiwamenujumanusiadiatasrata-rata-4412', 'The 7 Awarness : 7 Kesadaran Hati dan Jiwa Menuju Manusia Diatas Rata-rata', 'the-7-awarness-7-kesadaran-hati-dan-jiwa-menuju-manusia-diatas-rata-rata-8144', '2006', NULL, NULL, NULL, NULL, '158.1 YUS t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(152, 59, 3, 1, 'SAINT-LUKE-LIBRARY-rahasiakeajaiban:duniamistik-5175', 'Rahasia Keajaiban  : Dunia Mistik', 'rahasia-keajaiban-dunia-mistik-6325', '2012', NULL, NULL, NULL, NULL, '154.7 BUC r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(153, 15, 3, 1, 'SAINT-LUKE-LIBRARY-kematian:panduanuntukmengahadapinyadengansenyuman-9254', 'Kematian : Panduan untuk Mengahadapinya dengan Senyuman', 'kematian-panduan-untuk-mengahadapinya-dengan-senyuman-4771', '2008', NULL, NULL, NULL, NULL, '123 KRI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(154, 60, 3, 1, 'SAINT-LUKE-LIBRARY-pemimpindankrisismultidimensi:etikadanmoralitaskepemimpinan-3282', 'Pemimpin dan Krisis Multidimensi : Etika dan Moralitas Kepemimpinan', 'pemimpin-dan-krisis-multidimensi-etika-dan-moralitas-kepemimpinan-2286', '2009', NULL, NULL, NULL, NULL, '174.4 MUS p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(155, 4, 3, 1, 'SAINT-LUKE-LIBRARY-mantapdalam30hari:mencaricinta-8098', 'Mantap dalam 30 hari : Mencari Cinta', 'mantap-dalam-30-hari-mencari-cinta-5832', '2002', NULL, NULL, NULL, NULL, '158 HAN  m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(156, 4, 3, 1, 'SAINT-LUKE-LIBRARY-mantapdalam30hari:menjagahubungancinta-3562', 'Mantap dalam 30 hari : Menjaga Hubungan Cinta', 'mantap-dalam-30-hari-menjaga-hubungan-cinta-4485', '2002', NULL, NULL, NULL, NULL, '159 HAN  m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(157, 1, 3, 1, 'SAINT-LUKE-LIBRARY-mengembangkanbakatdankreativitasanaksekolah-7299', 'Mengembangkan Bakat dan Kreativitas Anak Sekolah', 'mengembangkan-bakat-dan-kreativitas-anak-sekolah-8270', '1999', NULL, NULL, NULL, NULL, '155.4 MUN m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(158, 61, 3, 1, 'SAINT-LUKE-LIBRARY-thepoweroftwo:pemberdayaanbagiorangtuadananak-9934', 'The Power of Two : Pemberdayaan Bagi Orangtua dan Anak', 'the-power-of-two-pemberdayaan-bagi-orangtua-dan-anak-4067', '2004', NULL, NULL, NULL, NULL, '153.6 VAL t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(159, 61, 3, 1, 'SAINT-LUKE-LIBRARY-suksesdirumah,suksesdikantor:supermom-5362', 'Sukses di rumah, sukses di kantor : Super Mom', 'sukses-di-rumah-sukses-di-kantor-super-mom-5624', '2005', NULL, NULL, NULL, NULL, '158.1 BUC s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(160, 61, 3, 1, 'SAINT-LUKE-LIBRARY-kakak-adikrukunaladr.brazleton-7927', 'Kakak-adik Rukun Ala dr. Brazleton', 'kakak-adik-rukun-ala-dr-brazleton-1269', '2005', NULL, NULL, NULL, NULL, '173 BRA k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(161, 44, 3, 1, 'SAINT-LUKE-LIBRARY-smartparentingmendidikdenganbijak-4428', 'Smart Parenting Mendidik dengan Bijak', 'smart-parenting-mendidik-dengan-bijak-3502', NULL, NULL, NULL, NULL, NULL, '155.4 RIM m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27');
INSERT INTO `books` (`id`, `publisher_id`, `added_by`, `language_id`, `book_code`, `title`, `slug`, `publication_year`, `isbn`, `synopsis`, `number_of_pages`, `location_of_book_id`, `classification_number`, `volume`, `status`, `cover`, `price`, `is_published`, `is_spotlight`, `deleted_at`, `created_at`, `updated_at`) VALUES
(162, 62, 3, 1, 'SAINT-LUKE-LIBRARY-memotivasisikecil-7412', 'Memotivasi Si Kecil', 'memotivasi-si-kecil-8516', '2002', NULL, NULL, NULL, NULL, '158.1 KAR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(163, 61, 3, 1, 'SAINT-LUKE-LIBRARY-childrenatpromise:9prinsipuntukmembantuanak-anaksuksesdiduniayangpenuhrisiko-7829', 'Children At Promise: 9 Prinsip untuk Membantu Anak-anak Sukses di Dunia yang Penuh Risiko', 'children-at-promise-9-prinsip-untuk-membantu-anak-anak-sukses-di-dunia-yang-penuh-risiko-5456', '2003', NULL, NULL, NULL, NULL, '155.4 STU c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(164, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:kewajibandanhakku-untuksd/mikelasiii-4274', 'Tematik Terpadu : Kewajiban dan Hakku - untuk SD/MI Kelas III', 'tematik-terpadu-kewajiban-dan-hakku-untuk-sdmi-kelas-iii-5877', '2018', NULL, NULL, NULL, NULL, '323 IRE k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(165, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:hiduprukununtuk-sd/mikelasii-1151', 'Tematik Terpadu : Hidup Rukun Untuk - SD/MI Kelas II', 'tematik-terpadu-hidup-rukun-untuk-sdmi-kelas-ii-4779', '2016', NULL, NULL, NULL, NULL, '372.83 AST h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(166, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:pahlawanku-untuksd/mikelasiv-1438', 'Tematik Terpadu : Pahlawanku  - Untuk SD/MI Kelas IV', 'tematik-terpadu-pahlawanku-untuk-sdmi-kelas-iv-6761', '2018', NULL, NULL, NULL, NULL, '372.89 SUS p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(167, 4, 3, 1, 'SAINT-LUKE-LIBRARY-tematikterpadu:globalisasi-untuksdkelasvi-5289', 'Tematik Terpadu : Globalisasi  - Untuk SD Kelas VI', 'tematik-terpadu-globalisasi-untuk-sd-kelas-vi-6096', '2018', NULL, NULL, NULL, NULL, '303.48 KRI g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(168, 4, 3, 1, 'SAINT-LUKE-LIBRARY-hidupbersihdansehat:untuksd/mikelasii-4906', 'Hidup Bersih dan Sehat : Untuk SD/MI Kelas II', 'hidup-bersih-dan-sehat-untuk-sdmi-kelas-ii-3038', '2016', NULL, NULL, NULL, NULL, '303 AST h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(169, 63, 3, 1, 'SAINT-LUKE-LIBRARY-bahasaingrrissma/makelasx-semester2-9481', 'Bahasa Ingrris SMA/MA Kelas X - Semester 2', 'bahasa-ingrris-smama-kelas-x-semester-2-8938', '2014', NULL, NULL, NULL, NULL, '428.24 WID b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(170, 58, 3, 1, 'SAINT-LUKE-LIBRARY-tragediwakilrakyat:perjuanganmenegakankedaulatanrakyat-6022', 'Tragedi Wakil Rakyat : Perjuangan Menegakan Kedaulatan Rakyat', 'tragedi-wakil-rakyat-perjuangan-menegakan-kedaulatan-rakyat-8301', '1999', NULL, NULL, NULL, NULL, '303.64 SIH t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(171, 44, 3, 1, 'SAINT-LUKE-LIBRARY-menentangtirani:aksimahasisawa\'77/\'78-8606', 'Menentang Tirani :Aksi Mahasisawa \'77/\'78', 'menentang-tirani-aksi-mahasisawa-7778-8546', '2000', NULL, NULL, NULL, NULL, '322.4 BUD m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(172, 44, 3, 1, 'SAINT-LUKE-LIBRARY-menguraihubunganagamadannegara-7732', 'Mengurai Hubungan Agama dan Negara', 'mengurai-hubungan-agama-dan-negara-6607', '1999', NULL, NULL, NULL, NULL, '322.1 WAH m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(173, 64, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahnasionalindonesiai-2611', 'SEJARAH NASIONAL INDONESIA I', 'sejarah-nasional-indonesia-i-5264', '1990', NULL, NULL, NULL, NULL, '959.8 PUS s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(174, 64, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahnasionalindonesiaii-7691', 'SEJARAH NASIONAL INDONESIA II', 'sejarah-nasional-indonesia-ii-3937', '1990', NULL, NULL, NULL, NULL, '959.8 PUS s', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(175, 64, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahnasionalindonesiaiii-4467', 'SEJARAH NASIONAL INDONESIA III', 'sejarah-nasional-indonesia-iii-3358', '1990', NULL, NULL, NULL, NULL, '959.8 PUS s', '3', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(176, 64, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahnasionalindonesiaiv-3258', 'SEJARAH NASIONAL INDONESIA IV', 'sejarah-nasional-indonesia-iv-4272', '1990', NULL, NULL, NULL, NULL, '959.8 PUS s', '4', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(177, 58, 3, 1, 'SAINT-LUKE-LIBRARY-bungkarnodanwacanaislam:kenangan100tahunbungkarno-5912', 'Bung Karno dan Wacana Islam : Kenangan 100 tahun Bung Karno', 'bung-karno-dan-wacana-islam-kenangan-100-tahun-bung-karno-1104', '2001', NULL, NULL, NULL, NULL, '923. 2 RAH b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(178, 58, 3, 1, 'SAINT-LUKE-LIBRARY-bungkarnodanwacanakonstitusidandemokrasi:kenangan100tahunbungkarno-1871', 'Bung Karno dan Wacana Konstitusi dan Demokrasi : Kenangan 100 tahun Bung Karno', 'bung-karno-dan-wacana-konstitusi-dan-demokrasi-kenangan-100-tahun-bung-karno-2807', '2001', NULL, NULL, NULL, NULL, '923. 2 RAH b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(179, 65, 3, 1, 'SAINT-LUKE-LIBRARY-mengenangsjhrir-2509', 'Mengenang Sjhrir', 'mengenang-sjhrir-5634', '1980', NULL, NULL, NULL, NULL, '923.259 ANW m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(180, 65, 3, 1, 'SAINT-LUKE-LIBRARY-kesaksiantentangbungkarno1945-1967-7023', 'Kesaksian Tentang Bung Karno 1945-1967', 'kesaksian-tentang-bung-karno-1945-1967-9728', '2001', NULL, NULL, NULL, NULL, '928 MAR k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(181, 4, 3, 1, 'SAINT-LUKE-LIBRARY-lookahead1:anenglishcourse:smakelasx-2939', 'Look Ahead 1 : An English Course : SMA Kelas X', 'look-ahead-1-an-english-course-sma-kelas-x-1780', '2007', NULL, NULL, NULL, NULL, '428.24 SUD 1', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(182, 4, 3, 1, 'SAINT-LUKE-LIBRARY-lookahead2:anenglishcourse:smakelasxi-9190', 'Look Ahead 2 : An English Course : SMA Kelas XI', 'look-ahead-2-an-english-course-sma-kelas-xi-8022', '2007', NULL, NULL, NULL, NULL, '428.24 SUD 2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(183, 5, 3, 1, 'SAINT-LUKE-LIBRARY-interlanguage:englishforsmakelasxii-scienceandsocialstudyprograme-2580', 'Interlanguage : English for SMA Kelas XII - Science and social Study Programe', 'interlanguage-english-for-sma-kelas-xii-science-and-social-study-programe-5537', '2008', NULL, NULL, NULL, NULL, '428 PRI i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(184, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgeigcse:firstlanguageenglish-languageandskillspracticebook-1371', 'Cambridge IGCSE : First Language English - Language and Skills Practice Book', 'cambridge-igcse-first-language-english-language-and-skills-practice-book-7692', '2018', NULL, NULL, NULL, NULL, '428.007 COX', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(185, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgecheckpointenglishworkbook-9888', 'Cambridge Checkpoint English Workbook', 'cambridge-checkpoint-english-workbook-8400', '2012', NULL, NULL, NULL, NULL, '428.007 COX', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(186, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgelowersecondary:english-learner\'sbook7-5174', 'Cambridge Lower Secondary : English - Learner\'s Book 7', 'cambridge-lower-secondary-english-learners-book-7-7521', '2021', NULL, NULL, NULL, NULL, '428.007 COX', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(187, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgelowersecondary:english-workbook7-7884', 'Cambridge Lower Secondary : English - Work Book 7', 'cambridge-lower-secondary-english-work-book-7-5575', '2021', NULL, NULL, NULL, NULL, '428.007 COX', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(188, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgelowersecondary:english-workbook8-2878', 'Cambridge Lower Secondary : English - Work Book 8', 'cambridge-lower-secondary-english-work-book-8-3264', '2021', NULL, NULL, NULL, NULL, '428.007 COX', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(189, 5, 3, 1, 'SAINT-LUKE-LIBRARY-belajaripa:membukacakrawalaalamsekitar-smpkelasviii-3811', 'Belajar IPA : Membuka Cakrawala Alam Sekitar - SMP Kelas VIII', 'belajar-ipa-membuka-cakrawala-alam-sekitar-smp-kelas-viii-3516', '2008', NULL, NULL, NULL, NULL, '500 KAR b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(190, 4, 3, 1, 'SAINT-LUKE-LIBRARY-ipaterpadusma/mtskelasix-7162', 'IPA Terpadu SMA/MTs Kelas IX', 'ipa-terpadu-smamts-kelas-ix-6312', '2013', NULL, NULL, NULL, NULL, '500 SUL i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(191, 47, 3, 1, 'SAINT-LUKE-LIBRARY-ilmupengetahuanalamsmp/mtskelasviii-semester1-7415', 'Ilmu Pengetahuan Alam SMP/MTs Kelas VIII - Semester 1', 'ilmu-pengetahuan-alam-smpmts-kelas-viii-semester-1-2553', '2017', NULL, NULL, NULL, NULL, '507 KEM i', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(192, 4, 3, 1, 'SAINT-LUKE-LIBRARY-ipaterpadusmp/mtskelasviii-5655', 'IPA Terpadu SMP/MTs Kelas VIII', 'ipa-terpadu-smpmts-kelas-viii-2208', '2013', NULL, NULL, NULL, NULL, '500 TIM i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(193, 47, 3, 1, 'SAINT-LUKE-LIBRARY-ilmupengetahuanalamsmp/mtskelasviii-semester2-8592', 'Ilmu Pengetahuan Alam SMP/MTs Kelas VIII - Semester 2', 'ilmu-pengetahuan-alam-smpmts-kelas-viii-semester-2-8097', '2017', NULL, NULL, NULL, NULL, '507 KEM i', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(194, 47, 3, 1, 'SAINT-LUKE-LIBRARY-ilmupengetahuanalamsmp/mtskelasvii-semester1-7713', 'Ilmu Pengetahuan Alam SMP/MTs Kelas VII - Semester 1', 'ilmu-pengetahuan-alam-smpmts-kelas-vii-semester-1-8411', '2017', NULL, NULL, NULL, NULL, '507 WID I /2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(195, 66, 3, 1, 'SAINT-LUKE-LIBRARY-lowersecondaryscience8-6249', 'Lower Secondary Science 8', 'lower-secondary-science-8-1947', '2022', NULL, NULL, NULL, NULL, '500 RIL l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(196, 30, 3, 1, 'SAINT-LUKE-LIBRARY-ilmupengetahuanalamsmp/mtskelasvii-semester1-5727', 'Ilmu Pengetahuan Alam SMP/MTs Kelas VII - Semester 1', 'ilmu-pengetahuan-alam-smpmts-kelas-vii-semester-1-1111', '2016', NULL, NULL, NULL, NULL, '500 SUP i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(197, 22, 3, 1, 'SAINT-LUKE-LIBRARY-ayobelajarilmupengetahuanalam:ipa-kelas4sd-2850', 'Ayo Belajar Ilmu Pengetahuan Alam : IPA -Kelas 4 SD', 'ayo-belajar-ilmu-pengetahuan-alam-ipa-kelas-4-sd-8750', '2009', NULL, NULL, NULL, NULL, '500 SUM a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(198, 4, 3, 1, 'SAINT-LUKE-LIBRARY-sainsuntuksekolahdasarkelasvi-9357', 'Sains Untuk Sekolah Dasar Kelas VI', 'sains-untuk-sekolah-dasar-kelas-vi-1918', '2004', NULL, NULL, NULL, NULL, '500 HAR s', '6', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(199, 4, 3, 1, 'SAINT-LUKE-LIBRARY-scienceforelementaryschoolyeariiisemester1-4201', 'Science for Elementary School Year III Semester 1', 'science-for-elementary-school-year-iii-semester-1-6668', '2010', NULL, NULL, NULL, NULL, '500 TIM s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(200, 4, 3, 1, 'SAINT-LUKE-LIBRARY-scienceforelementaryschoolyeariiisemester2-1123', 'Science for Elementary School Year III Semester 2', 'science-for-elementary-school-year-iii-semester-2-5255', '2010', NULL, NULL, NULL, NULL, '501 TIM s 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(201, 4, 3, 1, 'SAINT-LUKE-LIBRARY-aktifmndirimempersiapkanulanganharianampuh:ilmupengetahuanalam-untuksdkelas5semester1-7195', 'Aktif Mndiri mempersiapkan ulangan harian AMPUH : Ilmu Pengetahuan Alam - Untuk SD Kelas 5 Semester 1', 'aktif-mndiri-mempersiapkan-ulangan-harian-ampuh-ilmu-pengetahuan-alam-untuk-sd-kelas-5-semester-1-3831', '2008', NULL, NULL, NULL, NULL, '500 TIM i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(202, 4, 3, 1, 'SAINT-LUKE-LIBRARY-ipaaktif:untuksdkelasiii-3574', 'IPA aktif : Untuk SD Kelas III', 'ipa-aktif-untuk-sd-kelas-iii-7076', '2006', NULL, NULL, NULL, NULL, '500 SYU i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(203, 4, 3, 1, 'SAINT-LUKE-LIBRARY-ipaaktif:untuksdkelasiv-7289', 'IPA aktif : Untuk SD Kelas IV', 'ipa-aktif-untuk-sd-kelas-iv-4744', '2006', NULL, NULL, NULL, NULL, '500 SYU i 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(204, 67, 3, 1, 'SAINT-LUKE-LIBRARY-keterampilanrahasiauntukmenghitungcepat:matematiacepat-9756', 'Keterampilan Rahasia untuk Menghitung Cepat : Matematia CEPAT', 'keterampilan-rahasia-untuk-menghitung-cepat-matematia-cepat-9216', '2004', NULL, NULL, NULL, NULL, '510 HAN m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(205, 40, 3, 1, 'SAINT-LUKE-LIBRARY-matematikakelasviisemester1-9032', 'Matematika Kelas VII Semester 1', 'matematika-kelas-vii-semester-1-5874', '2017', NULL, NULL, NULL, NULL, '510 ASA m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(206, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematikauntuksmp/mtskelasviiisemester1-2161', 'Matematika Untuk SMP/MTs Kelas VIII Semester 1', 'matematika-untuk-smpmts-kelas-viii-semester-1-3129', '2017', NULL, NULL, NULL, NULL, '510 ADI m/1', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(207, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematikauntuksmp/mtskelasviiisemester2-8721', 'Matematika Untuk SMP/MTs Kelas VIII Semester 2', 'matematika-untuk-smpmts-kelas-viii-semester-2-9136', '2017', NULL, NULL, NULL, NULL, '510 ADI m/2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(208, 4, 3, 1, 'SAINT-LUKE-LIBRARY-mandirimengasahkemampuandiri:matematika-smp/mtskelasvii-2745', 'Mandiri Mengasah Kemampuan Diri : Matematika - SMP/MTs Kelas VII', 'mandiri-mengasah-kemampuan-diri-matematika-smpmts-kelas-vii-9952', '2013', NULL, NULL, NULL, NULL, '510 KUR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(209, 40, 3, 1, 'SAINT-LUKE-LIBRARY-matematikasmp/mtskelasviiisemester1-2215', 'Matematika SMP/MTs Kelas VIII Semester 1', 'matematika-smpmts-kelas-viii-semester-1-2618', '2017', NULL, NULL, NULL, NULL, '510 ASA m 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(210, 5, 3, 1, 'SAINT-LUKE-LIBRARY-bahasadansastraindonesiauntuksma/makelasxiiprogramipa/ips-9285', 'Bahasa dan Sastra Indonesia Untuk SMA/MA Kelas XII Program IPA/IPS', 'bahasa-dan-sastra-indonesia-untuk-smama-kelas-xii-program-ipaips-7473', '2008', NULL, NULL, NULL, NULL, '410 ROH b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(211, 68, 3, 1, 'SAINT-LUKE-LIBRARY-asyiknyamenulispuisi:wujudkanide-idecemerlangmu-2928', 'Asyiknya Menulis Puisi : Wujudkan ide-ide Cemerlangmu', 'asyiknya-menulis-puisi-wujudkan-ide-ide-cemerlangmu-4487', '2007', NULL, NULL, NULL, NULL, '810 MAG a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(212, 68, 3, 1, 'SAINT-LUKE-LIBRARY-asyiknyamenuliscerita:wujudkanide-idecemerlangmu-8914', 'Asyiknya Menulis Cerita : Wujudkan ide-ide Cemerlangmu', 'asyiknya-menulis-cerita-wujudkan-ide-ide-cemerlangmu-6591', '2007', NULL, NULL, NULL, NULL, '810 WAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(213, 68, 3, 1, 'SAINT-LUKE-LIBRARY-asyiknyamenulislaporan:wujudkanide-idecemerlangmu-3594', 'Asyiknya Menulis Laporan : Wujudkan ide-ide Cemerlangmu', 'asyiknya-menulis-laporan-wujudkan-ide-ide-cemerlangmu-9637', '2007', NULL, NULL, NULL, NULL, '810 FAU a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(214, 68, 3, 1, 'SAINT-LUKE-LIBRARY-asyiknyamenulissuratdanemail:wujudkanide-idecemerlangmu-8182', 'Asyiknya Menulis Surat dan Email : Wujudkan ide-ide Cemerlangmu', 'asyiknya-menulis-surat-dan-email-wujudkan-ide-ide-cemerlangmu-1050', '2007', NULL, NULL, NULL, NULL, '810 WAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(215, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:snowwhite-2036', 'Cerita Bergambar Diney : Snow White', 'cerita-bergambar-diney-snow-white-8650', '2009', NULL, NULL, NULL, NULL, '823.8 Dis s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(216, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:peterpan-6172', 'Cerita Bergambar Diney : Peterpan', 'cerita-bergambar-diney-peterpan-5259', '2009', NULL, NULL, NULL, NULL, '823.8 Dis p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(217, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:mulan-7477', 'Cerita Bergambar Diney : Mulan', 'cerita-bergambar-diney-mulan-5334', '2009', NULL, NULL, NULL, NULL, '823.8 Dis m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(218, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:beautyandthebeast-5209', 'Cerita Bergambar Diney : Beauty and the Beast', 'cerita-bergambar-diney-beauty-and-the-beast-8484', '2009', NULL, NULL, NULL, NULL, '823.8 Dis b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(219, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:aliceinwonderland-1520', 'Cerita Bergambar Diney : Alice in Wonderland', 'cerita-bergambar-diney-alice-in-wonderland-9329', '2009', NULL, NULL, NULL, NULL, '823.8 Dis s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(220, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ceritabergambardiney:pinocchio-7639', 'Cerita Bergambar Diney : Pinocchio', 'cerita-bergambar-diney-pinocchio-3596', '2009', NULL, NULL, NULL, NULL, '823.8 Dis s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(221, 69, 3, 1, 'SAINT-LUKE-LIBRARY-barney\'ssuper-dee-duper:abc\'s-6758', 'Barney\'s Super-Dee-Duper : ABC\'s', 'barneys-super-dee-duper-abcs-3730', '2004', NULL, NULL, NULL, NULL, '428.6 INC b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(222, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:hidupteknologi-8132', 'Quick & Flupke : Hidup Teknologi', 'quick-flupke-hidup-teknologi-7436', '2010', NULL, NULL, NULL, NULL, '741.5 HAR q', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(223, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:tanpaampun-1588', 'Quick & Flupke : Tanpa Ampun', 'quick-flupke-tanpa-ampun-5382', '2010', NULL, NULL, NULL, NULL, '741.5 HAR t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(224, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:malapetaka-3200', 'Quick & Flupke : Malapetaka', 'quick-flupke-malapetaka-1236', '2010', NULL, NULL, NULL, NULL, '741.5 HAR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(225, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:kenabatunya-8450', 'Quick & Flupke : Kena Batunya', 'quick-flupke-kena-batunya-3188', '2010', NULL, NULL, NULL, NULL, '741.5 HAR k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(226, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:tukangkibul-8753', 'Quick & Flupke : Tukang Kibul', 'quick-flupke-tukang-kibul-3707', '2010', NULL, NULL, NULL, NULL, '741.5 HAR k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(227, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:kencangkansabukpengaman-8022', 'Quick & Flupke : Kencangkan Sabuk Pengaman', 'quick-flupke-kencangkan-sabuk-pengaman-2126', '2010', NULL, NULL, NULL, NULL, '741.5 HAR t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(228, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:sekaranggiliranmu-4266', 'Quick & Flupke : Sekarang Giliranmu', 'quick-flupke-sekarang-giliranmu-9599', '2010', NULL, NULL, NULL, NULL, '741.5 HAR s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(229, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:kembangkanlayar-9915', 'Quick & Flupke : Kembangkan Layar', 'quick-flupke-kembangkan-layar-6789', '2010', NULL, NULL, NULL, NULL, '741.5 HAR k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(230, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:baik-baiksaja-7829', 'Quick & Flupke : Baik-baik Saja', 'quick-flupke-baik-baik-saja-6375', '2010', NULL, NULL, NULL, NULL, '741.5 HAR b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(231, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:maafbu-2101', 'Quick & Flupke : Maaf Bu', 'quick-flupke-maaf-bu-9178', '2010', NULL, NULL, NULL, NULL, '741.5 HAR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(232, 1, 3, 1, 'SAINT-LUKE-LIBRARY-quick&flupke:mainanterlarang-1149', 'Quick & Flupke : Mainan Terlarang', 'quick-flupke-mainan-terlarang-6065', '2010', NULL, NULL, NULL, NULL, '741.5 HAR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(233, 70, 3, 1, 'SAINT-LUKE-LIBRARY-kartunbenny&mike-5601', 'Kartun Benny & Mike', 'kartun-benny-mike-8346', '2009', NULL, NULL, NULL, NULL, '741.5 RAC k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(234, 71, 3, 1, 'SAINT-LUKE-LIBRARY-lagulamaberulanglagi-3791', 'Lagu Lama Berulang Lagi', 'lagu-lama-berulang-lagi-3821', '2015', NULL, NULL, NULL, NULL, '741.5 RAC l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(235, 71, 3, 1, 'SAINT-LUKE-LIBRARY-tigamanulajalan-jalansingapura-2139', 'Tiga Manula Jalan-jalan Singapura', 'tiga-manula-jalan-jalan-singapura-8846', '2013', NULL, NULL, NULL, NULL, '741.5 RAC t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(236, 71, 3, 1, 'SAINT-LUKE-LIBRARY-tigamanulajalan-jalankepantura-9647', 'Tiga Manula Jalan-jalan Ke Pantura', 'tiga-manula-jalan-jalan-ke-pantura-4594', '2012', NULL, NULL, NULL, NULL, '741.5 RAC l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(237, 72, 3, 1, 'SAINT-LUKE-LIBRARY-micecartoon:obladiobladalifegoeson-2610', 'Mice Cartoon : Obladi Oblada Life Goes On', 'mice-cartoon-obladi-oblada-life-goes-on-9228', '2012', NULL, NULL, NULL, NULL, '741.5 RAC l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(238, 73, 3, 1, 'SAINT-LUKE-LIBRARY-elliotmindsthestore-9494', 'Elliot Minds the Store', 'elliot-minds-the-store-1059', '2009', NULL, NULL, NULL, NULL, '813  KEL e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(239, 74, 3, 1, 'SAINT-LUKE-LIBRARY-garfieldandthetiger-4565', 'Garfield and the Tiger', 'garfield-and-the-tiger-2243', '2005', NULL, NULL, NULL, NULL, '813 PAW g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(240, 74, 3, 1, 'SAINT-LUKE-LIBRARY-garfieldinthepark-5178', 'Garfield in the Park', 'garfield-in-the-park-7282', '2005', NULL, NULL, NULL, NULL, '813 PAW g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(241, 75, 3, 1, 'SAINT-LUKE-LIBRARY-smurfblindup-8645', 'Smurf Blind up', 'smurf-blind-up-8321', '2016', NULL, NULL, NULL, NULL, '741.5 JOS s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(242, 75, 3, 1, 'SAINT-LUKE-LIBRARY-kisahbijakkitabsuci:powerbiblecomic1-8791', 'Kisah Bijak Kitab Suci : Power Bible Comic 1', 'kisah-bijak-kitab-suci-power-bible-comic-1-1048', '2005', NULL, NULL, NULL, NULL, '200 JOO k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(243, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:studentbook4-moviestudentisland-7108', 'Poptropica English : Student Book 4 - Movie Student Island', 'poptropica-english-student-book-4-movie-student-island-6685', '2015', NULL, NULL, NULL, NULL, '428 JOL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(244, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook6-futureisland-5711', 'Poptropica English : WorkBook 6 - Future Island', 'poptropica-english-workbook-6-future-island-3243', '2015', NULL, NULL, NULL, NULL, '428 MOR f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(245, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:studentbook6-futureisland-9486', 'Poptropica English : Student Book 6 - Future Island', 'poptropica-english-student-book-6-future-island-2979', '2015', NULL, NULL, NULL, NULL, '428 MOR f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(246, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:studentbook1-familyisland-9542', 'Poptropica English : Student Book 1 - Family Island', 'poptropica-english-student-book-1-family-island-6556', '2015', NULL, NULL, NULL, NULL, '429  MIL f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(247, 46, 3, 1, 'SAINT-LUKE-LIBRARY-kid\'sbox:updatedsecondedition-3476', 'Kid\'s Box : Updated Second Edition', 'kids-box-updated-second-edition-3836', '2017', NULL, NULL, NULL, NULL, '428 NIX k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(248, 77, 3, 1, 'SAINT-LUKE-LIBRARY-englishchest2-2007', 'English Chest 2', 'english-chest-2-2390', '2017', NULL, NULL, NULL, NULL, '428 ROB e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(249, 78, 3, 1, 'SAINT-LUKE-LIBRARY-youandme:activitybook1-6810', 'You and Me : Activity Book 1', 'you-and-me-activity-book-1-9827', '2017', NULL, NULL, NULL, NULL, '428 TOM y', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(250, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook1-familyisland-2356', 'Poptropica English : WORKBOOK 1 - Family Island', 'poptropica-english-workbook-1-family-island-5588', '2015', NULL, NULL, NULL, NULL, '428 MIL f 1/2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(251, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook3-spaceisland-4662', 'Poptropica English : WORKBOOK 3 - Space Island', 'poptropica-english-workbook-3-space-island-8118', '2015', NULL, NULL, NULL, NULL, '428 JOL s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(252, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:studentbook3-spaceisland-8738', 'Poptropica English : STUDENT BOOK 3 - Space Island', 'poptropica-english-student-book-3-space-island-3486', '2015', NULL, NULL, NULL, NULL, '428 JOL s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(253, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook5-iceisland-9096', 'Poptropica English : WORKBOOK 5 - Ice Island', 'poptropica-english-workbook-5-ice-island-6909', '2015', NULL, NULL, NULL, NULL, '428 MOR i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(254, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook2-tropicalisland-7573', 'Poptropica English : WORKBOOK 2 - Tropical Island', 'poptropica-english-workbook-2-tropical-island-5228', '2015', NULL, NULL, NULL, NULL, '428 ERO t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(255, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:workbook4-moviestudentislan-9613', 'Poptropica English : WORKBOOK 4 - Movie Student Islan', 'poptropica-english-workbook-4-movie-student-islan-9855', '2015', NULL, NULL, NULL, NULL, '428 MOR m 4/2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(256, 79, 3, 1, 'SAINT-LUKE-LIBRARY-learningcomprehension:funwithexercisesinreadingandundertandingenglish-numbers-1894', 'Learning comprehension : Fun with exercises in reading and undertanding English - NUMBERS', 'learning-comprehension-fun-with-exercises-in-reading-and-undertanding-english-numbers-7576', '1992', NULL, NULL, NULL, NULL, '428.6 TIM i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(257, 54, 3, 1, 'SAINT-LUKE-LIBRARY-backpackworkbook-9635', 'BACKPACK Workbook', 'backpack-workbook-1863', '2010', NULL, NULL, NULL, NULL, '428.24 HER b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(258, 76, 3, 1, 'SAINT-LUKE-LIBRARY-poptropicaenglish:studentbookandebook5-iceisland-6497', 'Poptropica English : STUDENT BOOK and eBook 5 - Ice Island', 'poptropica-english-student-book-and-ebook-5-ice-island-6341', '2015', NULL, NULL, NULL, NULL, '428 MILL I', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(259, 80, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanagamakatolikdanbudipekertibelajarmengenalyesus,untuksdkelasii-4727', 'Pendidikan Agama Katolik dan Budi Pekerti Belajar Mengenal Yesus, Untuk SD kelas II', 'pendidikan-agama-katolik-dan-budi-pekerti-belajar-mengenal-yesus-untuk-sd-kelas-ii-1233', '2020', NULL, NULL, NULL, NULL, '268.28 DAP p', NULL, 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(260, 81, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanagamakatolikdanbudipekerti:yesussangkreator:mengikutijejakyesusuntukkelasiv-8293', 'Pendidikan Agama Katolik dan Budi Pekerti : YESUS SANG KREATOR : MENGIKUTI JEJAK YESUS Untuk KELAS IV', 'pendidikan-agama-katolik-dan-budi-pekerti-yesus-sang-kreator-mengikuti-jejak-yesus-untuk-kelas-iv-5322', '2022', NULL, NULL, NULL, NULL, '268.28 PRA p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(261, 82, 3, 1, 'SAINT-LUKE-LIBRARY-bahasamanadarinsekolahdasarkelas5-4405', 'Bahasa manadarin Sekolah Dasar Kelas 5', 'bahasa-manadarin-sekolah-dasar-kelas-5-4346', '2012', NULL, NULL, NULL, NULL, '495.1 CIA b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(262, 83, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksd/mikelasii-3171', 'TEKNOLOGI INFORMASI DAN KOMUNIKASI untuk SD/MI Kelas II', 'teknologi-informasi-dan-komunikasi-untuk-sdmi-kelas-ii-2432', '2006', NULL, NULL, NULL, NULL, '004.16 ART t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(263, 83, 3, 1, 'SAINT-LUKE-LIBRARY-informatikauntuksd/mikelasv-2442', 'Informatika untuk SD/MI Kelas V', 'informatika-untuk-sdmi-kelas-v-4034', '2023', NULL, NULL, NULL, NULL, '004.16 SET i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(264, NULL, 3, 1, 'SAINT-LUKE-LIBRARY-akusukabelajarbunga-7537', 'Aku Suka Belajar Bunga', 'aku-suka-belajar-bunga-4732', '2009', NULL, NULL, NULL, NULL, '583 CHU a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(265, 84, 3, 1, 'SAINT-LUKE-LIBRARY-bahasamanadarinsekolahdasarkelas6-2912', 'Bahasa manadarin Sekolah Dasar Kelas 6', 'bahasa-manadarin-sekolah-dasar-kelas-6-4802', '2023', NULL, NULL, NULL, NULL, '495.1 CIA b 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(266, 83, 3, 1, 'SAINT-LUKE-LIBRARY-informatikauntuksd/mikelasvi-2397', 'Informatika untuk SD/MI Kelas VI', 'informatika-untuk-sdmi-kelas-vi-9895', '2024', NULL, NULL, NULL, NULL, '004.16 SET i 2', '6', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(267, 81, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanagamakatolikdanbudipekerti:yesussangpenyelamat-kreatifsepertiyesus-9248', 'Pendidikan Agama Katolik dan Budi Pekerti : Yesus Sang Penyelamat - KREATIF SEPERTI YESUS', 'pendidikan-agama-katolik-dan-budi-pekerti-yesus-sang-penyelamat-kreatif-seperti-yesus-8468', '2022', NULL, NULL, NULL, NULL, '268.28 PRA y', '6', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(268, 6, 3, 1, 'SAINT-LUKE-LIBRARY-workbook:flyingstart-startyourjourneysmakelasix-7861', 'Workbook : Flying Start - Start Your Journey SMA KELAS IX', 'workbook-flying-start-start-your-journey-sma-kelas-ix-8040', '2007', NULL, NULL, NULL, NULL, NULL, '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(269, 4, 3, 1, 'SAINT-LUKE-LIBRARY-brightanenglishcourseuntuksmp/mtskelasvii-1139', 'BRIGHT An English Course untuk SMP/MTs Kelas VII', 'bright-an-english-course-untuk-smpmts-kelas-vii-5550', '2013', NULL, NULL, NULL, NULL, '428.2 ZAI b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(270, 82, 3, 1, 'SAINT-LUKE-LIBRARY-speedupenglishsd-6857', 'Speed Up English  SD', 'speed-up-english-sd-6745', '2006', NULL, NULL, NULL, NULL, '428.1 KUR s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(271, 77, 3, 1, 'SAINT-LUKE-LIBRARY-englishchest1-5596', 'English Chest 1', 'english-chest-1-7037', '2012', NULL, NULL, NULL, NULL, '428 ROB e 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(272, 54, 3, 1, 'SAINT-LUKE-LIBRARY-backpackgold5-8071', 'BACKPACK Gold 5', 'backpack-gold-5-3009', '2013', NULL, NULL, NULL, NULL, '428.24 HER b 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(273, 4, 3, 1, 'SAINT-LUKE-LIBRARY-binabahasaindonesia,untuksdkelasiiisemester1-2465', 'Bina Bahasa Indonesia, untuk SD Kelas III Semester 1', 'bina-bahasa-indonesia-untuk-sd-kelas-iii-semester-1-8899', '2007', NULL, NULL, NULL, NULL, '499.221 TIM b 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(274, 4, 3, 1, 'SAINT-LUKE-LIBRARY-bukupendampingterpadu:bahasaindonesiauntuksd/mikelas1-1388', 'BUKU PENDAMPING Terpadu : Bahasa Indonesia untuk SD /MI Kelas 1', 'buku-pendamping-terpadu-bahasa-indonesia-untuk-sd-mi-kelas-1-5507', '2013', NULL, NULL, NULL, NULL, '499.221 IND b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(275, 4, 3, 1, 'SAINT-LUKE-LIBRARY-binabahasaindonesia,untuksdkelasvsemester1-3219', 'Bina Bahasa Indonesia, untuk SD Kelas V Semester 1', 'bina-bahasa-indonesia-untuk-sd-kelas-v-semester-1-7214', '2007', NULL, NULL, NULL, NULL, '499.221 TIM b 1', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(276, 4, 3, 1, 'SAINT-LUKE-LIBRARY-binabahasaindonesia:untuksdkelasvsemester2-5496', 'Bina Bahasa Indonesia : untuk SD Kelas V Semester 2', 'bina-bahasa-indonesia-untuk-sd-kelas-v-semester-2-5376', '2007', NULL, NULL, NULL, NULL, '499.221 TIM b 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(277, 77, 3, 1, 'SAINT-LUKE-LIBRARY-seribelajarbahasamandarin:smp/mts2-9516', 'Seri Belajar Bahasa Mandarin : SMP/MTS 2', 'seri-belajar-bahasa-mandarin-smpmts-2-9318', '2022', NULL, NULL, NULL, NULL, '495.1 HUI s 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(278, 77, 3, 1, 'SAINT-LUKE-LIBRARY-seribelajarbahasamandarin:smp/mts3-7614', 'Seri Belajar Bahasa Mandarin : SMP/MTS 3', 'seri-belajar-bahasa-mandarin-smpmts-3-1389', '2022', NULL, NULL, NULL, NULL, '495.1 HUY s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(279, NULL, 3, 1, 'SAINT-LUKE-LIBRARY-mandarinactivesma10-8851', 'Mandarin Active SMA 10', 'mandarin-active-sma-10-7306', NULL, NULL, NULL, NULL, NULL, '495.1 YIN m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(280, 82, 3, 1, 'SAINT-LUKE-LIBRARY-bahasamandarin:sekolahdasarkelas3-5554', 'BAHASA MANDARIN  : Sekolah Dasar Kelas 3', 'bahasa-mandarin-sekolah-dasar-kelas-3-4460', '2012', NULL, NULL, NULL, NULL, '495.1 CIA b 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(281, 85, 3, 1, 'SAINT-LUKE-LIBRARY-nationalgeograpihicindonesia-1420', 'NATIONAL GEOGRAPIHIC INDONESIA', 'national-geograpihic-indonesia-5664', '2011', NULL, NULL, NULL, NULL, '900 TIM n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(282, 4, 3, 1, 'SAINT-LUKE-LIBRARY-sejarah2:kelompokpemintaanilmu-ilmusosial-4270', 'SEJARAH 2: Kelompok Pemintaan Ilmu-Ilmu Sosial', 'sejarah-2-kelompok-pemintaan-ilmu-ilmu-sosial-9592', '2013', NULL, NULL, NULL, NULL, '959.8 HAP s (2)', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(283, 86, 3, 1, 'SAINT-LUKE-LIBRARY-ourmutualfriend-1028', 'OUR MUTUAL FRIEND', 'our-mutual-friend-5810', '1997', NULL, NULL, NULL, NULL, '823 DIC o', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(284, 86, 3, 1, 'SAINT-LUKE-LIBRARY-lesmiserables-8150', 'LES MISERABLES', 'les-miserables-6410', '1994', NULL, NULL, NULL, NULL, '843 HUG l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(285, 87, 3, 1, 'SAINT-LUKE-LIBRARY-themistsofavalon-5023', 'THE MISTS OF AVALON', 'the-mists-of-avalon-7493', '1982', NULL, NULL, NULL, NULL, '813 BRA t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(286, 88, 3, 1, 'SAINT-LUKE-LIBRARY-theoxfordbookofhumorousprose-3422', 'THE OXFORD BOOK OF HUMOROUS PROSE', 'the-oxford-book-of-humorous-prose-4984', '1990', NULL, NULL, NULL, NULL, '800 MUI t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(287, 89, 3, 1, 'SAINT-LUKE-LIBRARY-shockwave-5458', 'SHOCK WAVE', 'shock-wave-5994', '1996', NULL, NULL, NULL, NULL, '813 CUS s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(288, 90, 3, 1, 'SAINT-LUKE-LIBRARY-sherlockholmes:thecompleteillustratedshortstories-3583', 'SHERLOCK HOLMES : THE COMPLETE ILLUSTRATED SHORT STORIES', 'sherlock-holmes-the-complete-illustrated-short-stories-9522', '1985', NULL, NULL, NULL, NULL, '800 DOY s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(289, 91, 3, 1, 'SAINT-LUKE-LIBRARY-comprehensive:gaasguide-8892', 'COMPREHENSIVE : GAAS GUIDE', 'comprehensive-gaas-guide-4339', '1990', NULL, NULL, NULL, NULL, '657.45 MIL c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(290, 90, 3, 1, 'SAINT-LUKE-LIBRARY-theultimatehumourbook-6419', 'The Ultimate Humour Book', 'the-ultimate-humour-book-9046', '1991', NULL, NULL, NULL, NULL, '800 WOD t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(291, 92, 3, 1, 'SAINT-LUKE-LIBRARY-thedeceiver-9583', 'THE DECEIVER', 'the-deceiver-5223', '1991', NULL, NULL, NULL, NULL, '800 FOR t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(292, 93, 3, 1, 'SAINT-LUKE-LIBRARY-einsteinajaingintahu!-9731', 'Einstein aja ingin tahu !', 'einstein-aja-ingin-tahu-8859', '2004', NULL, NULL, NULL, NULL, '530 WOL e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(293, 94, 3, 1, 'SAINT-LUKE-LIBRARY-101eksperimensainsyangmenghibur-5362', '101 EKSPERIMEN SAINS YANG MENGHIBUR', '101-eksperimen-sains-yang-menghibur-8050', '2009', NULL, NULL, NULL, NULL, '507 CHA e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(294, 75, 3, 1, 'SAINT-LUKE-LIBRARY-why?thesea-1270', 'Why? The Sea', 'why-the-sea-1643', '2009', NULL, NULL, NULL, NULL, '551 WOO w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(295, 71, 3, 1, 'SAINT-LUKE-LIBRARY-kartunfisika-6288', 'KARTUN FISIKA', 'kartun-fisika-6153', '2002', NULL, NULL, NULL, NULL, '530 GON k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(296, 71, 3, 1, 'SAINT-LUKE-LIBRARY-kartunbiologigenetika-2646', 'KARTUN BIOLOGI GENETIKA', 'kartun-biologi-genetika-6748', '2002', NULL, NULL, NULL, NULL, '576.5 GON k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(297, 95, 3, 1, 'SAINT-LUKE-LIBRARY-asyikbelajarmatematika2:segitigasiku-sikupythagoras-4817', 'Asyik Belajar Matematika 2 : Segitiga Siku-siku Pythagoras', 'asyik-belajar-matematika-2-segitiga-siku-siku-pythagoras-5490', '2003', NULL, NULL, NULL, NULL, '510 RIN a 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(298, 95, 3, 1, 'SAINT-LUKE-LIBRARY-asyikbelajarmatematika3:platodan3soalyangtakterpecahkan-1174', 'Asyik Belajar Matematika 3 : Plato dan 3 Soal yang Tak Terpecahkan', 'asyik-belajar-matematika-3-plato-dan-3-soal-yang-tak-terpecahkan-9393', '2003', NULL, NULL, NULL, NULL, '510 RIN a 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(299, 95, 3, 1, 'SAINT-LUKE-LIBRARY-asyikbelajarmatematika4:operasibilanganpecahan-9197', 'Asyik Belajar Matematika 4 : Operasi Bilangan Pecahan', 'asyik-belajar-matematika-4-operasi-bilangan-pecahan-6795', '2003', NULL, NULL, NULL, NULL, '510 RIN a 4', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(300, 18, 3, 1, 'SAINT-LUKE-LIBRARY-powerbiblecomic2-9020', 'POWER BIBLE COMIC 2', 'power-bible-comic-2-6687', '2009', NULL, NULL, NULL, NULL, '220 JOO k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(301, 95, 3, 1, 'SAINT-LUKE-LIBRARY-3menitbelajarpengetahuanumum:alamsemesta,bumi,samudra-8162', '3 MENIT BELAJAR PENGETAHUAN UMUM : ALAM SEMESTA, BUMI, SAMUDRA', '3-menit-belajar-pengetahuan-umum-alam-semesta-bumi-samudra-9544', '2006', NULL, NULL, NULL, NULL, '500 HO b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(302, 15, 3, 1, 'SAINT-LUKE-LIBRARY-love,hate&hocus-pocus-4845', 'Love, Hate & Hocus -Pocus', 'love-hate-hocus-pocus-3234', '2008', NULL, NULL, NULL, NULL, '813 NAS l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(303, 15, 3, 1, 'SAINT-LUKE-LIBRARY-winterintokyo-5829', 'Winter in Tokyo', 'winter-in-tokyo-4337', '2008', NULL, NULL, NULL, NULL, '813 TAN w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(304, 15, 3, 1, 'SAINT-LUKE-LIBRARY-autumninparis-9409', 'Autumn In Paris', 'autumn-in-paris-2355', '2008', NULL, NULL, NULL, NULL, '813 TAN a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(305, 15, 3, 1, 'SAINT-LUKE-LIBRARY-summerinseoul-1307', 'Summer In Seoul', 'summer-in-seoul-7231', '2008', NULL, NULL, NULL, NULL, '813 TAN s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(306, 15, 3, 1, 'SAINT-LUKE-LIBRARY-serbukbintang-8249', 'Serbuk Bintang', 'serbuk-bintang-3044', '2007', NULL, NULL, NULL, NULL, '823 GAI s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(307, 96, 3, 1, 'SAINT-LUKE-LIBRARY-mimpi-mimpilintangmaryamahkarpov-5043', 'Mimpi-mimpi Lintang Maryamah Karpov', 'mimpi-mimpi-lintang-maryamah-karpov-5744', '2008', NULL, NULL, NULL, NULL, '899.221 HIR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(308, 96, 3, 1, 'SAINT-LUKE-LIBRARY-edensor-6110', 'Edensor', 'edensor-1198', '2008', NULL, NULL, NULL, NULL, '899.221 HIR e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(309, 96, 3, 1, 'SAINT-LUKE-LIBRARY-sangpemimpi-6905', 'Sang Pemimpi', 'sang-pemimpi-7363', '2006', NULL, NULL, NULL, NULL, '899.221 HIR s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(310, 15, 3, 1, 'SAINT-LUKE-LIBRARY-thecuckoo\'scalling-6534', 'The Cuckoo\'s Calling', 'the-cuckoos-calling-2333', '2013', NULL, NULL, NULL, NULL, '823 GAL t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(311, 15, 3, 1, 'SAINT-LUKE-LIBRARY-kompasemas-6002', 'Kompas Emas', 'kompas-emas-7831', '2008', NULL, NULL, NULL, NULL, '823 PUL t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(312, 15, 3, 1, 'SAINT-LUKE-LIBRARY-sangpengelana-1274', 'Sang Pengelana', 'sang-pengelana-8631', '2009', NULL, NULL, NULL, NULL, '813 MEY s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(313, 18, 3, 1, 'SAINT-LUKE-LIBRARY-kristalputih-7796', 'Kristal Putih', 'kristal-putih-4797', '1997', NULL, NULL, NULL, NULL, '895.6 MAS k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(314, 18, 3, 1, 'SAINT-LUKE-LIBRARY-mari-chan-9591', 'MARI-CHAN', 'mari-chan-7692', '1992', NULL, NULL, NULL, NULL, '895.6 UEH m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(315, 18, 3, 1, 'SAINT-LUKE-LIBRARY-hurtmesoftly-9225', 'Hurt Me Softly', 'hurt-me-softly-1971', '2002', NULL, NULL, NULL, NULL, '895.6 MIY h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(316, 18, 3, 1, 'SAINT-LUKE-LIBRARY-secretprincess-4142', 'Secret Princess', 'secret-princess-8144', '2007', NULL, NULL, NULL, NULL, '895.6 MIZ n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(317, 97, 3, 1, 'SAINT-LUKE-LIBRARY-epotoransu!mai-1535', 'EPOTORANSU! MAI', 'epotoransu-mai-2507', '2005', NULL, NULL, NULL, NULL, '895.6 YUU e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(318, 1, 3, 1, 'SAINT-LUKE-LIBRARY-pajama\'sromance-7712', 'Pajama\'s Romance', 'pajamas-romance-1196', '2007', NULL, NULL, NULL, NULL, '895.6 SAS p', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(319, 1, 3, 1, 'SAINT-LUKE-LIBRARY-namakumiko-8701', 'NAMAKU MIKO', 'namaku-miko-7814', '2009', NULL, NULL, NULL, NULL, '895.6 ERI n', '4', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(320, 1, 3, 1, 'SAINT-LUKE-LIBRARY-kissmewithmint-2119', 'Kiss Me with Mint', 'kiss-me-with-mint-1412', '2009', NULL, NULL, NULL, NULL, '895.6 YUU k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(321, 1, 3, 1, 'SAINT-LUKE-LIBRARY-limasekawanbereaksikembali-3873', 'Lima Sekawan Bereaksi Kembali', 'lima-sekawan-bereaksi-kembali-7333', '1982', NULL, NULL, NULL, NULL, '895.6 BLY l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(322, 1, 3, 1, 'SAINT-LUKE-LIBRARY-don\'tfallbeforebloom-2593', 'Don\'t Fall Before Bloom', 'dont-fall-before-bloom-6218', '2007', NULL, NULL, NULL, NULL, '895.63 MIE d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32');
INSERT INTO `books` (`id`, `publisher_id`, `added_by`, `language_id`, `book_code`, `title`, `slug`, `publication_year`, `isbn`, `synopsis`, `number_of_pages`, `location_of_book_id`, `classification_number`, `volume`, `status`, `cover`, `price`, `is_published`, `is_spotlight`, `deleted_at`, `created_at`, `updated_at`) VALUES
(323, 1, 3, 1, 'SAINT-LUKE-LIBRARY-lookingforthesky-9673', 'Looking For The Sky', 'looking-for-the-sky-6264', '2007', NULL, NULL, NULL, NULL, '895.63 YUU l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(324, 1, 3, 1, 'SAINT-LUKE-LIBRARY-inoceanwemeet-2767', 'In Ocean We Meet', 'in-ocean-we-meet-6591', '2006', NULL, NULL, NULL, NULL, '895.63 KAR i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(325, 1, 3, 1, 'SAINT-LUKE-LIBRARY-sprout-6736', 'Sprout', 'sprout-4206', '2008', NULL, NULL, NULL, NULL, '895.63 NAM s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(326, 1, 3, 1, 'SAINT-LUKE-LIBRARY-videoj-4496', 'Video J', 'video-j-4762', '2008', NULL, NULL, NULL, NULL, '895.63 MIC v', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(327, 1, 3, 1, 'SAINT-LUKE-LIBRARY-bond-6055', 'Bond', 'bond-4179', '2010', NULL, NULL, NULL, NULL, '895.63 MOM b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(328, 4, 3, 1, 'SAINT-LUKE-LIBRARY-seribupena:biologi-untuksmp/mtskelasvii-1453', 'Seribu Pena : BIOLOGI - UNTUK SMP/MTs KELAS VII', 'seribu-pena-biologi-untuk-smpmts-kelas-vii-1597', '2006', NULL, NULL, NULL, NULL, '570 KAR s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(329, 4, 3, 1, 'SAINT-LUKE-LIBRARY-mandirimengasahkemampuandiri:fisika-smp/mtskelasvii-9335', 'Mandiri Mengasah Kemampuan Diri : Fisika - SMP/MTs Kelas VII', 'mandiri-mengasah-kemampuan-diri-fisika-smpmts-kelas-vii-8466', '2006', NULL, NULL, NULL, NULL, '530 KAH m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(330, 4, 3, 1, 'SAINT-LUKE-LIBRARY-mandirimengasahkemampuandiri:fisika-smp/mtskelasix-2195', 'Mandiri Mengasah Kemampuan Diri : Fisika - SMP/MTs Kelas IX', 'mandiri-mengasah-kemampuan-diri-fisika-smpmts-kelas-ix-3324', '2006', NULL, NULL, NULL, NULL, '530 KAH m 2', '3', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(331, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematika:untuksmpkelasix-semester1-2803', 'MATEMATIKA : untuk SMP KELAS IX-Semester 1', 'matematika-untuk-smp-kelas-ix-semester-1-5288', '2006', NULL, NULL, NULL, NULL, '510 ADI m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(332, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematika:untuksmpkelasix-semester2-2255', 'MATEMATIKA : untuk SMP KELAS IX-Semester 2', 'matematika-untuk-smp-kelas-ix-semester-2-5102', '2006', NULL, NULL, NULL, NULL, '510 ADI m 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(333, 83, 3, 1, 'SAINT-LUKE-LIBRARY-teknologiinformasidankomunikasiuntuksd/mikelasvi-1496', 'TEKNOLOGI INFORMASI DAN KOMUNIKASI untuk SD/MI Kelas VI', 'teknologi-informasi-dan-komunikasi-untuk-sdmi-kelas-vi-3080', '2018', NULL, NULL, NULL, NULL, '004 ART t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(334, 82, 3, 1, 'SAINT-LUKE-LIBRARY-informatikasd/mikelasvi-9468', 'Informatika SD/MI Kelas VI', 'informatika-sdmi-kelas-vi-1689', '2019', NULL, NULL, NULL, NULL, '004 RAH i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(335, 55, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanjasmani,olahragadankesehatan-4724', 'Pendidikan Jasmani, Olahraga dan Kesehatan', 'pendidikan-jasmani-olahraga-dan-kesehatan-1070', '2017', NULL, NULL, NULL, NULL, '796 NUR p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(336, 30, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikankewarganegaraan:kelasviiisemester1-2859', 'Pendidikan Kewarganegaraan :Kelas VIII Semester 1', 'pendidikan-kewarganegaraan-kelas-viii-semester-1-2690', '2015', NULL, NULL, NULL, NULL, '320 FAI p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(337, 98, 3, 1, 'SAINT-LUKE-LIBRARY-tragedinasional:pecobaankupg30s/pkidiindonesia-1613', 'TRAGEDI NASIONAL : PECOBAAN KUP G 30 S/PKI DI INDONESIA', 'tragedi-nasional-pecobaan-kup-g-30-spki-di-indonesia-4478', '1968', NULL, NULL, NULL, NULL, '959.8 NOT t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(338, 44, 3, 1, 'SAINT-LUKE-LIBRARY-bungkarnodanekonomiberdikari-5208', 'BUNG KARNO DAN EKONOMI BERDIKARI', 'bung-karno-dan-ekonomi-berdikari-4961', '2001', NULL, NULL, NULL, NULL, '923.2 RAH b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(339, 99, 3, 1, 'SAINT-LUKE-LIBRARY-ahmadyani:sebuahkenang-kenangan-9582', 'AHMAD YANI : Sebuah Kenang-kenangan', 'ahmad-yani-sebuah-kenang-kenangan-7042', '1984', NULL, NULL, NULL, NULL, '923.5 YAN s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(340, 100, 3, 1, 'SAINT-LUKE-LIBRARY-balzacandthelittlechineseseamstress-4264', 'Balzac and the Little Chinese Seamstress', 'balzac-and-the-little-chinese-seamstress-2745', '2002', NULL, NULL, NULL, NULL, '895.13 SIJ b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(341, 18, 3, 1, 'SAINT-LUKE-LIBRARY-thesoloist:mimpiyanghilang,persahabatanyangdiraguakandankekuatanmusikyangmembebaskan-7640', 'THE SOLOIST : Mimpi yang hilang, Persahabatan yang Diraguakan dan Kekuatan Musik yang Membebaskan', 'the-soloist-mimpi-yang-hilang-persahabatan-yang-diraguakan-dan-kekuatan-musik-yang-membebaskan-4036', '2010', NULL, NULL, NULL, NULL, '780.92 LOP t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(342, 101, 3, 1, 'SAINT-LUKE-LIBRARY-tehanu-7453', 'TEHANU', 'tehanu-4324', '2013', NULL, NULL, NULL, NULL, '813.54 GUI t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(343, 15, 3, 1, 'SAINT-LUKE-LIBRARY-boytalesofchildhood-4927', 'Boy Tales of Childhood', 'boy-tales-of-childhood-8298', '2004', NULL, NULL, NULL, NULL, '813 dah b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(344, 15, 3, 1, 'SAINT-LUKE-LIBRARY-thelovelybones-1987', 'THE LOVELY BONES', 'the-lovely-bones-7380', '2002', NULL, NULL, NULL, NULL, '813 SEB t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(345, 102, 3, 1, 'SAINT-LUKE-LIBRARY-thedilbertfuture-7466', 'THE DILBERT FUTURE', 'the-dilbert-future-9882', '1998', NULL, NULL, NULL, NULL, '658.4 ADA t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(346, 103, 3, 1, 'SAINT-LUKE-LIBRARY-howtoreadabook-4600', 'HOW TO READ A BOOK', 'how-to-read-a-book-1251', '2007', NULL, NULL, NULL, NULL, '028 ADL h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(347, 104, 3, 1, 'SAINT-LUKE-LIBRARY-anneofavonlea-4433', 'ANNE OF AVONLEA', 'anne-of-avonlea-3050', '2009', NULL, NULL, NULL, NULL, '813 MON a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(348, 15, 3, 1, 'SAINT-LUKE-LIBRARY-adog\'slife-7446', 'A DOG\'S LIFE', 'a-dogs-life-2364', '2005', NULL, NULL, NULL, NULL, '813 MAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(349, 86, 3, 1, 'SAINT-LUKE-LIBRARY-thehistoryoftomjones:afoundling-8126', 'The History of TOM JONES : A Foundling', 'the-history-of-tom-jones-a-foundling-6633', '1999', NULL, NULL, NULL, NULL, '823 FIE h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(350, 105, 3, 1, 'SAINT-LUKE-LIBRARY-shadowofthemoon-9823', 'SHADOW OF THE MOON', 'shadow-of-the-moon-2517', '1979', NULL, NULL, NULL, NULL, '823 KAY s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(351, 15, 3, 1, 'SAINT-LUKE-LIBRARY-dogstories-9379', 'DOG STORIES', 'dog-stories-9156', '2010', NULL, NULL, NULL, NULL, '823 HER d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(352, 106, 3, 1, 'SAINT-LUKE-LIBRARY-pop-upshapes-7433', 'POP-UP SHAPES', 'pop-up-shapes-9391', NULL, NULL, NULL, NULL, NULL, '516 SHA p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(353, 107, 3, 1, 'SAINT-LUKE-LIBRARY-frogandtoadarefriends-4939', 'Frog and Toad Are Friends', 'frog-and-toad-are-friends-1556', '1971', NULL, NULL, NULL, NULL, '813 LOB f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(354, 108, 3, 1, 'SAINT-LUKE-LIBRARY-howtocatchaheffalump-4044', 'How to Catch a Heffalump', 'how-to-catch-a-heffalump-3399', '1998', NULL, NULL, NULL, NULL, '823 SAN h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(355, 109, 3, 1, 'SAINT-LUKE-LIBRARY-countrymousecitymouse-5597', 'Country Mouse City Mouse', 'country-mouse-city-mouse-4885', '1978', NULL, NULL, NULL, NULL, '813 DIS c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(356, 109, 3, 1, 'SAINT-LUKE-LIBRARY-thejunglebook-6666', 'The Jungle Book', 'the-jungle-book-9822', '1974', NULL, NULL, NULL, NULL, '813 DIS t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(357, 110, 3, 1, 'SAINT-LUKE-LIBRARY-hoorayforhippo-4915', 'Hooray for Hippo', 'hooray-for-hippo-2252', '2005', NULL, NULL, NULL, NULL, '813 TIM h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(358, 14, 3, 1, 'SAINT-LUKE-LIBRARY-lilo&stitch-8222', 'Lilo & Stitch', 'lilo-stitch-7673', '2002', NULL, NULL, NULL, NULL, '813 DIS l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(359, 109, 3, 1, 'SAINT-LUKE-LIBRARY-wouldyouratherbeabullfrog?-6705', 'Would you rather be a Bullfrog?', 'would-you-rather-be-a-bullfrog-1905', '1975', NULL, NULL, NULL, NULL, '813 LES w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(360, 17, 3, 1, 'SAINT-LUKE-LIBRARY-atoz-6061', 'A to Z', 'a-to-z-6326', '1989', NULL, NULL, NULL, NULL, '813 DIS a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(361, 17, 3, 1, 'SAINT-LUKE-LIBRARY-mothergooserhymes-7442', 'Mother Goose Rhymes', 'mother-goose-rhymes-1672', '1980', NULL, NULL, NULL, NULL, '813 DIS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(362, 111, 3, 1, 'SAINT-LUKE-LIBRARY-rivergod-8821', 'RIVER GOD', 'river-god-2638', '1993', NULL, NULL, NULL, NULL, '823 SMI r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(363, 112, 3, 1, 'SAINT-LUKE-LIBRARY-kaneandabel:theprodigaldaughter-notapennymore,notapennyless-7778', 'KANE AND ABEL : THE PRODIGAL DAUGHTER - NOT A PENNY MORE, NOT A PENNY LESS', 'kane-and-abel-the-prodigal-daughter-not-a-penny-more-not-a-penny-less-5128', '1993', NULL, NULL, NULL, NULL, '823 ARC k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(364, 113, 3, 1, 'SAINT-LUKE-LIBRARY-korban40.000jiwadisulawesiselatan-5278', 'KORBAN 40.000 JIWA DI SULAWESI SELATAN', 'korban-40000-jiwa-di-sulawesi-selatan-2104', '1985', NULL, NULL, NULL, NULL, '920 SAI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(365, 4, 3, 1, 'SAINT-LUKE-LIBRARY-keranjangpaskah-1633', 'KERANJANG PASKAH', 'keranjang-paskah-8508', '2009', NULL, NULL, NULL, NULL, '741.5 RON k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(366, 114, 3, 1, 'SAINT-LUKE-LIBRARY-subrototakkenallelah-8872', 'SUBROTO TAK KENAL LELAH', 'subroto-tak-kenal-lelah-9418', '2004', NULL, NULL, NULL, NULL, '923 HAD s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(367, 15, 3, 1, 'SAINT-LUKE-LIBRARY-kumpulankisahklasikdinastiminq:penjualminyakmemenangkancintaratubunga-8760', 'Kumpulan Kisah Klasik Dinasti Minq: PENJUAL MINYAK MEMENANGKAN CINTA RATU BUNGA', 'kumpulan-kisah-klasik-dinasti-minq-penjual-minyak-memenangkan-cinta-ratu-bunga-4973', '2011', NULL, NULL, NULL, NULL, '895 MEN k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(368, 64, 3, 1, 'SAINT-LUKE-LIBRARY-sejarahnasionalindonesia:zamanpertumbuhandanperkembangankerajaaislamdiindonesia-6571', 'SEJARAH NASIONAL INDONESIA : Zaman Pertumbuhan dan Perkembangan Kerajaa Islam di Indonesia', 'sejarah-nasional-indonesia-zaman-pertumbuhan-dan-perkembangan-kerajaa-islam-di-indonesia-3182', '2008', NULL, NULL, NULL, NULL, '959.8 POE s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(369, 115, 3, 1, 'SAINT-LUKE-LIBRARY-roots-6320', 'ROOTS', 'roots-9746', '1977', NULL, NULL, NULL, NULL, '813 HAL  r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(370, 116, 3, 1, 'SAINT-LUKE-LIBRARY-theragnymph-6262', 'THE Rag Nymph', 'the-rag-nymph-7143', '1991', NULL, NULL, NULL, NULL, '823 COO t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(371, 15, 3, 1, 'SAINT-LUKE-LIBRARY-perempuantakmendua-3479', 'PEREMPUAN TAK MENDUA', 'perempuan-tak-mendua-4605', '2020', NULL, NULL, NULL, NULL, '899.2 AND p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(372, 117, 3, 1, 'SAINT-LUKE-LIBRARY-theartofwarforwomen-7082', 'THE ART of WAR for WOMEN', 'the-art-of-war-for-women-2990', '2007', NULL, NULL, NULL, NULL, '158.1 CHU t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(373, 117, 3, 1, 'SAINT-LUKE-LIBRARY-themozartseason-6890', 'The Mozart Season', 'the-mozart-season-9560', '2007', NULL, NULL, NULL, NULL, '813 WOL t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(374, 118, 3, 1, 'SAINT-LUKE-LIBRARY-asia\'sbest:themythandrealityofasia\'smostsuccessfulcompanies-2252', 'ASIA\'S BEST : THE MYTH AND REALITY OF ASIA\'S MOST SUCCESSFUL COMPANIES', 'asias-best-the-myth-and-reality-of-asias-most-successful-companies-9790', '1998', NULL, NULL, NULL, NULL, '658.4 HAM a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(375, 119, 3, 1, 'SAINT-LUKE-LIBRARY-thegreatgatsby-7161', 'The Great Gatsby', 'the-great-gatsby-6970', '2004', NULL, NULL, NULL, NULL, '813.5 FIT t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(376, 119, 3, 1, 'SAINT-LUKE-LIBRARY-apassagetoindia-7702', 'A Passage to India', 'a-passage-to-india-3889', '2006', NULL, NULL, NULL, NULL, '823.9 FOR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(377, 18, 3, 1, 'SAINT-LUKE-LIBRARY-kariagekun-8255', 'KARIAGE KUN', 'kariage-kun-1246', '1996', NULL, NULL, NULL, NULL, '895.6 UED k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(378, 18, 3, 1, 'SAINT-LUKE-LIBRARY-bakerukun:pika-pika-2843', 'Bakerukun :PIKA-PIKA', 'bakerukun-pika-pika-3803', '2011', NULL, NULL, NULL, NULL, '895.6 FUJ b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(379, 120, 3, 1, 'SAINT-LUKE-LIBRARY-triad-7603', 'TRIAD', 'triad-5688', '1995', NULL, NULL, NULL, NULL, '823.9 FAL t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(380, 96, 3, 1, 'SAINT-LUKE-LIBRARY-origin-8444', 'ORIGIN', 'origin-4540', '2018', NULL, NULL, NULL, NULL, '823 BRO o', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(381, 121, 3, 1, 'SAINT-LUKE-LIBRARY-laleggedicristo-2218', 'LA LEGGE DI CRISTO', 'la-legge-di-cristo-1995', '1967', NULL, NULL, NULL, NULL, '241 HAR l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(382, 44, 3, 1, 'SAINT-LUKE-LIBRARY-whybrightkidsgetpoorgrades:mengapaanakpintarmemperolehnialiburuk-7295', 'Why Bright Kids Get Poor Grades : Mengapa Anak Pintar Memperoleh Niali Buruk', 'why-bright-kids-get-poor-grades-mengapa-anak-pintar-memperoleh-niali-buruk-7956', '1997', NULL, NULL, NULL, NULL, '371 RIM w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(383, 122, 3, 1, 'SAINT-LUKE-LIBRARY-adoctorwithoutborders-1746', 'A DOCTOR WITHOUT BORDERS', 'a-doctor-without-borders-1770', '2010', NULL, NULL, NULL, NULL, '610.9 MAS a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(384, 123, 3, 1, 'SAINT-LUKE-LIBRARY-thedarkheroine:dinnerwithavampire-2939', 'THE DARK HEROINE : DINNER WITH A VAMPIRE', 'the-dark-heroine-dinner-with-a-vampire-9363', '2013', NULL, NULL, NULL, NULL, '823 GIB t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(385, 1, 3, 1, 'SAINT-LUKE-LIBRARY-lostintheusa:perjuanganseorangremajamenaklukanamerikadenganmodal-8444', 'LOST IN THE USA : Perjuangan seorang Remaja Menaklukan Amerika dengan Modal', 'lost-in-the-usa-perjuangan-seorang-remaja-menaklukan-amerika-dengan-modal-6136', '2016', NULL, NULL, NULL, NULL, '920 BAW l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(386, 1, 3, 1, 'SAINT-LUKE-LIBRARY-memoriesofageisha-8250', 'Memories of a Geisha', 'memories-of-a-geisha-7525', '2002', NULL, NULL, NULL, NULL, '813 GOL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(387, 1, 3, 1, 'SAINT-LUKE-LIBRARY-sangmahabintang2-2026', 'SANG MAHABINTANG 2', 'sang-mahabintang-2-1814', '1992', NULL, NULL, NULL, NULL, '823 COL s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(388, 124, 3, 1, 'SAINT-LUKE-LIBRARY-memberijarakpadacintadankehilangan-kehilanganyangbaik-4437', 'Memberi Jarak pada Cinta dan Kehilangan-kehilangan yang Baik', 'memberi-jarak-pada-cinta-dan-kehilangan-kehilangan-yang-baik-5827', '2016', NULL, NULL, NULL, NULL, '899 FAL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(389, 125, 3, 1, 'SAINT-LUKE-LIBRARY-perestroika:pemikiranbaruuntuknegarakamidandunia-4600', 'PERESTROIKA : Pemikiran Baru untuk Negara kami dan Dunia', 'perestroika-pemikiran-baru-untuk-negara-kami-dan-dunia-9637', '1987', NULL, NULL, NULL, NULL, '947 GOR p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(390, 1, 3, 1, 'SAINT-LUKE-LIBRARY-peranakanidealis:darilieenghojsamapaiteguhkarya-2710', 'Peranakan Idealis : Dari Lie Eng Hoj samapai Teguh Karya', 'peranakan-idealis-dari-lie-eng-hoj-samapai-teguh-karya-1359', '2002', NULL, NULL, NULL, NULL, '920 JAH p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(391, 126, 3, 1, 'SAINT-LUKE-LIBRARY-financialrevolution-5152', 'Financial Revolution', 'financial-revolution-9046', '2005', NULL, NULL, NULL, NULL, '332 WAR f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(392, 127, 3, 1, 'SAINT-LUKE-LIBRARY-newsyllabus:mathematicsworkbook1-2406', 'NEW SYLLABUS : MATHEMATICS WORKBOOK 1', 'new-syllabus-mathematics-workbook-1-7931', '2011', NULL, NULL, NULL, NULL, '510.7 HAR n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(393, 127, 3, 1, 'SAINT-LUKE-LIBRARY-newsyllabus:mathematics1-6704', 'NEW SYLLABUS : MATHEMATICS 1', 'new-syllabus-mathematics-1-2603', '2012', NULL, NULL, NULL, NULL, '510 HAR n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(394, 127, 3, 1, 'SAINT-LUKE-LIBRARY-newsyllabus:mathematics3-8381', 'NEW SYLLABUS : MATHEMATICS 3', 'new-syllabus-mathematics-3-8331', '2015', NULL, NULL, NULL, NULL, '510 HAR n 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(395, 127, 3, 1, 'SAINT-LUKE-LIBRARY-newsyllabus:mathematics2-5872', 'NEW SYLLABUS : MATHEMATICS 2', 'new-syllabus-mathematics-2-1905', '2014', NULL, NULL, NULL, NULL, '510 HAR n 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(396, 128, 3, 1, 'SAINT-LUKE-LIBRARY-disiplintanpateriakanataupukulan-6842', 'DISIPLIN TANPA TERIAKAN ATAU PUKULAN', 'disiplin-tanpa-teriakan-atau-pukulan-8206', '1997', NULL, NULL, NULL, NULL, '649 WYC d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(397, 129, 3, 1, 'SAINT-LUKE-LIBRARY-triplesmart:grade5-8744', 'Triple Smart  : Grade 5', 'triple-smart-grade-5-8581', '2004', NULL, NULL, NULL, NULL, '510.7 KEN t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(398, 130, 3, 1, 'SAINT-LUKE-LIBRARY-comprehensivecurriculumofbasicskills:grade3-7231', 'COMPREHENSIVE CURRICULUM of Basic Skills : Grade 3', 'comprehensive-curriculum-of-basic-skills-grade-3-9671', '2001', NULL, NULL, NULL, NULL, NULL, '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(399, 131, 3, 1, 'SAINT-LUKE-LIBRARY-soal&pembahasanolimpiadebiolohitingkaynasional&internasional-7292', 'Soal & Pembahasan OLIMPIADE BIOLOHI Tingkay NASIONAL & INTERNASIONAL', 'soal-pembahasan-olimpiade-biolohi-tingkay-nasional-internasional-7234', '2009', NULL, NULL, NULL, NULL, '570.76 YUL s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(400, 132, 3, 1, 'SAINT-LUKE-LIBRARY-bulankitabsucinasional2024-8877', 'BULAN KITAB SUCI NASIONAL 2024', 'bulan-kitab-suci-nasional-2024-3687', '2004', NULL, NULL, NULL, NULL, '200 TIM a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(401, 23, 3, 1, 'SAINT-LUKE-LIBRARY-inovasiperkalian-5328', 'Inovasi Perkalian', 'inovasi-perkalian-2130', '2008', NULL, NULL, NULL, NULL, '513 BAO i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(402, 133, 3, 1, 'SAINT-LUKE-LIBRARY-ministorybook:theworldofcars-4029', 'MINI STORYBOOK : THE WORLD OF CARS', 'mini-storybook-the-world-of-cars-9320', '2009', NULL, NULL, NULL, NULL, '813 DIS t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(403, 133, 3, 1, 'SAINT-LUKE-LIBRARY-ministorybook:beautyandthebeast-4638', 'MINI STORYBOOK : Beauty and the Beast', 'mini-storybook-beauty-and-the-beast-1170', '2009', NULL, NULL, NULL, NULL, '813 DIS b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(404, 15, 3, 1, 'SAINT-LUKE-LIBRARY-hukumkewarganegaraandankeimigrasianindonesia-5135', 'HUKUM KEWARGANEGARAAN DAN KEIMIGRASIAN INDONESIA', 'hukum-kewarganegaraan-dan-keimigrasian-indonesia-7288', '1996', NULL, NULL, NULL, NULL, '342.9 SOE h', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(405, 15, 3, 1, 'SAINT-LUKE-LIBRARY-teoripembagunanduniaketiga-1889', 'TEORI PEMBAGUNAN DUNIA KETIGA', 'teori-pembagunan-dunia-ketiga-2335', '2000', NULL, NULL, NULL, NULL, '338.9 BUD t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(406, 44, 3, 1, 'SAINT-LUKE-LIBRARY-arahpembangunan:desentralisasipengajaranpolitikdankonsesus-8607', 'ARAH PEMBANGUNAN : Desentralisasi Pengajaran Politik dan Konsesus', 'arah-pembangunan-desentralisasi-pengajaran-politik-dan-konsesus-3306', '1999', NULL, NULL, NULL, NULL, '354 FIS a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(407, 44, 3, 1, 'SAINT-LUKE-LIBRARY-kaumprofesionalmenentangrezimotoriter-5023', 'Kaum Profesional Menentang Rezim Otoriter', 'kaum-profesional-menentang-rezim-otoriter-4818', '1999', NULL, NULL, NULL, NULL, '303.6 PRA k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(408, 134, 3, 1, 'SAINT-LUKE-LIBRARY-rpul:rangkumanpengethuanumumlengkapindonesia-dunia-4669', 'RPUL : RANGKUMAN PENGETHUAN UMUM LENGKAP INDONESIA-DUNIA', 'rpul-rangkuman-pengethuan-umum-lengkap-indonesia-dunia-2836', '2009', NULL, NULL, NULL, NULL, '300 YUD r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(409, 135, 3, 1, 'SAINT-LUKE-LIBRARY-akusenang&pintar1-10-8918', 'Aku Senang & Pintar 1-10', 'aku-senang-pintar-1-10-8577', '2008', NULL, NULL, NULL, NULL, '372.7 MAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(410, 136, 3, 1, 'SAINT-LUKE-LIBRARY-kamuspengetahuansosialbergambar-3214', 'Kamus Pengetahuan Sosial BERGAMBAR', 'kamus-pengetahuan-sosial-bergambar-4126', '2019', NULL, NULL, NULL, NULL, '300 IND k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(411, 15, 3, 1, 'SAINT-LUKE-LIBRARY-ensiklopedia4d:duniamikro-1046', 'ENSIKLOPEDIA 4D : DUNIA MIKRO', 'ensiklopedia-4d-dunia-mikro-8507', '2019', NULL, NULL, NULL, NULL, '579 DEV d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(412, 137, 3, 1, 'SAINT-LUKE-LIBRARY-maukahkamujadimuriddizamnaviktoria-3311', 'Maukah Kamu Jadi Murid di Zamna Viktoria', 'maukah-kamu-jadi-murid-di-zamna-viktoria-4985', '2003', NULL, NULL, NULL, NULL, '942.08 MAL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(413, 137, 3, 1, 'SAINT-LUKE-LIBRARY-maukahkamujadipenjelajahamerika-8455', 'Maukah Kamu Jadi Penjelajah Amerika', 'maukah-kamu-jadi-penjelajah-amerika-4246', '2003', NULL, NULL, NULL, NULL, '970 MOR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(414, 137, 3, 1, 'SAINT-LUKE-LIBRARY-maukahkamuhidupdikotakoboi?-1563', 'Maukah Kamu Hidup di Kota Koboi?', 'maukah-kamu-hidup-di-kota-koboi-9529', '2003', NULL, NULL, NULL, NULL, '930 HIC m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(415, 137, 3, 1, 'SAINT-LUKE-LIBRARY-maukahkamumembuatjalanrel?-9815', 'Maukah Kamu Membuat Jalan Rel?', 'maukah-kamu-membuat-jalan-rel-3845', '2003', NULL, NULL, NULL, NULL, '625.1 GRA m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(416, 137, 3, 1, 'SAINT-LUKE-LIBRARY-maukahkamujadipenjelajahviking?-6278', 'Maukah Kamu Jadi Penjelajah Viking?', 'maukah-kamu-jadi-penjelajah-viking-8830', '2003', NULL, NULL, NULL, NULL, '948 LAN m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(417, 44, 3, 1, 'SAINT-LUKE-LIBRARY-rehabilitasipecandunarkoba-5059', 'Rehabilitasi Pecandu Narkoba', 'rehabilitasi-pecandu-narkoba-8099', '2001', NULL, NULL, NULL, NULL, '362.29 SOM r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(418, 22, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanagamakatolik:menjadimuridyesus-untuksma/kkelasxi-1855', 'Pendidikan Agama Katolik : Menjadi Murid YESUS - Untuk SMA/K Kelas XI', 'pendidikan-agama-katolik-menjadi-murid-yesus-untuk-smak-kelas-xi-1335', '2010', NULL, NULL, NULL, NULL, '268 TIM p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(419, 22, 3, 1, 'SAINT-LUKE-LIBRARY-pendidikanagamakatolik:menjadimuridyesus-untuksma/kkelasx-5976', 'Pendidikan Agama Katolik : Menjadi Murid YESUS - Untuk SMA/K Kelas X', 'pendidikan-agama-katolik-menjadi-murid-yesus-untuk-smak-kelas-x-5535', '2010', NULL, NULL, NULL, NULL, '268 TIM p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(420, 47, 3, 1, 'SAINT-LUKE-LIBRARY-matematikasmp/mtskelasix-7624', 'MATEMATIKA SMP/MTs Kelas IX', 'matematika-smpmts-kelas-ix-7740', '2018', NULL, NULL, NULL, NULL, '510 SUB m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(421, 4, 3, 1, 'SAINT-LUKE-LIBRARY-pelajaranmatematikauntuksekolahdasarkelasv-9821', 'Pelajaran Matematika untuk Sekolah Dasar Kelas V', 'pelajaran-matematika-untuk-sekolah-dasar-kelas-v-8879', '2006', NULL, NULL, NULL, NULL, '372.7 KHA p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(422, 5, 3, 1, 'SAINT-LUKE-LIBRARY-khazanahmatematika3:programilmupengetahuansosial-3807', 'Khazanah Matematika 3 : Program Ilmu Pengetahuan Sosial', 'khazanah-matematika-3-program-ilmu-pengetahuan-sosial-4547', '2009', NULL, NULL, NULL, NULL, '510 ROI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(423, 47, 3, 1, 'SAINT-LUKE-LIBRARY-matematika:sma/ma/smk/makkelasx-semeser1-1916', 'Matematika : SMA/MA/SMK/MAK Kelas X -Semeser 1', 'matematika-smamasmkmak-kelas-x-semeser-1-9937', '2014', NULL, NULL, NULL, NULL, '510 KEM m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(424, 3, 3, 1, 'SAINT-LUKE-LIBRARY-wahanamatematikauntuksma/makelasxi:programipa-4190', 'Wahana MATEMATIKA UNTUK SMA/MA KELAS XI :Program IPA', 'wahana-matematika-untuk-smama-kelas-xi-program-ipa-9052', '2009', NULL, NULL, NULL, NULL, '510.07 SUT wah', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(425, 3, 3, 1, 'SAINT-LUKE-LIBRARY-matematikauntuksmadanmakelasxiips-2792', 'Matematika Untuk SMA dan MA Kelas XI IPS', 'matematika-untuk-sma-dan-ma-kelas-xi-ips-1049', '2009', NULL, NULL, NULL, NULL, '510.07 SRI m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(426, 3, 3, 1, 'SAINT-LUKE-LIBRARY-wahanamatematikauntuksma/makelasxi:programips-1869', 'Wahana MATEMATIKA UNTUK SMA/MA KELAS XI :Program IPS', 'wahana-matematika-untuk-smama-kelas-xi-program-ips-9485', '2009', NULL, NULL, NULL, NULL, '510.07 sut WAH/2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(427, 18, 3, 1, 'SAINT-LUKE-LIBRARY-kobochan-6019', 'KOBO CHAN', 'kobo-chan-4893', '1992', NULL, NULL, NULL, NULL, '741.59 UED k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(428, 18, 3, 1, 'SAINT-LUKE-LIBRARY-new:kobochan-9421', 'New : KOBO CHAN', 'new-kobo-chan-3647', '2016', NULL, NULL, NULL, NULL, '741.59 UED k/N', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(429, 47, 3, 1, 'SAINT-LUKE-LIBRARY-bahasainggris:whenengloishringsabell-smp/mtskelasvii-7154', 'Bahasa Inggris  : When Engloish Rings a Bell - SMP/MTs Kelas VII', 'bahasa-inggris-when-engloish-rings-a-bell-smpmts-kelas-vii-7245', '2017', NULL, NULL, NULL, NULL, '420 WAC b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(430, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgecheckpointenglishworkbook8-3476', 'Cambridge Checkpoint English Workbook 8', 'cambridge-checkpoint-english-workbook-8-6532', '2013', NULL, NULL, NULL, NULL, '428 COX c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(431, 46, 3, 1, 'SAINT-LUKE-LIBRARY-cambridgecheckpointenglishcoursebook8-3091', 'Cambridge Checkpoint English Coursebook 8', 'cambridge-checkpoint-english-coursebook-8-7534', '2013', NULL, NULL, NULL, NULL, '428 cOX c 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(432, 138, 3, 1, 'SAINT-LUKE-LIBRARY-museum-museumdidkijakarta-8935', 'Museum-museum di DKI Jakarta', 'museum-museum-di-dki-jakarta-3735', '1998', NULL, NULL, NULL, NULL, '900 TIM m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(433, 139, 3, 1, 'SAINT-LUKE-LIBRARY-nurturedbylove-4933', 'Nurtured by Love', 'nurtured-by-love-9159', '1983', NULL, NULL, NULL, NULL, '787.1 SUZ n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(434, 140, 3, 1, 'SAINT-LUKE-LIBRARY-restleswarrior-9275', 'Restles Warrior', 'restles-warrior-7270', '1996', NULL, NULL, NULL, NULL, '158 MAN r', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(435, 117, 3, 1, 'SAINT-LUKE-LIBRARY-thepresent:theghiftthatmakesyouhappyandsuccesfulataworkandinlife-6664', 'The Present : The ghift that makes you happy and succesful ata work and in life', 'the-present-the-ghift-that-makes-you-happy-and-succesful-ata-work-and-in-life-7765', '2003', NULL, NULL, NULL, NULL, '100 JOH t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(436, 141, 3, 1, 'SAINT-LUKE-LIBRARY-outstandingshortstories-8184', 'Outstanding Short Stories', 'outstanding-short-stories-8852', '2008', NULL, NULL, NULL, NULL, '823 CHA o', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(437, 142, 3, 1, 'SAINT-LUKE-LIBRARY-thehunchbackofnotredame-7170', 'The Hunchback of Notre Dame', 'the-hunchback-of-notre-dame-9606', '1996', NULL, NULL, NULL, NULL, '843 DIS t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(438, 143, 3, 1, 'SAINT-LUKE-LIBRARY-inthe1stdegree-2034', 'In The 1st Degree', 'in-the-1st-degree-9828', '1995', NULL, NULL, NULL, NULL, '800 DEM i', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(439, 144, 3, 1, 'SAINT-LUKE-LIBRARY-beingahappyteenager-5369', 'being a happy Teenager', 'being-a-happy-teenager-7624', '2001', NULL, NULL, NULL, NULL, '100 MAT b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(440, 15, 3, 1, 'SAINT-LUKE-LIBRARY-totto-chan:gadiscilikdijendela-4079', 'Totto- Chan : Gadis Cilik di Jendela', 'totto-chan-gadis-cilik-di-jendela-2174', '2003', NULL, NULL, NULL, NULL, '895.6 KUR t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(441, 145, 3, 1, 'SAINT-LUKE-LIBRARY-csasperthenovelisation-7797', 'Csasper the Novelisation', 'csasper-the-novelisation-5890', '1995', NULL, NULL, NULL, NULL, '823 ROJ c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(442, 15, 3, 1, 'SAINT-LUKE-LIBRARY-joyavsandien-2512', 'Joya vs Andien', 'joya-vs-andien-7631', '2005', NULL, NULL, NULL, NULL, '800 PRA j', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(443, 146, 3, 1, 'SAINT-LUKE-LIBRARY-kumpulankisahmisteri-6079', 'Kumpulan Kisah Misteri', 'kumpulan-kisah-misteri-6014', '1994', NULL, NULL, NULL, NULL, '800 OLI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(444, 15, 3, 1, 'SAINT-LUKE-LIBRARY-menjadikakak-2363', 'Menjadi Kakak', 'menjadi-kakak-4081', '2008', NULL, NULL, NULL, NULL, '800 TIL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(445, 18, 3, 1, 'SAINT-LUKE-LIBRARY-otobokesectionchief-4085', 'Otoboke section chief', 'otoboke-section-chief-9795', '2010', NULL, NULL, NULL, NULL, '741.59 UED o', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(446, 147, 3, 1, 'SAINT-LUKE-LIBRARY-mencarikepemimpinansejatiditengahkrisisdanreformasi-3173', 'Mencari Kepemimpinan Sejati di tengah krisis dan reformasi', 'mencari-kepemimpinan-sejati-di-tengah-krisis-dan-reformasi-6065', '2009', NULL, NULL, NULL, NULL, '158.4 MUS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(447, 4, 3, 1, 'SAINT-LUKE-LIBRARY-younggun:biograficescfebregas-9637', 'Young Gun : Biografi Cesc Febregas', 'young-gun-biografi-cesc-febregas-5730', '2010', NULL, NULL, NULL, NULL, '796.3 OLD y', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(448, 148, 3, 1, 'SAINT-LUKE-LIBRARY-manajemenrisikoberbasisiso31000untukindustrinonperbankan-3441', 'Manajemen Risiko Berbasis ISO 31000 UNTUK Industri nonperbankan', 'manajemen-risiko-berbasis-iso-31000-untuk-industri-nonperbankan-2185', '2010', NULL, NULL, NULL, NULL, '658.155 SUS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(449, 15, 3, 1, 'SAINT-LUKE-LIBRARY-etikapolitik:prinsip-prinsipmoralasarkenegaraanmodrn-6921', 'Etika Politik : Prinsip-prinsip Moral asar Kenegaraan Modrn', 'etika-politik-prinsip-prinsip-moral-asar-kenegaraan-modrn-5985', '2001', NULL, NULL, NULL, NULL, '172 SUS e', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(450, 149, 3, 1, 'SAINT-LUKE-LIBRARY-firemansam:paperplanedown-4449', 'Fireman Sam :Paper plane down', 'fireman-sam-paper-plane-down-9420', '2013', NULL, NULL, NULL, NULL, '800 TIM f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(451, 17, 3, 1, 'SAINT-LUKE-LIBRARY-noah\'sark-5721', 'Noah\'s Ark', 'noahs-ark-5878', '1997', NULL, NULL, NULL, NULL, '800 PAC n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(452, NULL, 3, 1, 'SAINT-LUKE-LIBRARY-katevisitsthedoctor-8151', 'Kate Visits the doctor', 'kate-visits-the-doctor-9509', '1983', NULL, NULL, NULL, NULL, '823 SNE k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(453, 150, 3, 1, 'SAINT-LUKE-LIBRARY-marleygoestoschool-5907', 'Marley goes to school', 'marley-goes-to-school-7165', '2003', NULL, NULL, NULL, NULL, '800 WYE m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(454, 151, 3, 1, 'SAINT-LUKE-LIBRARY-petey\'spigpenproblem-1373', 'Petey\'s pigpen problem', 'peteys-pigpen-problem-6307', '2012', NULL, NULL, NULL, NULL, '800 KRI p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(455, 15, 3, 1, 'SAINT-LUKE-LIBRARY-thetwits-7415', 'The Twits', 'the-twits-5476', '2003', NULL, NULL, NULL, NULL, '800 DAH t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(456, 15, 3, 1, 'SAINT-LUKE-LIBRARY-summerinsoul-4739', 'Summer in Soul', 'summer-in-soul-8759', '2008', NULL, NULL, NULL, NULL, '813 TAN s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(457, 152, 3, 1, 'SAINT-LUKE-LIBRARY-sahabatpena-5756', 'Sahabat Pena', 'sahabat-pena-8709', '2007', NULL, NULL, NULL, NULL, '800 NOV s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(458, 120, 3, 1, 'SAINT-LUKE-LIBRARY-noblehouse-4951', 'Noble House', 'noble-house-1444', '1981', NULL, NULL, NULL, NULL, '800 CLA n', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(459, 153, 3, 1, 'SAINT-LUKE-LIBRARY-wildswans:threedaughtersofchina-7110', 'Wild Swans : Three Daughters of China', 'wild-swans-three-daughters-of-china-4698', '1992', NULL, NULL, NULL, NULL, '900 CHA w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(460, 154, 3, 1, 'SAINT-LUKE-LIBRARY-london-7113', 'London', 'london-1574', '1998', NULL, NULL, NULL, NULL, '823 RUT l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(461, 155, 3, 1, 'SAINT-LUKE-LIBRARY-scruplestwo-2913', 'Scruples Two', 'scruples-two-6988', '1992', NULL, NULL, NULL, NULL, '813.54 KRA s', '1', 'Tersedia', NULL, NULL, 'Published', 0, '2026-07-15 15:32:56', '2026-06-11 04:26:37', '2026-07-15 15:32:56'),
(462, 137, 3, 1, 'SAINT-LUKE-LIBRARY-finogatal-gatal-3365', 'Fino gatal-gatal', 'fino-gatal-gatal-2938', '2012', NULL, NULL, NULL, NULL, '028.5  LIS f', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(463, 137, 3, 1, 'SAINT-LUKE-LIBRARY-diegointhedarkbeingbraveatnight-7595', 'Diego in the dark being brave at night', 'diego-in-the-dark-being-brave-at-night-7865', '2013', NULL, NULL, NULL, NULL, '028.5 STI d', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(464, 137, 3, 1, 'SAINT-LUKE-LIBRARY-listenwithkai-lan:petualangandifestivallampion-8805', 'Listen with Kai-lan : Petualangan di festival Lampion', 'listen-with-kai-lan-petualangan-di-festival-lampion-7413', '2013', NULL, NULL, NULL, NULL, '028.5 HIG l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(465, 137, 3, 1, 'SAINT-LUKE-LIBRARY-kai-lan\'sgreattriptochina:petualangankai-landichina-8022', 'Kai-lan\'s great trip to China : Petualangan Kai-lan di China', 'kai-lans-great-trip-to-china-petualangan-kai-lan-di-china-1361', '2013', NULL, NULL, NULL, NULL, '028.5 MAT k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(466, 137, 3, 1, 'SAINT-LUKE-LIBRARY-handymanny:misterikandangcassie-8565', 'Handy Manny : Misteri Kandang Cassie', 'handy-manny-misteri-kandang-cassie-1005', '2010', NULL, NULL, NULL, NULL, '028.5 DIS h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(467, 137, 3, 1, 'SAINT-LUKE-LIBRARY-kungfupanda:situkangusil-6619', 'Kung fu panda : Si tukang usil', 'kung-fu-panda-si-tukang-usil-6535', '2011', NULL, NULL, NULL, NULL, '028.5 DRI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(468, 137, 3, 1, 'SAINT-LUKE-LIBRARY-krauk!krauk!-5372', 'Krauk! Krauk!', 'krauk-krauk-7126', '2015', NULL, NULL, NULL, NULL, '028.5 KRI k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(469, 137, 3, 1, 'SAINT-LUKE-LIBRARY-melatihprajuritai-5827', 'Melatih prajurit AI', 'melatih-prajurit-ai-8531', '2015', NULL, NULL, NULL, NULL, '028.5 HIG m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(470, 4, 3, 1, 'SAINT-LUKE-LIBRARY-aktivemathematics:forelementaryschoolyear3semester1-1405', 'Aktive Mathematics : for Elementary school year 3 semester 1', 'aktive-mathematics-for-elementary-school-year-3-semester-1-5761', '2010', NULL, NULL, NULL, NULL, '510 KHA a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(471, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematikaaktifuntuksekolahdasarkelasv-3128', 'Matematika Aktif untuk sekolah dasar kelas V', 'matematika-aktif-untuk-sekolah-dasar-kelas-v-1714', '2006', NULL, NULL, NULL, NULL, '510 KAS m', '5', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(472, 156, 3, 1, 'SAINT-LUKE-LIBRARY-gasingmathematics3b-1613', 'Gasing Mathematics 3B', 'gasing-mathematics-3b-1213', '2012', NULL, NULL, NULL, NULL, '510 SUR g 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(473, 156, 3, 1, 'SAINT-LUKE-LIBRARY-matematikaasyik,mudah,danmeneyenangkan4b-6130', 'Matematika Asyik, mudah, dan meneyenangkan 4B', 'matematika-asyik-mudah-dan-meneyenangkan-4b-7736', '2011', NULL, NULL, NULL, NULL, '510 SUR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(474, 156, 3, 1, 'SAINT-LUKE-LIBRARY-gasingmathematics3a-1361', 'Gasing Mathematics 3A', 'gasing-mathematics-3a-7499', '2012', NULL, NULL, NULL, NULL, '510 SUR g', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(475, 40, 3, 1, 'SAINT-LUKE-LIBRARY-senibudayasmp/mtskelasviii-1628', 'Seni Budaya SMP/MTs Kelas VIII', 'seni-budaya-smpmts-kelas-viii-5730', '2017', NULL, NULL, NULL, NULL, '707 PUR s/2', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(476, 40, 3, 1, 'SAINT-LUKE-LIBRARY-senibudayasmp/mtskelasviii-5577', 'Seni Budaya SMP/MTs Kelas VIII', 'seni-budaya-smpmts-kelas-viii-2517', '2017', NULL, NULL, NULL, NULL, '707 PUR s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(477, 40, 3, 1, 'SAINT-LUKE-LIBRARY-prakaryasmp/mtskelasviii:semester1-8307', 'Prakarya SMP/MTs Kelas VIII: Semester 1', 'prakarya-smpmts-kelas-viii-semester-1-1725', '2017', NULL, NULL, NULL, NULL, '700 PAR p', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(478, 4, 3, 1, 'SAINT-LUKE-LIBRARY-wirausahasd/mikelasvi-7357', 'Wirausaha SD/MI Kelas VI', 'wirausaha-sdmi-kelas-vi-7428', '2013', NULL, NULL, NULL, NULL, '700 KRI w', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(479, 157, 3, 1, 'SAINT-LUKE-LIBRARY-agarish-3921', 'Agarish', 'agarish-6470', '2023', NULL, NULL, NULL, NULL, '899.2 DIN a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(480, 158, 3, 1, 'SAINT-LUKE-LIBRARY-let\'sgetmarried2-3576', 'Let\'s Get Married 2', 'lets-get-married-2-1747', '1992', NULL, NULL, NULL, NULL, '899.2 HAN l 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(481, 15, 3, 1, 'SAINT-LUKE-LIBRARY-troublemaker-6128', 'Troublemaker', 'troublemaker-9398', '2017', NULL, NULL, NULL, NULL, '813 HOW  t', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(482, 124, 3, 1, 'SAINT-LUKE-LIBRARY-museumofbrokenheart-7973', 'Museum of broken heart', 'museum-of-broken-heart-8837', '2020', NULL, NULL, NULL, NULL, '899.2 KHR m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(483, 158, 3, 1, 'SAINT-LUKE-LIBRARY-let\'sgetmarried-6736', 'Let\'s Get Married', 'lets-get-married-8685', '1992', NULL, NULL, NULL, NULL, '899.2 HAN l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(484, 159, 3, 1, 'SAINT-LUKE-LIBRARY-bossengklekiloveyou-8677', 'Bos Sengklek I love you', 'bos-sengklek-i-love-you-6951', '2020', NULL, NULL, NULL, NULL, '899.2 NIN b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(485, 160, 3, 1, 'SAINT-LUKE-LIBRARY-milesofplumblossom-8105', 'Miles of Plum Blossom', 'miles-of-plum-blossom-3182', '2022', NULL, NULL, NULL, NULL, '823 DU m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(486, 161, 3, 1, 'SAINT-LUKE-LIBRARY-barbie:gadis180kg-8493', 'Barbie : Gadis 180 kg', 'barbie-gadis-180-kg-7105', '2020', NULL, NULL, NULL, NULL, '899.2 YUS b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(487, 159, 3, 1, 'SAINT-LUKE-LIBRARY-astoryaboutlove-8149', 'A story about love', 'a-story-about-love-9067', '2020', NULL, NULL, NULL, NULL, '899.2 IND a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(488, 162, 3, 1, 'SAINT-LUKE-LIBRARY-mychildishwife-2887', 'My childish wife', 'my-childish-wife-2978', '2021', NULL, NULL, NULL, NULL, '823 NEL m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(489, 163, 3, 1, 'SAINT-LUKE-LIBRARY-apiecesofyou-6700', 'A pieces of you', 'a-pieces-of-you-7334', '2021', NULL, NULL, NULL, NULL, '899.2 SAR a', '2', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(490, 163, 3, 1, 'SAINT-LUKE-LIBRARY-it\'sme-5675', 'It\'s me', 'its-me-8553', '2021', NULL, NULL, NULL, NULL, '899.2 SAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(491, 164, 3, 1, 'SAINT-LUKE-LIBRARY-younghusband-7203', 'Young Husband', 'young-husband-2966', '2018', NULL, NULL, NULL, NULL, '899.2 DEW y', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(492, 73, 3, 1, 'SAINT-LUKE-LIBRARY-minnieandthedognapper-3305', 'Minnie and the Dognapper', 'minnie-and-the-dognapper-5235', '2013', NULL, NULL, NULL, NULL, '823 DIS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(493, 165, 3, 1, 'SAINT-LUKE-LIBRARY-lautkahini?-7894', 'Lautkah ini?', 'lautkah-ini-8221', '2015', NULL, NULL, NULL, NULL, '899.2 YUL l', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(494, 17, 3, 1, 'SAINT-LUKE-LIBRARY-pokylittlepuppy\'s:specialday-5401', 'Poky little puppy\'s : Special day', 'poky-little-puppys-special-day-8135', '1989', NULL, NULL, NULL, NULL, '823 WES p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(495, 165, 3, 1, 'SAINT-LUKE-LIBRARY-ponijanganlari-7933', 'Poni jangan lari', 'poni-jangan-lari-5467', '2015', NULL, NULL, NULL, NULL, '899.2 HAS p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38');
INSERT INTO `books` (`id`, `publisher_id`, `added_by`, `language_id`, `book_code`, `title`, `slug`, `publication_year`, `isbn`, `synopsis`, `number_of_pages`, `location_of_book_id`, `classification_number`, `volume`, `status`, `cover`, `price`, `is_published`, `is_spotlight`, `deleted_at`, `created_at`, `updated_at`) VALUES
(496, 89, 3, 1, 'SAINT-LUKE-LIBRARY-hawkmission-6934', 'Hawk Mission', 'hawk-mission-9026', '2009', NULL, NULL, NULL, NULL, '823 DAV h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(497, 14, 3, 1, 'SAINT-LUKE-LIBRARY-clifford\'sbirthdayparty-2915', 'Clifford\'s Birthday party', 'cliffords-birthday-party-4242', '1988', NULL, NULL, NULL, NULL, '813 BRI c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(498, 137, 3, 1, 'SAINT-LUKE-LIBRARY-bermaindanberhitunghot-dog-7039', 'Bermain dan berhitung hot-dog', 'bermain-dan-berhitung-hot-dog-4887', '2012', NULL, NULL, NULL, NULL, '028.5 AME b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(499, 166, 3, 1, 'SAINT-LUKE-LIBRARY-boo\'sadventureatthepool-8027', 'Boo\'s Adventure at the pool', 'boos-adventure-at-the-pool-3482', '1988', NULL, NULL, NULL, NULL, '813 LAU b', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(500, 4, 3, 1, 'SAINT-LUKE-LIBRARY-hellokitty:ucapanterimakasih-4125', 'Hello Kitty : Ucapan terima kasih', 'hello-kitty-ucapan-terima-kasih-2888', '2014', NULL, NULL, NULL, NULL, '800 HAC h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(501, 134, 3, 1, 'SAINT-LUKE-LIBRARY-pinguin-9962', 'Pinguin', 'pinguin-3918', NULL, NULL, NULL, NULL, NULL, '598.4 RAN p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(502, 55, 3, 1, 'SAINT-LUKE-LIBRARY-colouringbookindonesia-inggris-arab-1009', 'Colouring Book Indonesia-Inggris-Arab', 'colouring-book-indonesia-inggris-arab-9706', '2010', NULL, NULL, NULL, NULL, '741.5 HEN c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(503, 55, 3, 1, 'SAINT-LUKE-LIBRARY-menjelajahitatasurya-4770', 'Menjelajahi Tata surya', 'menjelajahi-tata-surya-5324', '2011', NULL, NULL, NULL, NULL, '523.4 ANG m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(504, 14, 3, 1, 'SAINT-LUKE-LIBRARY-head,shoulders,knessandtoes-4835', 'Head, shoulders, kness and toes', 'head-shoulders-kness-and-toes-9232', '2009', NULL, NULL, NULL, NULL, '782.4 WHO h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(505, 167, 3, 1, 'SAINT-LUKE-LIBRARY-hellokitty:starballerina-2689', 'Hello Kitty : star Ballerina', 'hello-kitty-star-ballerina-6299', NULL, NULL, NULL, NULL, NULL, '813 WEI h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(506, 55, 3, 1, 'SAINT-LUKE-LIBRARY-colouringbookindonesia-inggris-arab-5381', 'Colouring Book Indonesia-Inggris-Arab', 'colouring-book-indonesia-inggris-arab-2401', '2010', NULL, NULL, NULL, NULL, '741.5 S c', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(507, 168, 3, 1, 'SAINT-LUKE-LIBRARY-pelajaranberhitunguntuksekolahdasar:cerdastangkas4a-4691', 'Pelajaran berhitung untuk sekolah dasar : Cerdas Tangkas 4A', 'pelajaran-berhitung-untuk-sekolah-dasar-cerdas-tangkas-4a-2104', '2006', NULL, NULL, NULL, NULL, '510 A p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(508, 168, 3, 1, 'SAINT-LUKE-LIBRARY-pelajaranberhitunguntuksekolahdasar:cerdastangkas4b-3168', 'Pelajaran berhitung untuk sekolah dasar : Cerdas Tangkas 4B', 'pelajaran-berhitung-untuk-sekolah-dasar-cerdas-tangkas-4b-2990', '2007', NULL, NULL, NULL, NULL, '510 A p 2', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(509, 168, 3, 1, 'SAINT-LUKE-LIBRARY-pelajaranberhitunguntuksekolahdasar:cerdastangkas5a-9152', 'Pelajaran berhitung untuk sekolah dasar : Cerdas Tangkas 5A', 'pelajaran-berhitung-untuk-sekolah-dasar-cerdas-tangkas-5a-5347', '2009', NULL, NULL, NULL, NULL, '510 A p 3', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(510, 4, 3, 1, 'SAINT-LUKE-LIBRARY-matematikauntuksd/mikelasiv-1303', 'Matematika untuk SD/MI Kelas IV', 'matematika-untuk-sdmi-kelas-iv-3365', '2022', NULL, NULL, NULL, NULL, '510 BUD m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(511, 4, 3, 1, 'SAINT-LUKE-LIBRARY-pelajaranmatematikapenekananpadaberhitunguntuksekolahdasarkelas2-4231', 'Pelajaran Matematika Penekanan pada Berhitung untuk Sekolah Dasar Kelas 2', 'pelajaran-matematika-penekanan-pada-berhitung-untuk-sekolah-dasar-kelas-2-5558', '2002', NULL, NULL, NULL, NULL, '510 KHA p', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(512, 5, 3, 1, 'SAINT-LUKE-LIBRARY-matematikauntuksma/makelasxi-programips-5636', 'Matematika untuk SMA/MA Kelas XI - Program IPS', 'matematika-untuk-smama-kelas-xi-program-ips-1299', '2009', NULL, NULL, NULL, NULL, '510.07 SUT m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(513, 4, 3, 1, 'SAINT-LUKE-LIBRARY-minniebukumewarnaipita-pitacantik-1343', 'Minnie Buku mewarnai Pita-pita cantik', 'minnie-buku-mewarnai-pita-pita-cantik-4963', '2015', NULL, NULL, NULL, NULL, '741.DIS m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(514, 4, 3, 1, 'SAINT-LUKE-LIBRARY-serunyamewarnai:pelukanhangat-6344', 'Serunya mewarnai : Pelukan Hangat', 'serunya-mewarnai-pelukan-hangat-9794', NULL, NULL, NULL, NULL, NULL, '741.DIS s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(515, 169, 3, 1, 'SAINT-LUKE-LIBRARY-majalahiptekanak:elang-cerdaskreatifceria-9747', 'Majalah Iptek Anak : Elang - Cerdas kreatif ceria', 'majalah-iptek-anak-elang-cerdas-kreatif-ceria-1571', '2015', NULL, NULL, NULL, NULL, '505 TIM m', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(516, 55, 3, 1, 'SAINT-LUKE-LIBRARY-serikenalialam3:penguin-4222', 'Seri Kenali Alam 3 : Penguin', 'seri-kenali-alam-3-penguin-7881', '2009', NULL, NULL, NULL, NULL, '590 PRI s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(517, 170, 3, 1, 'SAINT-LUKE-LIBRARY-akutahusains&teknologi-3237', 'Aku tahu Sains & teknologi', 'aku-tahu-sains-teknologi-8291', '2015', NULL, NULL, NULL, NULL, '500 DAR a', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(518, 4, 3, 1, 'SAINT-LUKE-LIBRARY-hellokittiyangsibuk-7099', 'Hello Kitti yang sibuk', 'hello-kitti-yang-sibuk-8505', '2016', NULL, NULL, NULL, NULL, '741.5 TIM h', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(519, 137, 3, 1, 'SAINT-LUKE-LIBRARY-sofiatersesat-6524', 'Sofia  Tersesat', 'sofia-tersesat-7665', '2016', NULL, NULL, NULL, NULL, '741.5 TIM s', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(520, 25, 3, 1, 'SAINT-LUKE-LIBRARY-kajianlingkunganhidup:tinjauandariperpektifpastoralsosial-4765', 'Kajian Lingkungan Hidup  : Tinjauan dari Perpektif Pastoral Sosial', 'kajian-lingkungan-hidup-tinjauan-dari-perpektif-pastoral-sosial-9403', '2009', NULL, NULL, NULL, NULL, '261.8 DAR k', '1', 'Tersedia', NULL, NULL, 'Published', 0, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(521, 1, 3, 1, 'SAINT-LUKE-LIBRARY-mencapaihiduppenuhkeagungan-4836', 'Mencapai Hidup Penuh Keagungan ', 'mencapai-hidup-penuh-keagungan-3505', '2026', '978-979-22-3416-9', '<p><strong>Buku dengan category mistis</strong></p>', 108, NULL, '153.2', '1', 'Tersedia', 'books/cover/01KTTR7T091E0C19E0JCV4V1ME.jpg', 100000, 'Published', 0, NULL, '2026-06-11 07:09:41', '2026-07-28 07:51:03'),
(522, 1, 7, 1, 'SAINT-LUKE-LIBRARY-bukurumahdodi-9998', 'Buku rumah dodi', 'buku-rumah-dodi-6622', '2026', '987-987-765', '<p><strong>Buku ini menceritakan hal mistis</strong></p>', 200, NULL, '813.54', '1', 'Tersedia', 'books/cover/01KTV16WA2P72EZCFHTA5TE6HT.jpg', 100000, 'Published', 0, NULL, '2026-06-11 09:46:28', '2026-07-08 03:08:06'),
(523, 1, 10, 1, 'SAINT-LUKE-LIBRARY-rumahimut-5338', 'Rumah Imut', 'rumah-imut-6127', '2026', '987-987-678', '<p><strong>Buku Lucu</strong></p>', 100, NULL, '897.98', '1', 'Tersedia', 'books/cover/01KTVG2TTWGXV7GXC8NP3B77KH.jpg', 0, 'Published', 0, NULL, '2026-06-11 14:06:24', '2026-06-11 14:06:24'),
(524, 172, 3, 1, 'SAINT-LUKE-LIBRARY-senimusik-8959', 'Seni Musik', 'seni-musik-5407', '2006', '876-543-289', '<p><strong>Buku tentang seni</strong></p>', 100, NULL, '813.78 B', '1', 'Tersedia', 'books/cover/01KTX2KMNW1N7JJTW83MM3YAX0.jpg', 0, 'Published', 0, '2026-08-08 19:13:38', '2026-06-12 04:49:23', '2026-08-08 19:13:38'),
(525, 1, 3, 1, 'SAINT-LUKE-LIBRARY-bukurumahjago-6965', 'Buku Rumah Jago', 'buku-rumah-jago-6103', '2005', '897-987-654', '<p>Buku menceritakan hal mistis</p>', 208, NULL, '987.87', '1', 'Tersedia', 'books/cover/01KVC91P5WBMFZDYJX41AEZF0Z.jpg', 0, 'Published', 0, NULL, '2026-06-18 02:30:32', '2026-06-18 02:30:32'),
(526, 173, 3, 2, 'SAINT-LUKE-LIBRARY-pertempuranpascakemerdekaan-5368', 'Pertempuran Pasca Kemerdekaan', 'pertempuran-pasca-kemerdekaan-6337', '1948', '987-987-678', '<p>Buku ini menceritakan perang pasca kemerdekaan</p>', 108, NULL, '897.789', '1', 'Tersedia', 'books/cover/01KX4ZPJTXS4AAWWHXW7DB9CY7.jpg', 100000, 'Published', 1, '2026-07-16 14:57:00', '2026-07-10 03:03:53', '2026-07-16 14:57:00'),
(528, 1, 22, 1, 'SAINT-LUKE-LIBRARY-sejarahindonesia-9134', 'Sejarah Indonesia', 'sejarah-indonesia-9494', '2020', '123-456', '<p>Buku tentang sejarah Indonesia</p>', 100, NULL, '813.54', '1', 'Tersedia', 'books/cover/01KXQ0X4FHWBGGE9DNR5E1QPAJ.jpg', 0, 'Published', 1, NULL, '2026-07-17 03:11:16', '2026-07-17 03:11:16');

-- --------------------------------------------------------

--
-- Table structure for table `book_of_assets`
--

CREATE TABLE `book_of_assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `asset_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_of_assets`
--

INSERT INTO `book_of_assets` (`id`, `book_id`, `asset_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 521, 3),
(4, 522, 4),
(5, 523, 5),
(6, 524, 6),
(7, 524, 7),
(8, 525, 8),
(9, 526, 9),
(12, 526, 12),
(13, 528, 13),
(14, 528, 14);

-- --------------------------------------------------------

--
-- Table structure for table `book_of_categories`
--

CREATE TABLE `book_of_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_of_categories`
--

INSERT INTO `book_of_categories` (`id`, `category_id`, `book_id`) VALUES
(1, 1, 1),
(2, 1, 521),
(3, 1, 2),
(4, 1, 522),
(5, 1, 523),
(6, 4, 524),
(7, 1, 525),
(8, 5, 526),
(10, 7, 528),
(11, 3, 3),
(12, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `book_of_types`
--

CREATE TABLE `book_of_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_of_types`
--

INSERT INTO `book_of_types` (`id`, `book_id`, `type_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 521, 2, NULL, NULL),
(4, 521, 1, NULL, NULL),
(5, 2, 2, NULL, NULL),
(6, 522, 1, NULL, NULL),
(7, 522, 2, NULL, NULL),
(8, 523, 1, NULL, NULL),
(9, 523, 2, NULL, NULL),
(10, 524, 1, NULL, NULL),
(11, 525, 1, NULL, NULL),
(12, 526, 1, NULL, NULL),
(13, 526, 2, NULL, NULL),
(16, 528, 1, NULL, NULL),
(17, 528, 2, NULL, NULL),
(18, 3, 2, NULL, NULL),
(19, 4, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `icon`, `photo`, `description`, `is_active`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Fiksi', 'fiksi-2434', NULL, NULL, '<p></p>', 1, NULL, '2026-06-10 18:16:05', '2026-06-10 18:16:05'),
(2, 'Nonfiksi', 'nonfiksi-7466', NULL, NULL, '<p></p>', 1, NULL, '2026-06-11 10:04:18', '2026-06-11 10:04:18'),
(3, 'Information', 'information-3741', NULL, NULL, '<p></p>', 1, NULL, '2026-06-11 12:52:45', '2026-06-11 12:52:45'),
(4, 'Seni', 'seni-3056', NULL, NULL, '<p></p>', 1, NULL, '2026-06-12 04:40:47', '2026-06-12 04:40:47'),
(5, 'Jenaka', 'jenaka-2336', NULL, NULL, '<p></p>', 1, NULL, '2026-07-10 02:39:37', '2026-07-10 02:39:37'),
(6, 'Sastra', 'sastra-3845', NULL, NULL, '<p></p>', 1, NULL, '2026-07-17 03:01:40', '2026-07-17 03:01:40'),
(7, 'Sejarah', 'sejarah-4575', NULL, NULL, '<p></p>', 1, NULL, '2026-07-17 03:02:17', '2026-07-17 03:02:17');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime DEFAULT NULL,
  `capacity` int(10) UNSIGNED DEFAULT NULL,
  `seats_taken` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `registration_url` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `slug`, `description`, `category`, `location`, `start_at`, `end_at`, `capacity`, `seats_taken`, `registration_url`, `thumbnail`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Selasa Sastra: Membedah Bumi Manusia', 'selasa-sastra-membedah-bumi-manusia', 'Diskusi mendalam karya Pramoedya Ananta Toer bersama klub baca. Terbuka untuk seluruh siswa dan guru.', 'Klub Baca', 'Ruang Baca Utama', '2026-06-14 15:30:00', '2026-06-14 17:00:00', 30, 22, NULL, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop', 1, 0, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(2, 'Diskusi Filsafat: Pengantar Stoikisme', 'diskusi-filsafat-pengantar-stoikisme', 'Mengenal dasar-dasar filsafat Stoik dan penerapannya dalam keseharian pelajar.', 'Diskusi', 'Ruang Diskusi 2', '2026-06-21 15:30:00', '2026-06-21 17:00:00', 24, 12, NULL, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop', 1, 1, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(3, 'Workshop Literasi Digital Kelas X', 'workshop-literasi-digital-kelas-x', 'Pelatihan menelusuri sumber daring tepercaya dan mengelola referensi digital.', 'Workshop', 'Lab Komputer', '2026-06-25 09:00:00', '2026-06-25 11:30:00', 40, 40, NULL, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop', 1, 2, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(4, 'Bedah Buku bersama Penulis Tamu', 'bedah-buku-bersama-penulis-tamu', 'Sesi bedah buku dan tanya-jawab langsung bersama penulis tamu undangan perpustakaan.', 'Acara', 'Aula Yayasan', '2026-06-30 14:00:00', '2026-06-30 16:00:00', 80, 41, NULL, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop', 1, 3, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(5, 'Pelatihan Menulis Kreatif', 'pelatihan-menulis-kreatif', 'Lokakarya menulis cerpen dan esai bersama mentor literasi sekolah.', 'Workshop', 'Ruang Baca Utama', '2026-07-06 13:00:00', '2026-07-06 15:00:00', 25, 9, NULL, 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop', 1, 4, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(6, 'Pameran Koleksi Langka Perpustakaan', 'pameran-koleksi-langka-perpustakaan', 'Memamerkan koleksi buku langka dan arsip bersejarah milik perpustakaan sekolah.', 'Pameran', 'Galeri Lantai 2', '2026-07-13 08:00:00', '2026-07-13 15:00:00', NULL, 0, NULL, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop', 1, 5, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(7, 'Lomba literasi perpustakaan lukas', 'lomba-literasi-perpustakaan-lukas-5829', 'Lomba literasi sekolah santo lukas', 'Klub Baca', 'Ruang Perpustakaan', '2026-06-12 10:30:00', '2026-06-12 13:00:00', 10, 0, 'https://mail.google.com/mail/u/0/#inbox', 'events/thumbnails/01KTVAQKQXZPZ8SMRB06RWJD5B.jpg', 1, 1, '2026-06-11 12:32:53', '2026-06-11 12:32:53'),
(8, 'Pendaftaran Lomba Baca Nasional', 'pendaftaran-lomba-baca-nasional-1420', NULL, 'Klub Baca, Workshop', 'Ruang Perpustakaan Yayasan Pendidikan Umum Santo Lukas', '2026-07-10 08:00:00', NULL, 10, 0, 'https://forms.gle/7A6xCP4JqDygezpf6', 'events/thumbnails/01KX55RV36G2P4FDZKWR6EDWBR.jpg', 1, 0, '2026-07-10 04:48:58', '2026-07-10 04:49:58');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fines`
--

CREATE TABLE `fines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_book_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `late_fee` decimal(8,3) NOT NULL DEFAULT 0.000,
  `other_fee` decimal(8,2) NOT NULL DEFAULT 0.00,
  `total_fee` decimal(8,2) NOT NULL DEFAULT 0.00,
  `fine_date` date DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'Tranksaksi Sedang Diproses',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fines`
--

INSERT INTO `fines` (`id`, `return_book_id`, `order_id`, `late_fee`, `other_fee`, `total_fee`, `fine_date`, `payment_method`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 2, 'FINE-1-1781162104', 0.000, 0.00, 0.00, '2026-06-11', NULL, 'Tranksaksi Berhasil', '2026-06-11 07:11:25', '2026-06-11 12:21:18'),
(2, 3, 'FINE-2-1781178982', 0.000, 10000.00, 10000.00, '2026-06-11', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-11 11:50:12', '2026-06-11 11:56:46'),
(3, 8, 'FINE-3-1781588332', 10000.000, 10000.00, 20000.00, '2026-06-19', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-19 04:22:45', '2026-06-16 05:39:17'),
(4, 9, NULL, 0.000, 0.00, 0.00, '2026-06-16', NULL, 'Tranksaksi Berhasil', '2026-06-16 16:50:48', '2026-06-16 16:50:48'),
(6, 14, 'FINE-6-1781754583', 30000.000, 10000.00, 40000.00, '2026-07-08', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-08 03:08:49', '2026-06-18 03:50:10'),
(7, 16, 'FINE-7-1782146814', 5000.000, 10000.00, 15000.00, '2026-07-04', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-04 04:25:22', '2026-06-22 16:47:08'),
(8, 17, 'FINE-8-1782146715', 0.000, 10000.00, 10000.00, '2026-06-22', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-22 15:03:32', '2026-06-22 16:45:35'),
(9, 18, 'FINE-9-1782593437', 0.000, 10000.00, 10000.00, '2026-06-23', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-23 04:56:40', '2026-06-27 20:50:48'),
(10, 19, 'FINE-10-1782593459', 0.000, 10000.00, 10000.00, '2026-06-23', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-23 08:58:30', '2026-06-27 20:51:08'),
(11, 20, 'FINE-11-1782593478', 0.000, 90000.00, 90000.00, '2026-06-23', 'bank_transfer', 'Tranksaksi Berhasil', '2026-06-23 08:58:30', '2026-06-27 20:51:26'),
(12, 21, 'FINE-12-1782593338', 5000.000, 10000.00, 15000.00, '2026-07-09', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-09 07:38:04', '2026-06-27 20:49:21'),
(13, 22, 'FINE-13-1782593399', 5000.000, 10000.00, 15000.00, '2026-07-09', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-09 07:38:04', '2026-06-27 20:50:12'),
(14, 24, NULL, 0.000, 20000.00, 20000.00, '2026-07-01', NULL, 'Tranksaksi Sedang Diproses', '2026-07-01 08:06:01', '2026-07-10 03:31:35'),
(15, 25, NULL, 0.000, 20000.00, 20000.00, '2026-07-01', NULL, 'Tranksaksi Sedang Diproses', '2026-07-01 08:06:01', '2026-07-10 03:31:35'),
(16, 26, NULL, 0.000, 0.00, 0.00, '2026-07-10', NULL, 'Tranksaksi Berhasil', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(17, 31, 'FINE-LOAN-23-1784129265', 5000.000, 20000.00, 25000.00, '2026-07-30', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-30 01:06:59', '2026-07-15 15:28:37'),
(18, 32, 'FINE-LOAN-23-1784129265', 5000.000, 20000.00, 25000.00, '2026-07-30', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-30 01:06:59', '2026-07-15 15:28:37'),
(19, 34, 'FINE-LOAN-25-1784213072', 0.000, 20000.00, 20000.00, '2026-07-30', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-29 17:05:34', '2026-07-16 14:44:56'),
(20, 35, 'FINE-LOAN-25-1784213072', 0.000, 80000.00, 80000.00, '2026-07-30', 'bank_transfer', 'Tranksaksi Berhasil', '2026-07-29 17:05:34', '2026-07-16 14:44:56'),
(21, 38, 'FINE-LOAN-28-1784258361', 5000.000, 20000.00, 25000.00, '2026-08-01', 'bank_transfer', 'Tranksaksi Berhasil', '2026-08-01 03:16:27', '2026-07-17 03:19:42'),
(22, 39, 'FINE-LOAN-28-1784258361', 5000.000, 0.00, 5000.00, '2026-08-01', 'bank_transfer', 'Tranksaksi Berhasil', '2026-08-01 03:16:27', '2026-07-17 03:19:42');

-- --------------------------------------------------------

--
-- Table structure for table `fine_settings`
--

CREATE TABLE `fine_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `late_fee_per_day` bigint(20) UNSIGNED NOT NULL,
  `damage_discount_type` enum('percentage','fixed') NOT NULL,
  `damage_fee_book` bigint(20) UNSIGNED NOT NULL,
  `lost_discount_type` enum('percentage','fixed') NOT NULL,
  `lost_fee_book` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `loan_duration_days` int(11) DEFAULT 14
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fine_settings`
--

INSERT INTO `fine_settings` (`id`, `late_fee_per_day`, `damage_discount_type`, `damage_fee_book`, `lost_discount_type`, `lost_fee_book`, `created_at`, `updated_at`, `loan_duration_days`) VALUES
(2, 5000, 'percentage', 20, 'percentage', 80, '2026-06-11 04:37:39', '2026-07-10 03:31:35', 14);

-- --------------------------------------------------------

--
-- Table structure for table `informations`
--

CREATE TABLE `informations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `informations`
--

INSERT INTO `informations` (`id`, `image`, `name`, `slug`, `description`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'informations/01KTVBWGSMF91HH5ZZ6Y8V6QVR.jpeg', 'Perpustakaan Akses Literasi', 'perpustakaan-akses-literasi-4209', '<p>Perpustakaan digunakan untuk literasi secara fisik dan digital</p>', 3, '2026-06-11 12:53:02', '2026-06-11 12:53:02'),
(2, 'informations/01KX56054W7ZXERZ4ZRVR5HCKN.jpg', 'Sejarah Perpustakaan Santo Lukas', 'sejarah-perpustakaan-santo-lukas-2016', '<p>Sejarah Seputar Perpustakaan Santo Lukas<br><br><img src=\"http://127.0.0.1:8000/storage/YuilMBHizkjT0hKR5Ze3CovhP530wFWBHvY4AhYE.png\" alt=\"Gambar 1\" data-id=\"YuilMBHizkjT0hKR5Ze3CovhP530wFWBHvY4AhYE.png\"></p>', 3, '2026-07-10 04:53:58', '2026-07-10 04:53:58');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'Indonesia',
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `code`, `language`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'SAINT-LUKE-LIBRARY-indonesia-8619', 'Indonesia', 'languages/01KTS9QXVW3ZMAPY4PWFMCT1Y5.jpg', '2026-06-10 17:37:06', '2026-06-10 17:37:06'),
(2, 'SAINT-LUKE-LIBRARY-english-4303', 'English', NULL, '2026-07-10 02:40:50', '2026-07-10 02:40:50');

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `loan_code` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('loaned','partial returned','returned') NOT NULL DEFAULT 'loaned',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `loan_code`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SAINT-LUKE-LIBRARY-loan-7301', 4, 'returned', '2026-06-11 03:37:00', '2026-06-11 03:38:02'),
(2, 'SAINT-LUKE-LIBRARY-loan-4926', 4, 'loaned', '2026-06-11 03:54:23', '2026-06-11 03:54:23'),
(3, 'SAINT-LUKE-LIBRARY-loan-9127', 4, 'returned', '2026-06-11 07:10:40', '2026-06-11 07:11:25'),
(4, 'SAINT-LUKE-LIBRARY-loan-5979', 6, 'returned', '2026-06-11 11:48:26', '2026-06-11 11:50:12'),
(5, 'SAINT-LUKE-LIBRARY-loan-9978', 8, 'returned', '2026-06-11 13:43:41', '2026-06-11 13:47:04'),
(6, 'SAINT-LUKE-LIBRARY-loan-8290', 8, 'returned', '2026-06-11 14:07:24', '2026-06-11 14:11:33'),
(7, 'SAINT-LUKE-LIBRARY-loan-3454', 8, 'returned', '2026-06-11 18:13:51', '2026-06-11 18:25:19'),
(8, 'SAINT-LUKE-LIBRARY-loan-2759', 8, 'returned', '2026-06-11 18:17:44', '2026-06-16 16:54:03'),
(9, 'SAINT-LUKE-LIBRARY-loan-8830', 11, 'loaned', '2026-06-12 04:56:43', '2026-06-12 04:56:43'),
(10, 'SAINT-LUKE-LIBRARY-loan-9242', 11, 'returned', '2026-06-16 03:48:20', '2026-06-19 04:22:45'),
(11, 'SAINT-LUKE-LIBRARY-loan-7754', 4, 'returned', '2026-06-18 02:41:19', '2026-07-08 03:08:49'),
(12, 'SAINT-LUKE-LIBRARY-loan-3189', 4, 'returned', '2026-06-18 03:51:13', '2026-06-18 03:52:02'),
(13, 'SAINT-LUKE-LIBRARY-loan-8389', 4, 'returned', '2026-06-19 04:16:43', '2026-06-23 04:56:40'),
(14, 'SAINT-LUKE-LIBRARY-loan-9079', 4, 'returned', '2026-06-19 04:21:12', '2026-07-04 04:25:22'),
(15, 'SAINT-LUKE-LIBRARY-loan-6837', 4, 'returned', '2026-06-22 15:01:13', '2026-06-22 15:03:32'),
(16, 'SAINT-LUKE-LIBRARY-loan-3503', 4, 'returned', '2026-06-23 07:26:51', '2026-06-23 08:58:30'),
(17, 'SAINT-LUKE-LIBRARY-loan-4076', 4, 'returned', '2026-06-24 04:55:24', '2026-07-09 07:38:04'),
(18, 'SAINT-LUKE-LIBRARY-loan-1277', 4, 'returned', '2026-06-25 09:51:22', '2026-07-01 08:06:01'),
(20, 'SAINT-LUKE-LIBRARY-loan-6328', 8, 'returned', '2026-07-10 03:13:04', '2026-07-10 03:34:14'),
(21, 'SAINT-LUKE-LIBRARY-loan-8255', 8, 'loaned', '2026-07-15 12:41:28', '2026-07-15 12:41:28'),
(22, 'SAINT-LUKE-LIBRARY-loan-2734', 8, 'loaned', '2026-07-15 13:41:05', '2026-07-15 13:41:05'),
(23, 'SAINT-LUKE-LIBRARY-loan-1837', 8, 'returned', '2026-07-15 14:45:15', '2026-07-30 01:06:59'),
(25, 'SAINT-LUKE-LIBRARY-loan-7382', 20, 'returned', '2026-07-16 14:27:08', '2026-07-29 17:05:34'),
(26, 'SAINT-LUKE-LIBRARY-loan-3554', 20, 'returned', '2026-07-16 14:49:36', '2026-07-16 14:50:34'),
(27, 'SAINT-LUKE-LIBRARY-loan-3973', 20, 'returned', '2026-07-16 14:51:16', '2026-07-16 14:51:53'),
(28, 'SAINT-LUKE-LIBRARY-loan-4942', 21, 'returned', '2026-07-17 03:12:48', '2026-08-01 03:16:27'),
(30, 'SAINT-LUKE-LIBRARY-loan-3462', 8, 'loaned', '2026-08-12 06:13:28', '2026-08-12 06:13:28'),
(31, 'SAINT-LUKE-LIBRARY-loan-1324', 4, 'loaned', '2026-08-19 06:46:59', '2026-08-19 06:46:59');

-- --------------------------------------------------------

--
-- Table structure for table `loan_details`
--

CREATE TABLE `loan_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `loan_id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `loan_date` date NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('borrowed','returned') NOT NULL DEFAULT 'borrowed',
  `loan_type` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loan_details`
--

INSERT INTO `loan_details` (`id`, `loan_id`, `book_id`, `loan_date`, `due_date`, `status`, `loan_type`) VALUES
(1, 1, 1, '2026-06-11', '2026-06-25', 'returned', 'digital'),
(2, 2, 1, '2026-06-11', '2026-06-25', 'returned', 'digital'),
(3, 3, 2, '2026-06-11', '2026-06-25', 'returned', 'physical'),
(4, 4, 2, '2026-06-11', '2026-06-25', 'returned', 'physical'),
(5, 5, 1, '2026-06-11', '2026-06-25', 'returned', 'digital'),
(6, 6, 523, '2026-06-11', '2026-06-25', 'returned', 'physical'),
(7, 7, 523, '2026-06-12', '2026-06-26', 'returned', 'digital'),
(8, 8, 2, '2026-06-12', '2026-06-26', 'returned', 'physical'),
(9, 8, 523, '2026-06-12', '2026-06-26', 'returned', 'digital'),
(10, 9, 524, '2026-06-12', '2026-06-26', 'returned', 'digital'),
(11, 10, 1, '2026-06-16', '2026-06-17', 'returned', 'physical'),
(12, 11, 522, '2026-06-18', '2026-07-02', 'returned', 'physical'),
(13, 12, 1, '2026-06-18', '2026-07-02', 'returned', 'digital'),
(14, 13, 1, '2026-06-19', '2026-07-03', 'returned', 'physical'),
(15, 14, 521, '2026-06-19', '2026-07-03', 'returned', 'physical'),
(16, 15, 521, '2026-06-22', '2026-07-06', 'returned', 'physical'),
(17, 16, 1, '2026-06-23', '2026-07-07', 'returned', 'physical'),
(18, 16, 521, '2026-06-23', '2026-07-07', 'returned', 'physical'),
(19, 17, 1, '2026-06-24', '2026-07-08', 'returned', 'physical'),
(20, 17, 521, '2026-06-24', '2026-07-08', 'returned', 'physical'),
(21, 18, 1, '2026-06-25', '2026-07-09', 'returned', 'physical'),
(22, 18, 521, '2026-06-25', '2026-07-09', 'returned', 'physical'),
(23, 18, 522, '2026-06-28', '2026-07-12', 'returned', 'digital'),
(25, 20, 526, '2026-07-10', '2026-07-24', 'returned', 'physical'),
(26, 20, 2, '2026-07-10', '2026-07-24', 'returned', 'physical'),
(27, 21, 522, '2026-07-15', '2026-07-29', 'returned', 'digital'),
(28, 22, 526, '2026-07-15', '2026-07-29', 'returned', 'digital'),
(29, 23, 1, '2026-07-15', '2026-07-29', 'returned', 'physical'),
(30, 23, 521, '2026-07-15', '2026-07-29', 'returned', 'physical'),
(32, 25, 1, '2026-07-16', '2026-07-30', 'returned', 'physical'),
(33, 25, 521, '2026-07-16', '2026-07-30', 'returned', 'physical'),
(34, 26, 526, '2026-07-16', '2026-07-30', 'returned', 'digital'),
(35, 27, 526, '2026-07-16', '2026-07-30', 'returned', 'digital'),
(36, 28, 528, '2026-07-17', '2026-07-31', 'returned', 'physical'),
(37, 28, 1, '2026-07-17', '2026-07-31', 'returned', 'physical'),
(40, 30, 528, '2026-08-12', '2026-08-26', 'borrowed', 'physical'),
(41, 31, 521, '2026-08-19', '2026-09-02', 'borrowed', 'physical');

-- --------------------------------------------------------

--
-- Table structure for table `location_of_books`
--

CREATE TABLE `location_of_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `location_of_books`
--

INSERT INTO `location_of_books` (`id`, `book_id`, `location`, `created_at`, `updated_at`) VALUES
(1, 3, 'Rak A Baris 201 ', '2026-08-08 17:32:14', '2026-08-08 17:32:14'),
(2, 4, 'Rak B Baris 202', '2026-08-08 18:31:49', '2026-08-08 18:32:28'),
(3, NULL, 'Lantai 2 Rak 13 Nomor 103 ', '2026-08-12 06:15:36', '2026-08-12 06:15:36'),
(4, NULL, 'Rak 10 Level 1', '2026-08-19 06:41:52', '2026-08-19 06:41:52');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2026_02_21_160000_create_authors_table', 1),
(6, '2026_02_21_160851_create_categories_table', 1),
(7, '2026_02_21_162145_create_publishers_table', 1),
(8, '2026_02_21_162509_create_announcements_table', 1),
(9, '2026_02_21_163438_create_books_table', 1),
(10, '2026_02_21_165851_create_book_of_categories_table', 1),
(11, '2026_02_21_171602_create_assets_table', 1),
(12, '2026_02_21_172235_create_stocks_table', 1),
(13, '2026_02_21_172628_create_loans_table', 1),
(14, '2026_02_21_172630_create_loan_details', 1),
(15, '2026_02_21_173313_create_return_books_table', 1),
(16, '2026_02_21_173745_create_return_book_checks_table', 1),
(17, '2026_02_21_174104_create_fine_settings_table', 1),
(18, '2026_02_21_175151_create_fines_table', 1),
(19, '2026_02_21_180553_create_permission_tables', 1),
(20, '2026_02_21_181038_create_route_accesses_table', 1),
(21, '2026_02_21_190658_create_languages_table', 1),
(22, '2026_02_21_192659_add_language_to_books', 1),
(23, '2026_03_02_161115_add_deleted_at_to_users_table', 1),
(24, '2026_03_30_072334_create_asset_books', 1),
(25, '2026_03_30_074954_create_author_of_books', 1),
(26, '2026_03_30_102433_create_social_media_table', 1),
(27, '2026_03_30_193115_add_added_by_to_books_table', 1),
(28, '2026_03_30_195804_remove_author_id_from_books_table', 1),
(29, '2026_03_30_200656_remove_book_id_from_assets_table', 1),
(30, '2026_04_04_121144_create_informations_table', 1),
(31, '2026_04_11_055318_create_review_books_table', 1),
(32, '2026_04_15_104051_create_bookmarks_table', 1),
(33, '2026_04_16_072016_add_order_id_to_fines_table', 1),
(34, '2026_04_28_173203_add_loan_duration_to_fine_settings', 1),
(35, '2026_05_05_090350_add_pdf_path_status_to_assets_table', 1),
(36, '2026_05_15_160149_create_types_table', 1),
(37, '2026_05_15_160502_create_book_of_types', 1),
(38, '2026_05_18_100000_add_type_to_users_table', 1),
(39, '2026_05_18_100100_create_visits_table', 1),
(40, '2026_05_18_120000_add_approval_to_users_table', 1),
(41, '2026_05_18_180739_change_route_accesses_to_json_ids', 1),
(42, '2026_05_21_120000_add_member_card_to_users_table', 1),
(43, '2026_05_22_000000_add_guest_fields_to_visits_table', 1),
(44, '2026_05_22_150843_add_location_book_to_books_table', 1),
(45, '2026_05_28_000000_add_loan_type_to_loan_details_table', 1),
(46, '2026_05_28_180000_add_classification_number_to_books_table', 1),
(47, '2026_06_02_000000_add_volume_to_books_table', 1),
(48, '2026_06_02_000100_make_publisher_id_nullable_on_books_table', 1),
(49, '2026_06_05_120000_add_google_auth_to_users_table', 1),
(50, '2026_06_05_120000_create_online_resources_table', 1),
(51, '2026_06_06_120000_create_testimonials_table', 1),
(52, '2026_06_06_130000_create_events_table', 1),
(53, '2026_06_06_140000_add_is_spotlight_to_books_table', 1),
(54, '2026_06_07_120000_update_online_resources_slug_and_color', 1),
(55, '2026_06_08_120000_create_organization_members_table', 1),
(56, '2026_06_10_160000_change_avatar_url_to_text_on_users_table', 2),
(57, '2026_07_15_222714_remove_unique_from_order_id_in_fines_table', 3),
(59, '2026_08_08_213314_create_location_of_books_table', 4),
(60, '2026_08_08_215644_add_column_relation_location_to_books_table', 5),
(61, '2026_08_09_011121_make_book_id_nullable_in_location_of_books_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 3),
(1, 'App\\Models\\User', 7),
(1, 'App\\Models\\User', 10),
(1, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 22),
(3, 'App\\Models\\Author', 1),
(3, 'App\\Models\\User', 1),
(3, 'App\\Models\\Author', 2),
(3, 'App\\Models\\Author', 3),
(3, 'App\\Models\\Author', 4),
(3, 'App\\Models\\Author', 5),
(3, 'App\\Models\\Author', 6),
(3, 'App\\Models\\Author', 7),
(3, 'App\\Models\\Author', 8),
(3, 'App\\Models\\Author', 9),
(3, 'App\\Models\\Author', 10),
(3, 'App\\Models\\Author', 11),
(3, 'App\\Models\\Author', 12),
(3, 'App\\Models\\Author', 13),
(3, 'App\\Models\\Author', 14),
(3, 'App\\Models\\Author', 15),
(3, 'App\\Models\\User', 15),
(3, 'App\\Models\\Author', 16),
(3, 'App\\Models\\User', 16),
(3, 'App\\Models\\Author', 17),
(3, 'App\\Models\\Author', 18),
(3, 'App\\Models\\Author', 19),
(3, 'App\\Models\\Author', 20),
(3, 'App\\Models\\Author', 21),
(3, 'App\\Models\\Author', 22),
(3, 'App\\Models\\Author', 23),
(3, 'App\\Models\\User', 23),
(3, 'App\\Models\\Author', 24),
(3, 'App\\Models\\Author', 25),
(3, 'App\\Models\\Author', 26),
(3, 'App\\Models\\Author', 27),
(3, 'App\\Models\\Author', 28),
(3, 'App\\Models\\Author', 29),
(3, 'App\\Models\\Author', 30),
(3, 'App\\Models\\Author', 31),
(3, 'App\\Models\\Author', 32),
(3, 'App\\Models\\Author', 33),
(3, 'App\\Models\\Author', 34),
(3, 'App\\Models\\Author', 35),
(3, 'App\\Models\\Author', 36),
(3, 'App\\Models\\Author', 37),
(3, 'App\\Models\\Author', 38),
(3, 'App\\Models\\Author', 39),
(3, 'App\\Models\\Author', 40),
(3, 'App\\Models\\Author', 41),
(3, 'App\\Models\\Author', 42),
(3, 'App\\Models\\Author', 43),
(3, 'App\\Models\\Author', 44),
(3, 'App\\Models\\Author', 45),
(3, 'App\\Models\\Author', 46),
(3, 'App\\Models\\Author', 47),
(3, 'App\\Models\\Author', 48),
(3, 'App\\Models\\Author', 49),
(3, 'App\\Models\\Author', 50),
(3, 'App\\Models\\Author', 51),
(3, 'App\\Models\\Author', 52),
(3, 'App\\Models\\Author', 53),
(3, 'App\\Models\\Author', 54),
(3, 'App\\Models\\Author', 55),
(3, 'App\\Models\\Author', 56),
(3, 'App\\Models\\Author', 57),
(3, 'App\\Models\\Author', 58),
(3, 'App\\Models\\Author', 59),
(3, 'App\\Models\\Author', 60),
(3, 'App\\Models\\Author', 61),
(3, 'App\\Models\\Author', 62),
(3, 'App\\Models\\Author', 63),
(3, 'App\\Models\\Author', 64),
(3, 'App\\Models\\Author', 65),
(3, 'App\\Models\\Author', 66),
(3, 'App\\Models\\Author', 67),
(3, 'App\\Models\\Author', 68),
(3, 'App\\Models\\Author', 69),
(3, 'App\\Models\\Author', 70),
(3, 'App\\Models\\Author', 71),
(3, 'App\\Models\\Author', 72),
(3, 'App\\Models\\Author', 73),
(3, 'App\\Models\\Author', 74),
(3, 'App\\Models\\Author', 75),
(3, 'App\\Models\\Author', 76),
(3, 'App\\Models\\Author', 77),
(3, 'App\\Models\\Author', 78),
(3, 'App\\Models\\Author', 79),
(3, 'App\\Models\\Author', 80),
(3, 'App\\Models\\Author', 81),
(3, 'App\\Models\\Author', 82),
(3, 'App\\Models\\Author', 83),
(3, 'App\\Models\\Author', 84),
(3, 'App\\Models\\Author', 85),
(3, 'App\\Models\\Author', 86),
(3, 'App\\Models\\Author', 87),
(3, 'App\\Models\\Author', 88),
(3, 'App\\Models\\Author', 89),
(3, 'App\\Models\\Author', 90),
(3, 'App\\Models\\Author', 91),
(3, 'App\\Models\\Author', 92),
(3, 'App\\Models\\Author', 93),
(3, 'App\\Models\\Author', 94),
(3, 'App\\Models\\Author', 95),
(3, 'App\\Models\\Author', 96),
(3, 'App\\Models\\Author', 97),
(3, 'App\\Models\\Author', 98),
(3, 'App\\Models\\Author', 99),
(3, 'App\\Models\\Author', 100),
(3, 'App\\Models\\Author', 101),
(3, 'App\\Models\\Author', 102),
(3, 'App\\Models\\Author', 103),
(3, 'App\\Models\\Author', 104),
(3, 'App\\Models\\Author', 105),
(3, 'App\\Models\\Author', 106),
(3, 'App\\Models\\Author', 107),
(3, 'App\\Models\\Author', 108),
(3, 'App\\Models\\Author', 109),
(3, 'App\\Models\\Author', 110),
(3, 'App\\Models\\Author', 111),
(3, 'App\\Models\\Author', 112),
(3, 'App\\Models\\Author', 113),
(3, 'App\\Models\\Author', 114),
(3, 'App\\Models\\Author', 115),
(3, 'App\\Models\\Author', 116),
(3, 'App\\Models\\Author', 117),
(3, 'App\\Models\\Author', 118),
(3, 'App\\Models\\Author', 119),
(3, 'App\\Models\\Author', 120),
(3, 'App\\Models\\Author', 121),
(3, 'App\\Models\\Author', 122),
(3, 'App\\Models\\Author', 123),
(3, 'App\\Models\\Author', 124),
(3, 'App\\Models\\Author', 125),
(3, 'App\\Models\\Author', 126),
(3, 'App\\Models\\Author', 127),
(3, 'App\\Models\\Author', 128),
(3, 'App\\Models\\Author', 129),
(3, 'App\\Models\\Author', 130),
(3, 'App\\Models\\Author', 131),
(3, 'App\\Models\\Author', 132),
(3, 'App\\Models\\Author', 133),
(3, 'App\\Models\\Author', 134),
(3, 'App\\Models\\Author', 135),
(3, 'App\\Models\\Author', 136),
(3, 'App\\Models\\Author', 137),
(3, 'App\\Models\\Author', 138),
(3, 'App\\Models\\Author', 139),
(3, 'App\\Models\\Author', 140),
(3, 'App\\Models\\Author', 141),
(3, 'App\\Models\\Author', 142),
(3, 'App\\Models\\Author', 143),
(3, 'App\\Models\\Author', 144),
(3, 'App\\Models\\Author', 145),
(3, 'App\\Models\\Author', 146),
(3, 'App\\Models\\Author', 147),
(3, 'App\\Models\\Author', 148),
(3, 'App\\Models\\Author', 149),
(3, 'App\\Models\\Author', 150),
(3, 'App\\Models\\Author', 151),
(3, 'App\\Models\\Author', 152),
(3, 'App\\Models\\Author', 153),
(3, 'App\\Models\\Author', 154),
(3, 'App\\Models\\Author', 155),
(3, 'App\\Models\\Author', 156),
(3, 'App\\Models\\Author', 157),
(3, 'App\\Models\\Author', 158),
(3, 'App\\Models\\Author', 159),
(3, 'App\\Models\\Author', 160),
(3, 'App\\Models\\Author', 161),
(3, 'App\\Models\\Author', 162),
(3, 'App\\Models\\Author', 163),
(3, 'App\\Models\\Author', 164),
(3, 'App\\Models\\Author', 165),
(3, 'App\\Models\\Author', 166),
(3, 'App\\Models\\Author', 167),
(3, 'App\\Models\\Author', 168),
(3, 'App\\Models\\Author', 169),
(3, 'App\\Models\\Author', 170),
(3, 'App\\Models\\Author', 171),
(3, 'App\\Models\\Author', 172),
(3, 'App\\Models\\Author', 173),
(3, 'App\\Models\\Author', 174),
(3, 'App\\Models\\Author', 175),
(3, 'App\\Models\\Author', 176),
(3, 'App\\Models\\Author', 177),
(3, 'App\\Models\\Author', 178),
(3, 'App\\Models\\Author', 179),
(3, 'App\\Models\\Author', 180),
(3, 'App\\Models\\Author', 181),
(3, 'App\\Models\\Author', 182),
(3, 'App\\Models\\Author', 183),
(3, 'App\\Models\\Author', 184),
(3, 'App\\Models\\Author', 185),
(3, 'App\\Models\\Author', 186),
(3, 'App\\Models\\Author', 187),
(3, 'App\\Models\\Author', 188),
(3, 'App\\Models\\Author', 189),
(3, 'App\\Models\\Author', 190),
(3, 'App\\Models\\Author', 191),
(3, 'App\\Models\\Author', 192),
(3, 'App\\Models\\Author', 193),
(3, 'App\\Models\\Author', 194),
(3, 'App\\Models\\Author', 195),
(3, 'App\\Models\\Author', 196),
(3, 'App\\Models\\Author', 197),
(3, 'App\\Models\\Author', 198),
(3, 'App\\Models\\Author', 199),
(3, 'App\\Models\\Author', 200),
(3, 'App\\Models\\Author', 201),
(3, 'App\\Models\\Author', 202),
(3, 'App\\Models\\Author', 203),
(3, 'App\\Models\\Author', 204),
(3, 'App\\Models\\Author', 205),
(3, 'App\\Models\\Author', 206),
(3, 'App\\Models\\Author', 207),
(3, 'App\\Models\\Author', 208),
(3, 'App\\Models\\Author', 209),
(3, 'App\\Models\\Author', 210),
(3, 'App\\Models\\Author', 211),
(3, 'App\\Models\\Author', 212),
(3, 'App\\Models\\Author', 213),
(3, 'App\\Models\\Author', 214),
(3, 'App\\Models\\Author', 215),
(3, 'App\\Models\\Author', 216),
(3, 'App\\Models\\Author', 217),
(3, 'App\\Models\\Author', 218),
(3, 'App\\Models\\Author', 219),
(3, 'App\\Models\\Author', 220),
(3, 'App\\Models\\Author', 221),
(3, 'App\\Models\\Author', 222),
(3, 'App\\Models\\Author', 223),
(3, 'App\\Models\\Author', 224),
(3, 'App\\Models\\Author', 225),
(3, 'App\\Models\\Author', 226),
(3, 'App\\Models\\Author', 227),
(3, 'App\\Models\\Author', 228),
(3, 'App\\Models\\Author', 229),
(3, 'App\\Models\\Author', 230),
(3, 'App\\Models\\Author', 231),
(3, 'App\\Models\\Author', 232),
(3, 'App\\Models\\Author', 233),
(3, 'App\\Models\\Author', 234),
(3, 'App\\Models\\Author', 235),
(3, 'App\\Models\\Author', 236),
(3, 'App\\Models\\Author', 237),
(3, 'App\\Models\\Author', 238),
(3, 'App\\Models\\Author', 239),
(3, 'App\\Models\\Author', 240),
(3, 'App\\Models\\Author', 241),
(3, 'App\\Models\\Author', 242),
(3, 'App\\Models\\Author', 243),
(3, 'App\\Models\\Author', 244),
(3, 'App\\Models\\Author', 245),
(3, 'App\\Models\\Author', 246),
(3, 'App\\Models\\Author', 247),
(3, 'App\\Models\\Author', 248),
(3, 'App\\Models\\Author', 249),
(3, 'App\\Models\\Author', 250),
(3, 'App\\Models\\Author', 251),
(3, 'App\\Models\\Author', 252),
(3, 'App\\Models\\Author', 253),
(3, 'App\\Models\\Author', 254),
(3, 'App\\Models\\Author', 255),
(3, 'App\\Models\\Author', 256),
(3, 'App\\Models\\Author', 257),
(3, 'App\\Models\\Author', 258),
(3, 'App\\Models\\Author', 259),
(3, 'App\\Models\\Author', 260),
(3, 'App\\Models\\Author', 261),
(3, 'App\\Models\\Author', 262),
(3, 'App\\Models\\Author', 263),
(3, 'App\\Models\\Author', 264),
(3, 'App\\Models\\Author', 265),
(3, 'App\\Models\\Author', 266),
(3, 'App\\Models\\Author', 267),
(3, 'App\\Models\\Author', 268),
(3, 'App\\Models\\Author', 269),
(3, 'App\\Models\\Author', 270),
(3, 'App\\Models\\Author', 271),
(3, 'App\\Models\\Author', 272),
(3, 'App\\Models\\Author', 273),
(3, 'App\\Models\\Author', 274),
(3, 'App\\Models\\Author', 275),
(3, 'App\\Models\\Author', 276),
(3, 'App\\Models\\Author', 277),
(3, 'App\\Models\\Author', 278),
(3, 'App\\Models\\Author', 279),
(3, 'App\\Models\\Author', 280),
(3, 'App\\Models\\Author', 281),
(3, 'App\\Models\\Author', 282),
(3, 'App\\Models\\Author', 283),
(3, 'App\\Models\\Author', 284),
(3, 'App\\Models\\Author', 285),
(3, 'App\\Models\\Author', 286),
(3, 'App\\Models\\Author', 287),
(3, 'App\\Models\\Author', 288),
(3, 'App\\Models\\Author', 289),
(3, 'App\\Models\\Author', 290),
(3, 'App\\Models\\Author', 291),
(3, 'App\\Models\\Author', 292),
(3, 'App\\Models\\Author', 293),
(3, 'App\\Models\\Author', 294),
(3, 'App\\Models\\Author', 295),
(3, 'App\\Models\\Author', 296),
(3, 'App\\Models\\Author', 297),
(3, 'App\\Models\\Author', 298),
(3, 'App\\Models\\Author', 299),
(3, 'App\\Models\\Author', 300),
(3, 'App\\Models\\Author', 301),
(3, 'App\\Models\\Author', 302),
(3, 'App\\Models\\Author', 303),
(3, 'App\\Models\\Author', 304),
(3, 'App\\Models\\Author', 305),
(3, 'App\\Models\\Author', 306),
(3, 'App\\Models\\Author', 307),
(3, 'App\\Models\\Author', 308),
(3, 'App\\Models\\Author', 309),
(3, 'App\\Models\\Author', 310),
(3, 'App\\Models\\Author', 311),
(3, 'App\\Models\\Author', 312),
(3, 'App\\Models\\Author', 313),
(3, 'App\\Models\\Author', 314),
(3, 'App\\Models\\Author', 315),
(3, 'App\\Models\\Author', 316),
(3, 'App\\Models\\Author', 317),
(3, 'App\\Models\\Author', 318),
(3, 'App\\Models\\Author', 319),
(3, 'App\\Models\\Author', 320),
(3, 'App\\Models\\Author', 321),
(3, 'App\\Models\\Author', 322),
(3, 'App\\Models\\Author', 323),
(3, 'App\\Models\\Author', 324),
(3, 'App\\Models\\Author', 325),
(3, 'App\\Models\\Author', 326),
(3, 'App\\Models\\Author', 327),
(3, 'App\\Models\\Author', 328),
(3, 'App\\Models\\Author', 329),
(3, 'App\\Models\\Author', 330),
(3, 'App\\Models\\Author', 331),
(3, 'App\\Models\\Author', 332),
(3, 'App\\Models\\Author', 333),
(3, 'App\\Models\\Author', 334),
(3, 'App\\Models\\Author', 335),
(3, 'App\\Models\\Author', 336),
(3, 'App\\Models\\Author', 337),
(3, 'App\\Models\\Author', 338),
(3, 'App\\Models\\Author', 339),
(3, 'App\\Models\\Author', 340),
(3, 'App\\Models\\Author', 341),
(3, 'App\\Models\\Author', 342),
(3, 'App\\Models\\Author', 343),
(3, 'App\\Models\\Author', 344),
(3, 'App\\Models\\Author', 345),
(3, 'App\\Models\\Author', 346),
(3, 'App\\Models\\Author', 347),
(3, 'App\\Models\\Author', 348),
(3, 'App\\Models\\Author', 349),
(3, 'App\\Models\\Author', 350),
(3, 'App\\Models\\Author', 351),
(3, 'App\\Models\\Author', 352),
(3, 'App\\Models\\Author', 353),
(3, 'App\\Models\\Author', 354),
(3, 'App\\Models\\Author', 355),
(3, 'App\\Models\\Author', 356),
(3, 'App\\Models\\Author', 357),
(3, 'App\\Models\\Author', 358),
(3, 'App\\Models\\Author', 359),
(3, 'App\\Models\\Author', 360),
(3, 'App\\Models\\Author', 361),
(3, 'App\\Models\\Author', 362),
(3, 'App\\Models\\Author', 363),
(3, 'App\\Models\\Author', 364),
(3, 'App\\Models\\Author', 365),
(3, 'App\\Models\\Author', 366),
(3, 'App\\Models\\Author', 367),
(3, 'App\\Models\\Author', 368),
(3, 'App\\Models\\Author', 369),
(3, 'App\\Models\\Author', 370),
(3, 'App\\Models\\Author', 371),
(3, 'App\\Models\\Author', 372),
(3, 'App\\Models\\Author', 373),
(3, 'App\\Models\\Author', 374),
(3, 'App\\Models\\Author', 375),
(3, 'App\\Models\\Author', 376),
(3, 'App\\Models\\Author', 377),
(3, 'App\\Models\\Author', 378),
(3, 'App\\Models\\Author', 379),
(3, 'App\\Models\\Author', 380),
(3, 'App\\Models\\Author', 381),
(3, 'App\\Models\\Author', 382),
(3, 'App\\Models\\Author', 383),
(3, 'App\\Models\\Author', 384),
(3, 'App\\Models\\Author', 385),
(3, 'App\\Models\\Author', 386),
(3, 'App\\Models\\Author', 387),
(3, 'App\\Models\\Author', 388),
(3, 'App\\Models\\Author', 389),
(3, 'App\\Models\\Author', 390),
(3, 'App\\Models\\Author', 391),
(3, 'App\\Models\\Author', 392),
(3, 'App\\Models\\Author', 393),
(3, 'App\\Models\\Author', 394),
(3, 'App\\Models\\Author', 395),
(3, 'App\\Models\\Author', 396),
(4, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 21),
(5, 'App\\Models\\User', 4),
(5, 'App\\Models\\User', 6),
(5, 'App\\Models\\User', 8),
(5, 'App\\Models\\User', 9),
(5, 'App\\Models\\User', 11),
(5, 'App\\Models\\User', 17),
(5, 'App\\Models\\User', 18),
(5, 'App\\Models\\User', 19),
(5, 'App\\Models\\User', 20),
(5, 'App\\Models\\User', 21);

-- --------------------------------------------------------

--
-- Table structure for table `online_resources`
--

CREATE TABLE `online_resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `format` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `color` varchar(9) NOT NULL DEFAULT '#0F3D2E',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `online_resources`
--

INSERT INTO `online_resources` (`id`, `title`, `type`, `format`, `tag`, `description`, `url`, `color`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'JSTOR — Jurnal Akademik', 'Jurnal', 'Eksternal', 'Referensi', 'Akses ribuan jurnal akademik bidang humaniora, sosial, dan sains. Login menggunakan kredensial sekolah.', 'https://www.jstor.org', '#0F3D2E', 1, 0, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(2, 'Perpustakaan Nasional RI', 'E-Book', 'Web', 'Indonesia', 'Koleksi nasional digital — termasuk naskah Nusantara, koran lama, dan e-book Indonesia.', 'https://www.perpusnas.go.id', '#11324F', 1, 1, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(3, 'Khan Academy Bahasa Indonesia', 'Kursus', 'Web', 'Pelajaran', 'Materi belajar daring untuk SMP-SMA: matematika, sains, ekonomi, dengan bahasa Indonesia.', 'https://id.khanacademy.org', '#1E2440', 1, 2, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(4, 'Project Gutenberg', 'E-Book', 'Web', 'Klasik Dunia', '70.000+ buku klasik dunia berbahasa Inggris yang sudah berstatus public domain.', 'https://www.gutenberg.org', '#402015', 1, 3, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(5, 'Indonesia Heritage Society Library', 'Riset', 'Eksternal', 'Sejarah', 'Sumber riset sejarah dan budaya Indonesia untuk pelajar tingkat lanjut.', 'https://www.heritagejkt.org', '#13322F', 1, 4, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(6, 'Britannica School', 'Ensiklopedi', 'Eksternal', 'Referensi', 'Ensiklopedi akademik yang disesuaikan untuk tiga jenjang: SD, SMP, SMA.', 'https://school.eb.com', '#3A2B14', 1, 5, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(7, 'TED-Ed', 'Video', 'Web', 'Multimedia', 'Video pendek edukatif yang dikurasi sesuai mata pelajaran.', 'https://ed.ted.com', '#2A1840', 1, 6, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(8, 'OpenStax Textbooks', 'E-Book', 'Web', 'Pelajaran', 'Buku teks terbuka untuk pelajaran sains dan ilmu sosial tingkat menengah-atas.', 'https://openstax.org', '#3A1530', 1, 7, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(9, 'Perpustakaan Kampus Terbuka', 'Referensi', 'Web', 'Referensi, Jounal', 'Perpustakaan kampus terbuka sebagai bahan referensi kami', 'https://pustaka.ut.ac.id/lib/', '#db0070', 1, 1, '2026-07-10 03:05:55', '2026-07-10 03:05:55');

-- --------------------------------------------------------

--
-- Table structure for table `organization_members`
--

CREATE TABLE `organization_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organization_members`
--

INSERT INTO `organization_members` (`id`, `name`, `role`, `specialization`, `photo`, `is_featured`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Bapak Yohanes Pramono, S.Si., M.Pd.', 'Kepala Perpustakaan', 'Manajemen Perpustakaan & Literasi', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', 1, 1, 0, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(2, 'Ibu Margareta Dewi, S.I.Pust.', 'Pustakawan Senior', 'Katalogisasi & Koleksi', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop', 0, 1, 1, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(3, 'Dr. Hendra Wijaya', 'Spesialis Literasi Digital', 'Sumber Daring & Riset', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop', 0, 1, 2, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(4, 'Bapak Wahyu Setiawan, S.Pd.', 'Koordinator Klub Baca', 'Program Literasi Siswa', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', 0, 1, 3, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(5, 'Ibu Rina Halim', 'Layanan Sirkulasi & Anggota', 'Peminjaman & Keanggotaan', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 0, 1, 4, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(6, 'Ibu Sari Kusuma, S.Hum.', 'Layanan Referensi', 'Bimbingan Pemustaka', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop', 0, 1, 5, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(7, 'Bapak Adi Nugroho', 'Staf Teknis & Pengolahan', 'Pemeliharaan Koleksi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', 0, 1, 6, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(8, 'Pak Ambeng', 'Kepala Pusat Yayasan', 'Direktur Yayasan', 'organization/photos/01KX55TWR1B1N3QFHY40RTVYAB.jpg', 1, 1, 1, '2026-07-10 04:51:06', '2026-07-10 04:51:06');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('olingersusana@gmail.com', '$2y$12$wOs.FWqC0nP.V.0nBCgRju06UViJ.dgBtP6BTRYdRCCl2g1KDUxg6', '2026-07-10 05:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(230, 'ViewAny:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(231, 'View:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(232, 'Create:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(233, 'Update:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(234, 'Delete:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(235, 'DeleteAny:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(236, 'Restore:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(237, 'ForceDelete:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(238, 'ForceDeleteAny:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(239, 'RestoreAny:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(240, 'Replicate:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(241, 'Reorder:Announcement', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(242, 'ViewAny:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(243, 'View:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(244, 'Create:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(245, 'Update:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(246, 'Delete:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(247, 'DeleteAny:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(248, 'Restore:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(249, 'ForceDelete:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(250, 'ForceDeleteAny:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(251, 'RestoreAny:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(252, 'Replicate:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(253, 'Reorder:Author', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(254, 'ViewAny:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(255, 'View:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(256, 'Create:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(257, 'Update:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(258, 'Delete:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(259, 'DeleteAny:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(260, 'Restore:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(261, 'ForceDelete:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(262, 'ForceDeleteAny:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(263, 'RestoreAny:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(264, 'Replicate:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(265, 'Reorder:Book', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(266, 'ViewAny:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(267, 'View:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(268, 'Create:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(269, 'Update:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(270, 'Delete:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(271, 'DeleteAny:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(272, 'Restore:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(273, 'ForceDelete:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(274, 'ForceDeleteAny:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(275, 'RestoreAny:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(276, 'Replicate:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(277, 'Reorder:Category', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(278, 'ViewAny:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(279, 'View:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(280, 'Create:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(281, 'Update:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(282, 'Delete:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(283, 'DeleteAny:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(284, 'Restore:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(285, 'ForceDelete:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(286, 'ForceDeleteAny:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(287, 'RestoreAny:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(288, 'Replicate:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(289, 'Reorder:Event', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(290, 'ViewAny:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(291, 'View:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(292, 'Create:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(293, 'Update:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(294, 'Delete:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(295, 'DeleteAny:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(296, 'Restore:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(297, 'ForceDelete:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(298, 'ForceDeleteAny:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(299, 'RestoreAny:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(300, 'Replicate:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(301, 'Reorder:FineSettings', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(302, 'ViewAny:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(303, 'View:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(304, 'Create:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(305, 'Update:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(306, 'Delete:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(307, 'DeleteAny:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(308, 'Restore:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(309, 'ForceDelete:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(310, 'ForceDeleteAny:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(311, 'RestoreAny:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(312, 'Replicate:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(313, 'Reorder:Fine', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(314, 'ViewAny:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(315, 'View:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(316, 'Create:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(317, 'Update:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(318, 'Delete:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(319, 'DeleteAny:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(320, 'Restore:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(321, 'ForceDelete:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(322, 'ForceDeleteAny:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(323, 'RestoreAny:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(324, 'Replicate:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(325, 'Reorder:Information', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(326, 'ViewAny:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(327, 'View:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(328, 'Create:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(329, 'Update:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(330, 'Delete:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(331, 'DeleteAny:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(332, 'Restore:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(333, 'ForceDelete:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(334, 'ForceDeleteAny:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(335, 'RestoreAny:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(336, 'Replicate:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(337, 'Reorder:Loan', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(338, 'ViewAny:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(339, 'View:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(340, 'Create:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(341, 'Update:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(342, 'Delete:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(343, 'DeleteAny:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(344, 'Restore:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(345, 'ForceDelete:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(346, 'ForceDeleteAny:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(347, 'RestoreAny:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(348, 'Replicate:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(349, 'Reorder:OnlineResource', 'web', '2026-06-10 08:48:08', '2026-06-10 08:48:08'),
(350, 'ViewAny:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(351, 'View:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(352, 'Create:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(353, 'Update:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(354, 'Delete:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(355, 'DeleteAny:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(356, 'Restore:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(357, 'ForceDelete:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(358, 'ForceDeleteAny:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(359, 'RestoreAny:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(360, 'Replicate:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(361, 'Reorder:OrganizationMember', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(362, 'ViewAny:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(363, 'View:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(364, 'Create:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(365, 'Update:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(366, 'Delete:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(367, 'DeleteAny:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(368, 'Restore:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(369, 'ForceDelete:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(370, 'ForceDeleteAny:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(371, 'RestoreAny:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(372, 'Replicate:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(373, 'Reorder:Permission', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(374, 'ViewAny:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(375, 'View:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(376, 'Create:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(377, 'Update:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(378, 'Delete:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(379, 'DeleteAny:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(380, 'Restore:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(381, 'ForceDelete:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(382, 'ForceDeleteAny:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(383, 'RestoreAny:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(384, 'Replicate:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(385, 'Reorder:Publisher', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(386, 'ViewAny:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(387, 'View:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(388, 'Create:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(389, 'Update:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(390, 'Delete:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(391, 'DeleteAny:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(392, 'Restore:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(393, 'ForceDelete:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(394, 'ForceDeleteAny:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(395, 'RestoreAny:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(396, 'Replicate:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(397, 'Reorder:Role', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(398, 'ViewAny:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(399, 'View:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(400, 'Create:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(401, 'Update:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(402, 'Delete:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(403, 'DeleteAny:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(404, 'Restore:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(405, 'ForceDelete:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(406, 'ForceDeleteAny:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(407, 'RestoreAny:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(408, 'Replicate:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(409, 'Reorder:RouteAccess', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(410, 'ViewAny:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(411, 'View:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(412, 'Create:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(413, 'Update:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(414, 'Delete:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(415, 'DeleteAny:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(416, 'Restore:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(417, 'ForceDelete:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(418, 'ForceDeleteAny:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(419, 'RestoreAny:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(420, 'Replicate:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(421, 'Reorder:Testimonial', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(422, 'ViewAny:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(423, 'View:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(424, 'Create:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(425, 'Update:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(426, 'Delete:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(427, 'DeleteAny:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(428, 'Restore:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(429, 'ForceDelete:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(430, 'ForceDeleteAny:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(431, 'RestoreAny:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(432, 'Replicate:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(433, 'Reorder:User', 'web', '2026-06-10 08:48:09', '2026-06-10 08:48:09'),
(434, 'ViewAny:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(435, 'View:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(436, 'Create:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(437, 'Update:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(438, 'Delete:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(439, 'DeleteAny:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(440, 'Restore:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(441, 'ForceDelete:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(442, 'ForceDeleteAny:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(443, 'RestoreAny:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(444, 'Replicate:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(445, 'Reorder:Visit', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(446, 'View:LaporanBuku', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(447, 'View:LaporanDenda', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(448, 'View:LaporanKunjungan', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(449, 'View:LaporanPeminjaman', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(450, 'View:LaporanPengembalian', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(451, 'View:CustomAccountWidget', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(452, 'View:AuthorsChart', 'web', '2026-06-10 08:48:10', '2026-06-10 08:48:10'),
(453, 'View:BookChart', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(454, 'View:CategoryChart', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(455, 'View:FineChart', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(456, 'View:FineConditionChart', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(457, 'View:PublishersChart', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(458, 'View:StatusOfBooks', 'web', '2026-06-10 08:48:11', '2026-06-10 08:48:11'),
(459, 'ViewAny:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(460, 'View:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(461, 'Create:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(462, 'Update:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(463, 'Delete:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(464, 'DeleteAny:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(465, 'Restore:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(466, 'ForceDelete:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(467, 'ForceDeleteAny:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(468, 'RestoreAny:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(469, 'Replicate:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(470, 'Reorder:Language', 'web', '2026-06-11 09:09:07', '2026-06-11 09:09:07'),
(471, 'ViewAny:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(472, 'View:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(473, 'Create:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(474, 'Update:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(475, 'Delete:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(476, 'DeleteAny:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(477, 'Restore:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(478, 'ForceDelete:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(479, 'ForceDeleteAny:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(480, 'RestoreAny:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(481, 'Replicate:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28'),
(482, 'Reorder:Type', 'web', '2026-06-11 09:09:28', '2026-06-11 09:09:28');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `slug`, `address`, `email`, `phone`, `logo`, `is_active`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Gramedia', 'gramedia-2736', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-10 17:36:26', '2026-06-10 17:36:26'),
(2, 'Kopersai Joang Sejati', 'kopersai-joang-sejati-1006', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(3, 'Departemen Pendidikan Nasional', 'departemen-pendidikan-nasional-1135', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(4, 'Erlangga', 'erlangga-7213', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(5, 'Pusat Perbukuan Departemen P. Nasional', 'pusat-perbukuan-departemen-p-nasional-5755', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(6, 'Esis', 'esis-6427', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(7, 'Quadra', 'quadra-4576', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(8, 'Bumi Aksara', 'bumi-aksara-3899', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(9, 'Kementrian Pendidikan dan Kebudayaan', 'kementrian-pendidikan-dan-kebudayaan-8553', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(10, 'Award Publications LTD', 'award-publications-ltd-3922', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(11, 'Hinkler Books LTD', 'hinkler-books-ltd-6578', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(12, 'Brimax Books', 'brimax-books-7424', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(13, 'Arrangement', 'arrangement-2483', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(14, 'Scholastic INC', 'scholastic-inc-7986', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(15, 'Gramedia Pustaka Utama', 'gramedia-pustaka-utama-9740', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(16, 'Sarana Bobo', 'sarana-bobo-3203', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(17, 'A Golden book', 'a-golden-book-6566', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(18, 'Elex media komputindo', 'elex-media-komputindo-9738', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(19, 'Kesaint Blanck', 'kesaint-blanck-3574', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(20, 'Yayasan Berani Bhakti Bangsa', 'yayasan-berani-bhakti-bangsa-7701', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(21, 'Karmelindo', 'karmelindo-6101', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(22, 'Kanisius', 'kanisius-3629', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(23, 'Nusa Indah', 'nusa-indah-8170', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(24, 'Perhimpunan Buddhis Indonesia', 'perhimpunan-buddhis-indonesia-2563', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(25, 'Sekretariat Komisi PSE/APP', 'sekretariat-komisi-pseapp-3188', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(26, 'Genta Pustaka Lestari', 'genta-pustaka-lestari-7736', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(27, 'Komisi PSE', 'komisi-pse-4673', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(28, 'Dioma', 'dioma-8035', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(29, 'Kelompok Mas Media Buana Pustaka', 'kelompok-mas-media-buana-pustaka-1160', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(30, 'Intan Pariwara', 'intan-pariwara-3278', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(31, 'Kementerian Negara Riset dan Teknologi', 'kementerian-negara-riset-dan-teknologi-4111', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(32, 'Pustaka Utama Grafiti', 'pustaka-utama-grafiti-1546', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(33, 'Yayasan KEHATI', 'yayasan-kehati-9107', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(34, 'Mitchell Beazley', 'mitchell-beazley-6214', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(35, 'Himpunan Keramik Indonesia', 'himpunan-keramik-indonesia-3453', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(36, 'British Museum Press', 'british-museum-press-2821', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(37, 'Djambatan', 'djambatan-9429', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(38, 'I.M. Chait Gallery', 'im-chait-gallery-5137', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(39, 'PT. Griya Asri Prima', 'pt-griya-asri-prima-6863', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(40, 'Pusat Kurikulum dan Perbukuan, Balitbang, Kemendikbud', 'pusat-kurikulum-dan-perbukuan-balitbang-kemendikbud-2597', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(41, 'Pustaka Bahasa Asing', 'pustaka-bahasa-asing-8361', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(42, 'PT. Elex Media Komputido', 'pt-elex-media-komputido-2990', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(43, 'Yudhi Tira', 'yudhi-tira-9153', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(44, 'Grasindo', 'grasindo-8413', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(45, 'Kementrerian Pendidikan dan Kebudayaan', 'kementrerian-pendidikan-dan-kebudayaan-6275', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(46, 'Cambridge University Press', 'cambridge-university-press-6293', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(47, 'Kementerian Pendidikan dan Kebudayaan', 'kementerian-pendidikan-dan-kebudayaan-6191', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(48, 'International Student edition', 'international-student-edition-8142', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(49, 'Platinum', 'platinum-3177', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(50, 'Penerbita Universitas Terbuka', 'penerbita-universitas-terbuka-4233', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(51, 'LP3 ES', 'lp3-es-4815', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(52, 'pusat Kurikulum dan Perbukuan, Departemen Pendidikan Nasional', 'pusat-kurikulum-dan-perbukuan-departemen-pendidikan-nasional-1239', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(53, 'PT. Bumi Aksara', 'pt-bumi-aksara-6432', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(54, 'Pearson Education', 'pearson-education-1682', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(55, 'Masmedia Buana Pustaka', 'masmedia-buana-pustaka-3008', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(56, 'Hyperion', 'hyperion-4482', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(57, 'Prestasi Pustaka', 'prestasi-pustaka-2181', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(58, 'PT Grasindo', 'pt-grasindo-5550', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(59, 'Dahara Prize', 'dahara-prize-8712', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(60, 'YayasannCitra Insan Pembaru', 'yayasanncitra-insan-pembaru-9199', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(61, 'PT Bhuana Ilmu Pupoular', 'pt-bhuana-ilmu-pupoular-3852', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(62, 'Tabloid Ibu dan Anak', 'tabloid-ibu-dan-anak-7784', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(63, 'Pusat Kurukulum dan Perbukuan, Balitbang, Kemdikbud', 'pusat-kurukulum-dan-perbukuan-balitbang-kemdikbud-6885', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(64, 'Balai Pustaka', 'balai-pustaka-6118', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(65, 'PT Gramedia', 'pt-gramedia-8240', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(66, 'Cambridge Assessment International Education', 'cambridge-assessment-international-education-1792', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(67, 'Pakar Raya', 'pakar-raya-6761', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(68, 'Tiga Serangkai Pustaka Mandiri', 'tiga-serangkai-pustaka-mandiri-5494', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(69, 'Alison Inches', 'alison-inches-9411', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(70, 'Nalar', 'nalar-6773', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(71, 'Kepustakaan Populer  Gramedia', 'kepustakaan-populer-gramedia-3729', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(72, 'PT Kompas Media Nusantara', 'pt-kompas-media-nusantara-7352', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(73, 'Disney Enterprises', 'disney-enterprises-3703', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(74, 'Mitra  Indotra Abadi', 'mitra-indotra-abadi-3139', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(75, 'Elex Media Komputido', 'elex-media-komputido-8079', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(76, 'Pearson Education Limited', 'pearson-education-limited-7108', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(77, 'Asta Ilmu Sukses', 'asta-ilmu-sukses-6740', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(78, 'Penerbit Fajar Baru', 'penerbit-fajar-baru-3698', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(79, 'Invader', 'invader-2567', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(80, 'PT Kanisius', 'pt-kanisius-9077', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(81, 'Ethos Logos Phatos', 'ethos-logos-phatos-4971', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(82, 'Yudhistira', 'yudhistira-9290', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(83, 'Grafindo Media Pratama', 'grafindo-media-pratama-1495', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(84, 'Yudhistiara', 'yudhistiara-1089', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(85, 'Panoramaconvex', 'panoramaconvex-1614', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(86, 'Wordsworth Editions Limited', 'wordsworth-editions-limited-6734', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(87, 'Sphere Books', 'sphere-books-6777', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(88, 'Oxford Uniersity Press', 'oxford-uniersity-press-5738', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(89, 'Simon & Schuter', 'simon-schuter-4866', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(90, 'Reed International Books', 'reed-international-books-1388', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(91, 'Miller Accounting Publications', 'miller-accounting-publications-7011', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(92, 'Bantam Books', 'bantam-books-7107', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(93, 'Scientific Press', 'scientific-press-4506', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(94, 'Dhara Prize', 'dhara-prize-2879', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(95, 'Bhuana Ilmu Pupoular', 'bhuana-ilmu-pupoular-5216', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(96, 'Bentang Pustaka', 'bentang-pustaka-6567', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(97, 'Gramedia Majalah', 'gramedia-majalah-2355', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(98, 'Pembimbing Masa', 'pembimbing-masa-1739', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(99, 'Jayakarta Agung Offset', 'jayakarta-agung-offset-9090', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(100, 'Vintage Books', 'vintage-books-7564', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(101, 'Mahda Books', 'mahda-books-1404', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(102, 'Harper Business', 'harper-business-7503', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(103, 'Indonesia', 'indonesia-4478', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(104, 'Qanita', 'qanita-1058', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(105, 'Penguin Books', 'penguin-books-9633', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(106, 'Intervisual Communications', 'intervisual-communications-6959', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(107, 'World\'s Work', 'worlds-work-1391', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(108, 'Groiler Book\'s', 'groiler-books-7751', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(109, 'Random Hause', 'random-hause-5691', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(110, 'Glenn Johnstone', 'glenn-johnstone-2154', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(111, 'Macmillan London', 'macmillan-london-5435', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(112, 'Chancellor Press', 'chancellor-press-4849', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(113, 'Penerbit Alumni', 'penerbit-alumni-1947', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(114, 'Yayasan Bina Anak Indonesia', 'yayasan-bina-anak-indonesia-5434', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(115, 'Dell', 'dell-4868', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(116, 'Transworld', 'transworld-5105', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(117, 'Doubleday', 'doubleday-4805', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(118, 'Prentice Hall', 'prentice-hall-6584', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(119, 'MeadWestvaco', 'meadwestvaco-1745', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(120, 'Hodder and Stoughton', 'hodder-and-stoughton-3174', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(121, 'Morcelliana', 'morcelliana-7551', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(122, 'Hikmah', 'hikmah-9725', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(123, 'Gagas Media', 'gagas-media-5482', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(124, 'Mediakita', 'mediakita-2457', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(125, 'Gelora Aksara Pratama', 'gelora-aksara-pratama-8322', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(126, 'Gramredia Pustaka Utama', 'gramredia-pustaka-utama-4842', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(127, 'Shinhglee', 'shinhglee-8582', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(128, 'Binarupa Aksara', 'binarupa-aksara-5055', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(129, 'Popular Book Company (Canada)', 'popular-book-company-canada-6581', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(130, 'School Specialty', 'school-specialty-2482', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(131, 'Cerdas Pustaka', 'cerdas-pustaka-3837', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(132, 'Lembaga Biblika Indonesia', 'lembaga-biblika-indonesia-7727', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(133, 'Parragon', 'parragon-4112', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(134, 'Bintang Indonesia', 'bintang-indonesia-7171', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(135, 'Anak saleh Pratama', 'anak-saleh-pratama-5624', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(136, 'Tiga Serangkai', 'tiga-serangkai-6754', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(137, 'Erlangga for Kids', 'erlangga-for-kids-7581', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(138, 'Departemen Pendidikan dan Kebudayaan', 'departemen-pendidikan-dan-kebudayaan-8021', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(139, 'Suzuki Method International', 'suzuki-method-international-9272', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(140, 'Gateway Books', 'gateway-books-9937', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(141, 'Company LTD', 'company-ltd-1126', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(142, 'Reed for Kids', 'reed-for-kids-8569', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(143, 'Secrets of the Games', 'secrets-of-the-games-5949', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(144, 'Seashell', 'seashell-6606', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(145, 'Mammoth', 'mammoth-8271', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(146, 'Gaya Favorit Press', 'gaya-favorit-press-8222', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(147, 'Citra Insan Pembaru', 'citra-insan-pembaru-8497', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(148, 'PPM Manajemen', 'ppm-manajemen-2277', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(149, 'Egmont UK Limited', 'egmont-uk-limited-8532', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(150, 'Murdoch Books', 'murdoch-books-2005', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(151, 'Phidal', 'phidal-1594', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(152, 'Ganeca Exact', 'ganeca-exact-9550', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(153, 'Flamingo', 'flamingo-3484', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(154, 'The Ballantine Publising Group', 'the-ballantine-publising-group-2229', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(155, 'A Bantam book', 'a-bantam-book-2836', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(156, 'Kandel', 'kandel-6925', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(157, 'Dinara', 'dinara-5438', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(158, 'Lumiere', 'lumiere-6040', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(159, 'Batik', 'batik-6270', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(160, 'Cerita Kata', 'cerita-kata-4023', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(161, 'Biru Magenta Media', 'biru-magenta-media-3240', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(162, 'Agra Sembagi Arutala', 'agra-sembagi-arutala-4258', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(163, 'Radjarey', 'radjarey-2789', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(164, 'AE', 'ae-4825', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(165, 'Literasi anak Indonesia', 'literasi-anak-indonesia-3605', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(166, 'Laurie', 'laurie-6832', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(167, 'The Five Mile Press', 'the-five-mile-press-3397', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(168, 'Pustaka Buana', 'pustaka-buana-5517', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(169, 'Yolanda Media Kreasi', 'yolanda-media-kreasi-2908', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(170, 'Kalbe Farma', 'kalbe-farma-2417', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(171, 'Santo Lukas', 'santo-lukas-8083', 'Jakarta', 'salahudin@gmail.com', NULL, NULL, 1, NULL, '2026-06-11 06:56:35', '2026-06-11 06:56:35'),
(172, 'Universitas Pancasila', 'universitas-pancasila-9096', NULL, NULL, NULL, NULL, 1, NULL, '2026-06-12 04:45:33', '2026-06-12 04:45:33'),
(173, 'Olinger Family', 'olinger-family-4007', NULL, NULL, NULL, NULL, 1, NULL, '2026-07-10 02:39:56', '2026-07-10 02:39:56');

-- --------------------------------------------------------

--
-- Table structure for table `return_books`
--

CREATE TABLE `return_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_book_code` varchar(255) NOT NULL,
  `loan_user_id` bigint(20) UNSIGNED NOT NULL,
  `return_date` date NOT NULL,
  `status` enum('Dikembalikan','Pengecekan','Denda') NOT NULL DEFAULT 'Pengecekan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `return_books`
--

INSERT INTO `return_books` (`id`, `return_book_code`, `loan_user_id`, `return_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SAINT-LUKE-LIBRARY-return_book-4063', 1, '2026-06-11', 'Dikembalikan', '2026-06-11 03:38:02', '2026-06-11 03:38:02'),
(2, 'SAINT-LUKE-LIBRARY-return_book-7050', 3, '2026-06-11', 'Denda', '2026-06-11 07:11:25', '2026-06-11 07:11:25'),
(3, 'SAINT-LUKE-LIBRARY-return_book-2377', 4, '2026-06-11', 'Dikembalikan', '2026-06-11 11:50:12', '2026-06-11 11:56:46'),
(4, 'SAINT-LUKE-LIBRARY-return_book-7731', 5, '2026-06-11', 'Dikembalikan', '2026-06-11 13:47:04', '2026-06-11 13:47:04'),
(5, 'SAINT-LUKE-LIBRARY-return_book-9215', 6, '2026-06-11', 'Dikembalikan', '2026-06-11 14:11:33', '2026-06-11 14:11:33'),
(6, 'SAINT-LUKE-LIBRARY-return_book-6392', 7, '2026-06-12', 'Dikembalikan', '2026-06-11 18:25:18', '2026-06-11 18:25:18'),
(8, 'SAINT-LUKE-LIBRARY-return_book-6193', 11, '2026-06-19', 'Dikembalikan', '2026-06-19 04:22:45', '2026-06-16 05:39:17'),
(9, 'SAINT-LUKE-LIBRARY-return_book-1361', 8, '2026-06-16', 'Denda', '2026-06-16 16:50:47', '2026-06-16 16:50:47'),
(10, 'SAINT-LUKE-LIBRARY-return_book-8454', 9, '2026-06-16', 'Dikembalikan', '2026-06-16 16:54:03', '2026-06-16 16:54:03'),
(12, 'SAINT-LUKE-LIBRARY-return_book-5898', 2, '2026-07-08', 'Dikembalikan', '2026-07-08 03:00:02', '2026-07-08 03:00:02'),
(13, 'SAINT-LUKE-LIBRARY-return_book-3319', 10, '2026-07-08', 'Dikembalikan', '2026-07-08 03:00:02', '2026-07-08 03:00:02'),
(14, 'SAINT-LUKE-LIBRARY-return_book-5507', 12, '2026-07-08', 'Dikembalikan', '2026-07-08 03:08:49', '2026-06-18 03:50:10'),
(15, 'SAINT-LUKE-LIBRARY-return_book-6334', 13, '2026-06-18', 'Dikembalikan', '2026-06-18 03:52:02', '2026-06-18 03:52:02'),
(16, 'SAINT-LUKE-LIBRARY-return_book-7492', 15, '2026-07-04', 'Dikembalikan', '2026-07-04 04:25:22', '2026-06-22 16:47:08'),
(17, 'SAINT-LUKE-LIBRARY-return_book-5352', 16, '2026-06-22', 'Dikembalikan', '2026-06-22 15:03:32', '2026-06-22 16:45:35'),
(18, 'SAINT-LUKE-LIBRARY-return_book-2681', 14, '2026-06-23', 'Dikembalikan', '2026-06-23 04:56:40', '2026-06-27 20:50:48'),
(19, 'SAINT-LUKE-LIBRARY-return_book-4994', 17, '2026-06-23', 'Dikembalikan', '2026-06-23 08:58:30', '2026-06-27 20:51:08'),
(20, 'SAINT-LUKE-LIBRARY-return_book-8886', 18, '2026-06-23', 'Dikembalikan', '2026-06-23 08:58:30', '2026-06-27 20:51:26'),
(21, 'SAINT-LUKE-LIBRARY-return_book-3459', 19, '2026-07-09', 'Dikembalikan', '2026-07-09 07:38:04', '2026-06-27 20:49:21'),
(22, 'SAINT-LUKE-LIBRARY-return_book-3452', 20, '2026-07-09', 'Dikembalikan', '2026-07-09 07:38:04', '2026-06-27 20:50:12'),
(23, 'SAINT-LUKE-LIBRARY-return_book-4989', 23, '2026-06-28', 'Dikembalikan', '2026-06-27 20:53:25', '2026-06-27 20:53:25'),
(24, 'SAINT-LUKE-LIBRARY-return_book-6017', 21, '2026-07-01', 'Denda', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(25, 'SAINT-LUKE-LIBRARY-return_book-9465', 22, '2026-07-01', 'Denda', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(26, 'SAINT-LUKE-LIBRARY-return_book-1864', 26, '2026-07-10', 'Denda', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(27, 'SAINT-LUKE-LIBRARY-return_book-3962', 25, '2026-07-10', 'Dikembalikan', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(29, 'SAINT-LUKE-LIBRARY-return_book-9879', 27, '2026-07-30', 'Dikembalikan', '2026-07-29 17:00:02', '2026-07-29 17:00:02'),
(30, 'SAINT-LUKE-LIBRARY-return_book-6401', 28, '2026-07-29', 'Dikembalikan', '2026-07-28 17:00:00', '2026-07-28 17:00:00'),
(31, 'SAINT-LUKE-LIBRARY-return_book-5308', 29, '2026-07-30', 'Dikembalikan', '2026-07-30 01:06:58', '2026-07-15 15:28:37'),
(32, 'SAINT-LUKE-LIBRARY-return_book-6767', 30, '2026-07-30', 'Dikembalikan', '2026-07-30 01:06:59', '2026-07-15 15:28:37'),
(34, 'SAINT-LUKE-LIBRARY-return_book-2045', 32, '2026-07-30', 'Dikembalikan', '2026-07-29 17:05:34', '2026-07-16 14:44:56'),
(35, 'SAINT-LUKE-LIBRARY-return_book-6400', 33, '2026-07-30', 'Dikembalikan', '2026-07-29 17:05:34', '2026-07-16 14:44:56'),
(36, 'SAINT-LUKE-LIBRARY-return_book-2971', 34, '2026-07-16', 'Dikembalikan', '2026-07-16 14:50:34', '2026-07-16 14:50:34'),
(37, 'SAINT-LUKE-LIBRARY-return_book-4640', 35, '2026-07-16', 'Dikembalikan', '2026-07-16 14:51:53', '2026-07-16 14:51:53'),
(38, 'SAINT-LUKE-LIBRARY-return_book-2563', 37, '2026-08-01', 'Dikembalikan', '2026-08-01 03:16:27', '2026-07-17 03:19:42'),
(39, 'SAINT-LUKE-LIBRARY-return_book-3362', 36, '2026-08-01', 'Dikembalikan', '2026-08-01 03:16:27', '2026-07-17 03:19:42');

-- --------------------------------------------------------

--
-- Table structure for table `return_book_checks`
--

CREATE TABLE `return_book_checks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_book_id` bigint(20) UNSIGNED NOT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `return_book_checks`
--

INSERT INTO `return_book_checks` (`id`, `return_book_id`, `condition`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-06-11 03:38:02', '2026-06-11 03:38:02'),
(2, 2, 'Rusak', '<p>Buku rusak</p>', '2026-06-11 07:11:25', '2026-06-11 07:11:25'),
(3, 3, 'Rusak', '<p>Buku rusak ketika dikembalikan</p>', '2026-06-11 11:50:12', '2026-06-11 11:50:12'),
(4, 4, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-06-11 13:47:04', '2026-06-11 13:47:04'),
(5, 5, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-06-11 14:11:33', '2026-06-11 14:11:33'),
(6, 6, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-06-11 18:25:19', '2026-06-11 18:25:19'),
(8, 8, 'Rusak', '<p>Buku Dalam Kondisi Rusak</p>', '2026-06-19 04:22:45', '2026-06-19 04:22:45'),
(9, 9, 'Rusak', '<p>Buku dalam kondisi rusak</p>', '2026-06-16 16:50:48', '2026-06-16 16:50:48'),
(10, 10, 'Baik', 'Akses ditutup oleh admin', '2026-06-16 16:54:03', '2026-06-16 16:54:03'),
(12, 12, 'Baik', 'Auto-return: masa peminjaman digital habis', '2026-07-08 03:00:02', '2026-07-08 03:00:02'),
(13, 13, 'Baik', 'Auto-return: masa peminjaman digital habis', '2026-07-08 03:00:02', '2026-07-08 03:00:02'),
(14, 14, 'Rusak', '<p><strong>Buku dikembalikan dalam kondisi rusak</strong></p>', '2026-07-08 03:08:49', '2026-07-08 03:08:49'),
(15, 15, 'Baik', 'Akses ditutup oleh admin', '2026-06-18 03:52:02', '2026-06-18 03:52:02'),
(16, 16, 'Rusak', '<p></p>', '2026-07-04 04:25:22', '2026-07-04 04:25:22'),
(17, 17, 'Rusak', '<p>Buku Dalam Kondisi Rusak Ketika Dikembalikan</p>', '2026-06-22 15:03:32', '2026-06-22 15:03:32'),
(18, 18, 'Rusak', '<p>Buku rusak pada saat dikembalikan<br></p>', '2026-06-23 04:56:40', '2026-06-23 04:56:40'),
(19, 19, 'Rusak', '<p>Buku rusak<img src=\"http://127.0.0.1:8000/storage/aAWQUkbYLEYWKN29uhXHAADFgkShlWnagM7C4hVE.jpg\" alt=\"Bagian Foto Rusak\" data-id=\"aAWQUkbYLEYWKN29uhXHAADFgkShlWnagM7C4hVE.jpg\"><br></p>', '2026-06-23 08:58:30', '2026-06-23 08:58:30'),
(20, 20, 'Hilang', '<p>Buku hilang saat dikembalikan</p>', '2026-06-23 08:58:30', '2026-06-23 08:58:30'),
(21, 21, 'Rusak', '<p>Buku rusak</p>', '2026-07-09 07:38:04', '2026-07-09 07:38:04'),
(22, 22, 'Rusak', '<p>Buku rusak</p>', '2026-07-09 07:38:04', '2026-07-09 07:38:04'),
(23, 23, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-06-27 20:53:25', '2026-06-27 20:53:25'),
(24, 24, 'Rusak', '<p>Buku rusak ketika pengembalian</p>', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(25, 25, 'Rusak', '<p>Buku rusak ketika pengembalian</p>', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(26, 26, 'Rusak', '<p>Buku dalam kondisi rusak</p>', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(27, 27, 'Baik', '<p>Buku dalam kondisi baik ketika dikembalikan</p>', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(28, 29, 'Baik', 'Auto-return: masa peminjaman digital habis', '2026-07-29 17:00:04', '2026-07-29 17:00:04'),
(30, 30, 'Baik', 'Auto-return: masa peminjaman digital habis', '2026-07-28 17:00:00', '2026-07-28 17:00:00'),
(31, 31, 'Rusak', '<p>Kondisi buku rusak</p>', '2026-07-30 01:06:59', '2026-07-30 01:06:59'),
(32, 32, 'Rusak', '<p>Buku rusak ketika dikembalikan</p>', '2026-07-30 01:06:59', '2026-07-30 01:06:59'),
(34, 34, 'Rusak', '<p>Buku dalam kondisi rusak</p>', '2026-07-29 17:05:34', '2026-07-29 17:05:34'),
(35, 35, 'Hilang', '<p>buku hilang saat dikembalikan</p>', '2026-07-29 17:05:34', '2026-07-29 17:05:34'),
(36, 36, 'Baik', 'Buku Dalam Kondisi Baik Saat Dikembalikan', '2026-07-16 14:50:34', '2026-07-16 14:50:34'),
(37, 37, 'Baik', 'Akses ditutup oleh admin', '2026-07-16 14:51:53', '2026-07-16 14:51:53'),
(38, 38, 'Rusak', '<p>Buku rusak</p>', '2026-08-01 03:16:27', '2026-08-01 03:16:27'),
(39, 39, 'Rusak', '<p>Buku rusak</p>', '2026-08-01 03:16:27', '2026-08-01 03:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `review_books`
--

CREATE TABLE `review_books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `loan_user_id` bigint(20) UNSIGNED NOT NULL,
  `return_book_id` bigint(20) UNSIGNED NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT 0.0,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review_books`
--

INSERT INTO `review_books` (`id`, `loan_user_id`, `return_book_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5.0, 'Bukunya bagus', '2026-06-11 03:38:02', '2026-06-11 03:38:02'),
(2, 3, 2, 5.0, '<p>Bukunya bagus</p>', '2026-06-11 07:11:25', '2026-06-11 07:11:25'),
(3, 4, 3, 5.0, '<p>Buku sangat bagus</p>', '2026-06-11 11:50:12', '2026-06-11 11:50:12'),
(4, 5, 4, 5.0, 'Bukunya sangat bagus dan inspiratif', '2026-06-11 13:47:04', '2026-06-11 13:47:04'),
(5, 6, 5, 5.0, 'Bukunya bagus', '2026-06-11 14:11:33', '2026-06-11 14:11:33'),
(6, 11, 8, 5.0, '<p>Bukunya sangat bagus</p>', '2026-06-19 04:22:45', '2026-06-19 04:22:45'),
(8, 8, 9, 5.0, '<p>Bukunya rusak saat dikembalikan</p>', '2026-06-16 16:50:48', '2026-06-16 16:50:48'),
(10, 12, 14, 5.0, '<p>Buku Sangat Bagus</p>', '2026-07-08 03:08:49', '2026-07-08 03:08:49'),
(11, 15, 16, 5.0, '<p>Bukunya bagus</p>', '2026-07-04 04:25:22', '2026-07-04 04:25:22'),
(12, 16, 17, 5.0, '<p>Buku sangat bagus dan populer</p>', '2026-06-22 15:03:32', '2026-06-22 15:03:32'),
(13, 14, 18, 5.0, '<p>Bukunya sangat bagus</p>', '2026-06-23 04:56:40', '2026-06-23 04:56:40'),
(14, 17, 19, 5.0, '<p>Buku sangat bagus</p>', '2026-06-23 08:58:30', '2026-06-23 08:58:30'),
(15, 18, 20, 5.0, '<p>Buku sangat bagus</p>', '2026-06-23 08:58:30', '2026-06-23 08:58:30'),
(16, 19, 21, 5.0, '<p>Buku bagus</p>', '2026-07-09 07:38:04', '2026-07-09 07:38:04'),
(17, 20, 22, 5.0, '<p>Buku bagus</p>', '2026-07-09 07:38:04', '2026-07-09 07:38:04'),
(18, 21, 24, 5.0, '<p>Buku sangat baik</p>', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(19, 22, 25, 5.0, '<p>Buku sangat bagus</p>', '2026-07-01 08:06:01', '2026-07-01 08:06:01'),
(20, 26, 26, 5.0, '<p>Buku sangat bagus dan baik</p>', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(21, 25, 27, 5.0, '<p>Buku sangat bagus</p>', '2026-07-10 03:34:14', '2026-07-10 03:34:14'),
(22, 29, 31, 5.0, '<p>Buku sangat bagus</p>', '2026-07-30 01:06:59', '2026-07-30 01:06:59'),
(23, 30, 32, 5.0, '<p>Buku sangat bagus</p>', '2026-07-30 01:06:59', '2026-07-30 01:06:59'),
(25, 32, 34, 5.0, '<p>Buku sangat bagus</p>', '2026-07-29 17:05:34', '2026-07-29 17:05:34'),
(26, 33, 35, 5.0, '<p>Buku Sangat Bagus</p>', '2026-07-29 17:05:34', '2026-07-29 17:05:34'),
(27, 34, 36, 5.0, 'Bukunya bagus banget seru', '2026-07-16 14:50:34', '2026-07-16 14:50:34'),
(28, 37, 38, 5.0, '<p>Buku bagus</p>', '2026-08-01 03:16:27', '2026-08-01 03:16:27'),
(29, 36, 39, 5.0, '<p>Buku sangat bagus</p>', '2026-08-01 03:16:27', '2026-08-01 03:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2026-06-10 08:38:17', '2026-06-10 08:38:17'),
(2, 'manager', 'web', '2026-06-10 08:38:17', '2026-06-10 08:38:17'),
(3, 'writer', 'web', '2026-06-10 08:38:17', '2026-06-10 08:38:17'),
(4, 'user', 'web', '2026-06-10 08:38:17', '2026-06-10 08:38:17'),
(5, 'member', 'web', '2026-06-10 08:38:17', '2026-06-10 08:38:17'),
(6, 'super_admin', 'web', '2026-06-10 08:47:00', '2026-06-10 08:47:00');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(230, 1),
(230, 2),
(230, 6),
(231, 1),
(231, 2),
(231, 6),
(232, 1),
(232, 2),
(232, 6),
(233, 1),
(233, 2),
(233, 6),
(234, 1),
(234, 2),
(234, 6),
(235, 1),
(235, 2),
(235, 6),
(236, 1),
(236, 2),
(236, 6),
(237, 1),
(237, 2),
(237, 6),
(238, 1),
(238, 2),
(238, 6),
(239, 1),
(239, 2),
(239, 6),
(240, 1),
(240, 2),
(240, 6),
(241, 1),
(241, 2),
(241, 6),
(242, 1),
(242, 2),
(242, 3),
(242, 6),
(243, 1),
(243, 2),
(243, 3),
(243, 6),
(244, 1),
(244, 2),
(244, 3),
(244, 6),
(245, 1),
(245, 2),
(245, 3),
(245, 6),
(246, 1),
(246, 2),
(246, 3),
(246, 6),
(247, 1),
(247, 2),
(247, 3),
(247, 6),
(248, 1),
(248, 2),
(248, 3),
(248, 6),
(249, 1),
(249, 2),
(249, 3),
(249, 6),
(250, 1),
(250, 2),
(250, 3),
(250, 6),
(251, 1),
(251, 2),
(251, 3),
(251, 6),
(252, 1),
(252, 2),
(252, 3),
(252, 6),
(253, 1),
(253, 2),
(253, 3),
(253, 6),
(254, 1),
(254, 2),
(254, 3),
(254, 6),
(255, 1),
(255, 2),
(255, 3),
(255, 6),
(256, 1),
(256, 2),
(256, 3),
(256, 6),
(257, 1),
(257, 2),
(257, 3),
(257, 6),
(258, 1),
(258, 2),
(258, 3),
(258, 6),
(259, 1),
(259, 2),
(259, 3),
(259, 6),
(260, 1),
(260, 2),
(260, 3),
(260, 6),
(261, 1),
(261, 2),
(261, 3),
(261, 6),
(262, 1),
(262, 2),
(262, 3),
(262, 6),
(263, 1),
(263, 2),
(263, 3),
(263, 6),
(264, 1),
(264, 2),
(264, 3),
(264, 6),
(265, 1),
(265, 2),
(265, 3),
(265, 6),
(266, 1),
(266, 2),
(266, 3),
(266, 6),
(267, 1),
(267, 2),
(267, 3),
(267, 6),
(268, 1),
(268, 2),
(268, 3),
(268, 6),
(269, 1),
(269, 2),
(269, 3),
(269, 6),
(270, 1),
(270, 2),
(270, 3),
(270, 6),
(271, 1),
(271, 2),
(271, 3),
(271, 6),
(272, 1),
(272, 2),
(272, 3),
(272, 6),
(273, 1),
(273, 2),
(273, 3),
(273, 6),
(274, 1),
(274, 2),
(274, 3),
(274, 6),
(275, 1),
(275, 2),
(275, 3),
(275, 6),
(276, 1),
(276, 2),
(276, 3),
(276, 6),
(277, 1),
(277, 2),
(277, 3),
(277, 6),
(278, 1),
(278, 2),
(278, 6),
(279, 1),
(279, 2),
(279, 6),
(280, 1),
(280, 2),
(280, 6),
(281, 1),
(281, 2),
(281, 6),
(282, 1),
(282, 2),
(282, 6),
(283, 1),
(283, 2),
(283, 6),
(284, 1),
(284, 2),
(284, 6),
(285, 1),
(285, 2),
(285, 6),
(286, 1),
(286, 2),
(286, 6),
(287, 1),
(287, 2),
(287, 6),
(288, 1),
(288, 2),
(288, 6),
(289, 1),
(289, 2),
(289, 6),
(290, 1),
(290, 2),
(290, 6),
(291, 1),
(291, 2),
(291, 6),
(292, 1),
(292, 2),
(292, 6),
(293, 1),
(293, 2),
(293, 6),
(294, 1),
(294, 2),
(294, 6),
(295, 1),
(295, 2),
(295, 6),
(296, 1),
(296, 2),
(296, 6),
(297, 1),
(297, 2),
(297, 6),
(298, 1),
(298, 2),
(298, 6),
(299, 1),
(299, 2),
(299, 6),
(300, 1),
(300, 2),
(300, 6),
(301, 1),
(301, 2),
(301, 6),
(302, 1),
(302, 2),
(302, 6),
(303, 1),
(303, 2),
(303, 6),
(304, 1),
(304, 2),
(304, 6),
(305, 1),
(305, 2),
(305, 6),
(306, 1),
(306, 2),
(306, 6),
(307, 1),
(307, 2),
(307, 6),
(308, 1),
(308, 2),
(308, 6),
(309, 1),
(309, 2),
(309, 6),
(310, 1),
(310, 2),
(310, 6),
(311, 1),
(311, 2),
(311, 6),
(312, 1),
(312, 2),
(312, 6),
(313, 1),
(313, 2),
(313, 6),
(314, 1),
(314, 2),
(314, 6),
(315, 1),
(315, 2),
(315, 6),
(316, 1),
(316, 2),
(316, 6),
(317, 1),
(317, 2),
(317, 6),
(318, 1),
(318, 2),
(318, 6),
(319, 1),
(319, 2),
(319, 6),
(320, 1),
(320, 2),
(320, 6),
(321, 1),
(321, 2),
(321, 6),
(322, 1),
(322, 2),
(322, 6),
(323, 1),
(323, 2),
(323, 6),
(324, 1),
(324, 2),
(324, 6),
(325, 1),
(325, 2),
(325, 6),
(326, 1),
(326, 2),
(326, 6),
(327, 1),
(327, 2),
(327, 6),
(328, 1),
(328, 2),
(328, 6),
(329, 1),
(329, 2),
(329, 6),
(330, 1),
(330, 2),
(330, 6),
(331, 1),
(331, 2),
(331, 6),
(332, 1),
(332, 2),
(332, 6),
(333, 1),
(333, 2),
(333, 6),
(334, 1),
(334, 2),
(334, 6),
(335, 1),
(335, 2),
(335, 6),
(336, 1),
(336, 2),
(336, 6),
(337, 1),
(337, 2),
(337, 6),
(338, 1),
(338, 2),
(338, 6),
(339, 1),
(339, 2),
(339, 6),
(340, 1),
(340, 2),
(340, 6),
(341, 1),
(341, 2),
(341, 6),
(342, 1),
(342, 2),
(342, 6),
(343, 1),
(343, 2),
(343, 6),
(344, 1),
(344, 2),
(344, 6),
(345, 1),
(345, 2),
(345, 6),
(346, 1),
(346, 2),
(346, 6),
(347, 1),
(347, 2),
(347, 6),
(348, 1),
(348, 2),
(348, 6),
(349, 1),
(349, 2),
(349, 6),
(350, 1),
(350, 2),
(350, 6),
(351, 1),
(351, 2),
(351, 6),
(352, 1),
(352, 2),
(352, 6),
(353, 1),
(353, 2),
(353, 6),
(354, 1),
(354, 2),
(354, 6),
(355, 1),
(355, 2),
(355, 6),
(356, 1),
(356, 2),
(356, 6),
(357, 1),
(357, 2),
(357, 6),
(358, 1),
(358, 2),
(358, 6),
(359, 1),
(359, 2),
(359, 6),
(360, 1),
(360, 2),
(360, 6),
(361, 1),
(361, 2),
(361, 6),
(362, 1),
(362, 6),
(363, 1),
(363, 6),
(364, 1),
(364, 6),
(365, 1),
(365, 6),
(366, 1),
(366, 6),
(367, 1),
(367, 6),
(368, 1),
(368, 6),
(369, 1),
(369, 6),
(370, 1),
(370, 6),
(371, 1),
(371, 6),
(372, 1),
(372, 6),
(373, 1),
(373, 6),
(374, 1),
(374, 2),
(374, 3),
(374, 6),
(375, 1),
(375, 2),
(375, 3),
(375, 6),
(376, 1),
(376, 2),
(376, 3),
(376, 6),
(377, 1),
(377, 2),
(377, 3),
(377, 6),
(378, 1),
(378, 2),
(378, 3),
(378, 6),
(379, 1),
(379, 2),
(379, 3),
(379, 6),
(380, 1),
(380, 2),
(380, 3),
(380, 6),
(381, 1),
(381, 2),
(381, 3),
(381, 6),
(382, 1),
(382, 2),
(382, 3),
(382, 6),
(383, 1),
(383, 2),
(383, 3),
(383, 6),
(384, 1),
(384, 2),
(384, 3),
(384, 6),
(385, 1),
(385, 2),
(385, 3),
(385, 6),
(386, 1),
(386, 6),
(387, 1),
(387, 6),
(388, 1),
(388, 6),
(389, 1),
(389, 6),
(390, 1),
(390, 6),
(391, 1),
(391, 6),
(392, 1),
(392, 6),
(393, 1),
(393, 6),
(394, 1),
(394, 6),
(395, 1),
(395, 6),
(396, 1),
(396, 6),
(397, 1),
(397, 6),
(398, 1),
(398, 6),
(399, 1),
(399, 6),
(400, 1),
(400, 6),
(401, 1),
(401, 6),
(402, 1),
(402, 6),
(403, 1),
(403, 6),
(404, 1),
(404, 6),
(405, 1),
(405, 6),
(406, 1),
(406, 6),
(407, 1),
(407, 6),
(408, 1),
(408, 6),
(409, 1),
(409, 6),
(410, 1),
(410, 2),
(410, 6),
(411, 1),
(411, 2),
(411, 6),
(412, 1),
(412, 2),
(412, 6),
(413, 1),
(413, 2),
(413, 6),
(414, 1),
(414, 2),
(414, 6),
(415, 1),
(415, 2),
(415, 6),
(416, 1),
(416, 2),
(416, 6),
(417, 1),
(417, 2),
(417, 6),
(418, 1),
(418, 2),
(418, 6),
(419, 1),
(419, 2),
(419, 6),
(420, 1),
(420, 2),
(420, 6),
(421, 1),
(421, 2),
(421, 6),
(422, 1),
(422, 6),
(423, 1),
(423, 6),
(424, 1),
(424, 6),
(425, 1),
(425, 6),
(426, 1),
(426, 6),
(427, 1),
(427, 6),
(428, 1),
(428, 6),
(429, 1),
(429, 6),
(430, 1),
(430, 6),
(431, 1),
(431, 6),
(432, 1),
(432, 6),
(433, 1),
(433, 6),
(434, 1),
(434, 2),
(434, 6),
(435, 1),
(435, 2),
(435, 6),
(436, 1),
(436, 2),
(436, 6),
(437, 1),
(437, 2),
(437, 6),
(438, 1),
(438, 2),
(438, 6),
(439, 1),
(439, 2),
(439, 6),
(440, 1),
(440, 2),
(440, 6),
(441, 1),
(441, 2),
(441, 6),
(442, 1),
(442, 2),
(442, 6),
(443, 1),
(443, 2),
(443, 6),
(444, 1),
(444, 2),
(444, 6),
(445, 1),
(445, 2),
(445, 6),
(446, 1),
(446, 2),
(446, 6),
(447, 1),
(447, 2),
(447, 6),
(448, 1),
(448, 2),
(448, 6),
(449, 1),
(449, 2),
(449, 6),
(450, 1),
(450, 2),
(450, 6),
(451, 1),
(451, 2),
(451, 3),
(451, 6),
(452, 1),
(452, 2),
(452, 3),
(452, 6),
(453, 1),
(453, 2),
(453, 3),
(453, 6),
(454, 1),
(454, 2),
(454, 3),
(454, 6),
(455, 1),
(455, 2),
(455, 6),
(456, 1),
(456, 2),
(456, 6),
(457, 1),
(457, 2),
(457, 3),
(457, 6),
(458, 1),
(458, 2),
(458, 3),
(458, 6),
(459, 1),
(459, 2),
(459, 3),
(459, 6),
(460, 1),
(460, 2),
(460, 3),
(460, 6),
(461, 1),
(461, 2),
(461, 3),
(461, 6),
(462, 1),
(462, 2),
(462, 3),
(462, 6),
(463, 1),
(463, 2),
(463, 3),
(463, 6),
(464, 1),
(464, 2),
(464, 3),
(464, 6),
(465, 1),
(465, 2),
(465, 3),
(465, 6),
(466, 1),
(466, 2),
(466, 3),
(466, 6),
(467, 1),
(467, 2),
(467, 3),
(467, 6),
(468, 1),
(468, 2),
(468, 3),
(468, 6),
(469, 1),
(469, 2),
(469, 3),
(469, 6),
(470, 1),
(470, 2),
(470, 3),
(470, 6),
(471, 1),
(471, 2),
(471, 3),
(471, 6),
(472, 1),
(472, 2),
(472, 3),
(472, 6),
(473, 1),
(473, 2),
(473, 3),
(473, 6),
(474, 1),
(474, 2),
(474, 3),
(474, 6),
(475, 1),
(475, 2),
(475, 3),
(475, 6),
(476, 1),
(476, 2),
(476, 3),
(476, 6),
(477, 1),
(477, 2),
(477, 3),
(477, 6),
(478, 1),
(478, 2),
(478, 3),
(478, 6),
(479, 1),
(479, 2),
(479, 3),
(479, 6),
(480, 1),
(480, 2),
(480, 3),
(480, 6),
(481, 1),
(481, 2),
(481, 3),
(481, 6),
(482, 1),
(482, 2),
(482, 3),
(482, 6);

-- --------------------------------------------------------

--
-- Table structure for table `route_accesses`
--

CREATE TABLE `route_accesses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `route_name` varchar(255) NOT NULL,
  `role_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`role_ids`)),
  `permission_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permission_ids`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `route_accesses`
--

INSERT INTO `route_accesses` (`id`, `route_name`, `role_ids`, `permission_ids`, `created_at`, `updated_at`) VALUES
(1, 'filament.admin.resources.announcements.index', '[1,2,6]', '[230,231,232,233,234,235,236,237,238,239,240,241]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(2, 'filament.admin.resources.authors.index', '[1,2,3,6]', '[242,243,244,245,246,247,248,249,250,251,252,253,452]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(3, 'filament.admin.resources.books.index', '[1,2,3,6]', '[254,255,256,257,258,259,260,261,262,263,264,265,453]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(4, 'filament.admin.resources.categories.index', '[1,2,3,6]', '[266,267,268,269,270,271,272,273,274,275,276,277,454]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(5, 'filament.admin.resources.events.index', '[1,2,6]', '[278,279,280,281,282,283,284,285,286,287,288,289]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(6, 'filament.admin.resources.fine-settings.index', '[1,2,6]', '[290,291,292,293,294,295,296,297,298,299,300,301]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(7, 'filament.admin.resources.fines.index', '[1,2,6]', '[302,303,304,305,306,307,308,309,310,311,312,313,455]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(8, 'filament.admin.resources.information.index', '[1,2,6]', '[314,315,316,317,318,319,320,321,322,323,324,325]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(9, 'filament.admin.resources.languages.index', '[1,2,3,6]', '[459,460,461,462,463,464,465,466,467,468,469,470]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(10, 'filament.admin.resources.loans.index', '[1,2,6]', '[326,327,328,329,330,331,332,333,334,335,336,337]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(11, 'filament.admin.resources.online-resources.index', '[1,2,6]', '[338,339,340,341,342,343,344,345,346,347,348,349]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(12, 'filament.admin.resources.organization-members.index', '[1,2,6]', '[350,351,352,353,354,355,356,357,358,359,360,361]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(13, 'filament.admin.resources.permissions.index', '[1,6]', '[362,363,364,365,366,367,368,369,370,371,372,373]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(14, 'filament.admin.resources.publishers.index', '[1,2,3,6]', '[374,375,376,377,378,379,380,381,382,383,384,385,457]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(15, 'filament.admin.resources.return-books.index', '[1,2,6]', '[326,327,328,329,330,331,332,333,334,335,336,337]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(16, 'filament.admin.resources.roles.index', '[1,6]', '[386,387,388,389,390,391,392,393,394,395,396,397]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(17, 'filament.admin.resources.route-accesses.index', '[1,6]', '[398,399,400,401,402,403,404,405,406,407,408,409]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(18, 'filament.admin.resources.testimonials.index', '[1,2,6]', '[410,411,412,413,414,415,416,417,418,419,420,421]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(19, 'filament.admin.resources.types.index', '[1,2,3,6]', '[471,472,473,474,475,476,477,478,479,480,481,482]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(20, 'filament.admin.resources.users.index', '[1,6]', '[422,423,424,425,426,427,428,429,430,431,432,433]', '2026-06-11 09:20:08', '2026-06-11 09:20:08'),
(21, 'filament.admin.resources.visits.index', '[1,2,6]', '[434,435,436,437,438,439,440,441,442,443,444,445]', '2026-06-11 09:20:08', '2026-06-11 09:20:08');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('aWMrSskKWDgREYhnKZPAPg09Q8p2hhepI6uuExga', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEtibFZBOVhqd0ljaXUwWVM3bjNrZUVJOWZiWTZIMEFUYUp5SkRXdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787894982),
('C6oNCVOWVmKQ206GRSOUHlVFhXvfsgltFrorB1EY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNktSeDA1QUhnajNMNldwUGJGZ3k4ZW13OVRrWG9lVlAzdVp3SjRqRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787894983),
('cYkINBLVqgCS19FfmBG6io9fXn7wzsTo3EJaS1Et', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2R4SnkwMGpjSWN5enNmQm9RbUt3Y1lmM0s1VnFiQ0N2TnJHTE96RyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787667273),
('rxQ2jw7MZEc5q09F6a9VU0OvuX3OBdd2dT99v30p', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.134.0 Chrome/148.0.7778.280 Electron/42.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVWpZY2dnNEJSdzIyQWVGSEVtVWw5QlRWOHRhRGFZNVBFM1hkSHpocCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787667272),
('ULM9SYNDODpc0J0y25gkMXM2S2ANlZjGZdHhDVU0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.134.0 Chrome/148.0.7778.280 Electron/42.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmRYek80MGR6WkZ6RHdEdTVuZDhLd2Z5cVg0OEpxR0JXU3ViZGtGUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787894980),
('uXlK4QaJXz6fScXR1XNk6TmENzWQ1VOlEtuPGmYo', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoieFVoM0lwREhIRHh0bG1mVEw1MkZRWVgxdllVZTExWk1mSWRqRzRGNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9ib29rcy9jcmVhdGUiO3M6NToicm91dGUiO3M6Mzc6ImZpbGFtZW50LmFkbWluLnJlc291cmNlcy5ib29rcy5jcmVhdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTozO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjY0OiI0OTFkZGYyZGVhNmRkZmVjYWMxMWY0MzcwMjBhM2UyNTY1MmZlMmRjNGRhYzk3YWU5NTlhNmZiMWJkMjNiNTA4IjtzOjY6InRhYmxlcyI7YTo1OntzOjQwOiIwMzBhZTI1MjkxYjVkY2I0ZmE4M2U2MzU0NDAxMjJiOF9jb2x1bW5zIjthOjY6e2k6MDthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo2OiJhdmF0YXIiO3M6NToibGFiZWwiO3M6NjoiQXZhdGFyIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MTthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo0OiJuYW1lIjtzOjU6ImxhYmVsIjtzOjQ6Ik5hbWEiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToyO2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjg6InVzZXJuYW1lIjtzOjU6ImxhYmVsIjtzOjg6IlVzZXJuYW1lIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MzthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo2OiJnZW5kZXIiO3M6NToibGFiZWwiO3M6MTM6IkplbmlzIEtlbGFtaW4iO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aTo0O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjU6InBob25lIjtzOjU6ImxhYmVsIjtzOjU6IlBob25lIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6NTthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxMToibmF0aW9uYWxpdHkiO3M6NToibGFiZWwiO3M6NzoiQ291bnRyeSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO319czo0MDoiNzRiY2FhNzZhNDI0ZmE3NmFiYzNiZjk3M2YxOTNjMjdfY29sdW1ucyI7YTo0OntpOjA7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTA6ImJvb2sudGl0bGUiO3M6NToibGFiZWwiO3M6NDoiQnVrdSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjE7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6ODoibG9jYXRpb24iO3M6NToibGFiZWwiO3M6NjoiTG9rYXNpIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MjthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxMDoiY3JlYXRlZF9hdCI7czo1OiJsYWJlbCI7czoxMToiRGlidWF0IFBhZGEiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjowO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjoxO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7YjoxO31pOjM7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTA6InVwZGF0ZWRfYXQiO3M6NToibGFiZWwiO3M6MTU6IkRpcGVyYmFydWkgUGFkYSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjA7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjE7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtiOjE7fX1zOjQwOiJlMGEzYmM2ZDU3MDdhMmQ2MDIwMzU2NTE0YjI4YWIyNl9jb2x1bW5zIjthOjY6e2k6MDthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxNjoibGF0ZV9mZWVfcGVyX2RheSI7czo1OiJsYWJlbCI7czoxNDoiRGVuZGEgUGVyIEhhcmkiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToxO2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjIwOiJkYW1hZ2VfZGlzY291bnRfdHlwZSI7czo1OiJsYWJlbCI7czoxNjoiVGlwZSBEZW5kYSBSdXNhayI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjI7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTU6ImRhbWFnZV9mZWVfYm9vayI7czo1OiJsYWJlbCI7czoxNToiRGVuZGEgS2VydXNha2FuIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MzthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxODoibG9zdF9kaXNjb3VudF90eXBlIjtzOjU6ImxhYmVsIjtzOjE3OiJUaXBlIERlbmRhIEhpbGFuZyI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjQ7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTM6Imxvc3RfZmVlX2Jvb2siO3M6NToibGFiZWwiO3M6MTY6IkRlbmRhIEtlaGlsYW5nYW4iO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aTo1O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjEwOiJ1cGRhdGVkX2F0IjtzOjU6ImxhYmVsIjtzOjE1OiJUZXJha2hpciBEaXViYWgiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9fXM6NDA6ImUxNjEzMmFmMTA4N2RjMWM4Yjc5NWRlZDM4OTA2MTQ0X2NvbHVtbnMiO2E6MTE6e2k6MDthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czozODoicmV0dXJuQm9vay5sb2FuRGV0YWlsLmxvYW4udXNlci5hdmF0YXIiO3M6NToibGFiZWwiO3M6NjoiQXZhdGFyIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MTthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czozNjoicmV0dXJuQm9vay5sb2FuRGV0YWlsLmxvYW4udXNlci5uYW1lIjtzOjU6ImxhYmVsIjtzOjg6IlBlbWluamFtIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MjthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czozMjoicmV0dXJuQm9vay5sb2FuRGV0YWlsLmJvb2sudGl0bGUiO3M6NToibGFiZWwiO3M6NDoiQnVrdSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjM7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MzI6InJldHVybkJvb2subG9hbkRldGFpbC5ib29rLmNvdmVyIjtzOjU6ImxhYmVsIjtzOjEwOiJDb3ZlciBCb29rIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6NDthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoyMjoicmV0dXJuQm9vay5yZXR1cm5fZGF0ZSI7czo1OiJsYWJlbCI7czoyMDoiVGFuZ2dhbCBQZW5nZW1iYWxpYW4iO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aTo1O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjMwOiJyZXR1cm5Cb29rLmxvYW5EZXRhaWwuZHVlX2RhdGUiO3M6NToibGFiZWwiO3M6MTE6IkphdHVoIFRlbXBvIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6NjthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo4OiJsYXRlX2ZlZSI7czo1OiJsYWJlbCI7czoxOToiRGVuZGEgS2V0ZXJsYW1iYXRhbiI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjc7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6OToib3RoZXJfZmVlIjtzOjU6ImxhYmVsIjtzOjEzOiJEZW5kYSBMYWlubnlhIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6ODthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo5OiJ0b3RhbF9mZWUiO3M6NToibGFiZWwiO3M6MTE6IlRvdGFsIERlbmRhIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6OTthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxNDoicGF5bWVudF9zdGF0dXMiO3M6NToibGFiZWwiO3M6MTc6IlN0YXR1cyBQZW1iYXlhcmFuIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MTA7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6OToiZmluZV9kYXRlIjtzOjU6ImxhYmVsIjtzOjEzOiJUYW5nZ2FsIERlbmRhIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fX1zOjQwOiJiZGVjZjU4OWIwMjNmZTI5NTI3ZmE4MTQwMTc2ODhlMl9jb2x1bW5zIjthOjIwOntpOjA7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6NToiY292ZXIiO3M6NToibGFiZWwiO3M6NToiQ292ZXIiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToxO2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjk6ImJvb2tfY29kZSI7czo1OiJsYWJlbCI7czo5OiJCb29rIENvZGUiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToyO2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjU6InRpdGxlIjtzOjU6ImxhYmVsIjtzOjU6IlRpdGxlIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6MzthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo0OiJzbHVnIjtzOjU6ImxhYmVsIjtzOjQ6IlNsdWciO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjowO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjoxO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7YjoxO31pOjQ7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MjM6ImxvY2F0aW9uT2ZCb29rLmxvY2F0aW9uIjtzOjU6ImxhYmVsIjtzOjExOiJMb2thc2kgQnVrdSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjU7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTI6ImFkZGVkQnkubmFtZSI7czo1OiJsYWJlbCI7czo4OiJBZGRlZCBCeSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjY7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTI6ImF1dGhvcnMubmFtZSI7czo1OiJsYWJlbCI7czo3OiJQZW51bGlzIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fWk6NzthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxNDoicHVibGlzaGVyLm5hbWUiO3M6NToibGFiZWwiO3M6ODoiUGVuZXJiaXQiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aTo4O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjE2OiJwdWJsaWNhdGlvbl95ZWFyIjtzOjU6ImxhYmVsIjtzOjEyOiJUYWh1biBUZXJiaXQiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aTo5O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjQ6ImlzYm4iO3M6NToibGFiZWwiO3M6NDoiSVNCTiI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjA7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjE7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtiOjE7fWk6MTA7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTA6InR5cGVzLnR5cGUiO3M6NToibGFiZWwiO3M6MTM6IlRpcGUgUmVzb3VyY2UiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToxMTthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo4OiJzeW5vcHNpcyI7czo1OiJsYWJlbCI7czo4OiJTaW5vcHNpcyI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjA7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjE7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtiOjE7fWk6MTI7YTo3OntzOjQ6InR5cGUiO3M6NjoiY29sdW1uIjtzOjQ6Im5hbWUiO3M6MTU6Im51bWJlcl9vZl9wYWdlcyI7czo1OiJsYWJlbCI7czo3OiJIYWxhbWFuIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MDtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MTtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO2I6MTt9aToxMzthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxMToic3RvY2sudG90YWwiO3M6NToibGFiZWwiO3M6NToiU3RvY2siO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToxNDthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czo1OiJwcmljZSI7czo1OiJsYWJlbCI7czo1OiJIYXJnYSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjE1O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjY6InN0YXR1cyI7czo1OiJsYWJlbCI7czo2OiJTdGF0dXMiO3M6ODoiaXNIaWRkZW4iO2I6MDtzOjk6ImlzVG9nZ2xlZCI7YjoxO3M6MTI6ImlzVG9nZ2xlYWJsZSI7YjowO3M6MjQ6ImlzVG9nZ2xlZEhpZGRlbkJ5RGVmYXVsdCI7Tjt9aToxNjthOjc6e3M6NDoidHlwZSI7czo2OiJjb2x1bW4iO3M6NDoibmFtZSI7czoxMjoiaXNfcHVibGlzaGVkIjtzOjU6ImxhYmVsIjtzOjk6IlB1Ymxpa2FzaSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjE3O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjEyOiJpc19zcG90bGlnaHQiO3M6NToibGFiZWwiO3M6NzoiU29yb3RhbiI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjE4O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjE4OiJhY3RpdmVfbG9hbnNfY291bnQiO3M6NToibGFiZWwiO3M6MTU6IlNlZGFuZyBEaXBpbmphbSI7czo4OiJpc0hpZGRlbiI7YjowO3M6OToiaXNUb2dnbGVkIjtiOjE7czoxMjoiaXNUb2dnbGVhYmxlIjtiOjA7czoyNDoiaXNUb2dnbGVkSGlkZGVuQnlEZWZhdWx0IjtOO31pOjE5O2E6Nzp7czo0OiJ0eXBlIjtzOjY6ImNvbHVtbiI7czo0OiJuYW1lIjtzOjIwOiJyZXR1cm5lZF9sb2Fuc19jb3VudCI7czo1OiJsYWJlbCI7czoxMjoiRGlrZW1iYWxpa2FuIjtzOjg6ImlzSGlkZGVuIjtiOjA7czo5OiJpc1RvZ2dsZWQiO2I6MTtzOjEyOiJpc1RvZ2dsZWFibGUiO2I6MDtzOjI0OiJpc1RvZ2dsZWRIaWRkZW5CeURlZmF1bHQiO047fX19fQ==', 1787669605);

-- --------------------------------------------------------

--
-- Table structure for table `social_media`
--

CREATE TABLE `social_media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `socialable_type` varchar(255) NOT NULL,
  `socialable_id` bigint(20) UNSIGNED NOT NULL,
  `platform` enum('instagram','facebook','twitter','tiktok','whatsapp','linkedin','gmail') NOT NULL,
  `url` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `total` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `available` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `loan` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `lost` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `damaged` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `book_id`, `total`, `available`, `loan`, `lost`, `damaged`, `created_at`, `updated_at`) VALUES
(1, 1, 10, 2, 0, 0, 8, '2026-06-11 03:18:06', '2026-08-01 03:16:27'),
(2, 2, 10, 7, 0, 0, 3, '2026-06-11 04:26:22', '2026-08-19 06:46:37'),
(3, 3, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(4, 4, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(5, 5, 2, 2, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(6, 6, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(7, 7, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(8, 8, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(9, 9, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(10, 10, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(11, 11, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(12, 12, 1, 1, 0, 0, 0, '2026-06-11 04:26:22', '2026-06-11 04:26:22'),
(13, 13, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(14, 14, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(15, 15, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(16, 16, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(17, 17, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(18, 18, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(19, 19, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(20, 20, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(21, 21, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(22, 22, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(23, 23, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(24, 24, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(25, 25, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(26, 26, 1, 1, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(27, 27, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(28, 28, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(29, 29, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(30, 30, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(31, 31, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(32, 32, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(33, 33, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(34, 34, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(35, 35, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(36, 36, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(37, 37, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(38, 38, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(39, 39, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(40, 40, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(41, 41, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(42, 42, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(43, 43, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(44, 44, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(45, 45, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(46, 46, 0, 0, 0, 0, 0, '2026-06-11 04:26:23', '2026-06-11 04:26:23'),
(47, 47, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(48, 48, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(49, 49, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(50, 50, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(51, 51, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(52, 52, 4, 4, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(53, 53, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(54, 54, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(55, 55, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(56, 56, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(57, 57, 6, 6, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(58, 58, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(59, 59, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(60, 60, 5, 5, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(61, 61, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(62, 62, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(63, 63, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(64, 64, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(65, 65, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(66, 66, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(67, 67, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(68, 68, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(69, 69, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(70, 70, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(71, 71, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(72, 72, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(73, 73, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(74, 74, 3, 3, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(75, 75, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(76, 76, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(77, 77, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(78, 78, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(79, 79, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(80, 80, 2, 2, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(81, 81, 0, 0, 0, 0, 0, '2026-06-11 04:26:24', '2026-06-11 04:26:24'),
(82, 82, 0, 0, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(83, 83, 4, 4, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(84, 84, 2, 2, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(85, 85, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(86, 86, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(87, 87, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(88, 88, 17, 17, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(89, 89, 17, 17, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(90, 90, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(91, 91, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(92, 92, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(93, 93, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(94, 94, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(95, 95, 10, 10, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(96, 96, 10, 10, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(97, 97, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(98, 98, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(99, 99, 10, 10, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(100, 100, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(101, 101, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(102, 102, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(103, 103, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(104, 104, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(105, 105, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(106, 106, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(107, 107, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(108, 108, 2, 2, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(109, 109, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(110, 110, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(111, 111, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(112, 112, 5, 5, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(113, 113, 1, 1, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(114, 114, 5, 5, 0, 0, 0, '2026-06-11 04:26:25', '2026-06-11 04:26:25'),
(115, 115, 0, 0, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(116, 116, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(117, 117, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(118, 118, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(119, 119, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(120, 120, 5, 5, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(121, 121, 5, 5, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(122, 122, 0, 0, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(123, 123, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(124, 124, 5, 5, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(125, 125, 5, 5, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(126, 126, 10, 10, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(127, 127, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(128, 128, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(129, 129, 4, 4, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(130, 130, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(131, 131, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(132, 132, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(133, 133, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(134, 134, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(135, 135, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(136, 136, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(137, 137, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(138, 138, 3, 3, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(139, 139, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(140, 140, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(141, 141, 2, 2, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(142, 142, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(143, 143, 1, 1, 0, 0, 0, '2026-06-11 04:26:26', '2026-06-11 04:26:26'),
(144, 144, 0, 0, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(145, 145, 3, 3, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(146, 146, 4, 4, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(147, 147, 6, 6, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(148, 148, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(149, 149, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(150, 150, 3, 3, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(151, 151, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(152, 152, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(153, 153, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(154, 154, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(155, 155, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(156, 156, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(157, 157, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(158, 158, 3, 3, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(159, 159, 3, 3, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(160, 160, 3, 3, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(161, 161, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(162, 162, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(163, 163, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(164, 164, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(165, 165, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(166, 166, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(167, 167, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(168, 168, 1, 1, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(169, 169, 36, 36, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(170, 170, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(171, 171, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(172, 172, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(173, 173, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(174, 174, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(175, 175, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(176, 176, 2, 2, 0, 0, 0, '2026-06-11 04:26:27', '2026-06-11 04:26:27'),
(177, 177, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(178, 178, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(179, 179, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(180, 180, 2, 2, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(181, 181, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(182, 182, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(183, 183, 20, 20, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(184, 184, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(185, 185, 2, 2, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(186, 186, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(187, 187, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(188, 188, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(189, 189, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(190, 190, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(191, 191, 2, 2, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(192, 192, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(193, 193, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(194, 194, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(195, 195, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(196, 196, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(197, 197, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(198, 198, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(199, 199, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(200, 200, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(201, 201, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(202, 202, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(203, 203, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(204, 204, 2, 2, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(205, 205, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(206, 206, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(207, 207, 2, 2, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(208, 208, 1, 1, 0, 0, 0, '2026-06-11 04:26:28', '2026-06-11 04:26:28'),
(209, 209, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(210, 210, 6, 6, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(211, 211, 3, 3, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(212, 212, 3, 3, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(213, 213, 3, 3, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(214, 214, 3, 3, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(215, 215, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(216, 216, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(217, 217, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(218, 218, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(219, 219, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(220, 220, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(221, 221, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(222, 222, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(223, 223, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(224, 224, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(225, 225, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(226, 226, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(227, 227, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(228, 228, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(229, 229, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(230, 230, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(231, 231, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(232, 232, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(233, 233, 3, 3, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(234, 234, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(235, 235, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(236, 236, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(237, 237, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(238, 238, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(239, 239, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(240, 240, 2, 2, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(241, 241, 5, 5, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(242, 242, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(243, 243, 2, 2, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(244, 244, 2, 2, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(245, 245, 1, 1, 0, 0, 0, '2026-06-11 04:26:29', '2026-06-11 04:26:29'),
(246, 246, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(247, 247, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(248, 248, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(249, 249, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(250, 250, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(251, 251, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(252, 252, 3, 3, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(253, 253, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(254, 254, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(255, 255, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(256, 256, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(257, 257, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(258, 258, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(259, 259, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(260, 260, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(261, 261, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(262, 262, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(263, 263, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(264, 264, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(265, 265, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(266, 266, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(267, 267, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(268, 268, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(269, 269, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(270, 270, 2, 2, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(271, 271, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(272, 272, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(273, 273, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(274, 274, 1, 1, 0, 0, 0, '2026-06-11 04:26:30', '2026-06-11 04:26:30'),
(275, 275, 2, 2, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(276, 276, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(277, 277, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(278, 278, 2, 2, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(279, 279, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(280, 280, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(281, 281, 8, 8, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(282, 282, 9, 9, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(283, 283, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(284, 284, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(285, 285, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(286, 286, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(287, 287, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(288, 288, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(289, 289, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(290, 290, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(291, 291, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(292, 292, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(293, 293, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(294, 294, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(295, 295, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(296, 296, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(297, 297, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(298, 298, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(299, 299, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(300, 300, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(301, 301, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(302, 302, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(303, 303, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(304, 304, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(305, 305, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(306, 306, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(307, 307, 1, 1, 0, 0, 0, '2026-06-11 04:26:31', '2026-06-11 04:26:31'),
(308, 308, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(309, 309, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(310, 310, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(311, 311, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(312, 312, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(313, 313, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(314, 314, 7, 7, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(315, 315, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(316, 316, 4, 4, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(317, 317, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(318, 318, 3, 3, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(319, 319, 4, 4, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(320, 320, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(321, 321, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(322, 322, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(323, 323, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(324, 324, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(325, 325, 5, 5, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(326, 326, 3, 3, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(327, 327, 3, 3, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(328, 328, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(329, 329, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(330, 330, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(331, 331, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(332, 332, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(333, 333, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(334, 334, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(335, 335, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(336, 336, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(337, 337, 1, 1, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(338, 338, 2, 2, 0, 0, 0, '2026-06-11 04:26:32', '2026-06-11 04:26:32'),
(339, 339, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(340, 340, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(341, 341, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(342, 342, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(343, 343, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(344, 344, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(345, 345, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(346, 346, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(347, 347, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(348, 348, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(349, 349, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(350, 350, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(351, 351, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(352, 352, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(353, 353, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(354, 354, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(355, 355, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(356, 356, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(357, 357, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(358, 358, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(359, 359, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(360, 360, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(361, 361, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(362, 362, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(363, 363, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(364, 364, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(365, 365, 3, 3, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(366, 366, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(367, 367, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(368, 368, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(369, 369, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(370, 370, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(371, 371, 1, 1, 0, 0, 0, '2026-06-11 04:26:33', '2026-06-11 04:26:33'),
(372, 372, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(373, 373, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(374, 374, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(375, 375, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(376, 376, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(377, 377, 55, 55, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(378, 378, 2, 2, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(379, 379, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(380, 380, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(381, 381, 2, 2, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(382, 382, 2, 2, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(383, 383, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(384, 384, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(385, 385, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(386, 386, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(387, 387, 0, 0, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(388, 388, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(389, 389, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(390, 390, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(391, 391, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(392, 392, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(393, 393, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(394, 394, 2, 2, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(395, 395, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(396, 396, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(397, 397, 1, 1, 0, 0, 0, '2026-06-11 04:26:34', '2026-06-11 04:26:34'),
(398, 398, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(399, 399, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(400, 400, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(401, 401, 6, 6, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(402, 402, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(403, 403, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(404, 404, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(405, 405, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(406, 406, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(407, 407, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(408, 408, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(409, 409, 10, 10, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(410, 410, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(411, 411, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(412, 412, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(413, 413, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(414, 414, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(415, 415, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(416, 416, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(417, 417, 22, 22, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(418, 418, 4, 4, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(419, 419, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(420, 420, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(421, 421, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(422, 422, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(423, 423, 2, 2, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(424, 424, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(425, 425, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(426, 426, 1, 1, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(427, 427, 52, 52, 0, 0, 0, '2026-06-11 04:26:35', '2026-06-11 04:26:35'),
(428, 428, 34, 34, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(429, 429, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(430, 430, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(431, 431, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(432, 432, 16, 16, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(433, 433, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(434, 434, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(435, 435, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(436, 436, 3, 3, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(437, 437, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(438, 438, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(439, 439, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(440, 440, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(441, 441, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(442, 442, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(443, 443, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(444, 444, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(445, 445, 50, 50, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(446, 446, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(447, 447, 2, 2, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(448, 448, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(449, 449, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(450, 450, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(451, 451, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(452, 452, 0, 0, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(453, 453, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(454, 454, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(455, 455, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(456, 456, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(457, 457, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(458, 458, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(459, 459, 1, 1, 0, 0, 0, '2026-06-11 04:26:36', '2026-06-11 04:26:36'),
(460, 460, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(461, 461, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(462, 462, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(463, 463, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(464, 464, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(465, 465, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(466, 466, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(467, 467, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(468, 468, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(469, 469, 3, 3, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(470, 470, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(471, 471, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(472, 472, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(473, 473, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(474, 474, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(475, 475, 2, 2, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(476, 476, 2, 2, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(477, 477, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(478, 478, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(479, 479, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(480, 480, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(481, 481, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(482, 482, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(483, 483, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(484, 484, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(485, 485, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(486, 486, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(487, 487, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(488, 488, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(489, 489, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(490, 490, 1, 1, 0, 0, 0, '2026-06-11 04:26:37', '2026-06-11 04:26:37'),
(491, 491, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(492, 492, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(493, 493, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(494, 494, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(495, 495, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(496, 496, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(497, 497, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(498, 498, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(499, 499, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(500, 500, 2, 2, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(501, 501, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(502, 502, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(503, 503, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(504, 504, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(505, 505, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(506, 506, 2, 2, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(507, 507, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(508, 508, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(509, 509, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(510, 510, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(511, 511, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(512, 512, 0, 0, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(513, 513, 2, 2, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(514, 514, 2, 2, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(515, 515, 10, 10, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(516, 516, 5, 5, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(517, 517, 1, 1, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(518, 518, 5, 5, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(519, 519, 5, 5, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(520, 520, 13, 13, 0, 0, 0, '2026-06-11 04:26:38', '2026-06-11 04:26:38'),
(521, 521, 15, 7, 1, 2, 5, '2026-06-11 07:09:41', '2026-08-19 06:46:59'),
(522, 522, 10, 9, 0, 0, 1, '2026-06-11 09:46:28', '2026-08-19 06:46:26'),
(523, 523, 1, 0, 2, 0, 0, '2026-06-11 14:06:24', '2026-06-11 14:07:24'),
(524, 526, 10, 10, 0, 0, 0, '2026-07-10 03:03:53', '2026-07-10 03:34:14'),
(526, 528, 10, 8, 1, 0, 1, '2026-07-17 03:11:16', '2026-08-12 06:13:28');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `video` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `slug`, `description`, `role`, `video`, `thumbnail`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Andini Pratiwi', 'andini-pratiwi-1', 'Perpustakaan Santo Lukas benar-benar mengubah cara saya belajar. Koleksinya lengkap, dan proses pinjamnya cepat lewat akun. Saya jadi lebih rajin membaca buku referensi untuk ujian.', 'Siswa Kelas XII IPA', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop', 1, 0, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(2, 'Bagas Wicaksono', 'bagas-wicaksono-2', 'Sebagai alumni, saya masih sering mengakses sumber daring perpustakaan untuk riset kuliah. Sistem digitalnya rapi dan mudah dipakai dari mana saja.', 'Alumni Angkatan 2021', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop', 1, 1, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(3, 'Clara Mahendra', 'clara-mahendra-3', 'Program literasi dan klub baca di sini sangat membantu siswa. Anak-anak jadi lebih antusias membaca dan berdiskusi tentang buku.', 'Guru Bahasa Indonesia', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 1, 2, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(4, 'Devan Saputra', 'devan-saputra-4', 'Saya suka fitur bookmark dan rekomendasi bukunya. Tinggal scan kartu anggota, langsung bisa pinjam. Praktis banget!', 'Siswa Kelas XI IPS', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', 1, 3, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(5, 'Eka Lestari', 'eka-lestari-5', 'Sebagai orang tua, saya senang anak saya punya akses ke perpustakaan sebaik ini. Koleksinya terkurasi dan lingkungannya mendukung kebiasaan membaca.', 'Orang Tua Siswa', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop', 1, 4, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(6, 'Farrel Nugraha', 'farrel-nugraha-6', 'Perpustakaan jadi tempat favorit kami untuk belajar kelompok. Suasananya tenang, koleksinya banyak, dan stafnya ramah membantu mencari buku.', 'Pengurus OSIS', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop', 1, 5, '2026-06-10 08:38:19', '2026-06-10 08:38:19'),
(7, 'Dio Prasetyo', 'dio-prasetyo-4878', 'Alumni Santo Lukas Sunter', 'Alumni Santo Lukas Sunter', 'testimonials/videos/01KTVAK334074PPAF9X0F4BZP3.mp4', 'testimonials/thumbnails/01KTVAK33JV2851ZNT5GGA506W.jpg', 1, 1, '2026-06-11 12:30:25', '2026-06-11 12:30:25'),
(8, 'Dio Prasetyo', 'dio-prasetyo-7252', 'Alumni SMA Santa Della Strada Tahun Akademik 2021/2022', 'Alumni SMA Santa Della Strada', 'testimonials/videos/01KX55KGJAHFMKDKP37RBSMMEK.mp4', 'testimonials/thumbnails/01KX55KGM87WHNEHCQRKSGT28Y.png', 1, 1, '2026-07-10 04:47:04', '2026-07-10 04:47:04');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `type` enum('digital','fisik') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `icon`, `type`, `created_at`, `updated_at`) VALUES
(1, 'types/icons/01KTSBYNRKYFPVGFG80JXGFFV4.png', 'digital', '2026-06-10 18:15:44', '2026-06-10 18:15:44'),
(2, 'types/icons/01KTTAVXC8XTB5N0DJ9QXQBTTQ.png', 'fisik', '2026-06-11 03:16:00', '2026-06-11 03:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `avatar_url` text DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `type_other` varchar(100) DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `approved_at` timestamp NULL DEFAULT NULL,
  `approved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `member_card_issued_at` timestamp NULL DEFAULT NULL,
  `member_card_issued_by` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `google_id`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `phone`, `avatar`, `avatar_url`, `date_of_birth`, `address`, `type`, `type_other`, `is_approved`, `approved_at`, `approved_by`, `member_card_issued_at`, `member_card_issued_by`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Staff Penulis', 'writer', 'writer@perpustakaan-saint-luke.id', NULL, '2026-06-10 08:38:18', '$2y$12$YJyY1Dg8lMrmVqmeIchnt.dixV2GBST5cmbsByJFAyPWaybwkVhCW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-06-10 08:38:18', NULL, NULL, NULL, NULL, '2026-06-10 08:38:18', '2026-06-10 08:38:18', NULL),
(2, 'Staff Manager', 'manager', 'manager@perpustakaan-saint-luke.id', NULL, '2026-06-10 08:38:18', '$2y$12$MIkK0BWPGnzM07S9qoRbS.Z84rcOX7vbGYZuKLK1XvPOxfzgRTz6K', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-06-10 08:38:18', NULL, NULL, NULL, NULL, '2026-06-10 08:38:18', '2026-06-10 08:38:18', NULL),
(3, 'Super Admin', 'superadmin', 'prasetyodio04@gmail.com', NULL, '2026-06-10 08:39:11', '$2y$12$oFTTY2nCiGQ1MOs55tIjNONpsHPePk8QB7y6FHVmAtefLbgo9VvV2', NULL, NULL, NULL, '6281381876265', NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-06-10 08:39:11', NULL, NULL, NULL, '1kkvUJFauf8pUX47BA6FaD3iHrdkYpARbPgSUttvtgIZwtmaBoYvGwsMcFQv', '2026-06-10 08:39:11', '2026-07-11 08:32:04', NULL),
(4, 'PRASETYO DIO', 'prasetyo_dio546', 'dioolinger04@gmail.com', '103016444151416755988', '2026-06-10 09:02:11', NULL, NULL, NULL, NULL, '6281381876265', NULL, 'https://lh3.googleusercontent.com/a-/ALV-UjURPadtq5ixZRcsFW2GeiUxb7gz5yPduml-s4SucZtS7HVHJHaE8U0_qDb9Yi0toh13Q-kiuEwxhMnUXLfmIrTPJm9VSdvSn8RklA2uVXr6QKSTdB59YckiqNkG5idKiqk9elKDAXN8zBRyOS1y3pEhKdaknoWKlzukWhWNW-yvzULBdiVsBahBMJ9Xrd40e_sxLnEL_tazWSy4cf4ldA40_9aKO_vAq9qyp9vk5pnwNDJOsoEKGPyw9mE8dsBuIY0TzC8LU9DcrT8LCGTb2zr-tRSJdEYD15Uj--fq4yOPkEH14hKCl0xLq3i7RIeYYtwtrZ0cWP9BWF0Qs-bju4kd7neKzkdbQQk5YoEo_KIvy8mdIVi-B8ZUzMm2HK8bdZwG-1436AHnuA0gf9YQOsBqwk_om8Gr6KUiT3xGtQiSQb9rUGKK_GrUeCUQvin1hmLZUhqtRvn9UnD22h9IeupQBF09g1efhrZ04VQSCPUhoKTGaKu3rRx5lDyQjxsmH-76pzW0HPVle5mv_s7TepBWqN61vRJI8L9Tpsco4XWYzIjFPpMMvLeFnDHzvMpOj8-aZkF3dVsJh_fPQrsCyONqtQkmMSubbUlo-1szh-iCpW4LAGzL9Pgk-ofDepmP6jRhl3NzNasXb1kYdKgcWiUQ_xSbBNRPpKl0-2BcILaObJM20OluxxM7EPGxhkb-mbmKYhOy3yhlrO8sr41asfFj0upOvDrEJAc_R3stFhSOqvSjaj8woldSX1l6CI9xhUD-WxCv7icCnt6ePzhYRUsgK_TOIdgB8YP9zOJCQsnDlM_WlITRgJWicH9NKyuGryUJW85aKvy8ss0Vl2aast9Yx85mcJqein73CFit3nXk8AmAyyw72JeEM4Uu0yErBOnEPg-7zKrcKYtJMwhngSxUVGD5hbV-Az2V8zRyDOCPxnZuirVJtexIlU1-bzUiURr7JZW6ClKXxVXT_Yzx6wlSQuMtKG1DrsSZvr9DriFVim3JLXU1fsUl-p483x-urfWVbYU3Y_q5__Vc14QHzA-_91wxMITc2cX9WAJLUezIdxmn9Np8jws=s96-c', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, '7WFCSQ2to6qcPmsef4AX3qi41YANDqIHEfDkPoWRiZAk7FZMnNNDcqlXqJsN', '2026-06-10 09:01:41', '2026-06-10 09:02:52', NULL),
(5, 'User Dummy', 'user_dummy159', '4522210148@univpancasila.ac.id', NULL, NULL, '$2y$12$JmVJcLS3QNYeVKieHcowZuGQ4fHbD1lb1W0sg2ECpEBkB.3HUMgp.', NULL, NULL, NULL, '+6287263279372', 'users/01KTTFC9303YSTPXD0PCXQN0R4.jpg', NULL, '2004-06-11', 'Jakarta', 'SMA', NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-06-11 04:34:51', '2026-06-11 04:46:52', '2026-06-11 04:46:52'),
(6, 'DIO PRASETYO', 'dio_prasetyo704', 'cfcc290d6y1707@student.devacademy.id', NULL, '2026-06-11 06:31:35', '$2y$12$anZAYaudFNI/1sdBxltsfOfB3cABqxRERZl2oZk.UP1bsZfhp/SCW', NULL, NULL, NULL, '6282122843177', 'users/bdSlxhZSxfHh9K001jKZVbjVVev9aYpTzSwdiuks.webp', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-06-11 06:40:59', 7, NULL, '2026-06-11 06:30:32', '2026-06-11 06:40:59', NULL),
(7, 'Dio', 'dio175', 'dio@gmail.com', NULL, '2026-06-11 06:39:01', '$2y$12$.XwA6B2.mCxLVYBDWvxvSeIhPqTqDcnGVfBsgAbKuPVFhi0z59xyW', NULL, NULL, NULL, '+6281381876265', 'avatars/01KTTP9J0J7DX62YQT5YY6S62K.jpg', NULL, NULL, NULL, NULL, NULL, 1, '2026-06-11 06:39:01', NULL, NULL, NULL, NULL, '2026-06-11 06:35:42', '2026-06-11 06:39:01', NULL),
(8, 'Tigor Parulian Sinaga', 'tigor_parulian_sinaga837', 'projectpersonal2022@gmail.com', '103394675022436605980', '2026-06-11 13:42:37', '$2y$12$zv/pHF9JgQ/7TaXXYuES1.rN2HYHizRyagTgo1VATu/aKOw0sH.7m', NULL, NULL, NULL, '6281381876265', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJFU5zAhlj3mYAZvCXDhguhAQfSX17-0iLOWtUjg6O1I1P9IA=s96-c', NULL, NULL, NULL, NULL, 0, NULL, NULL, '2026-06-11 13:13:59', 3, 'Jazmi5kQ98eMGYLd3SLna5AxprsVbc1sUinV5Azo6nQA5gECE6lf3ycIS1UC', '2026-06-11 13:11:25', '2026-07-10 03:29:34', NULL),
(9, 'Ana Yustina Tetty', 'ana_yustina_tetty494', 'user15@gmail.com', NULL, NULL, '$2y$12$7xTES0x45bZCuQiD/f8i2OiXyrFJmi05Brorqj2.ff.MDDmseediG', NULL, NULL, NULL, '6281398765432', 'users/67WWFf60AaXfHrYdNOHBeqiSz6WK6WJxhZzNEzi7.webp', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-06-11 13:59:35', '2026-06-11 13:59:35', NULL),
(10, 'Udin Pecot', 'udin_pecot100', 'udin04@gmail.com', NULL, '2026-06-11 14:02:58', '$2y$12$7RN1O5CSKsQHutC.XSUf7ecEOXUhlIcfwaQgrWW7wkgvLKRA0Ir/i', NULL, NULL, NULL, '+6287654328978', 'avatars/01KTVFV5AMZTXXHBRPDZAKGKTV.jpg', NULL, NULL, NULL, NULL, NULL, 1, '2026-06-11 14:02:58', NULL, NULL, NULL, NULL, '2026-06-11 14:02:13', '2026-06-11 14:02:58', NULL),
(11, 'DIO PRASETYO', 'dio_prasetyo360', 'prasetyodio06@gmail.com', NULL, '2026-06-12 04:55:49', '$2y$12$UkAX6qcykZ3pgqtuaLqWVOmjKUp3suS.QSnkjL95A.2b5nZRtiWmC', NULL, NULL, NULL, '6281381877654', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-06-12 04:32:50', '2026-06-12 04:55:49', NULL),
(12, 'Admin Test', 'admin_test857', 'testadmin@perpustakaan-saint-luke.id', NULL, '2026-06-23 12:32:57', '$2y$12$4QTXdEN9DhREKLy.5gEAZ.g27yQY3.169/ZJycx5iDnDXudja.qXe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-06-23 12:32:57', 3, NULL, NULL, NULL, '2026-06-23 12:29:40', '2026-06-23 12:32:57', NULL),
(15, 'Udin Petot', 'udin_petot585', 'udin07@gmail.com', NULL, '2026-07-09 17:00:00', '$2y$12$ekGPb/Pa3vU266w.Gc64FuNvqQWVRj5ZBCWdFw9OnbXpMknBODNQO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-07-09 17:00:00', 3, '2026-07-10 05:04:17', 3, NULL, '2026-07-10 04:56:16', '2026-07-10 05:04:17', NULL),
(16, 'Agnes Susana', 'agnes_susana441', 'olingersusana@gmail.com', NULL, '2026-07-10 05:09:14', '$2y$12$h7kLViS3lCuIg.3QIhGeaeRswnvsPGt/mGlt0Zq/pBFWFzQbwoloa', NULL, NULL, NULL, '+6287689798765', 'avatars/01KX56TXFEWREJSXV6BARYV22X.jpg', NULL, NULL, NULL, NULL, NULL, 1, '2026-07-10 05:09:14', NULL, NULL, NULL, NULL, '2026-07-10 05:08:36', '2026-07-10 05:09:14', NULL),
(17, 'Nazarudin', 'nazarudin707', 'dioolinger0406@gmail.com', '100262431280169523858', '2026-07-11 06:16:11', '$2y$12$guXi/oL56s/rGK762T4/qeHo.RLs1InN/10GXkqw0CyJCjAMoXsdq', NULL, NULL, NULL, '629876543265', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJMDZFu1n5bDg5SJjcFQLOYfBlP6Mp0KYxRkK2y5XhUsY8C_g=s96-c', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 'uB3eobzcUEDOrGG1P5QHXxasuDD7jt7TO75CxsFBNvU3Lcwzivo5fgF0DdOo', '2026-07-11 06:04:48', '2026-07-11 06:16:11', NULL),
(18, 'Admin', 'admin587', 'admin@perpustakaan-saint-luke.id', NULL, NULL, '$2y$12$ERfJKvFXux8ksvxAieid3.xq8rfVvGATmYXlvfY3qVLjTwjYL622.', NULL, NULL, NULL, '6281234567890', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-07-11 07:36:17', '2026-07-11 07:36:17', NULL),
(20, 'Mahardika Rafaditya ', 'mahardika_rafaditya167', '4522210146@univpancasila.ac.id', NULL, '2026-07-15 17:00:00', '$2y$12$uB22G2uW9mPsoytkqAw./uWobnbsRzASxKqJfm09sDPMoI6mC7She', NULL, NULL, NULL, '+6281386016213', NULL, NULL, '2026-07-16', 'Tanjung Priok', NULL, NULL, 0, NULL, NULL, '2026-07-16 14:25:19', 3, NULL, '2026-07-16 14:24:25', '2026-07-16 14:25:19', NULL),
(21, 'Peminjam 1', 'peminjam_1384', 'peminjam@gmail.com', NULL, '2026-07-16 17:00:00', '$2y$12$YhHoV.BDK2ulq9.fY/IRmeYng8TJZbf31yna91C1emKX8ZyrcS9hq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-07-17 02:56:09', '2026-07-17 02:56:09', NULL),
(22, 'Staff 1', 'staff_1746', 'staff@gmail.com', NULL, '2026-07-16 17:00:00', '$2y$12$q5XXDmTIrcui7h6Pi47EhuCKmgbeS6XYtNq/G/kRXKspztEsTEpde', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2026-07-17 02:59:39', 3, NULL, NULL, NULL, '2026-07-17 02:57:27', '2026-07-17 02:59:39', NULL),
(23, 'Penulis 1', 'penulis_1734', 'penulis@gmail.com', NULL, '2026-07-16 17:00:00', '$2y$12$qrTK5UVo22vKXVJrZYa0BeQt2/Zcim4iRI8lkBN/nNAsqYL5GI1w.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '2026-07-17 02:58:16', '2026-07-17 02:58:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `visit_date` datetime NOT NULL,
  `type` varchar(32) DEFAULT NULL,
  `type_other` varchar(100) DEFAULT NULL,
  `needs` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `user_id`, `name`, `address`, `visit_date`, `type`, `type_other`, `needs`, `note`, `created_at`, `updated_at`) VALUES
(1, 6, 'DIO PRASETYO', '-', '2026-06-11 20:08:56', NULL, NULL, NULL, 'Berkunjung Hari ini', '2026-06-11 13:08:56', '2026-06-11 13:08:56'),
(2, 8, 'Tigor Parulian Sinaga', '-', '2026-06-11 20:15:03', NULL, NULL, NULL, 'Berkunjung Hari ini', '2026-06-11 13:15:03', '2026-06-11 13:15:03'),
(3, 8, 'Tigor Parulian Sinaga', '-', '2026-07-10 11:54:39', NULL, NULL, NULL, 'Berkunjung Hari ini', '2026-07-10 04:54:39', '2026-07-10 04:54:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `announcements_days_unique` (`days`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `authors_username_unique` (`username`);

--
-- Indexes for table `author_of_books`
--
ALTER TABLE `author_of_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_of_books_author_id_foreign` (`author_id`),
  ADD KEY `author_of_books_book_id_foreign` (`book_id`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bookmarks_user_id_book_id_unique` (`user_id`,`book_id`),
  ADD KEY `bookmarks_book_id_foreign` (`book_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_book_code_unique` (`book_code`),
  ADD UNIQUE KEY `books_slug_unique` (`slug`),
  ADD KEY `books_publisher_id_foreign` (`publisher_id`),
  ADD KEY `books_language_id_foreign` (`language_id`),
  ADD KEY `books_added_by_foreign` (`added_by`),
  ADD KEY `books_is_spotlight_index` (`is_spotlight`),
  ADD KEY `books_location_of_book_id_foreign` (`location_of_book_id`);

--
-- Indexes for table `book_of_assets`
--
ALTER TABLE `book_of_assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_of_assets_book_id_foreign` (`book_id`),
  ADD KEY `book_of_assets_asset_id_foreign` (`asset_id`);

--
-- Indexes for table `book_of_categories`
--
ALTER TABLE `book_of_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_of_categories_category_id_foreign` (`category_id`),
  ADD KEY `book_of_categories_book_id_foreign` (`book_id`);

--
-- Indexes for table `book_of_types`
--
ALTER TABLE `book_of_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_of_types_book_id_foreign` (`book_id`),
  ADD KEY `book_of_types_type_id_foreign` (`type_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `events_slug_unique` (`slug`),
  ADD KEY `events_is_active_start_at_index` (`is_active`,`start_at`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fines`
--
ALTER TABLE `fines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fines_return_book_id_foreign` (`return_book_id`);

--
-- Indexes for table `fine_settings`
--
ALTER TABLE `fine_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informations`
--
ALTER TABLE `informations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `informations_slug_unique` (`slug`),
  ADD KEY `informations_category_id_foreign` (`category_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `languages_code_unique` (`code`),
  ADD UNIQUE KEY `languages_language_unique` (`language`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `loans_loan_code_unique` (`loan_code`),
  ADD KEY `loans_user_id_foreign` (`user_id`);

--
-- Indexes for table `loan_details`
--
ALTER TABLE `loan_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `loan_details_loan_id_book_id_unique` (`loan_id`,`book_id`),
  ADD KEY `loan_details_book_id_foreign` (`book_id`),
  ADD KEY `loan_details_loan_type_index` (`loan_type`);

--
-- Indexes for table `location_of_books`
--
ALTER TABLE `location_of_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_of_books_book_id_foreign` (`book_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `online_resources`
--
ALTER TABLE `online_resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization_members`
--
ALTER TABLE `organization_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publishers_slug_unique` (`slug`);

--
-- Indexes for table `return_books`
--
ALTER TABLE `return_books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `return_books_return_book_code_unique` (`return_book_code`),
  ADD KEY `return_books_loan_user_id_foreign` (`loan_user_id`);

--
-- Indexes for table `return_book_checks`
--
ALTER TABLE `return_book_checks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `return_book_checks_return_book_id_foreign` (`return_book_id`);

--
-- Indexes for table `review_books`
--
ALTER TABLE `review_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_books_loan_user_id_foreign` (`loan_user_id`),
  ADD KEY `review_books_return_book_id_foreign` (`return_book_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `route_accesses`
--
ALTER TABLE `route_accesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `social_media_socialable_id_socialable_type_platform_unique` (`socialable_id`,`socialable_type`,`platform`),
  ADD KEY `social_media_socialable_type_socialable_id_index` (`socialable_type`,`socialable_id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stocks_book_id_foreign` (`book_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `testimonials_slug_unique` (`slug`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `types_type_unique` (`type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_google_id_unique` (`google_id`),
  ADD KEY `users_approved_by_foreign` (`approved_by`),
  ADD KEY `users_member_card_issued_by_foreign` (`member_card_issued_by`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visits_visit_date_index` (`visit_date`),
  ADD KEY `visits_user_id_visit_date_index` (`user_id`,`visit_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=397;

--
-- AUTO_INCREMENT for table `author_of_books`
--
ALTER TABLE `author_of_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=648;

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=529;

--
-- AUTO_INCREMENT for table `book_of_assets`
--
ALTER TABLE `book_of_assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `book_of_categories`
--
ALTER TABLE `book_of_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `book_of_types`
--
ALTER TABLE `book_of_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fines`
--
ALTER TABLE `fines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `fine_settings`
--
ALTER TABLE `fine_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `informations`
--
ALTER TABLE `informations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `loan_details`
--
ALTER TABLE `loan_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `location_of_books`
--
ALTER TABLE `location_of_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `online_resources`
--
ALTER TABLE `online_resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `organization_members`
--
ALTER TABLE `organization_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=483;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `return_books`
--
ALTER TABLE `return_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `return_book_checks`
--
ALTER TABLE `return_book_checks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `review_books`
--
ALTER TABLE `review_books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `route_accesses`
--
ALTER TABLE `route_accesses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=527;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_of_books`
--
ALTER TABLE `author_of_books`
  ADD CONSTRAINT `author_of_books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `author_of_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_location_of_book_id_foreign` FOREIGN KEY (`location_of_book_id`) REFERENCES `location_of_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_publisher_id_foreign` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_of_assets`
--
ALTER TABLE `book_of_assets`
  ADD CONSTRAINT `book_of_assets_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_of_assets_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_of_categories`
--
ALTER TABLE `book_of_categories`
  ADD CONSTRAINT `book_of_categories_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_of_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_of_types`
--
ALTER TABLE `book_of_types`
  ADD CONSTRAINT `book_of_types_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_of_types_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fines`
--
ALTER TABLE `fines`
  ADD CONSTRAINT `fines_return_book_id_foreign` FOREIGN KEY (`return_book_id`) REFERENCES `return_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `informations`
--
ALTER TABLE `informations`
  ADD CONSTRAINT `informations_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `loan_details`
--
ALTER TABLE `loan_details`
  ADD CONSTRAINT `loan_details_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_details_loan_id_foreign` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location_of_books`
--
ALTER TABLE `location_of_books`
  ADD CONSTRAINT `location_of_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `return_books`
--
ALTER TABLE `return_books`
  ADD CONSTRAINT `return_books_loan_user_id_foreign` FOREIGN KEY (`loan_user_id`) REFERENCES `loan_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `return_book_checks`
--
ALTER TABLE `return_book_checks`
  ADD CONSTRAINT `return_book_checks_return_book_id_foreign` FOREIGN KEY (`return_book_id`) REFERENCES `return_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review_books`
--
ALTER TABLE `review_books`
  ADD CONSTRAINT `review_books_loan_user_id_foreign` FOREIGN KEY (`loan_user_id`) REFERENCES `loan_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_books_return_book_id_foreign` FOREIGN KEY (`return_book_id`) REFERENCES `return_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_member_card_issued_by_foreign` FOREIGN KEY (`member_card_issued_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `visits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
