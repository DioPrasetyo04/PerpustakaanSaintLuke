// data.jsx — Dummy data perpustakaan Santo Lukas (gabungan SD-SMP-SMA)

const CATEGORIES = [
  { id: 'fiksi',         name: 'Fiksi & Sastra',       count: 482, icon: '📖' },
  { id: 'sains',         name: 'Sains & Teknologi',    count: 318, icon: '🔬' },
  { id: 'sejarah',       name: 'Sejarah & Biografi',   count: 226, icon: '🏛' },
  { id: 'religi',        name: 'Religi & Spiritualitas', count: 174, icon: '✝' },
  { id: 'anak',          name: 'Bacaan Anak',          count: 392, icon: '🧸' },
  { id: 'pelajaran',     name: 'Buku Pelajaran',       count: 514, icon: '🎓' },
  { id: 'sosial',        name: 'Sosial & Humaniora',   count: 198, icon: '🌏' },
  { id: 'seni',          name: 'Seni & Budaya',        count: 142, icon: '🎨' },
  { id: 'referensi',     name: 'Referensi & Kamus',    count: 88,  icon: '📚' },
];

const PUBLISHERS = [
  { id: 'gpu',      name: 'Gramedia Pustaka Utama',  books: 312, city: 'Jakarta', founded: 1974 },
  { id: 'mizan',    name: 'Mizan',                    books: 198, city: 'Bandung', founded: 1983 },
  { id: 'kpg',      name: 'Kepustakaan Populer Gramedia', books: 156, city: 'Jakarta', founded: 1996 },
  { id: 'bpk',      name: 'BPK Gunung Mulia',         books: 124, city: 'Jakarta', founded: 1951 },
  { id: 'erlangga', name: 'Penerbit Erlangga',        books: 287, city: 'Jakarta', founded: 1952 },
  { id: 'kanisius', name: 'Penerbit Kanisius',        books: 168, city: 'Yogyakarta', founded: 1922 },
  { id: 'bentang',  name: 'Bentang Pustaka',          books: 142, city: 'Yogyakarta', founded: 1996 },
  { id: 'noura',    name: 'Noura Books',              books: 96,  city: 'Jakarta', founded: 2011 },
];

// Cover palettes — Emerald + Brass (modern premium)
const COVER_PALETTES = [
  { bg: '#14201B', ink: '#F2F0EA', accent: '#34C690' },  // ink + emerald
  { bg: '#1F9D73', ink: '#08120D', accent: '#08120D' },  // emerald
  { bg: '#F2F0EA', ink: '#14201B', accent: '#1F9D73' },  // light + emerald
  { bg: '#0E1311', ink: '#34C690', accent: '#D2A653' },  // black + emerald/brass
  { bg: '#B0822F', ink: '#0E1311', accent: '#0E1311' },  // brass
  { bg: '#E7E4D9', ink: '#15795A', accent: '#B0822F' },  // sand + emerald
  { bg: '#15543F', ink: '#EAF6F0', accent: '#D2A653' },  // deep emerald + brass
  { bg: '#243831', ink: '#D2A653', accent: '#34C690' },  // slate green + brass
];

