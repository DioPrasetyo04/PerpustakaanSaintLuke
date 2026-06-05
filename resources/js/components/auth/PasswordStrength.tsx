import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

export interface PasswordRule {
    id: string;
    label: { id: string; en: string };
    test: (value: string) => boolean;
}

/** Aturan kekuatan password (selaras dengan Rules\Password aplikasi). */
export const passwordRules: PasswordRule[] = [
    {
        id: 'length',
        label: { id: 'Minimal 8 karakter', en: 'At least 8 characters' },
        test: (v) => v.length >= 8,
    },
    {
        id: 'uppercase',
        label: { id: 'Huruf besar (A-Z)', en: 'An uppercase letter (A-Z)' },
        test: (v) => /[A-Z]/.test(v),
    },
    {
        id: 'lowercase',
        label: { id: 'Huruf kecil (a-z)', en: 'A lowercase letter (a-z)' },
        test: (v) => /[a-z]/.test(v),
    },
    {
        id: 'number',
        label: { id: 'Angka (0-9)', en: 'A number (0-9)' },
        test: (v) => /[0-9]/.test(v),
    },
    {
        id: 'symbol',
        label: { id: 'Simbol (!@#$…)', en: 'A symbol (!@#$…)' },
        test: (v) => /[^A-Za-z0-9]/.test(v),
    },
];

/** Hitung berapa banyak aturan yang terpenuhi. */
export function countPasswordRulesMet(value: string): number {
    if (!value) return 0;
    return passwordRules.filter((r) => r.test(value)).length;
}

const STRENGTH = {
    levels: [
        { id: 'Sangat lemah', en: 'Very weak', color: 'bg-destructive' },
        { id: 'Lemah', en: 'Weak', color: 'bg-destructive' },
        { id: 'Cukup', en: 'Fair', color: 'bg-brass' },
        { id: 'Kuat', en: 'Strong', color: 'bg-cobalt' },
        { id: 'Sangat kuat', en: 'Very strong', color: 'bg-cobalt-dk' },
    ],
} as const;

interface PasswordStrengthProps {
    value: string;
    /** Tampilkan checklist syarat. Default true. */
    showChecklist?: boolean;
    className?: string;
}

export function PasswordStrength({
    value,
    showChecklist = true,
    className,
}: PasswordStrengthProps) {
    const { language } = useLanguage();

    const met = useMemo(() => countPasswordRulesMet(value), [value]);
    const total = passwordRules.length;
    const pct = (met / total) * 100;

    // Index level: 0..4 (kosong → -1 agar bar tidak terisi)
    const levelIndex = value ? Math.max(0, met - 1) : -1;
    const level = STRENGTH.levels[Math.min(levelIndex, STRENGTH.levels.length - 1)];

    return (
        <div className={cn('space-y-3', className)}>
            {/* Strength meter */}
            <div className="space-y-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                        className={cn(
                            'h-full rounded-full transition-all duration-500 ease-out',
                            levelIndex >= 0 ? level.color : 'bg-transparent',
                        )}
                        style={{ width: value ? `${Math.max(pct, 8)}%` : '0%' }}
                    />
                </div>
                {value && (
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                            {language === 'id'
                                ? 'Kekuatan password'
                                : 'Password strength'}
                        </span>
                        <span
                            className={cn(
                                'font-semibold',
                                levelIndex >= 3
                                    ? 'text-cobalt'
                                    : levelIndex >= 2
                                      ? 'text-brass'
                                      : 'text-destructive',
                            )}
                        >
                            {language === 'id' ? level.id : level.en}
                        </span>
                    </div>
                )}
            </div>

            {/* Checklist */}
            {showChecklist && (
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {passwordRules.map((rule) => {
                        const ok = value ? rule.test(value) : false;
                        return (
                            <li
                                key={rule.id}
                                className={cn(
                                    'flex items-center gap-2 text-xs transition-colors duration-300',
                                    ok
                                        ? 'text-cobalt-dk dark:text-cobalt-lt'
                                        : 'text-muted-foreground',
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                                        ok
                                            ? 'bg-cobalt text-white'
                                            : 'bg-secondary text-muted-foreground',
                                    )}
                                >
                                    {ok ? (
                                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                    ) : (
                                        <X className="h-2.5 w-2.5" strokeWidth={3} />
                                    )}
                                </span>
                                {language === 'id'
                                    ? rule.label.id
                                    : rule.label.en}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default PasswordStrength;
