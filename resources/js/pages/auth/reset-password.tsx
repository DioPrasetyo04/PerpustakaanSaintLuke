import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import PasswordStrength from '@/components/auth/PasswordStrength';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

const copy = {
    id: {
        title: 'Atur Ulang Password',
        heading: 'Buat Password Baru',
        description:
            'Pilih password baru yang kuat dan mudah Anda ingat untuk mengamankan akun.',
        email: 'Email',
        password: 'Password Baru',
        passwordPlaceholder: 'Masukkan password baru...',
        confirm: 'Konfirmasi Password',
        confirmPlaceholder: 'Ulangi password baru...',
        match: 'Password cocok',
        noMatch: 'Password belum cocok',
        submit: 'Atur Ulang Password',
        submitting: 'Menyimpan...',
    },
    en: {
        title: 'Reset Password',
        heading: 'Create New Password',
        description:
            'Choose a strong password you can remember to secure your account.',
        email: 'Email',
        password: 'New Password',
        passwordPlaceholder: 'Enter new password...',
        confirm: 'Confirm Password',
        confirmPlaceholder: 'Repeat new password...',
        match: 'Passwords match',
        noMatch: "Passwords don't match yet",
        submit: 'Reset Password',
        submitting: 'Saving...',
    },
};

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { language } = useLanguage();
    const text = copy[language];
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const confirmFilled = data.password_confirmation.length > 0;
    const matches =
        confirmFilled && data.password === data.password_confirmation;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthShell
            title={text.title}
            icon="🔐"
            heading={text.heading}
            description={text.description}
        >
            <form onSubmit={submit} className="space-y-5">
                {/* Email (read-only) */}
                <Field>
                    <FieldLabel htmlFor="email">{text.email}</FieldLabel>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="username"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-11 pl-9"
                            readOnly
                        />
                    </div>
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                {/* Password */}
                <Field>
                    <FieldLabel htmlFor="password">{text.password}</FieldLabel>
                    <div className="relative">
                        <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="new-password"
                            autoFocus
                            value={data.password}
                            placeholder={text.passwordPlaceholder}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="h-11 px-9"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            tabIndex={-1}
                            aria-label="toggle password"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <FieldError>{errors.password}</FieldError>
                    )}
                </Field>

                {/* Strength + requirements */}
                {data.password && (
                    <PasswordStrength
                        value={data.password}
                        className="rounded-xl border border-border/70 bg-secondary/40 p-3.5"
                    />
                )}

                {/* Confirm */}
                <Field>
                    <FieldLabel htmlFor="password_confirmation">
                        {text.confirm}
                    </FieldLabel>
                    <div className="relative">
                        <ShieldCheck className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password_confirmation"
                            type={showConfirm ? 'text' : 'password'}
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            placeholder={text.confirmPlaceholder}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                            className={cn(
                                'h-11 px-9',
                                confirmFilled &&
                                    (matches
                                        ? 'border-cobalt focus-visible:border-cobalt'
                                        : 'border-destructive'),
                            )}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((s) => !s)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            tabIndex={-1}
                            aria-label="toggle confirm password"
                        >
                            {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {confirmFilled && (
                        <p
                            className={cn(
                                'flex items-center gap-1.5 text-xs font-medium',
                                matches
                                    ? 'text-cobalt-dk dark:text-cobalt-lt'
                                    : 'text-destructive',
                            )}
                        >
                            {matches && (
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            )}
                            {matches ? text.match : text.noMatch}
                        </p>
                    )}
                    {errors.password_confirmation && (
                        <FieldError>
                            {errors.password_confirmation}
                        </FieldError>
                    )}
                </Field>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full"
                >
                    {processing ? text.submitting : text.submit}
                </Button>
            </form>
        </AuthShell>
    );
}
