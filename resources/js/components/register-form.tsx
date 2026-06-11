import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './component/form/PasswordInput';
import { ImageWithFallback } from './common/ImageWithFallback';
import { GoogleButton } from './common/GoogleButton';
import { Link } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { RegisterDataPage } from '@/data/data';
import PhoneField from './component/form/PhoneField';
import AvatarField from './component/form/AvatarField';
import { PasswordStrengthMeter } from './component/form/PasswordStrengthMeter';

export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    avatar: File | null;
}

interface RegisterFormProps {
    data: RegisterFormData;
    processing: boolean;
    error: Partial<Record<keyof RegisterFormData, string>>;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setData: <K extends keyof RegisterFormData>(
        key: K,
        value: RegisterFormData[K],
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
}

export function RegisterForm({
    className,
    data,
    processing,
    error,
    onHandleChange,
    setData,
    onSubmit,
    ...props
}: RegisterFormProps) {
    const { language } = useLanguage();
    const text = RegisterDataPage[language];
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        onSubmit={onSubmit}
                        className={cn('p-6 md:p-8', className)}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex flex-row items-center justify-center gap-2 p-3 text-center">
                                    <ImageWithFallback
                                        src="/assets/logos/Saint-Luke.png"
                                        alt="login-page-image"
                                        className="h-12 w-12 shrink-0 items-center rounded-full object-cover object-center"
                                    />
                                    <h1 className="text-2xl font-bold whitespace-nowrap">
                                        {text.logoHeader}
                                    </h1>
                                </div>
                                <h1 className="text-2xl font-bold">
                                    {text.header}
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    {text.description}
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    {text.fieldHeaderName}
                                </FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={text.placeholderName}
                                    value={data.name}
                                    onChange={onHandleChange}
                                    required
                                />
                                {error.name && (
                                    <p className="text-lg font-semibold text-red-500">
                                        {error.name}
                                    </p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    {text.fieldHeaderEmail}
                                </FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={text.placeholderEmail}
                                    value={data.email}
                                    onChange={onHandleChange}
                                    required
                                />
                                {error.email && (
                                    <p className="text-lg font-semibold text-red-500">
                                        {error.email}
                                    </p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    {text.fieldHeaderPassword}
                                </FieldLabel>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={onHandleChange}
                                    placeholder={text.placeholderPassword}
                                    required
                                />
                                <PasswordStrengthMeter
                                    password={data.password}
                                />
                                {error.password && (
                                    <p className="text-lg font-semibold text-red-500">
                                        {error.password}
                                    </p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    {text.fieldHeaderConfirmPassword}
                                </FieldLabel>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={onHandleChange}
                                    placeholder={
                                        text.placeholderConfirmPassword
                                    }
                                    required
                                />
                                {error.password_confirmation && (
                                    <p className="text-lg font-semibold text-red-500">
                                        {error.password_confirmation}
                                    </p>
                                )}
                            </Field>
                            <PhoneField
                                label={text.fieldHeaderPhone}
                                value={data.phone}
                                onChange={(val) => setData('phone', val)}
                                error={error.phone}
                                required
                            />
                            <AvatarField
                                label="Avatar"
                                value={data.avatar}
                                onChange={(file) => setData('avatar', file)}
                                error={error.avatar}
                                description="Max size 2MB"
                            />
                            <Field>
                                <Button disabled={processing} type="submit">
                                    Register
                                </Button>
                            </Field>
                            <FieldSeparator>
                                {language === 'id'
                                    ? 'atau daftar dengan'
                                    : 'or sign up with'}
                            </FieldSeparator>
                            <GoogleButton />
                            <FieldDescription className="text-center">
                                {language === 'id'
                                    ? 'Sudah punya akun? '
                                    : 'Already have an account? '}
                                <Link href="/login">
                                    {language === 'id' ? 'Masuk' : 'Sign In'}
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/assets/auth/login-page.png"
                            alt="Image Santo Lukas"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
