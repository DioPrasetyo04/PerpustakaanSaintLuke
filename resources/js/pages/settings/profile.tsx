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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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

                    {/* Social Media Management */}
                    <Card className="p-6 mt-6">
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
                            <div className="text-center py-10 border border-dashed rounded-xl">
                                <Globe className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">
                                    Belum ada social media yang ditambahkan.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-3 md:grid-cols-2">
                                {profile.socialmedia.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div
                                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                background:
                                                    item.color ?? '#e5e7eb',
                                            }}
                                        >
                                            {item.icon ? (
                                                <PlatformIcon
                                                    svg={item.icon}
                                                    size={22}
                                                />
                                            ) : (
                                                <Globe className="h-5 w-5 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-foreground">
                                                    {item.platform_label}
                                                </h4>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {item.platform}
                                                </Badge>
                                            </div>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="block truncate text-sm text-blue-600 hover:underline"
                                            >
                                                {item.url}
                                            </a>
                                            {item.username && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    @{item.username}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    openEditSocial(item)
                                                }
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 hover:text-red-700"
                                                onClick={() =>
                                                    requestDeleteSocial(item)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Password card */}
                    <Card className="p-6 mt-6 bg-gradient-to-br from-blue-50 to-brass-50 border-2 border-primary/20">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <Lock className="h-6 w-6 text-primary" />
                                    Security Settings
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Manage your password and account security
                                </p>
                            </div>
                            <Link href={route('password-update.edit')}>
                                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg gap-2">
                                    <Lock className="h-4 w-4" />
                                    Update Password
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Delete Account */}
                    <Card className="p-6 mt-6 border-2 border-red-200 bg-red-50">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-red-700 mb-1">
                                    Delete Account
                                </h3>
                                <p className="text-sm text-red-700/80 mb-4">
                                    Setelah akun dihapus, seluruh data Anda akan
                                    hilang permanen. Akun tidak dapat dihapus
                                    jika masih ada pinjaman aktif atau denda
                                    yang belum dibayar.
                                </p>
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        setConfirmDeleteAccount(true)
                                    }
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete My Account
                                </Button>
                            </div>
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