const BOOKS = [
  { id:'b001', title:'Bumi Manusia', author:'Pramoedya Ananta Toer', authorId:'pramoedya', publisher:'gpu', category:'fiksi', year:2005, pages:535, isbn:'978-979-9731-23-1', rack:'F.PAT.001', copies:4, available:2, palette:0, rating:4.8, popularity:98, new:false, tags:['Sastra Indonesia','Tetralogi Buru','Klasik'], synopsis:'Kisah Minke, pribumi terdidik di akhir abad ke-19 yang bergulat dengan ketidakadilan kolonial, cinta yang dilarang, dan kesadaran akan identitas bangsa. Sebuah mahakarya yang mengukuhkan posisi Pramoedya sebagai salah satu raksasa sastra dunia.' },
  { id:'b002', title:'Laskar Pelangi', author:'Andrea Hirata', authorId:'andrea', publisher:'bentang', category:'fiksi', year:2005, pages:529, isbn:'978-979-3062-79-2', rack:'F.HIR.003', copies:6, available:1, palette:2, rating:4.7, popularity:96, new:false, tags:['Belitung','Pendidikan','Persahabatan'], synopsis:'Sepuluh anak Belitung bertahan di sekolah Muhammadiyah yang nyaris roboh. Mimpi-mimpi mereka bertumbuh di tengah kemiskinan, ditemani guru-guru yang lebih kaya hati daripada timah di pulau mereka.' },
  { id:'b003', title:'Filosofi Teras', author:'Henry Manampiring', authorId:'henry', publisher:'kpg', category:'sosial', year:2019, pages:320, isbn:'978-602-481-518-5', rack:'S.MAN.018', copies:5, available:0, palette:4, rating:4.6, popularity:94, new:false, tags:['Stoikisme','Filsafat','Pengembangan Diri'], synopsis:'Pengantar ramah ke filsafat Stoik untuk pembaca Indonesia. Manampiring menerjemahkan ajaran Epictetus, Seneca, dan Marcus Aurelius ke dalam persoalan sehari-hari: kecemasan, marah, hubungan, hingga media sosial.' },
  { id:'b004', title:'Sapiens: Riwayat Singkat Umat Manusia', author:'Yuval Noah Harari', authorId:'harari', publisher:'kpg', category:'sejarah', year:2017, pages:528, isbn:'978-602-424-263-0', rack:'H.HAR.007', copies:4, available:2, palette:1, rating:4.5, popularity:91, new:false, tags:['Sejarah','Antropologi','Sains Populer'], synopsis:'Bagaimana sekelompok primata yang tidak istimewa di savana Afrika berubah menjadi penguasa planet ini? Harari menelusuri tiga revolusi—kognitif, agraria, dan ilmiah—yang membentuk siapa kita hari ini.' },
  { id:'b005', title:'Bicara itu Ada Seninya', author:'Oh Su Hyang', authorId:'ohsuhyang', publisher:'bentang', category:'sosial', year:2018, pages:240, isbn:'978-602-291-563-3', rack:'S.OHS.022', copies:3, available:3, palette:5, rating:4.3, popularity:82, new:false, tags:['Komunikasi','Self Help'], synopsis:'Pakar komunikasi Korea Selatan membagikan teknik berbicara yang membuat lawan bicara merasa dihargai—dari intonasi, jeda, hingga seni mendengarkan.' },
  { id:'b006', title:'Atomic Habits', author:'James Clear', authorId:'clear', publisher:'gpu', category:'sosial', year:2019, pages:340, isbn:'978-602-06-3317-6', rack:'S.CLE.041', copies:7, available:3, palette:3, rating:4.8, popularity:99, new:false, tags:['Kebiasaan','Produktivitas'], synopsis:'Perubahan 1% setiap hari menghasilkan transformasi yang besar. James Clear menyajikan kerangka empat hukum untuk membentuk kebiasaan baik dan menghapus yang buruk.' },
  { id:'b007', title:'Sejarah Tuhan', author:'Karen Armstrong', authorId:'armstrong', publisher:'mizan', category:'religi', year:2014, pages:712, isbn:'978-979-433-833-9', rack:'R.ARM.009', copies:2, available:1, palette:7, rating:4.4, popularity:74, new:false, tags:['Teologi','Sejarah Agama'], synopsis:'Empat ribu tahun pencarian Tuhan dalam tradisi Yahudi, Kristen, dan Islam. Armstrong menelusuri bagaimana gagasan tentang Yang Ilahi berubah seiring zaman.' },
  { id:'b008', title:'Pulang', author:'Leila S. Chudori', authorId:'leila', publisher:'kpg', category:'fiksi', year:2012, pages:464, isbn:'978-979-91-0515-8', rack:'F.CHU.014', copies:3, available:2, palette:0, rating:4.6, popularity:85, new:false, tags:['Sejarah','1965','Paris'], synopsis:'Empat eksil politik mendirikan restoran Tanah Air di Paris. Tiga dekade kemudian, anak mereka kembali ke Indonesia mencari tanah yang tak pernah dijejaknya.' },
  { id:'b009', title:'Aroma Karsa', author:'Dee Lestari', authorId:'dee', publisher:'bentang', category:'fiksi', year:2018, pages:710, isbn:'978-602-291-463-6', rack:'F.LES.005', copies:4, available:0, palette:2, rating:4.5, popularity:88, new:false, tags:['Realisme Magis','Botani'], synopsis:'Jati Wesi, lelaki dengan penciuman ajaib, ditugaskan mencari Puspa Karsa—bunga legendaris yang konon dapat menguasai kehendak manusia. Sebuah petualangan sensorik dari Bantar Gebang hingga lereng Lawu.' },
  { id:'b010', title:'Cantik Itu Luka', author:'Eka Kurniawan', authorId:'eka', publisher:'gpu', category:'fiksi', year:2014, pages:520, isbn:'978-602-03-0411-3', rack:'F.KUR.011', copies:3, available:1, palette:6, rating:4.4, popularity:79, new:false, tags:['Realisme Magis','Halimunda'], synopsis:'Dewi Ayu, pelacur tercantik di Halimunda, bangkit dari kubur dua puluh satu tahun setelah kematiannya. Saga lintas generasi yang menggabungkan mitos, kekerasan, dan komedi gelap.' },
  { id:'b011', title:'A Brief History of Time', author:'Stephen Hawking', authorId:'hawking', publisher:'kpg', category:'sains', year:2016, pages:256, isbn:'978-602-424-159-6', rack:'N.HAW.001', copies:2, available:1, palette:1, rating:4.5, popularity:81, new:false, tags:['Fisika','Kosmologi'], synopsis:'Dari Big Bang hingga lubang hitam—Hawking mengajak pembaca awam memahami struktur ruang-waktu dan pencarian Teori Segalanya.' },
  { id:'b012', title:'Tenggelamnya Kapal Van der Wijck', author:'Hamka', authorId:'hamka', publisher:'bpk', category:'fiksi', year:2017, pages:224, isbn:'978-979-418-055-6', rack:'F.HAM.002', copies:3, available:2, palette:3, rating:4.6, popularity:78, new:false, tags:['Klasik','Minangkabau'], synopsis:'Cinta Zainuddin dan Hayati terhempas oleh adat dan harta. Roman klasik Hamka tentang harga diri dan luka yang dibawa hingga ke seberang lautan.' },
  { id:'b013', title:'Madilog', author:'Tan Malaka', authorId:'tan', publisher:'kpg', category:'sosial', year:2014, pages:568, isbn:'978-602-9402-25-8', rack:'S.MAL.003', copies:1, available:1, palette:0, rating:4.5, popularity:70, new:false, tags:['Filsafat','Materialisme'], synopsis:'Materialisme, Dialektika, dan Logika—kerangka berpikir yang ditulis Tan Malaka di persembunyian, sebagai usaha membebaskan pikiran rakyat dari mistik dan feodalisme.' },
  { id:'b014', title:'Ronggeng Dukuh Paruk', author:'Ahmad Tohari', authorId:'tohari', publisher:'gpu', category:'fiksi', year:2011, pages:408, isbn:'978-979-22-7728-9', rack:'F.TOH.006', copies:2, available:2, palette:5, rating:4.5, popularity:73, new:false, tags:['Klasik','Pedesaan'], synopsis:'Srintil, gadis kecil yang dipercaya sebagai titisan ronggeng terakhir Dukuh Paruk, terseret arus sejarah 1965 yang melumat desanya.' },
  { id:'b015', title:'Hujan', author:'Tere Liye', authorId:'tere', publisher:'gpu', category:'fiksi', year:2016, pages:320, isbn:'978-602-03-2478-4', rack:'F.LIY.019', copies:5, available:0, palette:1, rating:4.2, popularity:84, new:false, tags:['Distopia','Remaja'], synopsis:'Tahun 2050. Lail dan Esok bertemu setelah bencana letusan gunung yang mengubah iklim bumi. Sebuah kisah cinta dan kehilangan di tengah dunia yang sekarat.' },
  { id:'b016', title:'Selamat Tinggal', author:'Tere Liye', authorId:'tere', publisher:'gpu', category:'fiksi', year:2020, pages:360, isbn:'978-623-216-321-8', rack:'F.LIY.020', copies:4, available:2, palette:4, rating:4.1, popularity:71, new:true, tags:['Sosial','Pembajakan'], synopsis:'Sintong, mahasiswa abadi yang menjaga toko buku bajakan milik pamannya, dipaksa berhadapan dengan idealisme yang dulu ia banggakan.' },
  { id:'b017', title:'Iman, Ilmu, Amal', author:'Romo Mangunwijaya', authorId:'mangun', publisher:'kanisius', category:'religi', year:2019, pages:248, isbn:'978-979-21-6018-2', rack:'R.MAN.012', copies:2, available:2, palette:7, rating:4.6, popularity:62, new:false, tags:['Katolik','Refleksi'], synopsis:'Kumpulan refleksi Romo Mangun tentang iman yang berakar pada akal dan diwujudkan dalam karya nyata bagi sesama, terutama yang terpinggirkan.' },
  { id:'b018', title:'Burung-Burung Manyar', author:'Y.B. Mangunwijaya', authorId:'mangun', publisher:'kpg', category:'fiksi', year:2010, pages:344, isbn:'978-979-91-0264-5', rack:'F.MAN.008', copies:2, available:1, palette:2, rating:4.5, popularity:68, new:false, tags:['Klasik','Revolusi'], synopsis:'Setadewa, perwira KNIL, dan Larasati, gadis republiken—dua sisi revolusi Indonesia bertemu, berpisah, dan saling mencari di lipatan-lipatan sejarah.' },
  { id:'b019', title:'Tetralogi Pulau Buru: Anak Semua Bangsa', author:'Pramoedya Ananta Toer', authorId:'pramoedya', publisher:'gpu', category:'fiksi', year:2006, pages:540, isbn:'978-979-9731-24-8', rack:'F.PAT.002', copies:3, available:1, palette:3, rating:4.8, popularity:87, new:false, tags:['Sastra','Tetralogi Buru'], synopsis:'Lanjutan kisah Minke. Ia mulai melihat bahwa perjuangannya tidak lagi pribadi—ia adalah anak dari semua bangsa yang tertindas.' },
  { id:'b020', title:'Origin', author:'Dan Brown', authorId:'brown', publisher:'bentang', category:'fiksi', year:2018, pages:632, isbn:'978-602-291-489-6', rack:'F.BRO.024', copies:3, available:0, palette:1, rating:4.2, popularity:80, new:false, tags:['Thriller','Sains'], synopsis:'Robert Langdon kembali. Di Museum Guggenheim Bilbao, sebuah penemuan futurolog miliarder mengguncang dunia agama dan sains—sebelum pengumumannya terhenti oleh tembakan.' },
  { id:'b021', title:'Tuhan Maha Asyik', author:'Sujiwo Tejo & MN Kamba', authorId:'sujiwo', publisher:'noura', category:'religi', year:2017, pages:288, isbn:'978-602-385-184-8', rack:'R.TEJ.014', copies:2, available:2, palette:5, rating:4.3, popularity:64, new:false, tags:['Spiritualitas','Dialog'], synopsis:'Percakapan jenaka dan dalam antara dalang nyentrik dan dosen filsafat agama tentang Tuhan yang ramah dan tidak menakutkan.' },
  { id:'b022', title:'Negeri 5 Menara', author:'Ahmad Fuadi', authorId:'fuadi', publisher:'gpu', category:'fiksi', year:2009, pages:424, isbn:'978-979-22-4861-6', rack:'F.FUA.015', copies:4, available:2, palette:6, rating:4.5, popularity:83, new:false, tags:['Pesantren','Mimpi'], synopsis:'Mantra "man jadda wajada" mengubah enam santri Pondok Madani. Tahun-tahun mereka di Gontor menjadi fondasi untuk menggapai menara di lima benua.' },
  { id:'b023', title:'Anak Bajang Menggiring Angin', author:'Sindhunata', authorId:'sindhu', publisher:'kanisius', category:'fiksi', year:2018, pages:312, isbn:'978-979-21-5667-3', rack:'F.SIN.026', copies:2, available:2, palette:7, rating:4.7, popularity:60, new:false, tags:['Wayang','Reflektif'], synopsis:'Penceritaan ulang epos Ramayana dari sudut pandang yang lebih hening, lebih sunyi—di mana cinta dan kehilangan diukur oleh angin yang digiring sepasang anak bajang.' },
  { id:'b024', title:'Critical Thinking', author:'Tom Chatfield', authorId:'chatfield', publisher:'erlangga', category:'pelajaran', year:2021, pages:280, isbn:'978-623-266-872-3', rack:'P.CHA.033', copies:6, available:4, palette:0, rating:4.4, popularity:69, new:true, tags:['Berpikir Kritis','Akademik'], synopsis:'Panduan praktis berpikir kritis untuk pelajar—mengenali bias, mengevaluasi argumen, dan menulis dengan jernih.' },
  { id:'b025', title:'Matematika Diskrit', author:'Rinaldi Munir', authorId:'rinaldi', publisher:'erlangga', category:'pelajaran', year:2021, pages:512, isbn:'978-623-266-441-1', rack:'P.MUN.001', copies:5, available:3, palette:2, rating:4.3, popularity:55, new:false, tags:['Matematika','Informatika'], synopsis:'Buku ajar matematika diskrit untuk siswa SMA dan mahasiswa: logika, himpunan, relasi, graf, kombinatorika.' },
  { id:'b026', title:'Pelajaran Mengarang', author:'Seno Gumira Ajidarma', authorId:'seno', publisher:'kpg', category:'fiksi', year:2014, pages:184, isbn:'978-602-9402-12-8', rack:'F.SEN.030', copies:2, available:2, palette:4, rating:4.4, popularity:58, new:false, tags:['Cerpen','Sastra'], synopsis:'Kumpulan cerpen Seno yang singkat namun menusuk—tentang anak-anak yang dipaksa mengarang kebahagiaan yang tidak pernah mereka miliki.' },
  { id:'b027', title:'Educated', author:'Tara Westover', authorId:'tara', publisher:'gpu', category:'sejarah', year:2020, pages:464, isbn:'978-623-03-0078-6', rack:'H.WES.018', copies:3, available:1, palette:1, rating:4.7, popularity:77, new:true, tags:['Memoar','Pendidikan'], synopsis:'Memoar Tara Westover yang tumbuh di keluarga survivalist Idaho tanpa pernah masuk sekolah—hingga ia melangkah ke Cambridge dan Harvard.' },
  { id:'b028', title:'Beyond Order', author:'Jordan B. Peterson', authorId:'peterson', publisher:'gpu', category:'sosial', year:2021, pages:432, isbn:'978-623-03-1832-3', rack:'S.PET.052', copies:2, available:0, palette:7, rating:4.2, popularity:66, new:true, tags:['Self Help','Filsafat'], synopsis:'Dua belas aturan lagi untuk kehidupan—lanjutan dari 12 Rules for Life. Peterson menulis dari sisi yang berlawanan: ketika kita sudah terlalu rapi, terlalu teratur.' },
  { id:'b029', title:'Sapardi Djoko Damono: Hujan Bulan Juni', author:'Sapardi Djoko Damono', authorId:'sapardi', publisher:'gpu', category:'fiksi', year:2017, pages:152, isbn:'978-602-03-3859-0', rack:'F.SAP.040', copies:5, available:3, palette:6, rating:4.8, popularity:90, new:false, tags:['Puisi'], synopsis:'Antologi puisi Sapardi yang paling lirih—tentang hujan, kesabaran, dan cinta yang tak harus diucapkan.' },
  { id:'b030', title:'Ekonomi untuk SMA', author:'Sri Nur Mulyati', authorId:'srinur', publisher:'erlangga', category:'pelajaran', year:2022, pages:328, isbn:'978-623-266-501-2', rack:'P.MUL.011', copies:8, available:5, palette:5, rating:4.0, popularity:48, new:true, tags:['SMA','Ekonomi'], synopsis:'Buku pelajaran ekonomi kelas XI dengan studi kasus Indonesia kontemporer.' },
  { id:'b031', title:'Komet Minor', author:'Tere Liye', authorId:'tere', publisher:'gpu', category:'fiksi', year:2018, pages:376, isbn:'978-602-03-2479-1', rack:'F.LIY.021', copies:4, available:1, palette:0, rating:4.3, popularity:75, new:false, tags:['Fantasi','Serial Bumi'], synopsis:'Petualangan Raib, Seli, dan Ali di Klan Komet Minor—mencari objek terakhir sebelum dunia paralel meledak.' },
  { id:'b032', title:'Saksi Mata', author:'Suparto Brata', authorId:'suparto', publisher:'kpg', category:'fiksi', year:2013, pages:496, isbn:'978-979-91-0398-7', rack:'F.BRA.027', copies:2, available:2, palette:3, rating:4.4, popularity:50, new:false, tags:['Sejarah','Surabaya'], synopsis:'Surabaya 1945. Seorang anak menyaksikan revolusi melalui mata yang belum sepenuhnya mengerti, namun mencatat segalanya.' },
];

