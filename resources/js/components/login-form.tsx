import { cn } from '@/lib/utils';
import type { ChangeEvent, FormEvent } from 'react';
import { Card, CardContent } from './ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
import Checkbox from './Checkbox';
import InputError from './InputError';
import { ImageWithFallback } from './common/ImageWithFallback';
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
    status: string;
    data: AuthFormData;
    processing: boolean;
    error: Partial<Record<keyof AuthFormData, string>>;
    onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setData: (key: keyof AuthFormData, value: string | boolean) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
}
export function LoginForm({
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
}: loginForm) {
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
                                        src="/assets/logos/Saint-Luke.jpg"
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
                                            className="ml-auto inline-block text-sm text-blue-500 underline"
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
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">
                                        Login with Facebook
                                    </span>
                                </Button>
                                <Button variant="outline" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">
                                        Login with Google
                                    </span>
                                </Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Don&apos;t have an account?{' '}
                                <Link href="/register">Sign up</Link>
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
}
