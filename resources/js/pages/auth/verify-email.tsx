import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { CheckCircle2, LogOut, Send } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/hooks/useLanguage';

const copy = {
    id: {
        title: 'Verifikasi Email',
        heading: 'Verifikasi Email Anda',
        description:
            'Satu langkah lagi! Kami telah mengirim tautan verifikasi ke email Anda. Klik tautan tersebut untuk mengaktifkan akun.',
        note: 'Verifikasi diperlukan sebelum Anda dapat meminjam buku atau menyimpan bookmark.',
        sent: 'Tautan verifikasi baru telah dikirim ke email Anda. Silakan periksa kotak masuk (dan folder spam).',
        resend: 'Kirim Ulang Email Verifikasi',
        resending: 'Mengirim...',
        logout: 'Keluar',
        wrongEmail: 'Salah email?',
    },
    en: {
        title: 'Email Verification',
        heading: 'Verify Your Email',
        description:
            'One last step! We sent a verification link to your email. Click it to activate your account.',
        note: 'Verification is required before you can borrow books or save bookmarks.',
        sent: 'A new verification link has been sent to your email. Please check your inbox (and spam folder).',
        resend: 'Resend Verification Email',
        resending: 'Sending...',
        logout: 'Log Out',
        wrongEmail: 'Wrong email?',
    },
};

export default function VerifyEmail({ status }: { status?: string }) {
    const { language } = useLanguage();
    const text = copy[language];
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthShell
            title={text.title}
            icon="✉️"
            heading={text.heading}
            description={text.description}
            footer={
                <span>
                    {text.wrongEmail}{' '}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="font-semibold text-cobalt underline-offset-4 hover:underline dark:text-cobalt-lt"
                    >
                        {text.logout}
                    </Link>
                </span>
            }
        >
            {status === 'verification-link-sent' && (
                <Alert variant="success" className="mb-5">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{text.sent}</AlertDescription>
                </Alert>
            )}

            <div className="mb-5 rounded-xl border border-brass/30 bg-brass-50 px-4 py-3 dark:bg-night-3">
                <p className="text-xs leading-relaxed text-brass dark:text-brass-lt">
                    💡 {text.note}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-3">
                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full gap-2"
                >
                    {processing ? (
                        text.resending
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            {text.resend}
                        </>
                    )}
                </Button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <LogOut className="h-4 w-4" />
                    {text.logout}
                </Link>
            </form>
        </AuthShell>
    );
}