const AUTHORS = [
  { id:'pramoedya', name:'Pramoedya Ananta Toer', born:1925, died:2006, country:'Indonesia', works:21, bio:'Sastrawan Indonesia paling berpengaruh abad ke-20. Karyanya, terutama Tetralogi Buru, ditulis sebagian besar selama pemenjaraannya di Pulau Buru dan diterjemahkan ke lebih dari 40 bahasa.', palette:0, era:'Modern' },
  { id:'andrea',    name:'Andrea Hirata',         born:1967, died:null, country:'Indonesia', works:11, bio:'Penulis kelahiran Belitung. Laskar Pelangi menjadi novel Indonesia terlaris di abad 21 dan diterjemahkan ke lebih dari 30 bahasa.', palette:2, era:'Kontemporer' },
  { id:'dee',       name:'Dee Lestari',           born:1976, died:null, country:'Indonesia', works:14, bio:'Penulis dan penyanyi. Dikenal melalui serial Supernova dan novel Aroma Karsa. Karyanya memadukan sains, mistisisme, dan filsafat.', palette:1, era:'Kontemporer' },
  { id:'eka',       name:'Eka Kurniawan',         born:1975, died:null, country:'Indonesia', works:8,  bio:'Penulis Indonesia kontemporer yang sering dibandingkan dengan García Márquez. Cantik Itu Luka membawanya menjadi finalis Man Booker International Prize.', palette:6, era:'Kontemporer' },
  { id:'leila',     name:'Leila S. Chudori',      born:1962, died:null, country:'Indonesia', works:7,  bio:'Jurnalis dan novelis. Karyanya, Pulang dan Laut Bercerita, mengangkat luka sejarah Indonesia 1965 dan 1998.', palette:0, era:'Kontemporer' },
  { id:'tohari',    name:'Ahmad Tohari',          born:1948, died:null, country:'Indonesia', works:10, bio:'Penulis dari Banyumas. Trilogi Ronggeng Dukuh Paruk menjadi salah satu karya kanon sastra Indonesia.', palette:5, era:'Modern' },
  { id:'hamka',     name:'Hamka (Haji Abdul Malik Karim Amrullah)', born:1908, died:1981, country:'Indonesia', works:80, bio:'Ulama, sastrawan, dan filsuf. Karyanya menjembatani sastra klasik Minangkabau dengan pemikiran Islam modern.', palette:3, era:'Klasik' },
  { id:'mangun',    name:'Y.B. Mangunwijaya',     born:1929, died:1999, country:'Indonesia', works:33, bio:'Romo, arsitek, dan budayawan. Burung-Burung Manyar memenangkan SEA Write Award 1983.', palette:7, era:'Modern' },
  { id:'sapardi',   name:'Sapardi Djoko Damono',  born:1940, died:2020, country:'Indonesia', works:25, bio:'Penyair lirik paling tenang dan paling dicintai. Puisinya hidup di kartu pos, lagu, dan layar bioskop.', palette:6, era:'Modern' },
  { id:'tan',       name:'Tan Malaka',            born:1897, died:1949, country:'Indonesia', works:27, bio:'Pemikir revolusioner dan pendiri PARI. Madilog adalah upaya membebaskan pikiran rakyat dari mistik dan feodalisme.', palette:0, era:'Klasik' },
  { id:'tere',      name:'Tere Liye',             born:1979, died:null, country:'Indonesia', works:50, bio:'Penulis prolifik dengan pembaca remaja dan dewasa muda terbesar di Indonesia.', palette:1, era:'Kontemporer' },
  { id:'fuadi',     name:'Ahmad Fuadi',           born:1972, died:null, country:'Indonesia', works:6,  bio:'Wartawan dan novelis. Trilogi Negeri 5 Menara mengangkat dunia pesantren ke pembaca arus utama.', palette:6, era:'Kontemporer' },
  { id:'seno',      name:'Seno Gumira Ajidarma',  born:1958, died:null, country:'Indonesia', works:30, bio:'Cerpenis, esais, dan jurnalis. Ketika jurnalisme dibungkam, sastra harus bicara—begitu prinsipnya.', palette:4, era:'Kontemporer' },
  { id:'sindhu',    name:'Sindhunata',            born:1952, died:null, country:'Indonesia', works:18, bio:'Romo, jurnalis, dan budayawan. Karyanya menafsir ulang epos Jawa dengan kesadaran teologis.', palette:7, era:'Kontemporer' },
  { id:'harari',    name:'Yuval Noah Harari',     born:1976, died:null, country:'Israel',     works:5,  bio:'Sejarawan Universitas Hebrew Yerusalem. Trilogi Sapiens-Homo Deus-21 Lessons menjadi fenomena global.', palette:1, era:'Kontemporer' },
  { id:'clear',     name:'James Clear',           born:1986, died:null, country:'Amerika Serikat', works:1, bio:'Penulis dan pembicara tentang kebiasaan, pengambilan keputusan, dan peningkatan berkelanjutan.', palette:3, era:'Kontemporer' },
  { id:'hawking',   name:'Stephen Hawking',       born:1942, died:2018, country:'Inggris', works:15, bio:'Fisikawan teoretis. Karyanya pada lubang hitam dan kosmologi mengubah pemahaman kita tentang alam semesta.', palette:1, era:'Modern' },
  { id:'armstrong', name:'Karen Armstrong',       born:1944, died:null, country:'Inggris', works:25, bio:'Sejarawan agama. Mantan biarawati Katolik yang menulis tentang sejarah komparatif tradisi monoteistik.', palette:7, era:'Kontemporer' },
  { id:'henry',     name:'Henry Manampiring',     born:1973, died:null, country:'Indonesia', works:4,  bio:'Praktisi periklanan dan penulis. Filosofi Teras menjadi pintu masuk populer ke filsafat Stoik di Indonesia.', palette:4, era:'Kontemporer' },
  { id:'ohsuhyang', name:'Oh Su Hyang',           born:1973, died:null, country:'Korea Selatan', works:6, bio:'Profesor komunikasi dan presenter televisi Korea. Buku-bukunya tentang seni berbicara menjadi bestseller di Asia.', palette:5, era:'Kontemporer' },
  { id:'brown',     name:'Dan Brown',             born:1964, died:null, country:'Amerika Serikat', works:7, bio:'Novelis thriller. Serial Robert Langdon memadukan sejarah seni, simbologi, dan teori konspirasi.', palette:1, era:'Kontemporer' },
  { id:'sujiwo',    name:'Sujiwo Tejo',           born:1962, died:null, country:'Indonesia', works:12, bio:'Dalang, pelukis, dan budayawan. Karyanya menyatukan tradisi wayang dengan jurnalisme dan filsafat.', palette:5, era:'Kontemporer' },
  { id:'westover',  name:'Tara Westover',         born:1986, died:null, country:'Amerika Serikat', works:1, bio:'Sejarawan dan memoar. Educated memenangkan Goodreads Choice Award 2018.', palette:1, era:'Kontemporer' },
  { id:'peterson',  name:'Jordan B. Peterson',    born:1962, died:null, country:'Kanada',     works:3,  bio:'Psikolog klinis dan profesor di Universitas Toronto. 12 Rules for Life menjadi fenomena internasional.', palette:7, era:'Kontemporer' },
  { id:'chatfield', name:'Tom Chatfield',         born:1980, died:null, country:'Inggris', works:9, bio:'Filsuf teknologi dan penulis. Menulis tentang berpikir kritis, AI, dan budaya digital.', palette:0, era:'Kontemporer' },
  { id:'rinaldi',   name:'Rinaldi Munir',         born:1966, died:null, country:'Indonesia', works:12, bio:'Dosen Informatika ITB. Buku ajarnya menjadi rujukan utama di banyak universitas Indonesia.', palette:2, era:'Kontemporer' },
  { id:'srinur',    name:'Sri Nur Mulyati',       born:1965, died:null, country:'Indonesia', works:8,  bio:'Pengajar ekonomi senior. Buku-buku ajarnya digunakan di SMA seluruh Indonesia.', palette:5, era:'Kontemporer' },
  { id:'suparto',   name:'Suparto Brata',         born:1932, died:2015, country:'Indonesia', works:32, bio:'Sastrawan Surabaya. Novel-novelnya dalam bahasa Jawa dan Indonesia merekam abad ke-20 dari pinggir.', palette:3, era:'Modern' },
];

