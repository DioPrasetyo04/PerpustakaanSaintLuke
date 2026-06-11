import { Check, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

/**
 * Indikator kekuatan kata sandi untuk form register.
 * Menampilkan bar tingkat (Lemah / Sedang / Kuat) berdasarkan jumlah syarat
 * yang terpenuhi, plus checklist syarat yang otomatis tercentang saat dipenuhi.
 *
 * Murni komponen tampilan (tidak memblokir submit) — tujuannya membantu
 * pengguna membuat kata sandi yang lebih kuat.
 */

type Rule = {
    id: string;
    label: { id: string; en: string };
    test: (value: string) => boolean;
};

export const PASSWORD_RULES: Rule[] = [
    {
        id: 'length',
        label: { id: 'Minimal 8 karakter', en: 'At least 8 characters' },
        test: (v) => v.length >= 8,
    },
    {
        id: 'uppercase',
        label: { id: 'Huruf besar (A-Z)', en: 'Uppercase letter (A-Z)' },
        test: (v) => /[A-Z]/.test(v),
    },
    {
        id: 'lowercase',
        label: { id: 'Huruf kecil (a-z)', en: 'Lowercase letter (a-z)' },
        test: (v) => /[a-z]/.test(v),
    },
    {
        id: 'number',
        label: { id: 'Angka (0-9)', en: 'Number (0-9)' },
        test: (v) => /[0-9]/.test(v),
    },
    {
        id: 'special',
        label: {
            id: 'Karakter khusus (!@#$%…)',
            en: 'Special character (!@#$%…)',
        },
        test: (v) => /[^A-Za-z0-9]/.test(v),
    },
];

/** Hitung jumlah syarat yang terpenuhi (0–5). */
export function passwordScore(password: string): number {
    return PASSWORD_RULES.reduce(
        (acc, rule) => acc + (rule.test(password) ? 1 : 0),
        0,
    );
}

type Level = 'weak' | 'medium' | 'strong';

const LEVEL_META: Record<
    Level,
    {
        label: { id: string; en: string };
        bar: string;
        text: string;
        segments: number;
    }
> = {
    weak: {
        label: { id: 'Lemah', en: 'Weak' },
        bar: 'bg-red-500',
        text: 'text-red-600 dark:text-red-400',
        segments: 1,
    },
    medium: {
        label: { id: 'Sedang', en: 'Medium' },
        bar: 'bg-amber-500',
        text: 'text-amber-600 dark:text-amber-400',
        segments: 2,
    },
    strong: {
        label: { id: 'Kuat', en: 'Strong' },
        bar: 'bg-emerald-500',
        text: 'text-emerald-600 dark:text-emerald-400',
        segments: 3,
    },
};

export function PasswordStrengthMeter({ password }: { password: string }) {
    const { language } = useLanguage();

    // Sembunyikan sampai pengguna mulai mengetik kata sandi.
    if (!password) return null;

    const score = passwordScore(password);
    const level: Level = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
    const meta = LEVEL_META[level];

    return (
        <div className="mt-2 space-y-2" aria-live="polite">
            {/* Bar tingkat kekuatan (3 segmen) */}
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className={cn(
                            'h-1.5 flex-1 rounded-full transition-colors duration-300',
                            i < meta.segments ? meta.bar : 'bg-muted',
                        )}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                    {language === 'id'
                        ? 'Kekuatan kata sandi'
                        : 'Password strength'}
                </span>
                <span className={cn('font-semibold', meta.text)}>
                    {meta.label[language]}
                </span>
            </div>

            {/* Checklist syarat — tercentang otomatis saat terpenuhi */}
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(password);
                    return (
                        <li
                            key={rule.id}
                            className={cn(
                                'flex items-center gap-1.5 text-xs transition-colors',
                                ok
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-muted-foreground',
                            )}
                        >
                            {ok ? (
                                <Check className="h-3.5 w-3.5 shrink-0" />
                            ) : (
                                <X className="h-3.5 w-3.5 shrink-0 opacity-50" />
                            )}
                            <span>{rule.label[language]}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
