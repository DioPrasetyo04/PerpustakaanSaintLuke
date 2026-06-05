import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
interface PhoneFieldProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    description?: string;
    defaultCountry?: string;
    disabled?: boolean;
}

export default function PhoneField({
    label = 'Phone Number',
    value,
    onChange,
    error,
    required = false,
    description,
    defaultCountry = 'id',
    disabled = false,
}: PhoneFieldProps) {
    return (
        <Field>
            {label && <FieldLabel>{label}</FieldLabel>}
            <PhoneInput
                country={defaultCountry}
                value={value}
                onChange={(val) => onChange(val)}
                disabled={disabled}
                containerClass="w-full"
                buttonClass="!border !border-input"
                dropdownClass="!text-black"
                inputClass="!w-full !h-10 !text-sm !rounded-md !border"
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
            )}
        </Field>
    );
}
