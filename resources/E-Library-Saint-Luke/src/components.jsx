// components.jsx — Shared UI primitives (Nordic Library v2 — product-platform)

/* ── helpers ── */
function borrowCount(book) {
  // deterministic social-proof number derived from popularity/id
  const base = Math.round(book.popularity * 4.7 + (parseInt(book.id.slice(-3), 10) % 37) * 3);
  return base;
}

/* ── BookCover — typographic spine, wrapped for 3D hover ── */
function BookCover({ book, size = 'md', flat = false, className = '', noHover = false }) {
  const palette = COVER_PALETTES[book.palette % COVER_PALETTES.length];
  const sizes = {
    xs: { w: 64,  h: 96,  title: 'text-[9px]',  author: 'text-[7px]'  },
    sm: { w: 110, h: 165, title: 'text-[12px]', author: 'text-[8px]'  },
    md: { w: 150, h: 225, title: 'text-[14px]', author: 'text-[9px]'  },
    lg: { w: 220, h: 330, title: 'text-[19px]', author: 'text-[10px]' },
    xl: { w: 300, h: 450, title: 'text-[28px]', author: 'text-[11px]' },
  };
  const s = sizes[size];
  const shadow = flat ? '' : 'shadow-book';
  return (
    <div className={`${noHover ? '' : 'book-3d'} shrink-0 ${className}`} style={{ width: s.w, height: s.h }}>
      <div
        className={`book-3d-inner relative w-full h-full rounded-r-md rounded-l-sm spine-shadow ${shadow}`}
        style={{ background: palette.bg, color: palette.ink }}
      >
        <div className="absolute left-0 top-0 bottom-0 rounded-l-sm" style={{ width: 3, background: palette.accent, opacity: .9 }} />
        <div className="absolute top-3 left-4 right-3 flex items-start justify-between gap-2">
          <div className="font-mono uppercase tracking-wider-2 text-[7px] opacity-70">E·LIB / SL</div>
          <div className="font-mono text-[8px] opacity-65" style={{ color: palette.accent }}>№{book.id.slice(-3)}</div>
        </div>
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 pr-2">
          <div className={`font-serif font-normal leading-[1.08] ${s.title}`} style={{ textWrap: 'balance' }}>{book.title}</div>
          <div className="mt-3 h-px w-10" style={{ background: palette.accent, opacity: .9 }} />
          <div className={`mt-3 font-sans uppercase tracking-editorial ${s.author} opacity-75`}>{book.author}</div>
        </div>
        <div className="absolute bottom-3 left-4 right-3 flex items-end justify-between">
          <span className="font-mono text-[7px] opacity-55 tabnum">{book.year}</span>
          <div className="w-2 h-2 rounded-sm" style={{ background: palette.accent, opacity: .8 }} />
        </div>
      </div>
    </div>
  );
}

/* ── Bookmark + Type helpers ── */
function BookmarkButton({ book, className = '' }) {
  const [on, setOn] = React.useState(() => isBookmarked(book.id));
  React.useEffect(() => {
    const h = () => setOn(isBookmarked(book.id));
    window.addEventListener('om-bookmarks', h);
    return () => window.removeEventListener('om-bookmarks', h);
  }, [book.id]);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleBookmark(book.id); }}
      className={`w-8 h-8 grid place-items-center rounded-full border transition-all btn-press ${on ? 'bg-cobalt text-white border-cobalt' : 'bg-card/90 dark:bg-night-3/90 hairline text-muted hover:text-cobalt hover:border-cobalt/40'} ${className}`}
      aria-label={on ? 'Hapus markah' : 'Markahi buku'}
      aria-pressed={on}
      title={on ? 'Tersimpan di markah' : 'Tandai buku'}
    >
      <Icon name="bookmark" size={14} className={on ? 'fill-current' : ''} />
    </button>
  );
}