const NEWS = [
  { id:'n01', title:'Perpustakaan Santo Lukas Menambah Koleksi 480 Judul Baru di Awal Semester', date:'2026-05-18', category:'Pengumuman', author:'Tim Perpustakaan', minutes:3, excerpt:'Sebanyak 480 judul buku baru—dari sastra Indonesia kontemporer hingga buku referensi sains—siap dipinjam mulai pekan depan.', palette:0, body:'Akhir pekan ini, tim kurasi perpustakaan menyelesaikan proses katalogisasi atas 480 judul baru yang merupakan pengadaan semester genap 2025/2026. Koleksi ini mencakup sastra Indonesia kontemporer (Eka Kurniawan, Leila S. Chudori, Faisal Oddang), terjemahan klasik dunia, serta buku-buku referensi sains untuk persiapan olimpiade. Kami juga melengkapi rak Ilmu Sosial dengan judul-judul terkini tentang etika digital dan literasi media.' },
  { id:'n02', title:'Klub Baca "Selasa Sastra" Bulan Mei: Membedah Bumi Manusia', date:'2026-05-12', category:'Acara', author:'Ibu Margareta', minutes:2, excerpt:'Klub Baca "Selasa Sastra" akan mendiskusikan Bumi Manusia karya Pramoedya pada 21 Mei pukul 15.30 di Ruang Baca Utama.', palette:1, body:'Klub Baca rutin "Selasa Sastra" memasuki bulan kelima. Diskusi kali ini akan dipandu oleh Bapak Wahyu (guru Bahasa Indonesia SMA) dengan tema "Pramoedya dan Pembentukan Kesadaran Modern". Terbuka untuk siswa SMP dan SMA Yayasan Santo Lukas. Pendaftaran melalui resepsionis perpustakaan atau formulir daring.' },
  { id:'n03', title:'Lomba Resensi Buku Tingkat SMP-SMA Diumumkan untuk Hari Pendidikan Nasional', date:'2026-05-02', category:'Kompetisi', author:'OSIS Yayasan', minutes:4, excerpt:'Hadiah utama berupa voucher buku Rp1.000.000 dan hak baca eksklusif koleksi langka selama satu semester.', palette:2, body:'Dalam rangka Hari Pendidikan Nasional, OSIS bekerja sama dengan Perpustakaan menyelenggarakan Lomba Resensi Buku 2026. Tema tahun ini adalah "Buku yang Mengubah Cara Saya Melihat Dunia". Naskah diterima sampai 30 Mei 2026.' },
  { id:'n04', title:'Pelatihan Literasi Digital untuk Siswa Kelas X dan XI', date:'2026-04-24', category:'Edukasi', author:'Dr. Hendra (Pustakawan)', minutes:3, excerpt:'Tiga sesi workshop akan mengajarkan cara mengenali sumber tepercaya, mengutip akademis, dan menghindari plagiasi.', palette:3, body:'Tiga sesi workshop literasi digital dijadwalkan pada 26-28 April. Materi mencakup evaluasi sumber daring, penulisan kutipan menggunakan format APA, dan mengenali bias media. Sesi ditutup dengan sertifikasi internal sekolah.' },
  { id:'n05', title:'Koleksi Langka: Cetakan Pertama Negarakertagama Kini Dapat Diakses', date:'2026-04-10', category:'Koleksi', author:'Tim Kurasi', minutes:2, excerpt:'Cetakan reproduksi Negarakertagama (1979) dari penerbit Bratayuda menjadi koleksi langka terbaru di rak khusus.', palette:5, body:'Setelah proses restorasi tiga bulan, cetakan reproduksi Negarakertagama edisi 1979 resmi masuk ke koleksi langka. Akses bersifat baca-di-tempat dengan pendampingan pustakawan.' },
  { id:'n06', title:'Pertukaran Perpustakaan dengan Sekolah Mitra di Yogyakarta', date:'2026-03-28', category:'Kemitraan', author:'Yayasan', minutes:2, excerpt:'Program saling pinjam koleksi langka dengan dua sekolah Katolik di Yogyakarta dimulai semester ini.', palette:6, body:'Memorandum kerja sama dengan SMA Kolese De Britto dan SMA Stella Duce I Yogyakarta resmi ditandatangani. Siswa dapat mengakses katalog mitra dan mengajukan permintaan pinjam jarak jauh untuk koleksi tertentu.' },
];

