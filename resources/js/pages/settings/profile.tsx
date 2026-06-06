import { FormEvent, useMemo, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { route } from 'ziggy-js';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit2,
    Save,
    X,
    Lock,
    Plus,
    Trash2,
    Globe,
    Camera,
    Share2,
    AlertTriangle,
    CreditCard,
    Download,
    Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Notification from '@/components/component/Notification/Notification';
import ConfirmDialog from '@/components/component/Notification/ConfirmDialog';

type PlatformOption = {
    value: string;
    label: string;
    icon: string;
    color: string;
};

type SocialMediaItem = {
    id: number;
    platform: string;
    platform_label: string;
    icon: string | null;
    color: string | null;
    url: string;
    username: string | null;
};

function PlatformIcon({
    svg,
    size = 20,
}: {
    svg: string | null | undefined;
    size?: number;
}) {
    if (!svg) return null;
    return (
        <span
            aria-hidden
            className="inline-flex items-center justify-center"
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

type MemberCardData = {
    member_number: string | null;
    name: string;
    kelas: string | null;
    email: string;
    issued_at: string | null;
    avatar: string | null;
    initials: string;
    barcode: string;
    qr: string;
    logo: string | null;
    download_url: string;
};

type ProfileData = {
    id: number;
    name: string;
    username: string | null;
    email: string;
    email_verified_at: string | null;
    phone: string | null;
    address: string | null;
    date_of_birth: string | null;
    avatar: string | null;
    created_at: string;
    member_card: MemberCardData | null;
    socialmedia: SocialMediaItem[];
};

type PageProps = {
    mustVerifyEmail: boolean;
    status?: string;
    profile: ProfileData;
    platformOptions: PlatformOption[];
    errors: Record<string, string>;
};

type Notif = { type: 'success' | 'error'; message: string } | null;

const initials = (name: string) =>
    name
        .split(' ')
        .map((part) => part[0] ?? '')
        .join('')
        .slice(0, 2)
        .toUpperCase();

const formatLongDate = (value: string | null) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function ProfilePage() {
    const { props } = usePage<PageProps>();
    const { profile, platformOptions, errors } = props;

    /* ---------- Notification + dialogs ---------- */
    const [notification, setNotification] = useState<Notif>(null);
    const [socialToDelete, setSocialToDelete] = useState<SocialMediaItem | null>(
        null,
    );
    const [deletingSocial, setDeletingSocial] = useState(false);
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);

    /* ---------- Profile edit ---------- */
    const [isEditing, setIsEditing] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: profile.name ?? '',
        username: profile.username ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        address: profile.address ?? '',
        date_of_birth: profile.date_of_birth ?? '',
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        setProfileForm({
            name: profile.name ?? '',
            username: profile.username ?? '',
            email: profile.email ?? '',
            phone: profile.phone ?? '',
            address: profile.address ?? '',
            date_of_birth: profile.date_of_birth ?? '',
        });
    };

    const submitProfile = (e: FormEvent) => {
        e.preventDefault();
        if (savingProfile) return;
        setSavingProfile(true);

        const formData = new FormData();
        Object.entries(profileForm).forEach(([key, value]) => {
            formData.append(key, value ?? '');
        });
        if (avatarFile) formData.append('avatar', avatarFile);

        router.post(route('profile.update'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsEditing(false);
                setAvatarFile(null);
                setAvatarPreview(null);
                setNotification({
                    type: 'success',
                    message: 'Profil berhasil diperbarui.',
                });
            },
            onError: () => {
                setNotification({
                    type: 'error',
                    message: 'Gagal memperbarui profil. Periksa data Anda.',
                });
            },
            onFinish: () => setSavingProfile(false),
        });
    };

    /* ---------- Social media ---------- */
    const [socialForm, setSocialForm] = useState<{
        id: number | null;
        platform: string;
        url: string;
        username: string;
    }>({
        id: null,
        platform: '',
        url: '',
        username: '',
    });
    const [showSocialForm, setShowSocialForm] = useState(false);
    const [savingSocial, setSavingSocial] = useState(false);

    const openAddSocial = () => {
        setSocialForm({ id: null, platform: '', url: '', username: '' });
        setShowSocialForm(true);
    };

    const openEditSocial = (item: SocialMediaItem) => {
        setSocialForm({
            id: item.id,
            platform: item.platform,
            url: item.url,
            username: item.username ?? '',
        });
        setShowSocialForm(true);
    };

    const closeSocialForm = () => {
        if (savingSocial) return;
        setShowSocialForm(false);
        setSocialForm({ id: null, platform: '', url: '', username: '' });
    };

    const submitSocial = (e: FormEvent) => {
        e.preventDefault();
        if (savingSocial) return;
        if (!socialForm.platform || !socialForm.url) {
            setNotification({
                type: 'error',
                message: 'Platform dan URL wajib diisi.',
            });
            return;
        }

        setSavingSocial(true);
        const payload = {
            platform: socialForm.platform,
            url: socialForm.url,
            username: socialForm.username || null,
        };

        const isUpdate = socialForm.id !== null;
        const options = {
            preserveScroll: true,
            onSuccess: () => {
                closeSocialForm();
                setNotification({
                    type: 'success' as const,
                    message: isUpdate
                        ? 'Social media berhasil diperbarui.'
                        : 'Social media berhasil ditambahkan.',
                });
            },
            onError: () => {
                setNotification({
                    type: 'error' as const,
                    message: isUpdate
                        ? 'Gagal memperbarui social media.'
                        : 'Gagal menambahkan social media. Platform mungkin sudah terdaftar.',
                });
            },
            onFinish: () => setSavingSocial(false),
        };

        if (isUpdate) {
            router.patch(
                route('social-media.update', { id: socialForm.id! }),
                payload,
                options,
            );
        } else {
            router.post(route('social-media.store'), payload, options);
        }
    };

    const requestDeleteSocial = (item: SocialMediaItem) => {
        setSocialToDelete(item);
    };

    /* ---------- Member card ---------- */
    const [requestingCard, setRequestingCard] = useState(false);

    const downloadMemberCard = () => {
        if (profile.member_card) {
            window.open(profile.member_card.download_url, '_blank');
        }
    };

    const requestMemberCard = () => {
        if (requestingCard) return;
        setRequestingCard(true);
        router.post(
            route('member-card.request'),
            {},
            {
                preserveScroll: true,
                onSuccess: () =>
                    setNotification({
                        type: 'success',
                        message:
                            'Permintaan kartu anggota telah dikirim ke petugas. Anda akan dihubungi setelah kartu diterbitkan.',
                    }),
                onError: (errs) =>
                    setNotification({
                        type: 'error',
                        message:
                            errs?.member_card ??
                            'Gagal mengirim permintaan kartu anggota.',
                    }),
                onFinish: () => setRequestingCard(false),
            },
        );
    };

    const cancelDeleteSocial = () => {
        if (deletingSocial) return;
        setSocialToDelete(null);
    };

    const confirmDeleteSocial = () => {
        if (!socialToDelete || deletingSocial) return;
        const target = socialToDelete;
        setDeletingSocial(true);
        router.delete(route('social-media.destroy', { id: target.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setSocialToDelete(null);
                setNotification({
                    type: 'success',
                    message: `Social media "${target.platform_label}" berhasil dihapus.`,
                });
            },
            onError: () => {
                setNotification({
                    type: 'error',
                    message: 'Gagal menghapus social media.',
                });
            },
            onFinish: () => setDeletingSocial(false),
        });
    };

    /* ---------- Delete account ---------- */
    const handleDeleteAccount = () => {
        if (deletingAccount) return;
        setDeletingAccount(true);
        router.delete(route('profile.destroy'), {
            preserveScroll: false,
            onError: (err) => {
                setConfirmDeleteAccount(false);
                const msg =
                    (err as Record<string, string>)?.delete_account ||
                    'Akun tidak dapat dihapus. Pastikan tidak ada pinjaman aktif atau denda yang belum dibayar.';
                setNotification({ type: 'error', message: msg });
            },
            onFinish: () => setDeletingAccount(false),
        });
    };

    const usedPlatforms = useMemo(
        () => new Set(profile.socialmedia.map((s) => s.platform)),
        [profile.socialmedia],
    );

    const availablePlatformOptions = useMemo(
        () =>
            platformOptions.filter(
                (opt) =>
                    !usedPlatforms.has(opt.value) ||
                    opt.value === socialForm.platform,
            ),
        [platformOptions, usedPlatforms, socialForm.platform],
    );

    return (
        <div className="min-h-screen bg-background py-8">
            <Head title="My Profile" />
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="font-display text-3xl font-bold text-foreground mb-8">
                        My Profile
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <Card className="p-6 lg:col-span-1 h-fit">
                            <div className="text-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative inline-block mb-4"
                                >
                                    <Avatar className="w-32 h-32 mx-auto">
                                        {avatarPreview || profile.avatar ? (
                                            <AvatarImage
                                                src={
                                                    avatarPreview ??
                                                    profile.avatar ??
                                                    undefined
                                                }
                                                alt={profile.name}
                                                className="object-cover"
                                            />
                                        ) : null}
                                        <AvatarFallback className="text-3xl bg-primary text-white">
                                            {initials(profile.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/90 cursor-pointer">
                                            <Camera className="h-4 w-4" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                        </label>
                                    )}
                                </motion.div>

                                <h2 className="text-xl font-semibold text-foreground mb-1">
                                    {profile.name}
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Library Member
                                </p>

                                <div className="bg-background rounded-lg p-3 text-sm">
                                    <p className="text-muted-foreground">Member Since</p>
                                    <p className="font-medium text-foreground">
                                        {formatLongDate(profile.created_at)}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Profile Information */}
                        <Card className="p-6 lg:col-span-2">
                            <form onSubmit={submitProfile}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Profile Information
                                    </h3>
                                    {!isEditing ? (
                                        <Button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            className="gap-2"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                type="submit"
                                                disabled={savingProfile}
                                                className="gap-2 bg-primary"
                                            >
                                                <Save className="h-4 w-4" />
                                                {savingProfile
                                                    ? 'Saving...'
                                                    : 'Save'}
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={cancelEdit}
                                                variant="outline"
                                                disabled={savingProfile}
                                                className="gap-2"
                                            >
                                                <X className="h-4 w-4" />
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <Field
                                        label="Full Name"
                                        icon={User}
                                        editing={isEditing}
                                        value={profile.name}
                                        error={errors?.name}
                                    >
                                        <Input
                                            value={profileForm.name}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field
                                        label="Username"
                                        icon={User}
                                        editing={isEditing}
                                        value={profile.username ?? '-'}
                                        error={errors?.username}
                                    >
                                        <Input
                                            value={profileForm.username}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                    </Field>

                                    <Field
                                        label="Email Address"
                                        icon={Mail}
                                        editing={isEditing}
                                        value={profile.email}
                                        error={errors?.email}
                                    >
                                        <Input
                                            type="email"
                                            value={profileForm.email}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field
                                        label="Phone Number"
                                        icon={Phone}
                                        editing={isEditing}
                                        value={profile.phone ?? '-'}
                                        error={errors?.phone}
                                    >
                                        <Input
                                            type="tel"
                                            value={profileForm.phone}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    phone: e.target.value,
                                                })
                                            }
                                        />
                                    </Field>

                                    <Field
                                        label="Date of Birth"
                                        icon={Calendar}
                                        editing={isEditing}
                                        value={formatLongDate(
                                            profile.date_of_birth,
                                        )}
                                        error={errors?.date_of_birth}
                                    >
                                        <Input
                                            type="date"
                                            value={profileForm.date_of_birth}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    date_of_birth:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </Field>

                                    <Field
                                        label="Address"
                                        icon={MapPin}
                                        editing={isEditing}
                                        value={profile.address ?? '-'}
                                        error={errors?.address}
                                    >
                                        <Textarea
                                            value={profileForm.address}
                                            onChange={(e) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    address: e.target.value,
                                                })
                                            }
                                            rows={3}
                                        />
                                    </Field>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Social Media + Member Card */}
                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {/* Social Media Management */}
                    <Card className="p-6">
                        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
                                    <Share2 className="h-5 w-5 text-primary" />
                                    Social Media
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tambahkan akun social media Anda agar mudah
                                    dihubungi.
                                </p>
                            </div>
                            {!showSocialForm && (
                                <Button
                                    type="button"
                                    onClick={openAddSocial}
                                    className="gap-2"
                                    disabled={
                                        availablePlatformOptions.length === 0
                                    }
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Social Media
                                </Button>
                            )}
                        </div>

                        {showSocialForm && (
                            <form
                                onSubmit={submitSocial}
                                className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 mb-6"
                            >
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label className="mb-2 block">
                                            Platform
                                        </Label>
                                        <Select
                                            value={socialForm.platform}
                                            onValueChange={(v) =>
                                                setSocialForm({
                                                    ...socialForm,
                                                    platform: v,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                {socialForm.platform ? (
                                                    (() => {
                                                        const opt =
                                                            platformOptions.find(
                                                                (o) =>
                                                                    o.value ===
                                                                    socialForm.platform,
                                                            );
                                                        return opt ? (
                                                            <span className="flex items-center gap-2">
                                                                <PlatformIcon
                                                                    svg={opt.icon}
                                                                    size={18}
                                                                />
                                                                <span>
                                                                    {opt.label}
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <SelectValue placeholder="Select platform" />
                                                        );
                                                    })()
                                                ) : (
                                                    <SelectValue placeholder="Select platform" />
                                                )}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availablePlatformOptions.map(
                                                    (opt) => (
                                                        <SelectItem
                                                            key={opt.value}
                                                            value={opt.value}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <PlatformIcon
                                                                    svg={opt.icon}
                                                                    size={18}
                                                                />
                                                                <span>
                                                                    {opt.label}
                                                                </span>
                                                            </span>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {errors?.platform && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.platform}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="mb-2 block">URL</Label>
                                        <Input
                                            type="url"
                                            placeholder="https://..."
                                            value={socialForm.url}
                                            onChange={(e) =>
                                                setSocialForm({
                                                    ...socialForm,
                                                    url: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                        {errors?.url && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.url}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="mb-2 block">
                                            Username
                                        </Label>
                                        <Input
                                            placeholder="@username"
                                            value={socialForm.username}
                                            onChange={(e) =>
                                                setSocialForm({
                                                    ...socialForm,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                        {errors?.username && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.username}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeSocialForm}
                                        disabled={savingSocial}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={savingSocial}
                                        className="gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        {savingSocial
                                            ? 'Saving...'
                                            : socialForm.id
                                              ? 'Update'
                                              : 'Save'}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {profile.socialmedia.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/30 py-12 text-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <Globe className="h-7 w-7 text-primary" />
                                </div>
                                <p className="font-medium text-foreground">
                                    Belum ada social media
                                </p>
                                <p className="mt-1 max-w-xs px-4 text-sm text-muted-foreground">
                                    Tambahkan akun pertama Anda agar pengunjung
                                    mudah terhubung.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {profile.socialmedia.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -2 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 25,
                                        }}
                                        className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md"
                                    >
                                        {/* accent bar */}
                                        <span
                                            aria-hidden
                                            className="absolute inset-y-0 left-0 w-1"
                                            style={{
                                                background:
                                                    item.color ?? '#e5e7eb',
                                            }}
                                        />

                                        {/* icon */}
                                        <div
                                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                                            style={{
                                                background:
                                                    item.color ?? '#e5e7eb',
                                            }}
                                        >
                                            {item.icon ? (
                                                <PlatformIcon
                                                    svg={item.icon}
                                                    size={24}
                                                />
                                            ) : (
                                                <Globe className="h-6 w-6" />
                                            )}
                                        </div>

                                        {/* content */}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="truncate font-semibold text-foreground">
                                                {item.platform_label}
                                            </h4>
                                            {item.username && (
                                                <p className="truncate text-sm text-muted-foreground">
                                                    @{item.username}
                                                </p>
                                            )}
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-0.5 block truncate text-xs text-primary hover:underline"
                                            >
                                                {item.url}
                                            </a>
                                        </div>

                                        {/* actions — reveal on hover (desktop), always visible on touch */}
                                        <div className="flex flex-shrink-0 items-center gap-1.5 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-9 w-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                                onClick={() =>
                                                    openEditSocial(item)
                                                }
                                                aria-label={`Edit ${item.platform_label}`}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-9 w-9 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                                                onClick={() =>
                                                    requestDeleteSocial(item)
                                                }
                                                aria-label={`Hapus ${item.platform_label}`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Member Card (Kartu Tanda Anggota) */}
                    <MemberCardSection
                        card={profile.member_card}
                        requesting={requestingCard}
                        onDownload={downloadMemberCard}
                        onRequest={requestMemberCard}
                    />
                    </div>

                    {/* Security Settings card */}
                    <Card className="mt-6 border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/40 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Lock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-1 text-xl font-semibold text-foreground">
                                        Security Settings
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Manage your password and account security
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('password-update.edit')}
                                className="sm:shrink-0"
                            >
                                <Button className="w-full gap-2 shadow-sm sm:w-auto">
                                    <Lock className="h-4 w-4" />
                                    Update Password
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Delete Account card */}
                    <Card className="mt-6 border border-red-200 bg-red-50 p-6 dark:border-red-500/30 dark:bg-red-500/10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="mb-1 text-xl font-semibold text-red-700 dark:text-red-400">
                                        Delete Account
                                    </h3>
                                    <p className="max-w-2xl text-sm text-red-600/80 dark:text-red-300/80">
                                        Setelah akun dihapus, seluruh data Anda
                                        akan hilang permanen. Akun tidak dapat
                                        dihapus jika masih ada pinjaman aktif
                                        atau denda yang belum dibayar.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                className="w-full shrink-0 gap-2 sm:w-auto"
                                onClick={() => setConfirmDeleteAccount(true)}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete My Account
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>

            <ConfirmDialog
                open={socialToDelete !== null}
                title="Delete Social Media"
                message={
                    socialToDelete
                        ? `Apakah Anda yakin ingin menghapus social media "${socialToDelete.platform_label}"?`
                        : ''
                }
                loading={deletingSocial}
                onConfirm={confirmDeleteSocial}
                onCancel={cancelDeleteSocial}
            />

            <ConfirmDialog
                open={confirmDeleteAccount}
                title="Delete Account"
                message="Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan."
                confirmLabel="Delete Account"
                loading={deletingAccount}
                onConfirm={handleDeleteAccount}
                onCancel={() => {
                    if (!deletingAccount) setConfirmDeleteAccount(false);
                }}
            />

            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />
        </div>
    );
}

function MemberCardSection({
    card,
    requesting,
    onDownload,
    onRequest,
}: {
    card: MemberCardData | null;
    requesting: boolean;
    onDownload: () => void;
    onRequest: () => void;
}) {
    return (
        <Card className="flex flex-col p-6">
            <div className="mb-5">
                <h3 className="mb-1 flex items-center gap-2 text-xl font-semibold text-foreground">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Kartu Anggota
                </h3>
                <p className="text-sm text-muted-foreground">
                    Kartu tanda anggota perpustakaan Anda.
                </p>
            </div>

            {card ? (
                <div className="flex flex-1 flex-col">
                    {/* Card preview — hover to download */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-brass p-5 text-white shadow-lg">
                        {/* Header */}
                        <div className="mb-4 flex items-center gap-2">
                            {card.logo ? (
                                <img
                                    src={card.logo}
                                    alt="Logo"
                                    className="h-9 w-9 rounded-md bg-white/90 object-contain p-0.5"
                                />
                            ) : null}
                            <div className="leading-tight">
                                <p className="text-[11px] font-semibold tracking-wider uppercase">
                                    E-Library Santo Lukas
                                </p>
                                <p className="text-[10px] text-white/80">
                                    Kartu Tanda Anggota
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 ring-2 ring-white/40">
                                {card.avatar ? (
                                    <img
                                        src={card.avatar}
                                        alt={card.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl font-bold">
                                        {card.initials}
                                    </span>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-bold">
                                    {card.name}
                                </p>
                                <p className="truncate font-mono text-sm text-white/90">
                                    {card.member_number}
                                </p>
                                {card.kelas && card.kelas !== '-' && (
                                    <p className="truncate text-xs text-white/80">
                                        {card.kelas}
                                    </p>
                                )}
                            </div>
                            {card.qr && (
                                <img
                                    src={card.qr}
                                    alt="QR"
                                    className="h-24 w-24 flex-shrink-0 rounded-md bg-white p-1"
                                />
                            )}
                        </div>

                        {/* Barcode */}
                        {card.barcode && (
                            <div className="mt-4 rounded-md bg-white p-2.5">
                                <img
                                    src={card.barcode}
                                    alt="Barcode"
                                    className="mx-auto h-12 w-full object-contain"
                                />
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-200 group-hover:opacity-100">
                            <Button
                                type="button"
                                variant="secondary"
                                className="gap-2"
                                onClick={onDownload}
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                        </div>
                    </div>

                    {/* Fallback button (visible, for touch devices) */}
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4 w-full gap-2"
                        onClick={onDownload}
                    >
                        <Download className="h-4 w-4" />
                        Download Kartu (PDF)
                    </Button>
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-7 w-7 text-primary" />
                    </div>
                    <p className="mb-1 font-semibold text-foreground">
                        Belum punya kartu anggota
                    </p>
                    <p className="mb-4 max-w-xs px-4 text-sm text-muted-foreground">
                        Ajukan permintaan, dan petugas akan diberi tahu via email
                        & WhatsApp untuk menerbitkan kartu Anda.
                    </p>
                    <Button
                        type="button"
                        className="gap-2"
                        onClick={onRequest}
                        disabled={requesting}
                    >
                        <Send className="h-4 w-4" />
                        {requesting ? 'Mengirim...' : 'Minta Buat Kartu'}
                    </Button>
                </div>
            )}
        </Card>
    );
}

function Field({
    label,
    icon: Icon,
    editing,
    value,
    error,
    children,
}: {
    label: string;
    icon: typeof User;
    editing: boolean;
    value: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <Label className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {label}
            </Label>
            {editing ? children : <p className="text-foreground pl-6">{value}</p>}
            {error && editing && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}
