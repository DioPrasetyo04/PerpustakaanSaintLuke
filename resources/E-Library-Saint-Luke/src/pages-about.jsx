// pages-about.jsx — Tentang: Profil, Visi & Misi, Struktur, Kontak
const { useState: xUseState } = React;

/* ──────── PROFIL ──────── */
function ProfilePage() {
  return (
    <section className="pb-24">
      {/* Editorial hero */}
      <div className="border-b hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <Reveal><Eyebrow>Tentang Yayasan</Eyebrow></Reveal>
            <h1 className="mt-3 font-serif text-4xl lg:text-6xl text-ink dark:text-paper leading-[1.05]" style={{ textWrap: 'balance' }}>
              Sebuah <em className="text-cobalt">rumah baca</em> yang tumbuh sejak 1968.
            </h1>
            <p className="mt-8 text-lg leading-[1.75] text-ink/80 dark:text-paper/80 drop-cap max-w-2xl" style={{ textWrap: 'pretty' }}>
              Perpustakaan Yayasan Santo Lukas dimulai dari satu ruang kecil di belakang bangunan asrama —
              tiga rak kayu jati, sekitar empat ratus judul, dan seorang pustakawan paruh waktu. Lima puluh delapan tahun
              kemudian, rumah baca ini telah berkembang menjadi pusat literasi yang melayani lebih dari seribu
              delapan ratus anggota aktif, dari kelas satu SD hingga kelas tiga SMA.
            </p>
            <p className="mt-6 text-lg leading-[1.75] text-ink/80 dark:text-paper/80 max-w-2xl" style={{ textWrap: 'pretty' }}>
              Kami percaya membaca bukan sekadar memindahkan kata dari halaman ke kepala —
              ia adalah latihan untuk mendengarkan, menimbang, dan mencintai dunia dengan lebih
              tepat. Itulah sebabnya setiap judul yang masuk ke rak kami melalui proses
              kurasi pustakawan, bukan sekadar diisi berdasarkan tren.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="aspect-[4/5] paper-grain spine-shadow shadow-book-3d bg-ink text-paper p-8 flex flex-col justify-between">
                <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">
                  Sejak Tahun
                </div>
                <div>
                  <div className="font-serif text-[140px] leading-none tabnum">1968</div>
                  <div className="mt-4 h-px w-12 bg-cobalt" />
                  <div className="mt-4 font-quote italic text-2xl text-paper/85">
                    "Membaca adalah cara paling tenang untuk mengubah hati."
                  </div>
                  <div className="mt-3 font-mono uppercase tracking-editorial text-[10px] text-paper/55">
                    Motto Yayasan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <SectionLabel num="01" label="Lima Babak Sejarah" className="mb-12" />
        <div className="grid grid-cols-12 gap-8">
          {[
            { y:'1968', t:'Awal Mula', b:'Satu ruang kecil dengan 400 judul di belakang asrama. Pustakawan pertama adalah seorang romo yang juga mengajar Bahasa Latin.' },
            { y:'1985', t:'Perluasan Pertama', b:'Yayasan mendirikan gedung perpustakaan dua lantai. Koleksi melampaui 3.000 judul, klub baca pertama dibentuk.' },
            { y:'2003', t:'Era Digital', b:'Katalogisasi pertama dengan sistem komputer. Akses ke jurnal akademik dimulai melalui kerjasama dengan PNRI.' },
            { y:'2018', t:'Renovasi Modern', b:'Renovasi total: ruang baca tenang, ruang diskusi, dan area koleksi langka. 9.500 judul dan 1.400 anggota aktif.' },
            { y:'2026', t:'Hari Ini', b:'12.480 koleksi, 1.856 anggota, dan portal daring yang Anda gunakan saat ini.' },
          ].map((s, i) => (
            <Reveal key={s.y} delay={i * 100} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="bracket text-cobalt dark:text-cobalt-lt rounded-xl2 bg-card dark:bg-night-2 border hairline p-8 h-full hover:shadow-lift hover:border-cobalt/40 hover:-translate-y-1 transition-all duration-300">
                <div className="font-serif italic text-5xl text-cobalt dark:text-cobalt-lt tabnum">{s.y}</div>
                <div className="mt-2 font-serif text-xl text-ink dark:text-paper">{s.t}</div>
                <p className="mt-3 text-sm text-ink/75 dark:text-paper/75 leading-relaxed">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Numbers */}
      <div className="bg-ink text-paper py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { v:58, l:'Tahun melayani' },
              { v:12480, l:'Koleksi keseluruhan' },
              { v:1856, l:'Anggota aktif' },
              { v:430, l:'Klub baca per tahun' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 90}>
                <div>
                  <div className="font-serif text-6xl text-paper tabnum"><Counter value={s.v} /></div>
                  <div className="mt-2 text-sm text-paper/70">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────── VISI & MISI ──────── */
function VisionPage() {
  const MISSIONS = [
    { num:'I',   t:'Menyediakan koleksi yang berkualitas',     b:'Setiap judul yang masuk ke rak kami dipilih oleh pustakawan dan diuji nilainya — bukan oleh algoritma, bukan oleh tren musiman, tapi oleh pembaca yang membaca lebih dulu sebelum merekomendasikan.' },
    { num:'II',  t:'Menumbuhkan budaya literasi sejak dini',    b:'Klub baca rutin, lomba resensi, jam bercerita untuk SD, dan diskusi sastra untuk SMA — semuanya dirancang agar membaca menjadi kebiasaan, bukan kewajiban.' },
    { num:'III', t:'Mengajarkan literasi digital yang sehat',    b:'Membantu siswa membedakan sumber yang tepercaya, menulis kutipan dengan etis, dan menggunakan teknologi sebagai alat — bukan sebagai pengganti pikiran.' },
    { num:'IV',  t:'Menjadi ruang sunyi yang menyambut',          b:'Perpustakaan harus tetap menjadi tempat yang tenang, terang, dan ramah untuk berpikir — apapun yang terjadi di luar sana.' },
  ];

  return (
    <section className="pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-16">
        <Reveal><Eyebrow>Tentang Yayasan</Eyebrow></Reveal>
        <h1 className="mt-5 font-serif text-4xl lg:text-6xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
          Visi &amp; Misi
        </h1>

        {/* Visi as a typographic statement */}
        <div className="mt-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <SectionLabel num="I" label="Visi" />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="font-serif text-3xl lg:text-5xl text-ink dark:text-paper leading-[1.15]" style={{ textWrap: 'balance' }}>
              Menjadi <em className="text-cobalt">rumah baca terbaik</em> di lingkungan
              sekolah Yayasan Santo Lukas — tempat di mana setiap siswa, dari SD hingga SMA,
              menemukan setidaknya satu buku yang
              <em className="italic"> mengubah cara mereka melihat dunia</em>.
            </div>
          </div>
        </div>

        {/* Misi */}
        <div className="mt-24 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <SectionLabel num="II" label="Misi" />
          </div>
          <div className="col-span-12 lg:col-span-9 space-y-px">
            {MISSIONS.map((m, i) => (
              <Reveal key={m.num} delay={i * 90}>
                <div className="grid grid-cols-12 gap-6 py-8 border-t hairline">
                  <div className="col-span-2 lg:col-span-1">
                    <div className="font-serif italic text-5xl text-cobalt">{m.num}</div>
                  </div>
                  <div className="col-span-10 lg:col-span-11">
                    <h3 className="font-serif text-2xl text-ink dark:text-paper leading-snug" style={{ textWrap: 'balance' }}>
                      {m.t}
                    </h3>
                    <p className="mt-3 text-lg leading-[1.7] text-ink/80 dark:text-paper/80 max-w-2xl" style={{ textWrap: 'pretty' }}>
                      {m.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-24 border-t hairline pt-12 text-center">
          <div className="font-quote italic text-2xl lg:text-3xl text-ink dark:text-paper leading-snug max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
            "Membaca adalah cara paling tenang untuk mengubah hati. Dan hati yang berubah, mengubah segala yang lain."
          </div>
          <div className="mt-4 font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">
            Motto Yayasan Santo Lukas
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────── STRUKTUR ORGANISASI ──────── */
function StructurePage() {
  const layers = {
    0: ORG.filter(p => p.layer === 0),
    1: ORG.filter(p => p.layer === 1),
    2: ORG.filter(p => p.layer === 2),
    3: ORG.filter(p => p.layer === 3),
  };

  const Card = ({ p, size = 'md' }) => {
    const palette = COVER_PALETTES[p.palette];
    const sz = size === 'lg' ? 'p-7' : 'p-5';
    return (
      <Reveal>
        <div className={`bracket text-cobalt dark:text-cobalt-lt rounded-xl2 bg-card dark:bg-night-2 border hairline ${sz} text-center hover:border-cobalt hover:shadow-lift transition-all duration-300 h-full flex flex-col items-center`}>
          <div
            className="w-20 h-20 grid place-items-center font-serif italic text-2xl mb-4"
            style={{ background: palette.bg, color: palette.ink }}
          >
            {p.name.split(' ').map(w => w[0]).slice(0,2).join('')}
          </div>
          <div className="font-serif text-base text-ink dark:text-paper leading-snug" style={{ textWrap: 'balance' }}>
            {p.name}
          </div>
          <div className="mt-1 font-mono uppercase tracking-editorial text-[10px] text-cobalt">
            {p.role}
          </div>
        </div>
      </Reveal>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24">
      <Reveal><Eyebrow>Tentang Yayasan</Eyebrow></Reveal>
      <h1 className="mt-5 font-serif text-4xl lg:text-6xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
        Struktur Organisasi
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
        Tujuh orang yang mengurus rak, koleksi, layanan, dan program literasi — sehari-hari.
      </p>

      {/* Org tree */}
      <div className="mt-16">
        {/* Layer 0 */}
        <div className="flex justify-center">
          <div className="w-[280px]">
            <Card p={layers[0][0]} size="lg" />
          </div>
        </div>
        <Connector />
        {/* Layer 1 */}
        <div className="flex justify-center">
          <div className="w-[280px]">
            <Card p={layers[1][0]} size="lg" />
          </div>
        </div>
        <Connector />
        {/* Layer 2 — Kepala Perpustakaan */}
        <div className="flex justify-center">
          <div className="w-[280px]">
            <Card p={layers[2][0]} size="lg" />
          </div>
        </div>
        <Connector multi />
        {/* Layer 3 — staf, four columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {layers[3].map(p => <Card key={p.name} p={p} />)}
        </div>
      </div>

      {/* Disclaimer / Note */}
      <div className="mt-20 grid grid-cols-12 gap-8 border-t hairline pt-10">
        <div className="col-span-12 lg:col-span-4">
          <SectionLabel num="✦" label="Catatan" className="mb-3" />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <p className="text-lg leading-relaxed text-ink/80 dark:text-paper/80">
            Kepala Perpustakaan bertanggung jawab langsung kepada Ketua Yayasan. Tim staf melayani jam buka penuh,
            dan tiga relawan siswa SMA membantu sirkulasi setiap sore selama hari sekolah.
          </p>
        </div>
      </div>
    </section>
  );
}

function Connector({ multi = false }) {
  return (
    <div className="flex justify-center my-6" aria-hidden="true">
      <div className={`w-px bg-line dark:bg-night-line ${multi ? 'h-12' : 'h-10'}`} />
    </div>
  );
}

/* ──────── KONTAK ──────── */
function ContactPage() {
  const [sent, setSent] = xUseState(false);
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
        <div className="grid grid-cols-12 gap-10">
          {/* Left: header + form */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal><Eyebrow>Hubungi Kami</Eyebrow></Reveal>
            <h1 className="mt-5 font-serif text-4xl lg:text-6xl text-ink dark:text-paper leading-[1.05]" style={{ textWrap: 'balance' }}>
              Mari <em className="text-cobalt dark:text-cobalt-lt">berkirim kabar</em>.
            </h1>
            <p className="mt-4 max-w-xl text-ink/70 dark:text-paper/65">
              Untuk pertanyaan koleksi, kemitraan, peminjaman antar-perpustakaan, atau hanya
              menyapa — kami menjawab dalam 1×24 jam pada hari kerja.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-12 grid grid-cols-2 gap-px bg-line dark:bg-night-line border hairline"
            >
              <Field label="Nama" name="name" required wide />
              <Field label="Status" name="status" type="select" options={['Siswa','Orang tua/Wali','Guru','Alumni','Tamu','Mitra']} />
              <Field label="Surel" name="email" type="email" required />
              <Field label="Nomor telepon (opsional)" name="phone" type="tel" />
              <Field label="Subjek" name="subject" wide />
              <Field label="Pesan Anda" name="message" type="textarea" wide required />
              <div className="col-span-2 bg-card dark:bg-night-2 p-5 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-ink/70 dark:text-paper/70">
                  <input type="checkbox" required className="accent-cobalt" />
                  Saya menyetujui pengelolaan data sesuai kebijakan privasi yayasan.
                </label>
                <Button variant="primary">
                  Kirim Pesan <Icon name="arrow-right" size={14} />
                </Button>
              </div>
            </form>

            {sent && (
              <div className="mt-6 p-4 bg-cobalt/10 border border-cobalt/40 text-sm text-cobalt-dk dark:text-cobalt flex items-start gap-3">
                <Icon name="check" size={18} className="mt-0.5" />
                <div>
                  <div className="font-serif text-base">Pesan terkirim. Terima kasih.</div>
                  <div className="text-xs mt-1 text-ink/70 dark:text-paper/70">
                    Tim kami akan membalas paling lambat 1×24 jam pada hari kerja.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: info */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Address card */}
              <div className="bg-card dark:bg-night-2 border hairline p-6">
                <div className="flex items-start gap-3">
                  <Icon name="pin" size={18} className="text-cobalt mt-1 shrink-0" />
                  <div>
                    <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">Alamat</div>
                    <address className="mt-2 not-italic text-ink dark:text-paper leading-relaxed">
                      {CONTACT.address}
                    </address>
                  </div>
                </div>
              </div>

              {/* Map (stylized) */}
              <StylizedMap />

              {/* Phone + email */}
              <div className="bg-card dark:bg-night-2 border hairline divide-y hairline">
                <div className="p-5 flex items-center gap-3">
                  <Icon name="phone" size={16} className="text-cobalt shrink-0" />
                  <div>
                    <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">Telepon</div>
                    <a href={`tel:${CONTACT.phone}`} className="font-mono text-lg text-ink dark:text-paper tabnum hover:text-cobalt">{CONTACT.phone}</a>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-3">
                  <Icon name="mail" size={16} className="text-cobalt shrink-0" />
                  <div>
                    <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">Surel</div>
                    <a href={`mailto:${CONTACT.email}`} className="text-ink dark:text-paper hover:text-cobalt">{CONTACT.email}</a>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-3">
                  <Icon name="instagram" size={16} className="text-cobalt shrink-0" />
                  <div>
                    <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">Instagram</div>
                    <a href="#/" className="text-ink dark:text-paper hover:text-cobalt">{CONTACT.ig}</a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-ink text-paper p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="clock" size={16} className="text-cobalt" />
                  <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Jam Operasional</div>
                </div>
                <dl className="divide-y divide-paper/10">
                  {HOURS.map(h => (
                    <div key={h.day} className="py-3 flex items-center justify-between">
                      <dt className="text-sm text-paper/80">{h.day}</dt>
                      <dd className="font-mono text-sm tabnum">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', required, wide, options }) {
  const cls = wide ? 'col-span-2' : 'col-span-2 sm:col-span-1';
  const inputCls = 'w-full bg-transparent outline-none text-ink dark:text-paper placeholder:text-muted/70 focus:placeholder:opacity-50';
  return (
    <label className={`${cls} bg-card dark:bg-night-2 p-5 block group focus-within:bg-paper dark:focus-within:bg-night-3 transition-colors`}>
      <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 mb-2">
        {label}{required && <span className="text-cobalt ml-1">*</span>}
      </div>
      {type === 'textarea' ? (
        <textarea name={name} required={required} rows={5} className={`${inputCls} resize-none`} placeholder="Tuliskan pesan Anda di sini..." />
      ) : type === 'select' ? (
        <select name={name} required={required} className={inputCls}>
          <option value="">Pilih…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} required={required} className={inputCls} placeholder=" " />
      )}
    </label>
  );
}

/* StylizedMap — editorial illustration of map (no real coords) */
function StylizedMap() {
  return (
    <div className="relative aspect-[4/3] bg-paper-2 dark:bg-night-3 border hairline overflow-hidden">
      {/* grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        {/* base shape */}
        <rect x="0" y="0" width="400" height="300" fill="#EFE9DC" className="dark:fill-[#1B2A41]" />
        {/* sea hint */}
        <path d="M0 0 L400 0 L400 70 Q200 80 0 60 Z" fill="#3F6B7E" opacity=".22" />
        {/* roads */}
        <g stroke="#8B847A" strokeWidth="2" opacity=".55" fill="none">
          <path d="M0 180 L400 160" />
          <path d="M0 130 Q200 145 400 110" />
          <path d="M120 0 L140 300" />
          <path d="M250 0 L240 300" />
          <path d="M40 80 L380 220" strokeDasharray="4 4" />
        </g>
        {/* blocks */}
        <g fill="#E4DCC9" stroke="#D5C9A5" className="dark:fill-[#2C3E55] dark:stroke-[#3D5066]">
          <rect x="30" y="195" width="50" height="35" />
          <rect x="90" y="200" width="40" height="40" />
          <rect x="155" y="170" width="60" height="30" />
          <rect x="160" y="220" width="50" height="40" />
          <rect x="270" y="170" width="60" height="50" />
          <rect x="270" y="230" width="80" height="40" />
          <rect x="60" y="240" width="55" height="40" />
        </g>
        {/* labels */}
        <g fill="#3D3A36" className="dark:fill-[#E4DCC9]" fontFamily="JetBrains Mono, monospace" fontSize="8" opacity=".7">
          <text x="20" y="60">Teluk Jakarta</text>
          <text x="125" y="175" transform="rotate(-3 125 175)">JL. PADEMANGAN II</text>
          <text x="220" y="265">PADEMANGAN TIMUR</text>
        </g>
      </svg>

      {/* pin */}
      <div className="absolute" style={{ left: '52%', top: '55%' }}>
        <div className="relative -translate-x-1/2 -translate-y-full">
          <div className="absolute -inset-3 rounded-full bg-cobalt/20 animate-ping" />
          <div className="relative w-7 h-7 grid place-items-center bg-cobalt text-paper rounded-full shadow-lg">
            <Icon name="pin" size={14} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 bg-card/90 dark:bg-night/90 backdrop-blur px-3 py-2 font-mono text-[10px] uppercase tracking-editorial">
        Perpustakaan Santo Lukas · Jakarta Utara
      </div>
      <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-editorial text-muted">
        N ↑
      </div>
    </div>
  );
}

Object.assign(window, { ProfilePage, VisionPage, StructurePage, ContactPage });