const RESOURCES = [
  { id:'r01', title:'JSTOR — Jurnal Akademik',         type:'Jurnal',  format:'Eksternal', desc:'Akses ribuan jurnal akademik bidang humaniora, sosial, dan sains. Login menggunakan kredensial sekolah.', tag:'Referensi', palette:0 },
  { id:'r02', title:'Perpustakaan Nasional RI',         type:'E-Book',  format:'Web',       desc:'Koleksi nasional digital — termasuk naskah Nusantara, koran lama, dan e-book Indonesia.', tag:'Indonesia', palette:1 },
  { id:'r03', title:'Khan Academy Bahasa Indonesia',    type:'Kursus',  format:'Web',       desc:'Materi belajar daring untuk SMP-SMA: matematika, sains, ekonomi, dengan bahasa Indonesia.', tag:'Pelajaran', palette:3 },
  { id:'r04', title:'Project Gutenberg',                type:'E-Book',  format:'Web',       desc:'70.000+ buku klasik dunia berbahasa Inggris yang sudah berstatus public domain.', tag:'Klasik Dunia', palette:7 },
  { id:'r05', title:'Indonesia Heritage Society Library', type:'Riset', format:'Eksternal', desc:'Sumber riset sejarah dan budaya Indonesia untuk pelajar tingkat lanjut.', tag:'Sejarah', palette:5 },
  { id:'r06', title:'Britannica School',                type:'Ensiklopedi', format:'Eksternal', desc:'Ensiklopedi akademik yang disesuaikan untuk tiga jenjang: SD, SMP, SMA.', tag:'Referensi', palette:2 },
  { id:'r07', title:'TED-Ed',                            type:'Video',  format:'Web',       desc:'Video pendek edukatif yang dikurasi sesuai mata pelajaran.', tag:'Multimedia', palette:6 },
  { id:'r08', title:'OpenStax Textbooks',                type:'E-Book', format:'Web',       desc:'Buku teks terbuka untuk pelajaran sains dan ilmu sosial tingkat menengah-atas.', tag:'Pelajaran', palette:4 },
];

