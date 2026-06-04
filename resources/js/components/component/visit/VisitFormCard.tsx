import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import {
    BadgeCheck,
    CheckCircle2,
    QrCode,
    Search,
    UserRound,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { route } from 'ziggy-js';
import { BarcodeScanner } from './BarcodeScanner';
import { FaPlusCircle } from 'react-icons/fa';

const OTHER = 'other';
const CLEAR_TYPE = '__clear__';

export interface UserTypeOption {
    value: string;
    label: string;
}

interface SearchUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface VisitFormData {
    user_id: number | null;
    name: string;
    address: string;
    type: string;
    type_other: string;
    needs: string;
    visit_date: string;
    note: string;
    [key: string]: unknown;
}

interface UserPreview {
    name: string;
    email: string;
    avatar: string;
    verified: boolean;
}

/** Tanggal-waktu sekarang dalam format input datetime-local (waktu lokal kiosk = WIB). */
function nowLocalDatetime(): string {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function emptyVisit(): VisitFormData {
    return {
        user_id: null,
        name: '',
        address: '',
        type: '',
        type_other: '',
        needs: '',
        visit_date: nowLocalDatetime(),
        note: '',
    };
}

export function VisitFormCard({
    userTypes,
    className,
}: {
    userTypes: UserTypeOption[];
    className?: string;
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<VisitFormData>(emptyVisit());

    // 'guest' | userId (string) | '' (belum memilih)
    const [selector, setSelector] = useState<string>('');
    const [preview, setPreview] = useState<UserPreview | null>(null);
    const [success, setSuccess] = useState(false);
    const [scanOpen, setScanOpen] = useState(false);

    // Pencarian pengguna terdaftar.
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchUser[]>([]);
    const [searching, setSearching] = useState(false);
    const [openResults, setOpenResults] = useState(false);

    const nameRef = useRef<HTMLInputElement | null>(null);

    // Debounced search — semua setState dilakukan di dalam callback async (bukan body efek).
    useEffect(() => {
        const q = query.trim();
        if (q === '') return;

        let active = true;
        const t = setTimeout(async () => {
            if (active) setSearching(true);
            try {
                const { data: rows } = await axios.get<SearchUser[]>(
                    route('visit.search-users'),
                    { params: { q } },
                );
                if (active) setResults(rows);
            } catch {
                if (active) setResults([]);
            } finally {
                if (active) setSearching(false);
            }
        }, 300);

        return () => {
            active = false;
            clearTimeout(t);
        };
    }, [query]);

    // Hasil hanya ditampilkan saat ada kata kunci (hindari sisa hasil lama saat input kosong).
    const shownResults = query.trim() === '' ? [] : results;

    /** Reset semua field detail (mirror afterStateUpdated di VisitForm). */
    const resetDetail = () => {
        setData((prev) => ({
            ...prev,
            user_id: null,
            name: '',
            address: '',
            type: '',
            type_other: '',
            needs: '',
        }));
        setPreview(null);
        clearErrors();
    };

    const chooseGuest = () => {
        setSelector('guest');
        resetDetail();
        setOpenResults(false);
        setQuery('');
        setTimeout(() => nameRef.current?.focus(), 60);
    };

    const chooseUser = async (user: SearchUser) => {
        setSelector(String(user.id));
        setOpenResults(false);
        setQuery('');
        clearErrors();
        try {
            const { data: detail } = await axios.get(
                route('visit.lookup-user', { user: user.id }),
            );
            setData((prev) => ({
                ...prev,
                user_id: detail.id,
                name: detail.name ?? '',
                address: detail.address ?? '',
                type: detail.type ?? '',
                type_other: detail.type_other ?? '',
                needs: '',
            }));
            setPreview({
                name: detail.name,
                email: detail.email,
                avatar: detail.avatar,
                verified: detail.verified,
            });
        } catch {
            // fallback: pakai data ringkas dari hasil pencarian
            setData((prev) => ({ ...prev, user_id: user.id, name: user.name }));
            setPreview({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                verified: false,
            });
        }
    };

    const clearSelection = () => {
        setSelector('');
        resetDetail();
        setQuery('');
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('visit.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccess(true);
                reset();
                setData('visit_date', nowLocalDatetime());
                setSelector('');
                setPreview(null);
            },
        });
    };

    const startNew = () => {
        setSuccess(false);
        setSelector('');
        setPreview(null);
        reset();
        setData('visit_date', nowLocalDatetime());
    };

    const detailVisible = selector !== '';
    const typeOtherVisible = !data.type || data.type === OTHER;
    const needsVisible = data.type === OTHER;

    return (
        <div className={cn('flex w-full flex-col gap-6', className)}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {/* Kolom form */}
                    <form onSubmit={submit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex flex-row items-center gap-2 p-2">
                                    <img
                                        src="/assets/logos/Saint-Luke.png"
                                        alt="Logo Santo Lukas"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <h1 className="text-2xl font-bold">
                                        Perpustakaan Santo Lukas
                                    </h1>
                                </div>
                                <h2 className="text-xl font-semibold">
                                    Pencatatan Kunjungan
                                </h2>
                                <p className="text-balance text-muted-foreground">
                                    Catat kunjungan pengguna terdaftar maupun
                                    tamu. Scan kartu anggota atau isi data
                                    secara manual.
                                </p>
                            </div>

                            {success ? (
                                <div className="flex flex-col items-center gap-4 py-6 text-center">
                                    <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <CheckCircle2 className="size-9" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-emerald-700">
                                        Kunjungan Berhasil Dicatat
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Terima kasih telah berkunjung. Data
                                        kunjungan Anda sudah tersimpan.
                                    </p>
                                    <Button type="button" onClick={startNew}>
                                        Catat Kunjungan Lain
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {/* Tombol scan */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setScanOpen(true)}
                                    >
                                        <QrCode className="size-4" /> Scan Kartu
                                        Anggota
                                    </Button>

                                    {/* Pemilih pengunjung */}
                                    <Field>
                                        <FieldLabel>
                                            Pilih / Cari Pengunjung
                                        </FieldLabel>

                                        {selector === 'guest' ? (
                                            <SelectedChip
                                                icon={
                                                    <UserRound className="size-4" />
                                                }
                                                label="User Lain (Tamu / Non-terdaftar)"
                                                onClear={clearSelection}
                                            />
                                        ) : preview ? (
                                            <SelectedChip
                                                avatar={preview.avatar}
                                                label={preview.name}
                                                sub={preview.email}
                                                onClear={clearSelection}
                                            />
                                        ) : (
                                            <div className="relative">
                                                <div className="relative">
                                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        className="pl-9"
                                                        value={query}
                                                        onChange={(e) => {
                                                            setQuery(
                                                                e.target.value,
                                                            );
                                                            setOpenResults(
                                                                true,
                                                            );
                                                        }}
                                                        onFocus={() =>
                                                            setOpenResults(true)
                                                        }
                                                        onBlur={() =>
                                                            setTimeout(
                                                                () =>
                                                                    setOpenResults(
                                                                        false,
                                                                    ),
                                                                150,
                                                            )
                                                        }
                                                        placeholder='Cari pengguna terdaftar, atau pilih "User Lain"…'
                                                    />
                                                </div>

                                                {openResults && (
                                                    <div className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md">
                                                        <button
                                                            type="button"
                                                            className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm hover:bg-accent"
                                                            onMouseDown={(
                                                                e,
                                                            ) => {
                                                                e.preventDefault();
                                                                chooseGuest();
                                                            }}
                                                        >
                                                            <UserRound className="size-4" />
                                                            <FaPlusCircle className="size-4" />{' '}
                                                            User Lain (Tamu /
                                                            Non-terdaftar)
                                                        </button>

                                                        {searching && (
                                                            <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
                                                                <Spinner className="size-4" />{' '}
                                                                Mencari…
                                                            </div>
                                                        )}

                                                        {!searching &&
                                                            query.trim() !==
                                                                '' &&
                                                            shownResults.length ===
                                                                0 && (
                                                                <div className="px-2 py-2 text-sm text-muted-foreground">
                                                                    Tidak ada
                                                                    pengguna
                                                                    ditemukan.
                                                                </div>
                                                            )}

                                                        {shownResults.map(
                                                            (u) => (
                                                                <button
                                                                    key={u.id}
                                                                    type="button"
                                                                    className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left hover:bg-accent"
                                                                    onMouseDown={(
                                                                        e,
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        void chooseUser(
                                                                            u,
                                                                        );
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            u.avatar
                                                                        }
                                                                        alt={
                                                                            u.name
                                                                        }
                                                                        className="size-8 rounded-full object-cover"
                                                                    />
                                                                    <span className="leading-tight">
                                                                        <span className="block text-sm font-semibold">
                                                                            {
                                                                                u.name
                                                                            }
                                                                        </span>
                                                                        <span className="block text-xs text-muted-foreground">
                                                                            {
                                                                                u.email
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <FieldDescription>
                                            Pilih "User Lain" untuk mencatat
                                            pengunjung tamu yang tidak
                                            terdaftar.
                                        </FieldDescription>
                                    </Field>

                                    {detailVisible && (
                                        <>
                                            {preview && (
                                                <div className="flex items-center gap-4 rounded-xl border bg-muted/40 p-4">
                                                    <img
                                                        src={preview.avatar}
                                                        alt={preview.name}
                                                        className="size-14 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-semibold">
                                                            {preview.name}
                                                        </div>
                                                        <div className="text-sm break-all text-muted-foreground">
                                                            {preview.email}
                                                        </div>
                                                        <div className="mt-1">
                                                            {preview.verified ? (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                                                    <BadgeCheck className="size-3" />{' '}
                                                                    Terverifikasi
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                                                                    Belum
                                                                    Verifikasi
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <Field>
                                                <FieldLabel htmlFor="name">
                                                    Nama Pengunjung
                                                </FieldLabel>
                                                <Input
                                                    id="name"
                                                    ref={nameRef}
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Nama lengkap pengunjung"
                                                    required
                                                />
                                                <FieldError>
                                                    {errors.name}
                                                </FieldError>
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="address">
                                                    Alamat Pengunjung
                                                </FieldLabel>
                                                <Input
                                                    id="address"
                                                    value={data.address}
                                                    onChange={(e) =>
                                                        setData(
                                                            'address',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Alamat pengunjung (kosongkan bila tidak ada)"
                                                />
                                                <FieldError>
                                                    {errors.address}
                                                </FieldError>
                                            </Field>

                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <Field>
                                                    <FieldLabel>
                                                        Tingkat Pendidikan /
                                                        Jenis
                                                    </FieldLabel>
                                                    <Select
                                                        value={
                                                            data.type ||
                                                            undefined
                                                        }
                                                        onValueChange={(v) =>
                                                            setData(
                                                                'type',
                                                                v === CLEAR_TYPE
                                                                    ? ''
                                                                    : v,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih tingkat atau isi manual" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value={
                                                                    CLEAR_TYPE
                                                                }
                                                            >
                                                                — Kosongkan (isi
                                                                Status manual) —
                                                            </SelectItem>
                                                            {userTypes.map(
                                                                (t) => (
                                                                    <SelectItem
                                                                        key={
                                                                            t.value
                                                                        }
                                                                        value={
                                                                            t.value
                                                                        }
                                                                    >
                                                                        {
                                                                            t.label
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FieldError>
                                                        {errors.type}
                                                    </FieldError>
                                                </Field>

                                                <Field>
                                                    <FieldLabel htmlFor="visit_date">
                                                        Tanggal Kunjungan
                                                    </FieldLabel>
                                                    <Input
                                                        id="visit_date"
                                                        type="datetime-local"
                                                        value={data.visit_date}
                                                        onChange={(e) =>
                                                            setData(
                                                                'visit_date',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <FieldError>
                                                        {errors.visit_date}
                                                    </FieldError>
                                                </Field>
                                            </div>

                                            {typeOtherVisible && (
                                                <Field>
                                                    <FieldLabel htmlFor="type_other">
                                                        Status
                                                    </FieldLabel>
                                                    <Input
                                                        id="type_other"
                                                        value={data.type_other}
                                                        onChange={(e) =>
                                                            setData(
                                                                'type_other',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="mis. Umum, Orang Tua, Guru Tamu, Alumni"
                                                        required={
                                                            data.type === OTHER
                                                        }
                                                    />
                                                    <FieldDescription>
                                                        Diisi bila pengunjung
                                                        bukan murid atau anggota
                                                        perpustakaan (tingkat
                                                        pendidikan tidak
                                                        tersedia).
                                                    </FieldDescription>
                                                    <FieldError>
                                                        {errors.type_other}
                                                    </FieldError>
                                                </Field>
                                            )}

                                            {needsVisible && (
                                                <Field>
                                                    <FieldLabel htmlFor="needs">
                                                        Keperluan
                                                    </FieldLabel>
                                                    <Input
                                                        id="needs"
                                                        value={data.needs}
                                                        onChange={(e) =>
                                                            setData(
                                                                'needs',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="mis. Membaca di tempat, Penelitian, Meminjam fasilitas"
                                                    />
                                                    <FieldDescription>
                                                        Keperluan / tujuan
                                                        kunjungan pengunjung.
                                                    </FieldDescription>
                                                    <FieldError>
                                                        {errors.needs}
                                                    </FieldError>
                                                </Field>
                                            )}

                                            <Field>
                                                <FieldLabel htmlFor="note">
                                                    Keterangan
                                                </FieldLabel>
                                                <Textarea
                                                    id="note"
                                                    value={data.note}
                                                    onChange={(e) =>
                                                        setData(
                                                            'note',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Catatan opsional terkait kunjungan"
                                                    rows={3}
                                                />
                                                <FieldError>
                                                    {errors.note}
                                                </FieldError>
                                            </Field>

                                            <Field>
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {processing ? (
                                                        <Spinner />
                                                    ) : (
                                                        'Simpan Kunjungan'
                                                    )}
                                                </Button>
                                            </Field>
                                        </>
                                    )}
                                </>
                            )}
                        </FieldGroup>
                    </form>

                    {/* Kolom gambar */}
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/assets/visit-form/visit_image.png"
                            alt="Kunjungan Perpustakaan"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>

            <BarcodeScanner
                open={scanOpen}
                onOpenChange={setScanOpen}
                onGuestFallback={chooseGuest}
            />
        </div>
    );
}

function SelectedChip({
    avatar,
    icon,
    label,
    sub,
    onClear,
}: {
    avatar?: string;
    icon?: React.ReactNode;
    label: string;
    sub?: string;
    onClear: () => void;
}) {
    return (
        <div className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
            {avatar ? (
                <img
                    src={avatar}
                    alt={label}
                    className="size-8 rounded-full object-cover"
                />
            ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                    {icon}
                </span>
            )}
            <span className="flex-1 leading-tight">
                <span className="block text-sm font-semibold">{label}</span>
                {sub && (
                    <span className="block text-xs text-muted-foreground">
                        {sub}
                    </span>
                )}
            </span>
            <button
                type="button"
                onClick={onClear}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                aria-label="Ganti pilihan"
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
