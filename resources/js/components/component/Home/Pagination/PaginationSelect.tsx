import { PaginationSelectProps } from '@/types/pagination';
import React from 'react';

const PaginationSelect = ({ value, onChange }: PaginationSelectProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page</span>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-white dark:border-white/10 dark:bg-amber-600"
            >
                <option value={1}>1</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={4}>12</option>
                <option value={4}>16</option>
            </select>
        </div>
    );
};

export default PaginationSelect;