const STATS = [
  { id:'koleksi',  label:'Total Koleksi',   value:12480, suffix:'',   note:'Per Mei 2026' },
  { id:'judul',    label:'Judul Unik',      value:6234,  suffix:'',   note:'Termasuk koleksi langka' },
  { id:'anggota',  label:'Anggota Aktif',   value:1856,  suffix:'',   note:'Siswa SD-SMA + guru' },
  { id:'pinjam',   label:'Peminjaman / Bulan', value:3214, suffix:'', note:'Rata-rata 2025/2026' },
];

const ORG = [
  { name:'Romo Antonius Yulianto, Pr.', role:'Pembina Yayasan', layer:0, palette:0 },
  { name:'Dr. Maria Sutanto, M.Pd.',    role:'Ketua Yayasan',   layer:1, palette:1 },
  { name:'Bapak Yohanes Pramono, S.Si., M.Pd.', role:'Kepala Perpustakaan', layer:2, palette:2 },
  { name:'Ibu Margareta Dewi, S.I.Pust.',       role:'Pustakawan Senior',    layer:3, palette:5 },
  { name:'Dr. Hendra Wijaya',                   role:'Spesialis Literasi Digital', layer:3, palette:3 },
  { name:'Bapak Wahyu Setiawan, S.Pd.',         role:'Koordinator Klub Baca', layer:3, palette:6 },
  { name:'Ibu Rina Halim',                       role:'Layanan Sirkulasi & Anggota', layer:3, palette:4 },
];

