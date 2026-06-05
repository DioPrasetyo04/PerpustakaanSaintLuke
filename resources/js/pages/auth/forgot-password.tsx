import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ArrowLeft, CheckCircle2, Mail, Send } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Field,
    FieldLabel,
    FieldError,
} from '@/components/ui/field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/hooks/useLanguage';

const copy = {
    id: {
        title: 'Lupa Password',
        heading: 'Lupa Password?',
        description:
            'Tidak masalah. Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.',
        email: 'Email',
        placeholder: 'Masukkan email Anda...',
        submit: 'Kirim Tautan Reset',
        sending: 'Mengirim...',
        back: 'Kembali ke Login',
    },
    en: {
        title: 'Forgot Password',
        heading: 'Forgot Password?',
        description:
            "No problem. Enter your email and we'll send you a link to reset your password.",
        email: 'Email',
        placeholder: 'Enter your email...',
        submit: 'Send Reset Link',
        sending: 'Sending...',
        back: 'Back to Login',
    },
};

export default function ForgotPassword({ status }: { status?: string }) {
    const { language } = useLanguage();
    const text = copy[language];
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthShell
            title={text.title}
            icon="🔑"
            heading={text.heading}
            description={text.description}
            footer={
                <Link
                    href={route('login')}
                    className="inline-flex items-center gap-1.5 font-semibold text-cobalt underline-offset-4 hover:underline dark:text-cobalt-lt"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {text.back}
                </Link>
            }
        >
            {status && (
                <Alert variant="success" className="mb-5">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-5">
                <Field>
                    <FieldLabel htmlFor="email">{text.email}</FieldLabel>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoFocus
                            value={data.email}
                            placeholder={text.placeholder}
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-11 pl-9"
                            required
                        />
                    </div>
                    {errors.email && (
                        <FieldError>{errors.email}</FieldError>
                    )}
                </Field>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full gap-2"
                >
                    {processing ? (
                        text.sending
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            {text.submit}
                        </>
                    )}
                </Button>
            </form>
        </AuthShell>
    );
}
