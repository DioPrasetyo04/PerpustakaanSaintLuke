import React from 'react';
import { motion } from 'framer-motion';
import {
    Library,
    Users,
    UserCheck,
    BarChart2,
    Activity,
    PieChart,
    ChartBarIncreasing,
} from 'lucide-react';
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
import { useLanguage } from '@/hooks/useLanguage';
import StatCard from '@/components/component/Home/Stats/StatCard';
import type {
    BookChartItem,
    VisitorChartItem,
    CategoryChartItem,
    MemberChartItem,
} from '@/types/HomePage/HomeType';
import { statsHeaderHome } from '@/data/data';

const AXIS_TICK = { fill: 'var(--muted-foreground)', fontSize: 11 } as const;
const GRID_STROKE = 'var(--border)';
const BRAND = 'var(--brand)';
const CATEGORY_COLORS = [
    'var(--brand)',
    'var(--accent-indigo)',
    'var(--accent-violet)',
    '#10b981',
    '#f43f5e',
];

/** Percentage change between the last two periods of a series. */
const trendOf = <T,>(arr: T[], key: keyof T): number | null => {
    if (!arr || arr.length < 2) return null;
    const last = Number(arr[arr.length - 1]?.[key] ?? 0);
    const prev = Number(arr[arr.length - 2]?.[key] ?? 0);
    if (!prev) return null;
    return ((last - prev) / prev) * 100;
};

const renderPieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}) => {
    if (percent < 0.06) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={11}
            fontWeight={700}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function ChartCard({
    icon: Icon,
    title,
    subtitle,
    children,
}: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="theme-transition flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <Icon className="h-5 w-5" />
                </span>
                <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

type StatsProps = {
    dataCountBooks: number;
    dataCountVisitors: number;
    dataCountUsers: number;
    visitorData: VisitorChartItem[];
    categoryData: CategoryChartItem[];
    bookData: BookChartItem[];
    memberData: MemberChartItem[];
};

const Stats = ({
    dataCountBooks,
    dataCountVisitors,
    dataCountUsers,
    visitorData,
    bookData,
    categoryData,
    memberData,
}: StatsProps) => {
    const { language } = useLanguage();
    const id = language === 'id';
    const text = id ? statsHeaderHome.id : statsHeaderHome.en;

    const bookConfig = {
        books: { label: id ? 'Buku' : 'Books', color: BRAND },
    } satisfies ChartConfig;
    const visitorConfig = {
        visits: { label: id ? 'Pengunjung' : 'Visitors', color: BRAND },
    } satisfies ChartConfig;
    const memberConfig = {
        members: { label: id ? 'Anggota' : 'Members', color: BRAND },
    } satisfies ChartConfig;

    const statsData = [
        {
            icon: Library,
            target: dataCountBooks,
            suffix: '+',
            label: id ? 'Total Buku' : 'Total Books',
            desc: id ? 'Koleksi buku tersedia' : 'Books in the collection',
            iconClass: 'bg-brand/15 text-brand',
            trend: trendOf(bookData, 'books'),
            delay: 0,
        },
        {
            icon: Users,
            target: dataCountVisitors,
            suffix: '+',
            label: id ? 'Total Pengunjung' : 'Total Visitors',
            desc: id ? 'Pengunjung perpustakaan' : 'Library visitors',
            iconClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
            trend: trendOf(visitorData, 'visits'),
            delay: 0.12,
        },
        {
            icon: UserCheck,
            target: dataCountUsers,
            suffix: '+',
            label: id ? 'Anggota Aktif' : 'Active Members',
            desc: id ? 'Member terdaftar aktif' : 'Registered members',
            iconClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            trend: trendOf(memberData, 'members'),
            delay: 0.24,
        },
    ];

    const dynamicCategoryConfig = Object.fromEntries(
        categoryData.map((item, i) => [
            item.name,
            {
                label: item.name,
                color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
            },
        ]),
    );

    const tabs = [
        { label: id ? 'Statistik' : 'Statistics', icon: BarChart2 },
        { label: id ? 'Grafik & Diagram' : 'Charts & Graphs', icon: Activity },
    ];

    return (
        <section className="theme-transition relative overflow-hidden border-y border-border bg-linear-to-b from-amber-50/60 via-background to-background py-20 dark:from-background dark:via-background dark:to-background">
            <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl dark:bg-brand/5" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {text.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        {text.subtitle}
                    </p>
                </motion.div>

                <TabGroup>
                    <div className="mb-10 flex justify-center">
                        <TabList className="flex gap-1 rounded-full border border-border bg-card/70 p-1.5 shadow-sm backdrop-blur-sm">
                            {tabs.map(({ label, icon: Icon }) => (
                                <Tab
                                    key={label}
                                    className="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:text-foreground focus:outline-none data-selected:bg-brand data-selected:text-brand-foreground data-selected:shadow-sm"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                    </div>

                    <TabPanels>
                        {/* Tab 1: Statistik */}
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

                        {/* Tab 2: Grafik & Diagram */}
                        <TabPanel>
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                            >
                                <ChartCard
                                    icon={BarChart2}
                                    title={id ? 'Data Pengunjung' : 'Visitors'}
                                    subtitle={
                                        id
                                            ? 'Pengunjung per bulan (12 bulan terakhir)'
                                            : 'Visitors per month (last 12 months)'
                                    }
                                >
                                    <ChartContainer
                                        config={visitorConfig}
                                        className="h-56 w-full"
                                    >
                                        <BarChart
                                            accessibilityLayer
                                            data={visitorData}
                                            barSize={22}
                                        >
                                            <CartesianGrid
                                                vertical={false}
                                                stroke={GRID_STROKE}
                                            />
                                            <XAxis
                                                dataKey="bulan"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <ChartTooltip
                                                cursor={{
                                                    fill: 'var(--muted)',
                                                    opacity: 0.4,
                                                }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar
                                                dataKey="visits"
                                                fill={BRAND}
                                                radius={[6, 6, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </ChartCard>

                                <ChartCard
                                    icon={ChartBarIncreasing}
                                    title={id ? 'Data Buku' : 'Books'}
                                    subtitle={
                                        id
                                            ? 'Penambahan buku per bulan (12 bulan terakhir)'
                                            : 'Books added per month (last 12 months)'
                                    }
                                >
                                    <ChartContainer
                                        config={bookConfig}
                                        className="h-56 w-full"
                                    >
                                        <BarChart
                                            accessibilityLayer
                                            data={bookData}
                                            barSize={22}
                                            layout="vertical"
                                            margin={{ left: -20 }}
                                        >
                                            <CartesianGrid
                                                horizontal
                                                stroke={GRID_STROKE}
                                            />
                                            <XAxis
                                                type="number"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <YAxis
                                                dataKey="bulan"
                                                type="category"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <ChartTooltip
                                                cursor={{
                                                    fill: 'var(--muted)',
                                                    opacity: 0.4,
                                                }}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Bar
                                                dataKey="books"
                                                fill={BRAND}
                                                radius={[0, 6, 6, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </ChartCard>

                                <ChartCard
                                    icon={PieChart}
                                    title={id ? 'Kategori Buku' : 'Book Categories'}
                                    subtitle={
                                        id
                                            ? 'Distribusi koleksi berdasarkan kategori'
                                            : 'Collection distribution by category'
                                    }
                                >
                                    <ChartContainer
                                        config={dynamicCategoryConfig}
                                        className="h-56 w-full"
                                    >
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
                                                {categoryData.map((item, i) => (
                                                    <Cell
                                                        key={i}
                                                        fill={
                                                            CATEGORY_COLORS[
                                                                i %
                                                                    CATEGORY_COLORS.length
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(
                                                    v: number,
                                                    n: string,
                                                ) => [`${v}%`, n]}
                                                contentStyle={{
                                                    background: 'var(--popover)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 8,
                                                    color: 'var(--popover-foreground)',
                                                    fontSize: 12,
                                                }}
                                            />
                                            <Legend
                                                iconType="circle"
                                                iconSize={8}
                                                formatter={(v) => (
                                                    <span
                                                        style={{
                                                            color: 'var(--muted-foreground)',
                                                            fontSize: 11,
                                                        }}
                                                    >
                                                        {v}
                                                    </span>
                                                )}
                                            />
                                        </RechartsPie>
                                    </ChartContainer>
                                </ChartCard>

                                <ChartCard
                                    icon={Activity}
                                    title={
                                        id
                                            ? 'Pertumbuhan Anggota'
                                            : 'Member Growth'
                                    }
                                    subtitle={
                                        id
                                            ? 'Anggota per bulan (12 bulan terakhir)'
                                            : 'Members per month (last 12 months)'
                                    }
                                >
                                    <ChartContainer
                                        config={memberConfig}
                                        className="h-56 w-full"
                                    >
                                        <AreaChart data={memberData}>
                                            <defs>
                                                <linearGradient
                                                    id="areaGrad"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor={BRAND}
                                                        stopOpacity={0.4}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor={BRAND}
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                vertical={false}
                                                stroke={GRID_STROKE}
                                            />
                                            <XAxis
                                                dataKey="bulan"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tick={AXIS_TICK}
                                            />
                                            <ChartTooltip
                                                content={<ChartTooltipContent />}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="members"
                                                stroke={BRAND}
                                                strokeWidth={2.5}
                                                fill="url(#areaGrad)"
                                                dot={{ fill: BRAND, r: 3 }}
                                                activeDot={{
                                                    r: 5,
                                                    fill: '#fff',
                                                    stroke: BRAND,
                                                    strokeWidth: 2,
                                                }}
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                </ChartCard>
                            </motion.div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </section>
    );
};

export default Stats;