const MY_LOANS = [
  { id:'l01', bookId:'b006', borrowedOn:'2026-05-12', dueOn:'2026-05-26', status:'Sedang dipinjam' },
  { id:'l02', bookId:'b029', borrowedOn:'2026-05-08', dueOn:'2026-05-22', status:'Terlambat 3 hari' },
  { id:'l03', bookId:'b001', borrowedOn:'2026-04-21', dueOn:'2026-05-05', status:'Dikembalikan' },
  { id:'l04', bookId:'b008', borrowedOn:'2026-04-12', dueOn:'2026-04-26', status:'Dikembalikan' },
];

const MY_WISHLIST = ['b009','b015','b020','b027','b011'];

// ── Ulasan & testimoni ──
const REVIEW_POOL = [
  { name:'Nadia P.', role:'Siswa XI IPA', rating:5, text:'Buku ini bikin aku begadang dua malam. Sudut pandang tokohnya terasa sangat hidup dan dekat dengan keseharian.' },
  { name:'Bpk. Wahyu', role:'Guru Bahasa Indonesia', rating:5, text:'Salah satu rujukan wajib untuk memahami konteks sosial zamannya. Sangat saya rekomendasikan untuk tugas resensi.' },
  { name:'Raka S.', role:'Siswa XII IPS', rating:4, text:'Awalnya berat, tapi setelah bab ketiga jadi susah berhenti. Bahasanya indah tanpa berlebihan.' },
  { name:'Citra M.', role:'Siswa X', rating:5, text:'Aku pinjam karena tugas, malah jatuh cinta. Langsung cari karya lain dari penulis yang sama.' },
  { name:'Ibu Margareta', role:'Pustakawan', rating:5, text:'Eksemplar kami sering ludes menjelang ujian. Layak masuk daftar baca setiap jenjang.' },
  { name:'Devan A.', role:'Siswa XI IPS', rating:4, text:'Plotnya rapi dan endingnya tak terduga. Cocok buat yang baru mulai suka membaca.' },
  { name:'Olive R.', role:'Alumni 2023', rating:5, text:'Masih saya ingat sampai sekarang. Buku yang membentuk cara saya memandang sejarah.' },
];
function reviewsFor(book) {
  const seed = parseInt(book.id.slice(-3), 10);
  const n = 2 + (seed % 2);
  const out = [];
  for (let i = 0; i < n; i++) out.push(REVIEW_POOL[(seed + i * 3) % REVIEW_POOL.length]);
  return out;
}
// rating distribution (deterministic) for a book
function ratingBars(book) {
  const seed = parseInt(book.id.slice(-3), 10);
  const top = 50 + (seed % 30);
  const second = 20 + (seed % 15);
  const third = Math.max(4, 100 - top - second - 6 - 2);
  return [top, second, third, 6, 2];
}