function TypeChip({ type, size = 'sm' }) {
  const m = BOOK_TYPES[type] || BOOK_TYPES.fisik;
  const tones = {
    cobalt:  'bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt',
    amber:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-editorial ${tones[m.tone]} ${size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'}`}>
      <Icon name={m.icon} size={size === 'sm' ? 10 : 12} /> {m.label}
    </span>
  );
}

/* shared cover dimensions */
const COVER_DIMS = { xs:[64,96], sm:[110,165], md:[150,225], lg:[220,330], xl:[300,450] };

/* media slides for a book card: cover + image/video assets only (no pdf/audio) */
function bookMedia(book) {
  const slides = [{ type: 'cover' }];
  const att = book.attachments || [];
  if (att.includes('image')) {
    const seed = parseInt(book.id.slice(-3), 10);
    const n = 1 + (seed % 2); // 1–2 image plates
    for (let i = 0; i < n; i++) slides.push({ type: 'image', i });
  }
  if (att.includes('video')) slides.push({ type: 'video' });
  return slides;
}

/* ── MediaSlot — user-swappable image layered over a fallback graphic ──
   editable=true → drag/click to replace (detail page)
   editable=false → display-only mirror that shows whatever was dropped (cards) */
function MediaSlot({ id, w, h, editable, placeholder, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.setAttribute('class', editable ? 'cover-slot' : 'slot-display');
  }, [editable]);
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <div className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm">{children}</div>
      {React.createElement('image-slot', {
        ref,
        id,
        shape: 'rounded', radius: '6',
        placeholder: placeholder || 'Letakkan gambar',
        style: { position: 'absolute', top: 0, left: 0, width: w, height: h },
      })}
    </div>
  );
}

