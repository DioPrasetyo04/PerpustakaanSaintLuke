import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/hooks/useLanguage';
import { stripHtml } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { BookProps } from '@/types/DataTypes/BooksProps';

type SpotlightProps = {
    book?: BookProps | null;
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const Spotlight = ({ book }: SpotlightProps) => {
    const { language } = useLanguage();
    if (!book) return null;

    const rating = book.avg_rating ?? 4.8;
    const synopsis =
        stripHtml(book.synopsis) ||
        (language === 'id'
            ? 'Pilihan pustakawan minggu ini — sebuah bacaan yang layak masuk daftar baca setiap jenjang.'
            : "This week's librarian pick — a read worth adding to every reading list.");

    return (
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
            <div className="grid grid-cols-12 gap-5">
                {/* Big spotlight */}
                <motion.div {...fadeUp} className="col-span-12 lg:col-span-8">
                    <div className="bracket relative flex h-full min-h-[260px] overflow-hidden rounded-xl2 bg-cobalt text-paper">
                        <div className="line-grid absolute inset-0 opacity-20" />
                        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-brass/20 blur-2xl" />
                        <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-8 lg:p-10">
                            <div>
                                <span className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-brass px-3 py-1 text-[11px] font-bold uppercase text-white">
                                    <Star className="h-3 w-3 fill-current" />
                                    {language === 'id'
                                        ? 'Sorotan Minggu Ini'
                                        : 'This Week’s Highlight'}
                                </span>
                                <h3
                                    className="mt-5 font-display text-3xl leading-tight text-paper lg:text-4xl"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {language === 'id'
                                        ? 'Pilihan pustakawan: '
                                        : 'Librarian’s pick: '}
                                    <em className="text-brass-lt not-italic">
                                        {book.title}
                                    </em>
                                </h3>
                                <p className="mt-3 line-clamp-2 max-w-md text-sm leading-relaxed text-paper/70">
                                    {synopsis}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('book.detail', { slug: book.slug })}
                                    className="btn-press inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-cobalt transition-colors hover:bg-card"
                                >
                                    {language === 'id' ? 'Baca Sinopsis' : 'Read Synopsis'}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-paper/70">
                                    <span className="inline-flex items-center gap-1 text-brass-lt">
                                        <Star className="h-3.5 w-3.5 fill-current" />
                                        {rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 hidden items-center pr-8 sm:flex lg:pr-12">
                            <div className="rotate-3 overflow-hidden rounded-l-sm rounded-r-lg shadow-book-3d spine-shadow">
                                <ImageWithFallback
                                    src={book.cover}
                                    alt={book.title}
                                    className="aspect-[3/4] w-40 object-cover lg:w-44"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Member CTA card */}
                <motion.div
                    {...fadeUp}
                    transition={{ delay: 0.12 }}
                    className="col-span-12 lg:col-span-4"
                >
                    <div className="bracket relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-xl2 border-2 border-cobalt/30 bg-cobalt-50 p-8 text-cobalt dark:border-cobalt-lt/30 dark:bg-night-2 dark:text-cobalt-lt">
                        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-brass/10 blur-2xl" />
                        <div className="relative">
                            <span className="tracking-editorial font-mono text-[11px] uppercase text-brass dark:text-brass-lt">
                                {language === 'id' ? 'Anggota Baru?' : 'New Member?'}
                            </span>
                            <div
                                className="mt-4 font-display text-3xl leading-tight text-foreground"
                                style={{ textWrap: 'balance' }}
                            >
                                {language === 'id' ? (
                                    <>
                                        Aktivasi kartu, pinjam{' '}
                                        <em className="not-italic">gratis</em> selamanya.
                                    </>
                                ) : (
                                    <>
                                        Activate your card, borrow{' '}
                                        <em className="not-italic">free</em> forever.
                                    </>
                                )}
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">
                                {language === 'id'
                                    ? 'Seluruh siswa Yayasan Santo Lukas otomatis jadi anggota. Cukup aktivasi sekali.'
                                    : 'All Saint Luke Foundation students are members automatically. Just activate once.'}
                            </p>
                        </div>
                        <div className="relative mt-6 flex items-center justify-between">
                            <Link
                                href="/register"
                                className="btn-press inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dk"
                            >
                                {language === 'id' ? 'Aktivasi Sekarang' : 'Activate Now'}
                            </Link>
                            <span className="tracking-editorial font-mono text-[11px] uppercase text-muted-foreground">
                                {language === 'id' ? 'Gratis' : 'Free'}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Spotlight;
