export type enum_type_fine = 'percentage' | 'fixed';

export type FineSettingsProps = {
    id: number;
    late_fee_per_day: number;
    damage_discount_type: enum_type_fine;
    damage_fee_book: number;
    lost_discount_type: enum_type_fine;
    lost_fee_book: number;
    loan_duration_days: number;
};
