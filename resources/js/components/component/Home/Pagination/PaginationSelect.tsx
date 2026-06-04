import { PaginationSelectProps } from '@/types/pagination';
import { useLanguage } from '@/hooks/useLanguage';

const OPTIONS = [4, 8, 10, 12, 16, 24] as const;

const PaginationSelect = ({ value, onChange }: PaginationSelectProps) => {
    const { language } = useLanguage();
    return (
        <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'id' ? 'Baris per halaman' : 'Rows per page'}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors duration-300 focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
            >
                {OPTIONS.map((opt) => (
                    <option
                        key={opt}
                        value={opt}
                        className="bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    >
                        {opt}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default PaginationSelect;