/* ── BookMedia — swipeable cover + asset gallery with author-on-hover ── */
function BookMedia({ book, size = 'md', editable = false }) {
  const slides = React.useMemo(() => bookMedia(book), [book.id]);
  const [w, h] = COVER_DIMS[size] || COVER_DIMS.md;
  const n = slides.length;
  const [idx, setIdx] = React.useState(0);
  const [drag, setDrag] = React.useState(0);
  const startX = React.useRef(null);
  const moved = React.useRef(false);
  const pal = COVER_PALETTES[book.palette % COVER_PALETTES.length];

  const go = (i, e) => { if (e) { e.preventDefault(); e.stopPropagation(); } setIdx(Math.max(0, Math.min(n - 1, i))); };

  const onDown = (e) => { if (n < 2) return; startX.current = e.clientX; moved.current = false; try { e.currentTarget.setPointerCapture(e.pointerId); } catch {} };
  const onMove = (e) => { if (startX.current == null) return; const d = e.clientX - startX.current; if (Math.abs(d) > 4) moved.current = true; setDrag(d); };
  const onUp = () => {
    if (startX.current == null) return;
    const th = w * 0.22;
    if (drag < -th) setIdx(i => Math.min(n - 1, i + 1));
    else if (drag > th) setIdx(i => Math.max(0, i - 1));
    startX.current = null; setDrag(0);
  };
  // suppress navigation if the pointer was dragged
  const onClickCapture = (e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } };

  const Slide = ({ s, i }) => {
    if (s.type === 'cover') {
      return (
        <MediaSlot id={`cv-${book.id}`} w={w} h={h} editable={editable} placeholder="Letakkan sampul buku">
          <BookCover book={book} size={size} noHover />
        </MediaSlot>
      );
    }
    const mp = COVER_PALETTES[(book.palette + (s.i ?? 0) + 2) % COVER_PALETTES.length];
    if (s.type === 'image') {
      return (
        <MediaSlot id={`as-${book.id}-${s.i ?? 0}`} w={w} h={h} editable={editable} placeholder="Letakkan gambar">
          <div className="relative w-full h-full spine-shadow" style={{ background: `linear-gradient(150deg, ${mp.bg}, ${pal.bg})`, color: mp.ink }}>
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute inset-0 grid place-items-center"><Icon name="download" size={Math.max(18, w*0.18)} style={{ color: mp.accent, opacity: .85 }} /></div>
            <div className="absolute top-2.5 left-3 font-mono uppercase tracking-wider-2 text-[7px] opacity-70">Galeri</div>
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[7px] opacity-70"><span>Foto {(s.i ?? 0) + 1}</span><span>JPG</span></div>
          </div>
        </MediaSlot>
      );
    }
    // video — poster image is droppable; play affordance stays on top
    return (
      <div className="relative" style={{ width: w, height: h }}>
        <MediaSlot id={`vp-${book.id}`} w={w} h={h} editable={editable} placeholder="Letakkan poster video">
          <div className="relative w-full h-full spine-shadow bg-[#0B0B0C]">
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 42%, ${mp.accent}, transparent 70%)` }} />
            <div className="absolute top-2.5 left-3 font-mono uppercase tracking-wider-2 text-[7px] text-white/70">Video</div>
          </div>
        </MediaSlot>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <span className="grid place-items-center rounded-full bg-white/90 text-ink shadow-lg" style={{ width: w*0.3, height: w*0.3 }}><Icon name="play" size={Math.max(14, w*0.13)} /></span>
        </div>
        <div className="absolute bottom-3 inset-x-3 pointer-events-none">
          <div className="h-0.5 rounded-full bg-white/25"><div className="h-full w-1/3 rounded-full bg-cobalt-lt" /></div>
        </div>
      </div>
    );
  };

  return (
    <div className="book3d-stage relative select-none" style={{ width: w, height: h }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}>
      {/* tilting book slab (cover + media) */}
      <div className="book3d-tilt" style={{ width: w, height: h }}>
        <div className="book3d-face overflow-hidden rounded-r-md rounded-l-sm" style={{ width: w, height: h }}>
          <div className="flex" style={{ width: w * n, transform: `translateX(${-idx * w + drag}px)`, transition: startX.current == null ? 'transform .4s cubic-bezier(.2,.7,.2,1)' : 'none', cursor: n > 1 ? 'grab' : 'default' }}>
            {slides.map((s, i) => <div key={i} className="shrink-0" style={{ width: w }}>{Slide({ s, i })}</div>)}
          </div>
          {/* sheen sweep on hover */}
          <div className="book3d-sheen" />
        </div>
        {/* author reveal on hover — sits on the book surface */}
        <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="font-mono uppercase tracking-editorial text-[8px] text-white/60">Penulis</div>
          <div className="font-serif text-white text-[13px] leading-tight line-clamp-1">{book.author}</div>
        </div>
      </div>

      {/* swipe arrows — flat controls above the 3D slab */}
      {n > 1 && (
        <React.Fragment>
          {idx > 0 && (
            <button onClick={(e) => go(idx - 1, e)} aria-label="Sebelumnya"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 grid place-items-center rounded-full bg-card/90 dark:bg-night-3/90 border hairline text-ink dark:text-paper opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <Icon name="chevron-left" size={14} />
            </button>
          )}
          {idx < n - 1 && (
            <button onClick={(e) => go(idx + 1, e)} aria-label="Berikutnya"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 grid place-items-center rounded-full bg-card/90 dark:bg-night-3/90 border hairline text-ink dark:text-paper opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <Icon name="chevron-right" size={14} />
            </button>
          )}
          {/* dots */}
          <div className="absolute -bottom-3.5 inset-x-0 z-20 flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-card/80 dark:bg-night-3/80 border hairline backdrop-blur">
              {slides.map((_, i) => (
                <button key={i} onClick={(e) => go(i, e)} aria-label={`Slide ${i+1}`}
                  className={`rounded-full transition-all ${i === idx ? 'w-3.5 h-1.5 bg-cobalt dark:bg-cobalt-lt' : 'w-1.5 h-1.5 bg-muted-2/50 hover:bg-muted-2'}`} />
              ))}
            </div>
          </div>
          {/* media-count chip */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur text-white text-[9px] font-mono inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon name="grid" size={9} /> {idx + 1}/{n}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ── BookCard — PRODUCT-STYLE card (swipeable media + meta + hover action) ── */
function BookCard({ book, onOpen, size = 'md', showMeta = true }) {
  const cat = categoryById(book.category);
  const hasMedia = bookMedia(book).length > 1;
  return (
    <a
      href={`#/buku/${book.id}`}
      onClick={(e) => { if (onOpen) { e.preventDefault(); onOpen(book); } }}
      className="group block h-full"
    >
      <div className="prod-card h-full flex flex-col rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden group-hover:shadow-lift group-hover:border-cobalt/30 dark:group-hover:border-cobalt/40">
        {/* image area */}
        <div className="relative px-5 pt-5 pb-7 flex justify-center bg-paper-2/50 dark:bg-night-3/40">
          <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <BookMedia book={book} size={size} editable />
          </div>
          {/* badges top-left (single row) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            {book.new && <Badge tone="cobalt">Baru</Badge>}
            {book.popularity >= 90 && <Badge tone="amber">Populer</Badge>}
            {book.available === 0 && <Badge tone="ink">Habis</Badge>}
          </div>
          {/* bookmark — always visible top-right */}
          <div className="absolute top-3 right-3 z-10">
            <BookmarkButton book={book} />
          </div>
          {/* quick view bottom-right (hover) */}
          <div className="absolute bottom-4 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); openQuickView(book); }}
              className="w-8 h-8 grid place-items-center rounded-full bg-card/90 dark:bg-night-3/90 border hairline text-muted hover:text-cobalt hover:border-cobalt/40 transition-colors shadow-sm"
              aria-label="Lihat cepat"
            >
              <Icon name="search" size={14} />
            </button>
          </div>
        </div>

        {/* meta */}
        {showMeta && (
          <div className="flex flex-col flex-1 p-4 pt-3.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt truncate">{cat?.name}</span>
              <TypeChip type={book.type} />
            </div>
            <div className="book-title font-serif text-[16px] leading-snug text-ink dark:text-paper line-clamp-2 transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
              {book.title}
            </div>
            <div className="mt-1 text-xs text-muted dark:text-paper/55 line-clamp-1">{book.author}</div>

            <div className="mt-3 flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-brass-lt shrink-0">
                <Icon name="star-fill" size={12} className="text-brass-lt" />
                <span className="text-ink dark:text-paper tabnum font-semibold">{book.rating.toFixed(1)}</span>
              </span>
              <span className="text-muted dark:text-paper/50 tabnum truncate">Dipinjam {borrowCount(book)}×</span>
            </div>

            <div className="mt-auto pt-3 border-t hairline mt-3 flex items-center justify-between">
              {book.available > 0
                ? <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Tersedia</span>
                : <span className="text-[11px] font-medium text-muted inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-2" /> Antri</span>}
              <span className="text-[11px] font-semibold uppercase tracking-editorial text-cobalt dark:text-cobalt-lt inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                Lihat <Icon name="arrow-right" size={12} />
              </span>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}

/* ── Badge — small colored pill for cards ── */
function Badge({ children, tone = 'cobalt', className = '' }) {
  const tones = {
    cobalt: 'bg-cobalt text-white',
    amber:  'bg-brass text-white',
    rose:   'bg-rose-600 text-white',
    ink:    'bg-ink/85 text-paper dark:bg-paper/90 dark:text-ink',
    emerald:'bg-emerald-600 text-white',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-editorial shadow-sm ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/* ── Tag pill ── */
function Tag({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'bg-paper-2 text-ink/75 dark:bg-night-3 dark:text-paper/80',
    accent:  'bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt',
    gold:    'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200',
    outline: 'border hairline text-ink/70 dark:text-paper/70',
    teal:    'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-editorial font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ num, label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="section-num text-xl tabnum">{num}</span>
      <span className="font-sans uppercase tracking-editorial text-[11px] font-semibold text-ink/70 dark:text-paper/60">{label}</span>
      <span className="flex-1 h-px bg-line dark:bg-night-line" />
    </div>
  );
}

/* ── Eyebrow — small pill header above section titles ── */
function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt text-[11px] font-semibold uppercase tracking-editorial ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
      {children}
    </span>
  );
}

/* ── Skeletons ── */
function SkeletonCover({ size = 'md' }) {
  const dims = { sm: [110,165], md:[150,225], lg:[220,330] }[size] || [150,225];
  return <div className="skeleton rounded-md" style={{ width: dims[0], height: dims[1] }} />;
}
function SkeletonLine({ w = '100%', h = 12, className = '' }) {
  return <div className={`skeleton rounded ${className}`} style={{ width: w, height: h }} />;
}
function SkeletonCard() {
  return (
    <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden">
      <div className="p-5 bg-paper-2/50 dark:bg-night-3/40 flex justify-center"><SkeletonCover size="md" /></div>
      <div className="p-4 space-y-2">
        <SkeletonLine w="40%" h={9} />
        <SkeletonLine w="85%" />
        <SkeletonLine w="55%" h={10} />
      </div>
    </div>
  );
}

/* ── Button ── */
function Button({ children, variant = 'primary', size = 'md', className = '', as: As = 'button', ...rest }) {
  const variants = {
    primary: 'bg-cobalt text-white hover:bg-cobalt-dk shadow-soft hover:shadow-glow',
    dark:    'bg-ink text-paper hover:bg-ink-soft dark:bg-paper dark:text-ink dark:hover:bg-paper-2 shadow-soft',
    ghost:   'text-ink hover:bg-ink/5 dark:text-paper dark:hover:bg-paper/10',
    outline: 'border hairline text-ink hover:bg-ink/[.04] hover:border-ink/30 dark:text-paper dark:hover:bg-paper/5',
  };
  const sizes = { sm: 'px-3.5 py-2 text-xs', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-sm' };
  return (
    <As className={`btn-press inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-editorial transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </As>
  );
}

/* ── Rating ── */
function Rating({ value, size = 12, showNum = true }) {
  const full = Math.floor(value);
  const has = value - full > 0.25;
  return (
    <span className="inline-flex items-center gap-0.5 text-brass-lt">
      {Array.from({length: 5}).map((_, i) => (
        <Icon key={i} name={i < full || (i === full && has) ? 'star-fill' : 'star'} size={size}
          className={i < full || (i === full && has) ? 'text-brass-lt' : 'text-line dark:text-night-line'} />
      ))}
      {showNum && <span className="text-ink/70 dark:text-paper/70 text-xs ml-1.5 tabnum font-medium">{value.toFixed(1)}</span>}
    </span>
  );
}

/* ── Availability pill ── */
function AvailabilityPill({ available, copies }) {
  const ratio = copies ? available / copies : 0;
  if (available === 0) return <Tag tone="accent">Tidak Tersedia</Tag>;
  if (ratio <= 0.34)  return <Tag tone="gold">Terbatas · {available}/{copies}</Tag>;
  return <Tag tone="teal">Tersedia · {available}/{copies}</Tag>;
}

/* ── StatCard — animated counter in a card ── */
function StatCard({ value, suffix = '', label, note, icon }) {
  return (
    <div className="group rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 hover:shadow-lift hover:border-cobalt/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 grid place-items-center rounded-full bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt group-hover:scale-110 transition-transform">
          <Icon name={icon} size={18} />
        </div>
      </div>
      <div className="font-serif text-4xl lg:text-5xl text-ink dark:text-paper"><Counter value={value} />{suffix}</div>
      <div className="mt-2 text-sm font-medium text-ink dark:text-paper">{label}</div>
      <div className="mt-0.5 text-xs text-muted dark:text-paper/50">{note}</div>
    </div>
  );
}

/* ── FeatureCard (corner-bracket signature) ── */
function FeatureCard({ icon, title, body }) {
  return (
    <div className="bracket group/feat rounded-xl2 border hairline bg-card dark:bg-night-2 p-7 hover:shadow-lift hover:border-cobalt/40 hover:-translate-y-1 transition-all duration-300 h-full text-ink dark:text-paper">
      <div className="w-12 h-12 grid place-items-center rounded-xl bg-cobalt text-white mb-5 group-hover/feat:scale-110 group-hover/feat:rotate-3 transition-transform">
        <Icon name={icon} size={22} />
      </div>
      <h3 className="font-serif text-xl text-ink dark:text-paper">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted dark:text-paper/60">{body}</p>
    </div>
  );
}

/* ── Bracket — wraps any content with animated corner frame ── */
function Bracket({ children, className = '', tone = 'cobalt' }) {
  const c = tone === 'brass' ? 'text-brass' : 'text-cobalt dark:text-cobalt-lt';
  return <div className={`bracket ${c} ${className}`}>{children}</div>;
}

/* ── LiveTicker — running feed of recent borrow activity ── */
function LiveTicker() {
  const names = ['Andi','Bella','Citra','Devan','Eka','Farrel','Gita','Hana','Ivan','Joan','Kirana','Lukas','Maya','Nabil','Olive','Putra','Rani','Satria','Tara','Wira'];
  const verbs = ['meminjam','mengembalikan','mereservasi','menambah wishlist'];
  const times = ['baru saja','2 menit lalu','11 menit lalu','24 menit lalu','1 jam lalu','2 jam lalu','pagi ini','kemarin'];
  const top = [...BOOKS].sort((a,b) => b.popularity - a.popularity).slice(0, 16);
  const items = top.map((b, i) => ({
    name: names[(i * 7) % names.length],
    verb: verbs[i % verbs.length],
    title: b.title,
    time: times[(i * 3) % times.length],
  }));
  const Row = ({ it, k }) => (
    <span key={k} className="inline-flex items-center gap-2 px-5 text-[13px] whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      <span className="font-semibold text-ink dark:text-paper">{it.name}</span>
      <span className="text-muted dark:text-paper/55">{it.verb}</span>
      <span className="font-serif italic text-cobalt dark:text-cobalt-lt">{it.title}</span>
      <span className="text-muted-2 dark:text-paper/35">· {it.time}</span>
      <span className="text-line dark:text-night-line ml-3">/</span>
    </span>
  );
  return (
    <div className="ticker-wrap relative overflow-hidden border-y hairline bg-card/70 dark:bg-night-2/60 backdrop-blur py-2.5">
      <div className="ticker-track">
        {items.map((it, i) => <Row key={i} it={it} k={i} />)}
        {items.map((it, i) => <Row key={'b'+i} it={it} k={'b'+i} />)}
      </div>
      <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-2 pl-4 pr-6 bg-gradient-to-r from-paper dark:from-night via-paper/95 dark:via-night/95 to-transparent">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-editorial">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper dark:from-night to-transparent pointer-events-none" />
    </div>
  );
}

/* ── Step — numbered how-it-works ── */
function Step({ num, title, body, icon, last }) {
  return (
    <div className="relative flex-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 grid place-items-center rounded-full bg-ink dark:bg-paper text-paper dark:text-ink font-serif text-lg shrink-0">{num}</div>
        {!last && <div className="hidden lg:block flex-1 h-px border-t border-dashed hairline" />}
      </div>
      <div className="w-9 h-9 grid place-items-center rounded-lg bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt mb-3">
        <Icon name={icon} size={16} />
      </div>
      <h3 className="font-serif text-lg text-ink dark:text-paper">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted dark:text-paper/60 max-w-[240px]">{body}</p>
    </div>
  );
}

/* ── Accordion (FAQ) ── */
function Accordion({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="divide-y hairline rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-paper-2/40 dark:hover:bg-night-3/40 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-serif text-lg text-ink dark:text-paper">{it.q}</span>
            <span className={`w-8 h-8 grid place-items-center rounded-full border hairline shrink-0 transition-all duration-300 ${open === i ? 'bg-cobalt text-white border-cobalt rotate-45' : 'text-muted'}`}>
              <Icon name="plus" size={15} />
            </span>
          </button>
          <div className={`acc-body ${open === i ? 'open' : ''}`}>
            <div>
              <p className="px-6 pb-5 text-sm leading-relaxed text-muted dark:text-paper/60 max-w-2xl">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Marquee ── */
function Marquee({ children, className = '' }) {
  const arr = React.Children.toArray(children);
  return (
    <div className={`marquee-wrap relative overflow-hidden ${className}`}>
      <div className="marquee-track gap-4">
        {arr}{arr}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper dark:from-night to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper dark:from-night to-transparent pointer-events-none z-10" />
    </div>
  );
}

/* ── Tabs — animated underline tab system ── */
function Tabs({ tabs, initial = 0, children }) {
  const [active, setActive] = React.useState(initial);
  const railRef = React.useRef(null);
  const [ink, setInk] = React.useState({ left: 0, width: 0 });
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const btn = rail.querySelectorAll('[data-tab]')[active];
    if (btn) setInk({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active, tabs]);
  return (
    <div>
      <div ref={railRef} className="tabs-rail relative flex items-center gap-1 border-b hairline overflow-x-auto">
        {tabs.map((tb, i) => (
          <button
            key={i} data-tab
            onClick={() => setActive(i)}
            className={`relative px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${active === i ? 'text-cobalt dark:text-cobalt-lt' : 'text-muted dark:text-paper/55 hover:text-ink dark:hover:text-paper'}`}
          >
            {tb}
          </button>
        ))}
        <span className="tab-ink" style={{ left: ink.left, width: ink.width }} />
      </div>
      <div key={active} className="tab-panel pt-6">
        {typeof children === 'function' ? children(active) : React.Children.toArray(children)[active]}
      </div>
    </div>
  );
}

/* ── QuickView — global modal triggered by openQuickView(book) ── */
function openQuickView(book) {
  window.dispatchEvent(new CustomEvent('om-quickview', { detail: book }));
}
function QuickViewHost() {
  const [book, setBook] = React.useState(null);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    const onOpen = (e) => { setClosing(false); setBook(e.detail); };
    window.addEventListener('om-quickview', onOpen);
    return () => window.removeEventListener('om-quickview', onOpen);
  }, []);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    if (book) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [book]);
  const close = () => { setClosing(true); setTimeout(() => setBook(null), 200); };
  if (!book) return null;
  const author = authorById(book.authorId);
  const pub = publisherById(book.publisher);
  const cat = categoryById(book.category);
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center p-4 ${closing ? 'opacity-0 transition-opacity duration-200' : 'qv-overlay'}`}>
      <div className="absolute inset-0 bg-ink/70 dark:bg-black/80 backdrop-blur-sm" onClick={close} />
      <div className={`qv-panel relative w-full max-w-3xl bg-card dark:bg-night-2 rounded-xl2 border hairline shadow-lift overflow-hidden ${closing ? 'opacity-0' : ''}`}>
        <button onClick={close} aria-label="Tutup" className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full bg-paper/80 dark:bg-night-3/80 border hairline text-muted hover:text-cobalt hover:border-cobalt/40 transition-colors">
          <Icon name="close" size={16} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
          <div className="sm:col-span-2 p-7 bg-paper-2/40 dark:bg-night-3/40 grid place-items-center relative">
            <div className="dot-grid absolute inset-0 opacity-30" />
            <div className="relative"><BookCover book={book} size="lg" /></div>
          </div>
          <div className="sm:col-span-3 p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              {book.new && <Badge tone="cobalt">Baru</Badge>}
              {book.popularity >= 90 && <Badge tone="amber">Populer</Badge>}
              <span className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt">{cat?.name}</span>
            </div>
            <h3 className="font-serif text-2xl text-ink dark:text-paper leading-tight">{book.title}</h3>
            <a href={`#/penulis/${book.authorId}`} onClick={close} className="mt-1 text-sm text-muted dark:text-paper/55 hover:text-cobalt">{book.author}{pub ? ` · ${pub.name}` : ''} · {book.year}</a>
            <div className="mt-3 flex items-center gap-3">
              <Rating value={book.rating} size={13} />
              <span className="text-xs text-muted dark:text-paper/50 tabnum">Dipinjam {borrowCount(book)}×</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/80 dark:text-paper/70 line-clamp-4">{book.synopsis}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(book.tags || []).slice(0,3).map(t => <Tag key={t} tone="outline">{t}</Tag>)}
            </div>
            <div className="mt-auto pt-5 flex items-center gap-3">
              <Button variant="primary" disabled={book.available === 0}>
                {book.available > 0 ? 'Pinjam' : 'Antri'} <Icon name="arrow-right" size={14} />
              </Button>
              <a href={`#/buku/${book.id}`} onClick={close} className="text-sm font-semibold text-cobalt dark:text-cobalt-lt hover:underline inline-flex items-center gap-1">
                Detail lengkap <Icon name="arrow-up-right" size={13} />
              </a>
              <span className="ml-auto"><AvailabilityPill available={book.available} copies={book.copies} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  BookCover, BookCard, Badge, Tag, SectionLabel, Eyebrow,
  SkeletonCover, SkeletonLine, SkeletonCard, Button, Rating, AvailabilityPill,
  StatCard, FeatureCard, Step, Accordion, Marquee, borrowCount,
  Bracket, LiveTicker, Tabs, QuickViewHost, openQuickView,
  BookmarkButton, TypeChip, BookMedia, bookMedia, MediaSlot,
});
