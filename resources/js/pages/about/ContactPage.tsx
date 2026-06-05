import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Clock, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const CONTACT = {
    address:
        'Jalan Pademangan II Gang 7 No. 54, Kelurahan Pademangan Timur, Kecamatan Pademangan, Kota Jakarta Utara, DKI Jakarta 14410',
    email: 'santo.lukas@yahoo.co.id',
    phone: '021-6507574',
    ig: '@yayasansantolukas',
};

const content = {
    id: {
        eyebrow: 'Hubungi Kami',
        titlePre: 'Mari ',
        titleEm: 'berkirim kabar',
        lead: 'Untuk pertanyaan koleksi, kemitraan, peminjaman antar-perpustakaan, atau hanya menyapa — kami menjawab dalam 1×24 jam pada hari kerja.',
        fName: 'Nama',
        fStatus: 'Status',
        fEmail: 'Surel',
        fPhone: 'Nomor telepon (opsional)',
        fSubject: 'Subjek',
        fMessage: 'Pesan Anda',
        statuses: ['Siswa', 'Orang tua/Wali', 'Guru', 'Alumni', 'Tamu', 'Mitra'],
        agree: 'Saya menyetujui pengelolaan data sesuai kebijakan privasi yayasan.',
        send: 'Kirim Pesan',
        sentTitle: 'Pesan terkirim. Terima kasih.',
        sentDesc: 'Tim kami akan membalas paling lambat 1×24 jam pada hari kerja.',
        addressLabel: 'Alamat',
        phoneLabel: 'Telepon',
        emailLabel: 'Surel',
        igLabel: 'Instagram',
        hoursLabel: 'Jam Operasional',
        hours: [
            { day: 'Senin – Jumat', time: '06.30 – 16.00' },
            { day: 'Sabtu', time: '07.00 – 12.00' },
            { day: 'Minggu & Libur Nasional', time: 'Tutup' },
        ],
        mapCaption: 'Perpustakaan Santo Lukas · Jakarta Utara',
    },
    en: {
        eyebrow: 'Contact Us',
        titlePre: "Let's ",
        titleEm: 'stay in touch',
        lead: 'For collection questions, partnerships, inter-library loans, or just to say hello — we reply within one business day.',
        fName: 'Name',
        fStatus: 'Status',
        fEmail: 'Email',
        fPhone: 'Phone number (optional)',
        fSubject: 'Subject',
        fMessage: 'Your message',
        statuses: ['Student', 'Parent/Guardian', 'Teacher', 'Alumni', 'Guest', 'Partner'],
        agree: 'I agree to the processing of my data per the foundation privacy policy.',
        send: 'Send Message',
        sentTitle: 'Message sent. Thank you.',
        sentDesc: 'Our team will reply within one business day.',
        addressLabel: 'Address',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        igLabel: 'Instagram',
        hoursLabel: 'Opening Hours',
        hours: [
            { day: 'Mon – Fri', time: '06.30 – 16.00' },
            { day: 'Saturday', time: '07.00 – 12.00' },
            { day: 'Sunday & National Holidays', time: 'Closed' },
        ],
        mapCaption: 'Saint Luke Library · North Jakarta',
    },
};

function Field({
    label,
    type = 'text',
    wide,
    options,
}: {
    label: string;
    type?: string;
    wide?: boolean;
    options?: string[];
}) {
    const cls = wide ? 'col-span-2' : 'col-span-2 sm:col-span-1';
    const inputCls =
        'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/70';
    return (
        <label
            className={`${cls} group block bg-card p-5 transition-colors focus-within:bg-background dark:bg-night-2 dark:focus-within:bg-night-3`}
        >
            <div className="tracking-editorial mb-2 font-mono text-[10px] uppercase text-muted-foreground">
                {label}
            </div>
            {type === 'textarea' ? (
                <textarea rows={5} className={`${inputCls} resize-none`} placeholder="…" />
            ) : type === 'select' ? (
                <select className={inputCls}>
                    <option value="">…</option>
                    {options?.map((o) => <option key={o}>{o}</option>)}
                </select>
            ) : (
                <input type={type} className={inputCls} placeholder=" " />
            )}
        </label>
    );
}