const TESTIMONIALS = [
  { name:'Nadia Putri', role:'Siswa Kelas XI IPA 2', text:'Perpustakaan ini jadi tempat favoritku. Katalog daringnya bikin nyari buku gampang banget, tinggal reservasi dari HP.', palette:0 },
  { name:'Bpk. Yohanes', role:'Wali Kelas X', text:'Sebagai guru, saya terbantu sekali. Murid bisa diarahkan ke sumber tepercaya, dan pustakawannya responsif.', palette:6 },
  { name:'Raka Saputra', role:'Siswa Kelas XII', text:'Dulu malas baca. Sejak ikut klub baca di sini, sekarang target 1 buku per minggu. Koleksinya lengkap.', palette:1 },
  { name:'Citra Maharani', role:'Alumni Angkatan 2024', text:'Sudah lulus pun masih sering balik. Suasananya tenang, dan koleksi sastranya benar-benar terkurasi.', palette:3 },
];

const HOURS = [
  { day:'Senin – Jumat', time:'06.30 – 16.00' },
  { day:'Sabtu',         time:'07.00 – 12.00' },
  { day:'Minggu & Libur Nasional', time:'Tutup' },
];

const CONTACT = {
  address: 'Jalan Pademangan II Gang 7 No. 54, Kelurahan Pademangan Timur, Kecamatan Pademangan, Kota Jakarta Utara, DKI Jakarta 14410',
  email:   'santo.lukas@yahoo.co.id',
  phone:   '021-6507574',
  ig:      '@yayasansantolukas',
};

// helper
function bookById(id){ return BOOKS.find(b => b.id === id); }
function authorById(id){ return AUTHORS.find(a => a.id === id); }
function publisherById(id){ return PUBLISHERS.find(p => p.id === id); }
function categoryById(id){ return CATEGORIES.find(c => c.id === id); }

// ── Augment books: collection type + attachments (deterministic) ──
BOOKS.forEach((b, i) => {
  const seed = parseInt(b.id.slice(-3), 10);
  const types = ['fisik', 'digital', 'keduanya'];
  // bias: pelajaran/referensi more digital, fiksi mixed
  b.type = types[(seed + i) % 3];
  const allAtt = ['pdf', 'audio', 'video', 'image'];
  if (b.type === 'fisik') {
    b.attachments = [];
  } else {
    b.attachments = allAtt.filter((_, k) => (seed >> k) & 1);
    if (b.attachments.length === 0) b.attachments = ['pdf'];
    if (!b.attachments.includes('pdf') && b.type !== 'fisik') b.attachments.unshift('pdf');
  }
  // circulation stats: available + loaned + lost = copies
  b.lost = (seed % 6 === 0) ? 1 : 0;
  b.loaned = Math.max(0, b.copies - b.available - b.lost);
});

// ── Bookmark store (localStorage, login-scoped) ──
const BOOKMARK_KEY = 'elib_bookmarks_v1';
function getBookmarks() { try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]'); } catch { return []; } }
function isBookmarked(id) { return getBookmarks().includes(id); }
function toggleBookmark(id) {
  const s = getBookmarks();
  const idx = s.indexOf(id);
  if (idx >= 0) s.splice(idx, 1); else s.push(id);
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent('om-bookmarks', { detail: id }));
  return s.includes(id);
}

// book type metadata
const BOOK_TYPES = {
  digital:  { label: 'Digital',  labelEn: 'Digital',         icon: 'globe',  tone: 'cobalt', borrowable: true,  desc: 'Dapat dipinjam & dibaca daring' },
  fisik:    { label: 'Fisik',    labelEn: 'Physical',        icon: 'book',   tone: 'amber',  borrowable: false, desc: 'Hanya tersedia di rak perpustakaan' },
  keduanya: { label: 'Fisik + Digital', labelEn: 'Both',    icon: 'grid',   tone: 'emerald',borrowable: true,  desc: 'Tersedia di rak & dapat dipinjam daring' },
};
const ATTACH_META = {
  pdf:   { label: 'PDF',   icon: 'book',     color: '#C0392B' },
  audio: { label: 'Audio', icon: 'play',     color: '#7A4BC4' },
  video: { label: 'Video', icon: 'play',     color: '#1F9D73' },
  image: { label: 'Gambar',icon: 'download', color: '#B0822F' },
};

Object.assign(window, {
  BOOKS, AUTHORS, PUBLISHERS, CATEGORIES, COVER_PALETTES, NEWS, RESOURCES, STATS, ORG, MY_LOANS, MY_WISHLIST, HOURS, CONTACT,
  REVIEW_POOL, TESTIMONIALS, reviewsFor, ratingBars,
  bookById, authorById, publisherById, categoryById,
  getBookmarks, isBookmarked, toggleBookmark, BOOK_TYPES, ATTACH_META,
});
