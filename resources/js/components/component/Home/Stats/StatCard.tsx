import { useCountUp } from '@/hooks/useCountUp';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type StatCard = {
    icon: React.ElementType;
    target: number;
    suffix: string;
    label: string;
    desc: string;
    color: string;
    bg: string;
    delay: number;
};

function StatCard({
    icon: Icon,
    target,
    suffix,
    label,
    desc,
    color,
    bg,
    delay,
}: StatCard) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const count = useCountUp({ target, duration: 1600, start: inView });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex cursor-default flex-col items-center gap-4 rounded-2xl border border-white/30 bg-white/15 p-8 text-center shadow-[0_6px_0_0_rgba(0,0,0,0.25),0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.3),0_14px_28px_rgba(0,0,0,0.22)] active:translate-y-[5px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]"
        >
            {/* Icon circle */}
            <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} shadow-[0_3px_0_0_rgba(0,0,0,0.2)]`}
            >
                <Icon style={{ color }} className="h-8 w-8" />
            </div>

            {/* Counting number */}
            <div className="text-5xl font-extrabold text-white tabular-nums drop-shadow-md">
                {count}
                {suffix}
            </div>

            {/* Labels */}
            <div>
                <div className="font-semibold text-white">{label}</div>
                <div className="mt-0.5 text-xs text-white/60">{desc}</div>
            </div>
        </motion.div>
    );
}

export default StatCard;