function StylizedMap({ caption }: { caption: string }) {
    return (
        <div className="hairline relative aspect-[4/3] overflow-hidden border bg-paper-2 dark:bg-night-3">
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
            >
                <rect x="0" y="0" width="400" height="300" className="fill-[#EFE9DC] dark:fill-[#161E1A]" />
                <path d="M0 0 L400 0 L400 70 Q200 80 0 60 Z" fill="#1F9D73" opacity=".18" />
                <g stroke="#8B847A" strokeWidth="2" opacity=".5" fill="none">
                    <path d="M0 180 L400 160" />
                    <path d="M0 130 Q200 145 400 110" />
                    <path d="M120 0 L140 300" />
                    <path d="M250 0 L240 300" />
                </g>
                <g className="fill-[#E4DCC9] stroke-[#D5C9A5] dark:fill-[#1E2A24] dark:stroke-[#283731]">
                    <rect x="30" y="195" width="50" height="35" />
                    <rect x="90" y="200" width="40" height="40" />
                    <rect x="155" y="170" width="60" height="30" />
                    <rect x="270" y="170" width="60" height="50" />
                    <rect x="60" y="240" width="55" height="40" />
                </g>
            </svg>
            <div className="absolute" style={{ left: '52%', top: '55%' }}>
                <div className="relative -translate-x-1/2 -translate-y-full">
                    <div className="absolute -inset-3 animate-ping rounded-full bg-cobalt/20" />
                    <div className="relative grid h-7 w-7 place-items-center rounded-full bg-cobalt text-paper shadow-lg">
                        <MapPin className="h-3.5 w-3.5" />
                    </div>
                </div>
            </div>
            <div className="tracking-editorial absolute bottom-3 left-3 bg-card/90 px-3 py-2 font-mono text-[10px] uppercase backdrop-blur dark:bg-night/90">
                {caption}
            </div>
        </div>
    );
}

function ContactPage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;
    const [sent, setSent] = useState(false);

    return (
        <section className="bg-background pb-24">
            <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
                <div className="grid grid-cols-12 gap-10">
                    {/* Left: header + form */}
                    <div className="col-span-12 lg:col-span-7">
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
                            className="mt-5 font-display text-4xl leading-[1.05] text-foreground lg:text-6xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t.titlePre}
                            <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                {t.titleEm}
                            </em>
                            .
                        </motion.h1>
                        <motion.p
                            {...fadeUp}
                            transition={{ delay: 0.1 }}
                            className="mt-4 max-w-xl text-foreground/70"
                        >
                            {t.lead}
                        </motion.p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSent(true);
                            }}
                            className="hairline mt-12 grid grid-cols-2 gap-px border bg-line dark:bg-night-line"
                        >
                            <Field label={t.fName} wide />
                            <Field label={t.fStatus} type="select" options={t.statuses} />
                            <Field label={t.fEmail} type="email" />
                            <Field label={t.fPhone} type="tel" />
                            <Field label={t.fSubject} wide />
                            <Field label={t.fMessage} type="textarea" wide />
                            <div className="col-span-2 flex items-center justify-between bg-card p-5 dark:bg-night-2">
                                <label className="flex items-center gap-2 text-xs text-foreground/70">
                                    <input type="checkbox" required className="accent-cobalt" />
                                    {t.agree}
                                </label>
                                <button
                                    type="submit"
                                    className="btn-press inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dk"
                                >
                                    {t.send}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </form>

                        {sent && (
                            <div className="mt-6 flex items-start gap-3 border border-cobalt/40 bg-cobalt/10 p-4 text-sm text-cobalt-dk dark:text-cobalt-lt">
                                <Check className="mt-0.5 h-4 w-4" />
                                <div>
                                    <div className="font-display text-base">{t.sentTitle}</div>
                                    <div className="mt-1 text-xs text-foreground/70">
                                        {t.sentDesc}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: info */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="space-y-6 lg:sticky lg:top-32">
                            <div className="hairline border bg-card p-6 dark:bg-night-2">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-cobalt dark:text-cobalt-lt" />
                                    <div>
                                        <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.addressLabel}
                                        </div>
                                        <address className="mt-2 leading-relaxed text-foreground not-italic">
                                            {CONTACT.address}
                                        </address>
                                    </div>
                                </div>
                            </div>

                            <StylizedMap caption={t.mapCaption} />

                            <div className="hairline divide-y border bg-card dark:bg-night-2">
                                <div className="flex items-center gap-3 p-5">
                                    <Phone className="h-4 w-4 shrink-0 text-cobalt dark:text-cobalt-lt" />
                                    <div>
                                        <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.phoneLabel}
                                        </div>
                                        <a
                                            href={`tel:${CONTACT.phone}`}
                                            className="font-mono text-lg tabnum text-foreground hover:text-cobalt dark:hover:text-cobalt-lt"
                                        >
                                            {CONTACT.phone}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-5">
                                    <Mail className="h-4 w-4 shrink-0 text-cobalt dark:text-cobalt-lt" />
                                    <div>
                                        <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.emailLabel}
                                        </div>
                                        <a
                                            href={`mailto:${CONTACT.email}`}
                                            className="text-foreground hover:text-cobalt dark:hover:text-cobalt-lt"
                                        >
                                            {CONTACT.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-5">
                                    <Instagram className="h-4 w-4 shrink-0 text-cobalt dark:text-cobalt-lt" />
                                    <div>
                                        <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.igLabel}
                                        </div>
                                        <span className="text-foreground">{CONTACT.ig}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-ink p-6 text-paper dark:bg-night-2">
                                <div className="mb-4 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-cobalt-lt" />
                                    <div className="tracking-editorial font-mono text-[10px] uppercase text-cobalt-lt">
                                        {t.hoursLabel}
                                    </div>
                                </div>
                                <dl className="divide-y divide-paper/10">
                                    {t.hours.map((h) => (
                                        <div
                                            key={h.day}
                                            className="flex items-center justify-between py-3"
                                        >
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

export default ContactPage;
