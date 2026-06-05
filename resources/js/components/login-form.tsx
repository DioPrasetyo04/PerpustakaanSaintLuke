import { cn } from '@/lib/utils';
import type { ChangeEvent, FormEvent } from 'react';
import { Card, CardContent } from './ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
import Checkbox from './Checkbox';
import InputError from './InputError';
import { ImageWithFallback } from './common/ImageWithFallback';
import { GoogleButton } from './common/GoogleButton';
import { FieldSeparator } from './ui/field';
import { useLanguage } from '@/hooks/useLanguage';
import { AuthDataPage } from '@/data/data';
import { Alert, AlertDescription } from './ui/alert';

export interface AuthFormData {
    email: string;
    password: string;
    remember?: boolean;
}
interface loginForm {
    canResetPassword: boolean;
    status?: string;
    data: AuthFormData;
    processing: boolean;
    error: Partial<Record<keyof AuthFormData, string>>;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setData: (key: keyof AuthFormData, value: string | boolean) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
}
export const LoginForm = ({
    className,
    data,
    processing,
    error,
    onHandleChange,
    setData,
    onSubmit,
    canResetPassword,
    status,
    ...props
}: loginForm) => {
    const { language } = useLanguage();
    const text = AuthDataPage[language];
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {status && (
                <Alert variant="success">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/assets/auth/login-page.png"
                            alt="Image Santo Lukas"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className={cn('p-6 md:p-8', className)}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex flex-row items-center gap-2 p-3 text-center">
                                    <ImageWithFallback
                                        src="/assets/logos/Saint-Luke.png"
                                        alt="login-page-image"
                                        className="h-12 w-12 items-center rounded-full object-cover object-center"
                                    />
                                    <h1 className="text-2xl font-bold">
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
                                    <InputError className="text-lg font-semibold text-red-500">
                                        {error.email}
                                    </InputError>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        {text.fieldHeaderPassword}
                                    </FieldLabel>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="ml-auto inline-block text-sm text-cobalt underline hover:text-cobalt-dk dark:text-cobalt-lt"
                                        >
                                            Lupa Password
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={onHandleChange}
                                    placeholder={text.placeholderPassword}
                                    required
                                />
                                {error.password && (
                                    <InputError className="text-lg font-semibold text-red-500">
                                        {error.password}
                                    </InputError>
                                )}
                            </Field>
                            <div className="grid gap-2">
                                <div className="items-top flex space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                    ></Checkbox>
                                    <div className="grid gap-1.5 leading-none">
                                        <FieldLabel htmlFor="remember">
                                            Remember Me
                                        </FieldLabel>
                                    </div>
                                </div>
                                {error.remember && (
                                    <InputError
                                        message={error.remember}
                                    ></InputError>
                                )}
                            </div>
                            <Field>
                                <Button disabled={processing} type="submit">
                                    Login
                                </Button>
                            </Field>
                            <FieldSeparator>
                                {language === 'id'
                                    ? 'atau lanjut dengan'
                                    : 'or continue with'}
                            </FieldSeparator>
                            <GoogleButton />
                            <FieldDescription className="text-center">
                                {language === 'id'
                                    ? 'Belum punya akun? '
                                    : "Don't have an account? "}
                                <Link href={route('register')}>
                                    {language === 'id' ? 'Daftar' : 'Sign Up'}
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
};
