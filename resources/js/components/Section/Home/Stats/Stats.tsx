import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Library,
    Users,
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
import {
    BookChartItem,
    VisitorChartItem,
    CategoryChartItem,
    MemberChartItem,
} from '@/types/HomePage/HomeType';
import SectionHeader from '@/components/ui/SectionHeaderVariants';
import { statsHeaderHome } from '@/data/data';

// ─── Pie custom label ─────────────────────────────────────────────────────────
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

// ─── Chart Card wrapper ───────────────────────────────────────────────────────
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
        <div className="flex cursor-default flex-col items-center gap-4 rounded-2xl border border-white/30 bg-white/15 p-6 p-8 text-center shadow-[0_6px_0_0_rgba(0,0,0,0.25),0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.3),0_14px_28px_rgba(0,0,0,0.22)] active:translate-y-[5px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)]">
            <div className="mb-4 flex items-center gap-2">
                <Icon className="h-5 w-5 text-[#ffff]" />
                <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-xs text-white/55">{subtitle}</p>
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
// ─── Main Component ───────────────────────────────────────────────────────────
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

    const text = language === 'id' ? statsHeaderHome.id : statsHeaderHome.en;

    const CATEGORY_COLORS = [
        '#D4AF37',
        '#f0d57a',
        '#c3a237',
        '#b8933e',
        '#8a6f2e',
    ];

    const bookConfig = {
        buku: { label: 'Buku', color: '#D4AF37' },
    } satisfies ChartConfig;

    const visitorConfig = {
        pengunjung: { label: 'Pengunjung', color: '#D4AF37' },
    } satisfies ChartConfig;

    const memberConfig = {
        anggota: { label: 'Anggota', color: '#D4AF37' },
    } satisfies ChartConfig;
    const statsData = [
        {
            icon: Library,
            target: dataCountBooks,
            suffix: '+',
            label: 'Total Buku',
            desc: 'Koleksi buku yang tersedia',
            color: '#D4AF37',
            bg: 'bg-[#D4AF37]/20',
            delay: 0,
        },
        {
            icon: Users,
            target: dataCountVisitors,
            suffix: '+',
            label: 'Total Pengunjung',
            desc: 'Pengunjung perpustakaan',
            color: '#f0d57a',
            bg: 'bg-[#f0d57a]/20',
            delay: 0.12,
        },
        {
            icon: Users,
            target: dataCountUsers,
            suffix: '+',
            label: 'Anggota Aktif',
            desc: 'Member terdaftar aktif',
            color: '#c3a237',
            bg: 'bg-[#c3a237]/20',
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
    return (
        <section className="border-b border-[#D4AF37] bg-gradient-to-b from-[#d2a54c] to-[#7a5c1e] py-16">
            <SectionHeader
                title={text.title}
                subtitle={text.subtitle}
                hover="lift"
            />
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
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Bar Chart Visitors */}
                                    <ChartCard
                                        icon={BarChart2}
                                        title="Data Pengunjung"
                                        subtitle="Distribusi Data Pengunjung Per Bulan Selama 12 Bulan Terakhir"
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
                                                    stroke="rgba(255,255,255,0.1)"
                                                />
                                                <XAxis
                                                    dataKey="bulan"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <YAxis
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <ChartTooltip
                                                    cursor={{
                                                        fill: 'rgba(255,255,255,0.05)',
                                                    }}
                                                    content={
                                                        <ChartTooltipContent />
                                                    }
                                                />
                                                <Bar
                                                    dataKey="visits"
                                                    fill="#D4AF37"
                                                    radius={[6, 6, 0, 0]}
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </ChartCard>
                                    <ChartCard
                                        icon={ChartBarIncreasing}
                                        title="Data Buku"
                                        subtitle="Distribusi Data Buku Per Bulan Selama 12 Bulan Terakhir"
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
                                                margin={{
                                                    left: -20,
                                                }}
                                            >
                                                <CartesianGrid
                                                    horizontal={true}
                                                    stroke="rgba(255,255,255,0.1)"
                                                />
                                                <XAxis
                                                    type="number"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <YAxis
                                                    dataKey="bulan"
                                                    type="category"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <ChartTooltip
                                                    cursor={{
                                                        fill: 'rgba(255,255,255,0.05)',
                                                    }}
                                                    content={
                                                        <ChartTooltipContent />
                                                    }
                                                />
                                                <Bar
                                                    dataKey="books"
                                                    fill="#D4AF37"
                                                    radius={[6, 6, 0, 0]}
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </ChartCard>

                                    {/* Pie Chart Category */}
                                    <ChartCard
                                        icon={PieChart}
                                        title="Kategori Buku"
                                        subtitle="Distribusi koleksi buku berdasarkan kategori per bulan selama 12 Bulan Terakhir"
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
                                                    {categoryData.map(
                                                        (item, i) => (
                                                            <Cell
                                                                key={i}
                                                                fill={
                                                                    CATEGORY_COLORS[
                                                                        i %
                                                                            CATEGORY_COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(
                                                        v: number,
                                                        n: string,
                                                    ) => [`${v}%`, n]}
                                                    contentStyle={{
                                                        background:
                                                            'rgba(0,0,0,0.75)',
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
                                                        <span
                                                            style={{
                                                                color: 'rgba(255,255,255,0.75)',
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

                                    {/* Line Chart Member */}
                                    <ChartCard
                                        icon={Activity}
                                        title="Pertumbuhan Anggota"
                                        subtitle="Distribusi Data Anggota Per Bulan Selama 12 Bulan Terakhir"
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
                                                            stopColor="#D4AF37"
                                                            stopOpacity={0.4}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="#D4AF37"
                                                            stopOpacity={0}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid
                                                    vertical={false}
                                                    stroke="rgba(255,255,255,0.1)"
                                                />
                                                <XAxis
                                                    dataKey="bulan"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <YAxis
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tick={{
                                                        fill: 'rgba(255,255,255,0.6)',
                                                        fontSize: 11,
                                                    }}
                                                />
                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent />
                                                    }
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="members"
                                                    stroke="#D4AF37"
                                                    strokeWidth={2.5}
                                                    fill="url(#areaGrad)"
                                                    dot={{
                                                        fill: '#D4AF37',
                                                        r: 3,
                                                    }}
                                                    activeDot={{
                                                        r: 5,
                                                        fill: '#fff',
                                                        stroke: '#D4AF37',
                                                        strokeWidth: 2,
                                                    }}
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
