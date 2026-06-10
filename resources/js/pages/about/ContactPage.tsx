import { useState } from 'react';
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Instagram,
    Clock,
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    X,
    ExternalLink,
    Send,
} from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
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

// URL Google Maps berdasarkan alamat pada halaman ini.
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CONTACT.address,
)}`;

type NoticeKind = 'success' | 'error';
type Notice = { kind: NoticeKind; title: string; desc: string } | null;

const content = {
    id: {
        eyebrow: 'Hubungi Kami',
        titlePre: 'Mari ',
        titleEm: 'berkirim kabar',
        lead: 'Untuk pertanyaan koleksi, kemitraan, peminjaman antar-perpustakaan, atau hanya menyapa — kami menjawab dalam 1×24 jam pada hari kerja.',
        fName: 'Nama',
        fStatus: 'Status',
        fEmail: 'Surel',
        fEmailHint: 'Gunakan alamat email aktif Anda agar kami dapat membalas.',
        fPhone: 'Nomor telepon (opsional)',
        fSubject: 'Subjek',
        fMessage: 'Pesan Anda',
        statuses: ['Siswa', 'Orang tua/Wali', 'Guru', 'Alumni', 'Tamu', 'Lainnya'],
        selectPlaceholder: 'Pilih status…',
        agree: 'Saya menyetujui pengelolaan data sesuai kebijakan privasi yayasan.',
        send: 'Kirim Pesan',
        sending: 'Mengirim…',
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
        openMaps: 'Buka di Google Maps',
        // Notifikasi
        nSuccessTitle: 'Pesan terkirim. Terima kasih!',
        nSuccessDesc: 'Petugas perpustakaan telah menerima pesan Anda dan akan membalas paling lambat 1×24 jam pada hari kerja.',
        nConsentTitle: 'Persetujuan diperlukan',
        nConsentDesc: 'Mohon centang persetujuan pengelolaan data terlebih dahulu sebelum mengirim pesan.',
        nNoStaffTitle: 'Pesan belum dapat dikirim',
        nNoStaffDesc: 'Mohon maaf, saat ini petugas perpustakaan tidak tersedia. Silakan coba lagi nanti atau hubungi kami melalui telepon/surel.',
        nFailTitle: 'Terjadi kesalahan',
        nFailDesc: 'Pesan gagal dikirim karena gangguan teknis. Silakan coba beberapa saat lagi.',
        nValidationTitle: 'Lengkapi formulir',
        nValidationDesc: 'Beberapa isian belum lengkap atau tidak valid. Mohon periksa kembali formulir Anda.',
        close: 'Tutup',
    },
    en: {
        eyebrow: 'Contact Us',
        titlePre: "Let's ",
        titleEm: 'stay in touch',
        lead: 'For collection questions, partnerships, inter-library loans, or just to say hello — we reply within one business day.',
        fName: 'Name',
        fStatus: 'Status',
        fEmail: 'Email',
        fEmailHint: 'Use an active email address so we can reply to you.',
        fPhone: 'Phone number (optional)',
        fSubject: 'Subject',
        fMessage: 'Your message',
        statuses: ['Student', 'Parent/Guardian', 'Teacher', 'Alumni', 'Guest', 'Other'],
        selectPlaceholder: 'Select status…',
        agree: 'I agree to the processing of my data per the foundation privacy policy.',
        send: 'Send Message',
        sending: 'Sending…',
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
        openMaps: 'Open in Google Maps',
        // Notifications
        nSuccessTitle: 'Message sent. Thank you!',
        nSuccessDesc: 'Our library staff has received your message and will reply within one business day.',
        nConsentTitle: 'Consent required',
        nConsentDesc: 'Please tick the data-processing consent before sending your message.',
        nNoStaffTitle: 'Message could not be sent',
        nNoStaffDesc: 'Sorry, no library staff is available right now. Please try again later or reach us by phone/email.',
        nFailTitle: 'Something went wrong',
        nFailDesc: 'Your message failed to send due to a technical issue. Please try again shortly.',
        nValidationTitle: 'Complete the form',
        nValidationDesc: 'Some fields are missing or invalid. Please review your form and try again.',
        close: 'Close',
    },
};

const cellCls =
    'group block bg-card p-5 transition-colors focus-within:bg-background dark:bg-night-2 dark:focus-within:bg-night-3';
const labelCls =
    'tracking-editorial mb-2 font-mono text-[10px] uppercase text-muted-foreground';
const inputCls =
    'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/70';

function ClickableMap({ caption, openLabel }: { caption: string; openLabel: string }) {
    return (
        <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={openLabel}
            className="hairline group relative block aspect-[4/3] cursor-pointer overflow-hidden border bg-paper-2 transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt dark:bg-night-3"
        >
            <svg
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
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

            {/* Pin */}
            <div className="absolute" style={{ left: '52%', top: '55%' }}>
                <div className="relative -translate-x-1/2 -translate-y-full">
                    <div className="absolute -inset-3 animate-ping rounded-full bg-cobalt/20" />
                    <div className="relative grid h-7 w-7 place-items-center rounded-full bg-cobalt text-paper shadow-lg transition-transform group-hover:scale-110">
                        <MapPin className="h-3.5 w-3.5" />
                    </div>
                </div>
            </div>

            {/* CTA hint */}
            <div className="tracking-editorial absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cobalt px-3 py-1.5 text-[10px] font-semibold uppercase text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLink className="h-3 w-3" />
                {openLabel}
            </div>

            <div className="tracking-editorial absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-card/90 px-3 py-2 font-mono text-[10px] uppercase backdrop-blur dark:bg-night/90">
                <MapPin className="h-3 w-3 text-cobalt dark:text-cobalt-lt" />
                {caption}
            </div>
        </a>
    );
}

function NoticeModal({ notice, onClose, t }: { notice: Notice; onClose: () => void; t: typeof content.id }) {
    return (
        <AnimatePresence>
            {notice && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        role="alertdialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 16 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        onClick={(e) => e.stopPropagation()}
                        className="hairline relative w-full max-w-md overflow-hidden border bg-card shadow-2xl dark:bg-night-2"
                    >
                        <button
                            onClick={onClose}
                            aria-label={t.close}
                            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="p-7">
                            <div
                                className={`grid h-14 w-14 place-items-center rounded-full ${
                                    notice.kind === 'success'
                                        ? 'bg-cobalt/12 text-cobalt dark:text-cobalt-lt'
                                        : 'bg-amber-500/12 text-amber-600 dark:text-amber-400'
                                }`}
                            >
                                {notice.kind === 'success' ? (
                                    <CheckCircle2 className="h-7 w-7" />
                                ) : (
                                    <AlertTriangle className="h-7 w-7" />
                                )}
                            </div>

                            <h3 className="mt-5 font-display text-2xl leading-tight text-foreground">
                                {notice.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                                {notice.desc}
                            </p>

                            <button
                                onClick={onClose}
                                className={`btn-press mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
                                    notice.kind === 'success'
                                        ? 'bg-cobalt hover:bg-cobalt-dk'
                                        : 'bg-amber-600 hover:bg-amber-700'
                                }`}
                            >
                                {t.close}
                            </button>
                        </div>

                        <div
                            className={`h-1.5 w-full ${
                                notice.kind === 'success' ? 'bg-cobalt' : 'bg-amber-500'
                            }`}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ContactPage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;

    const [form, setForm] = useState({
        name: '',
        status: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [agree, setAgree] = useState(false);
    const [sending, setSending] = useState(false);
    const [notice, setNotice] = useState<Notice>(null);

    const set = (k: keyof typeof form) => (v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;

        // Validasi persetujuan di sisi klien → popup notifikasi.
        if (!agree) {
            setNotice({ kind: 'error', title: t.nConsentTitle, desc: t.nConsentDesc });
            return;
        }

        setSending(true);
        router.post(
            route('about.contact.send'),
            { ...form, agree },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNotice({ kind: 'success', title: t.nSuccessTitle, desc: t.nSuccessDesc });
                    setForm({ name: '', status: '', email: '', phone: '', subject: '', message: '' });
                    setAgree(false);
                },
                onError: (errors) => {
                    const code = errors?.contact;
                    if (code === 'contact.no_manager') {
                        setNotice({ kind: 'error', title: t.nNoStaffTitle, desc: t.nNoStaffDesc });
                    } else if (code === 'contact.failed') {
                        setNotice({ kind: 'error', title: t.nFailTitle, desc: t.nFailDesc });
                    } else {
                        // Galat validasi field dari server.
                        setNotice({ kind: 'error', title: t.nValidationTitle, desc: t.nValidationDesc });
                    }
                },
                onFinish: () => setSending(false),
            },
        );
    };

    return (
        <section className="bg-background pb-24">
            <NoticeModal notice={notice} onClose={() => setNotice(null)} t={t} />

            <div className="mx-auto max-w-[100rem] px-6 pt-16 lg:px-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Left: header + form */}
                    <div className="col-span-full lg:col-span-7">
                        <motion.span
                            {...fadeUp}
                            className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt"
                        >
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cobalt dark:bg-cobalt-lt" />
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

                        <motion.form
                            {...fadeUp}
                            transition={{ delay: 0.15 }}
                            onSubmit={handleSubmit}
                            className="hairline mt-12 grid grid-cols-2 gap-px border bg-line dark:bg-night-line"
                        >
                            {/* Nama */}
                            <label className={`col-span-2 ${cellCls}`}>
                                <div className={labelCls}>{t.fName}</div>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => set('name')(e.target.value)}
                                    className={inputCls}
                                    placeholder=" "
                                />
                            </label>

                            {/* Status */}
                            <label className={`col-span-2 sm:col-span-1 ${cellCls}`}>
                                <div className={labelCls}>{t.fStatus}</div>
                                <select
                                    required
                                    value={form.status}
                                    onChange={(e) => set('status')(e.target.value)}
                                    className={`${inputCls} cursor-pointer [&>option]:bg-card [&>option]:text-foreground dark:[&>option]:bg-night-2 dark:[&>option]:text-paper`}
                                >
                                    <option value="">{t.selectPlaceholder}</option>
                                    {t.statuses.map((o) => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Surel */}
                            <label className={`col-span-2 sm:col-span-1 ${cellCls}`}>
                                <div className={labelCls}>{t.fEmail}</div>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => set('email')(e.target.value)}
                                    className={inputCls}
                                    placeholder="nama@gmail.com"
                                />
                                <p className="mt-1.5 text-[11px] text-muted-foreground">
                                    {t.fEmailHint}
                                </p>
                            </label>

                            {/* Nomor telepon — komponen Phone Input */}
                            <div className={`contact-phone col-span-2 ${cellCls}`}>
                                <div className={labelCls}>{t.fPhone}</div>
                                <PhoneInput
                                    country="id"
                                    value={form.phone}
                                    onChange={(val) => set('phone')(val)}
                                    containerClass="w-full"
                                    inputProps={{ name: 'phone' }}
                                />
                            </div>

                            {/* Subjek */}
                            <label className={`col-span-2 ${cellCls}`}>
                                <div className={labelCls}>{t.fSubject}</div>
                                <input
                                    type="text"
                                    required
                                    value={form.subject}
                                    onChange={(e) => set('subject')(e.target.value)}
                                    className={inputCls}
                                    placeholder=" "
                                />
                            </label>

                            {/* Pesan */}
                            <label className={`col-span-2 ${cellCls}`}>
                                <div className={labelCls}>{t.fMessage}</div>
                                <textarea
                                    rows={5}
                                    required
                                    value={form.message}
                                    onChange={(e) => set('message')(e.target.value)}
                                    className={`${inputCls} resize-none`}
                                    placeholder="…"
                                />
                            </label>

                            {/* Footer */}
                            <div className="col-span-2 flex flex-col gap-4 bg-card p-5 dark:bg-night-2 sm:flex-row sm:items-center sm:justify-between">
                                <label className="flex cursor-pointer items-start gap-2 text-xs text-foreground/70 sm:items-center">
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 accent-cobalt sm:mt-0"
                                    />
                                    {t.agree}
                                </label>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="btn-press inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dk disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {t.sending}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            {t.send}
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    </div>

                    {/* Right: info */}
                    <div className="col-span-full lg:col-span-5">
                        <div className="space-y-6 lg:sticky lg:top-32">
                            <a
                                href={MAPS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hairline group block border bg-card p-6 transition-colors hover:bg-background dark:bg-night-2 dark:hover:bg-night-3"
                            >
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-cobalt dark:text-cobalt-lt" />
                                    <div>
                                        <div className="tracking-editorial flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.addressLabel}
                                            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                        <address className="mt-2 leading-relaxed text-foreground not-italic group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                                            {CONTACT.address}
                                        </address>
                                    </div>
                                </div>
                            </a>

                            <ClickableMap caption={t.mapCaption} openLabel={t.openMaps} />

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
                                        <a
                                            href={`https://instagram.com/${CONTACT.ig.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground hover:text-cobalt dark:hover:text-cobalt-lt"
                                        >
                                            {CONTACT.ig}
                                        </a>
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
