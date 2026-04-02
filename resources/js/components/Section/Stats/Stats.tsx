import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Library, Users, BarChart2, Activity, PieChart } from 'lucide-react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area,
    PieChart as RechartsPie,
    Pie,
    Cell,
    Legend,
    Tooltip,
} from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';

// ─── Counting hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const statsData = [
    {
        icon: Library,
        target: 150,
        suffix: '+',
        label: 'Total Buku',
        desc: 'Koleksi buku yang tersedia',
        color: '#D4AF37',
        bg: 'bg-[#D4AF37]/20',
        delay: 0,
    },
    {
        icon: BookOpen,
        target: 25,
        suffix: '+',
        label: 'Total Penulis',
        desc: 'Penulis dari berbagai genre',
        color: '#f0d57a',
        bg: 'bg-[#f0d57a]/20',
        delay: 0.12,
    },
    {
        icon: Users,
        target: 80,
        suffix: '+',
        label: 'Anggota Aktif',
        desc: 'Member terdaftar aktif',
        color: '#c3a237',
        bg: 'bg-[#c3a237]/20',
        delay: 0.24,
    },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────
const borrowData = [
    { bulan: 'Jan', peminjaman: 42 },
    { bulan: 'Feb', peminjaman: 58 },
    { bulan: 'Mar', peminjaman: 35 },
    { bulan: 'Apr', peminjaman: 70 },
    { bulan: 'Mei', peminjaman: 65 },
    { bulan: 'Jun', peminjaman: 80 },
    { bulan: 'Jul', peminjaman: 55 },
    { bulan: 'Agu', peminjaman: 90 },
    { bulan: 'Sep', peminjaman: 48 },
    { bulan: 'Okt', peminjaman: 72 },
    { bulan: 'Nov', peminjaman: 60 },
    { bulan: 'Des', peminjaman: 85 },
];
const borrowConfig = { peminjaman: { label: 'Peminjaman', color: '#D4AF37' } } satisfies ChartConfig;

const categoryData = [
    { name: 'Fiksi', value: 35 },
    { name: 'Sains', value: 25 },
    { name: 'Sejarah', value: 20 },
    { name: 'Teknologi', value: 15 },
    { name: 'Lainnya', value: 5 },
];
const CATEGORY_COLORS = ['#D4AF37', '#f0d57a', '#c3a237', '#b8933e', '#8a6f2e'];
const categoryConfig = {
    Fiksi: { label: 'Fiksi', color: '#D4AF37' },
    Sains: { label: 'Sains', color: '#f0d57a' },
    Sejarah: { label: 'Sejarah', color: '#c3a237' },
    Teknologi: { label: 'Teknologi', color: '#b8933e' },
    Lainnya: { label: 'Lainnya', color: '#8a6f2e' },
} satisfies ChartConfig;

const memberData = [
    { bulan: 'Jan', anggota: 15 },
    { bulan: 'Feb', anggota: 22 },
    { bulan: 'Mar', anggota: 28 },
    { bulan: 'Apr', anggota: 35 },
    { bulan: 'Mei', anggota: 40 },
    { bulan: 'Jun', anggota: 52 },
    { bulan: 'Jul', anggota: 58 },
    { bulan: 'Agu', anggota: 65 },
    { bulan: 'Sep', anggota: 70 },
    { bulan: 'Okt', anggota: 75 },
    { bulan: 'Nov', anggota: 80 },
    { bulan: 'Des', anggota: 90 },
];
const memberConfig = { anggota: { label: 'Anggota', color: '#D4AF37' } } satisfies ChartConfig;

