import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { Star, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

type Member = {
    id: number;
    name: string;
    role: string;
    specialization: string | null;
    photo_url: string | null;
    is_featured: boolean;
};

type StructurePageProps = {
    structure: {
        featured: Member[];
        members: Member[];
    };
};

const content = {
    id: {
        eyebrow: 'Tentang Yayasan',
        title: 'Struktur Organisasi',
        subtitle:
            'Kenali para pengurus dan staf yang setiap hari merawat rak, koleksi, layanan, dan program literasi perpustakaan.',
        teamHeading: 'Tim & Staf Perpustakaan',
        teamSub: 'Orang-orang di balik layanan harian perpustakaan.',
        empty: 'Data struktur organisasi belum tersedia.',
        leadBadge: 'Pimpinan',
    },
    en: {
        eyebrow: 'About the Foundation',
        title: 'Organization Structure',
        subtitle:
            'Meet the people who tend the shelves, collection, services, and literacy programs of the library every day.',
        teamHeading: 'Library Team & Staff',
        teamSub: 'The people behind the day-to-day library services.',
        empty: 'Organization structure data is not available yet.',
        leadBadge: 'Leadership',
    },
};

// Palet aksen untuk avatar inisial (saat foto belum diunggah).
const PALETTES = [
    { bg: '#14201B', ink: '#34C690' },
    { bg: '#1F9D73', ink: '#08120D' },
    { bg: '#243831', ink: '#D2A653' },
    { bg: '#15543F', ink: '#EAF6F0' },
    { bg: '#B0822F', ink: '#0E1311' },
    { bg: '#0E1311', ink: '#34C690' },
];

function initials(name: string): string {
    return name
        .replace(
            /(Romo|Fr\.|Dr\.|Bapak|Ibu|Mr\.|Mrs\.|Pr\.|S\.[A-Za-z.]+|M\.[A-Za-z.]+)/g,
            '',
        )
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

/** Avatar: foto bila tersedia, jika tidak tampilkan inisial dengan palet aksen. */
function Avatar({
    member,
    className = '',
    rounded = 'rounded-2xl',
}: {
    member: Member;
    className?: string;
    rounded?: string;
}) {
    if (member.photo_url) {
        return (
            <ImageWithFallback
                src={member.photo_url}
                alt={member.name}
                className={`${rounded} object-cover ${className}`}
            />
        );
    }
    const pal = PALETTES[member.id % PALETTES.length] ?? PALETTES[0];
    return (
        <div
            className={`grid place-items-center font-display text-3xl font-semibold ${rounded} ${className}`}
            style={{ background: pal.bg, color: pal.ink }}
            aria-label={member.name}
        >
            {initials(member.name)}
        </div>
    );
}

/** Kartu sorotan (pimpinan) — foto besar + detail, gaya profil profesional. */
function FeaturedCard({ member, leadBadge }: { member: Member; leadBadge: string }) {
    return (
        <motion.div
            {...fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift transition-all duration-300 hover:border-cobalt/50 dark:bg-night-2"
        >
            {/* aksen gradien lembut */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cobalt/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80 dark:bg-cobalt/15" />
            <div className="relative grid gap-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[20rem]">
                    <Avatar
                        member={member}
                        rounded="rounded-none"
                        className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center gap-3 p-7 lg:p-10">
                    <span className="tracking-editorial inline-flex w-fit items-center gap-1.5 rounded-full bg-cobalt-50 px-3 py-1 font-mono text-[10px] font-bold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                        <Star className="h-3 w-3 fill-current" />
                        {leadBadge} · {member.role}
                    </span>
                    <h3
                        className="font-display text-2xl leading-tight text-foreground lg:text-4xl"
                        style={{ textWrap: 'balance' }}
                    >
                        {member.name}
                    </h3>
                    {member.specialization && (
                        <p className="text-sm text-muted-foreground lg:text-base">
                            {member.specialization}
                        </p>
                    )}
                    <span className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-cobalt to-brass" />
                </div>
            </div>
        </motion.div>
    );
}

/** Kartu anggota tim — foto portrait + nama + jabatan + bidang. */
function MemberCard({ member, index }: { member: Member; index: number }) {
    return (
        <motion.div
            {...fadeUp}
            transition={{ delay: (index % 4) * 0.06 }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-cobalt/50 hover:shadow-lift dark:bg-night-2"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <Avatar
                    member={member}
                    rounded="rounded-none"
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent opacity-70" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 p-5">
                <h4
                    className="font-display text-base leading-snug text-foreground"
                    style={{ textWrap: 'balance' }}
                >
                    {member.name}
                </h4>
                <span className="tracking-editorial inline-flex items-center rounded-full bg-cobalt-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                    {member.role}
                </span>
                {member.specialization && (
                    <p className="mt-auto pt-2 text-xs leading-relaxed text-muted-foreground">
                        {member.specialization}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

function OrganizationStructurePage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;
    const { structure } = usePage<StructurePageProps>().props;
    const featured = structure?.featured ?? [];
    const members = structure?.members ?? [];
    const isEmpty = featured.length === 0 && members.length === 0;

    return (
        <section className="mx-auto max-w-[100rem] bg-background px-6 pt-16 pb-24 lg:px-10">
            {/* Header */}
            <div className="text-center">
                <motion.span
                    {...fadeUp}
                    className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                    {t.eyebrow}
                </motion.span>
                <motion.h1
                    {...fadeUp}
                    transition={{ delay: 0.05 }}
                    className="mt-5 font-display text-4xl text-foreground lg:text-6xl"
                    style={{ textWrap: 'balance' }}
                >
                    {t.title}
                </motion.h1>
                <motion.p
                    {...fadeUp}
                    transition={{ delay: 0.1 }}
                    className="mx-auto mt-4 max-w-2xl text-foreground/70"
                >
                    {t.subtitle}
                </motion.p>
            </div>

            {isEmpty ? (
                <p className="mt-20 text-center text-muted-foreground">{t.empty}</p>
            ) : (
                <>
                    {/* Sorotan pimpinan */}
                    {featured.length > 0 && (
                        <div
                            className={`mt-14 grid gap-6 ${
                                featured.length > 1
                                    ? 'lg:grid-cols-2'
                                    : 'mx-auto max-w-4xl'
                            }`}
                        >
                            {featured.map((m) => (
                                <FeaturedCard
                                    key={m.id}
                                    member={m}
                                    leadBadge={t.leadBadge}
                                />
                            ))}
                        </div>
                    )}

                    {/* Tim & staf */}
                    {members.length > 0 && (
                        <div className="mt-20">
                            <motion.div
                                {...fadeUp}
                                className="mb-10 flex flex-col items-center text-center"
                            >
                                <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-editorial text-cobalt dark:text-cobalt-lt">
                                    <Users className="h-3.5 w-3.5" />
                                    {t.teamHeading}
                                </span>
                                <span className="h-1 w-14 rounded-full bg-gradient-to-r from-cobalt to-brass" />
                                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                                    {t.teamSub}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {members.map((m, i) => (
                                    <MemberCard key={m.id} member={m} index={i} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default OrganizationStructurePage;
