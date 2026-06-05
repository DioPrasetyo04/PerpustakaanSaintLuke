import { useCountUp } from '@/hooks/useCountUp';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
    icon: React.ElementType;
    target: number;
    suffix: string;
    label: string;
    desc: string;
    delay: number;
    /** Tailwind classes for the icon halo, e.g. "bg-brand/15 text-brand" */
    iconClass: string;
    /** Percentage change vs previous period; null hides the badge */
    trend?: number | null;
};

function StatCard({
    icon: Icon,
    target,
    suffix,
    label,
    desc,
    delay,
    iconClass,
    trend,
}: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const count = useCountUp({ target, duration: 1600, start: inView });

    const hasTrend = trend !== null && trend !== undefined && isFinite(trend);
    const isUp = (trend ?? 0) >= 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className="theme-transition group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
        >
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-brand/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex w-full items-start justify-between">
                <div
                    className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset ring-current/10',
                        iconClass,
                    )}
                >
                    <Icon className="h-7 w-7" />
                </div>

                {hasTrend && (
                    <span
                        className={cn(
                            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                            isUp
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                        )}
                    >
                        {isUp ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {Math.abs(trend as number).toFixed(1)}%
                    </span>
                )}
            </div>

            <div className="font-display text-4xl font-extrabold tracking-tight text-foreground tabular-nums">
                {count}
                {suffix}
            </div>

            <div>
                <div className="font-semibold text-foreground">{label}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{desc}</div>
            </div>
        </motion.div>
    );
}

export default StatCard;