// ─── Raised Card ─────────────────────────────────────────────────────────────
// Efek "menonjol" seperti navItem di button3D:
// shadow bawah tebal → terlihat seperti raised button
const RAISED_CARD =
    'rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm ' +
    'shadow-[0_6px_0_0_rgba(0,0,0,0.25),0_10px_24px_rgba(0,0,0,0.18)] ' +
    'transition-all duration-200 ' +
    'hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.3),0_14px_28px_rgba(0,0,0,0.22)] ' +
    'active:translate-y-[5px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
    icon: Icon,
    target,
    suffix,
    label,
    desc,
    color,
    bg,
    delay,
}: (typeof statsData)[number]) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const count = useCountUp(target, 1600, inView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`${RAISED_CARD} flex flex-col items-center gap-4 p-8 text-center cursor-default`}
        >
            {/* Icon circle */}
            <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} shadow-[0_3px_0_0_rgba(0,0,0,0.2)]`}
            >
                <Icon style={{ color }} className="h-8 w-8" />
            </div>

            {/* Counting number */}
            <div className="text-5xl font-extrabold tabular-nums text-white drop-shadow-md">
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

// ─── Pie custom label ─────────────────────────────────────────────────────────
const renderPieLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
    cx: number; cy: number; midAngle: number; innerRadius: number;
    outerRadius: number; percent: number;
}) => {
    if (percent < 0.06) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
            fontSize={11} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// ─── Chart Card wrapper ───────────────────────────────────────────────────────
function ChartCard({ icon: Icon, title, subtitle, children }: {
    icon: React.ElementType; title: string; subtitle: string; children: React.ReactNode;
}) {
    return (
        <div className={`${RAISED_CARD} p-6`}>
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-5 w-5 text-[#D4AF37]" />
                <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-xs text-white/55">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Stats = () => {
    return (
        <section className="border-b border-[#D4AF37] bg-gradient-to-b from-[#d2a54c] to-[#7a5c1e] py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <TabGroup>
                    {/* Tab buttons */}
                    <div className="mb-10 flex justify-center">
                        <TabList className="flex gap-1 rounded-full bg-black/25 p-1.5 shadow-inner backdrop-blur-sm">
                            {[
                                { label: 'Statistik', icon: BarChart2 },
                                { label: 'Grafik & Diagram', icon: Activity },
                            ].map(({ label, icon: Icon }) => (
                                <Tab
                                    key={label}
                                    className="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none data-[selected]:bg-[#D4AF37] data-[selected]:text-black data-[selected]:shadow-lg"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                    </div>

                    <TabPanels>
                        {/* ══ Tab 1 : Statistik ══ */}
                        <TabPanel>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="grid grid-cols-1 gap-6 md:grid-cols-3"
                            >
                                {statsData.map((s) => (
                                    <StatCard key={s.label} {...s} />
                                ))}
                            </motion.div>
                        </TabPanel>

                        {/* ══ Tab 2 : Grafik & Diagram ══ */}
                        <TabPanel>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-6"
                            >
                                {/* Bar Chart */}
                                <ChartCard
                                    icon={BarChart2}
                                    title="Peminjaman Bulanan"
                                    subtitle="Jumlah peminjaman buku per bulan"
                                >
                                    <ChartContainer config={borrowConfig} className="h-56 w-full">
                                        <BarChart data={borrowData} barSize={22}>
                                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="bulan" tickLine={false} axisLine={false}
                                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                                            <YAxis tickLine={false} axisLine={false}
                                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                                            <ChartTooltip
                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar dataKey="peminjaman" fill="#D4AF37" radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ChartContainer>
                                </ChartCard>

                                {/* Pie + Area side by side */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Pie */}
                                    <ChartCard
                                        icon={PieChart}
                                        title="Kategori Buku"
                                        subtitle="Distribusi koleksi berdasarkan kategori"
                                    >
                                        <ChartContainer config={categoryConfig} className="h-56 w-full">
                                            <RechartsPie>
                                                <Pie
                                                    data={categoryData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={82}
                                                    labelLine={false}
                                                    label={renderPieLabel}
                                                >
                                                    {categoryData.map((_e, i) => (
                                                        <Cell key={i} fill={CATEGORY_COLORS[i]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(v: number, n: string) => [`${v}%`, n]}
                                                    contentStyle={{
                                                        background: 'rgba(0,0,0,0.75)',
                                                        border: '1px solid rgba(212,175,55,0.4)',
                                                        borderRadius: 8,
                                                        color: 'white',
                                                        fontSize: 12,
                                                    }}
                                                />
                                                <Legend
                                                    iconType="circle"
                                                    iconSize={8}
                                                    formatter={(v) => (
                                                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>{v}</span>
                                                    )}
                                                />
                                            </RechartsPie>
                                        </ChartContainer>
                                    </ChartCard>

                                    {/* Area */}
                                    <ChartCard
                                        icon={Activity}
                                        title="Pertumbuhan Anggota"
                                        subtitle="Akumulasi anggota terdaftar per bulan"
                                    >
                                        <ChartContainer config={memberConfig} className="h-56 w-full">
                                            <AreaChart data={memberData}>
                                                <defs>
                                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                                                <XAxis dataKey="bulan" tickLine={false} axisLine={false}
                                                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                                                <YAxis tickLine={false} axisLine={false}
                                                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Area
                                                    type="monotone"
                                                    dataKey="anggota"
                                                    stroke="#D4AF37"
                                                    strokeWidth={2.5}
                                                    fill="url(#areaGrad)"
                                                    dot={{ fill: '#D4AF37', r: 3 }}
                                                    activeDot={{ r: 5, fill: '#fff', stroke: '#D4AF37', strokeWidth: 2 }}
                                                />
                                            </AreaChart>
                                        </ChartContainer>
                                    </ChartCard>
                                </div>
                            </motion.div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </section>
    );
};

export default Stats;
