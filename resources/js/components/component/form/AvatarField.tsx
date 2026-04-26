import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import AvatarUpload from './AvatarUpload';

interface AvatarFieldProps {
    label?: string;
    value: File | null;
    onChange: (file: File | null) => void;
    error?: string;
    required?: boolean;
    description?: string;
    disabled?: boolean;
}

export default function AvatarField({
    label = 'Avatar',
    value,
    onChange,
    error,
    required = false,
    description,
    disabled = false,
}: AvatarFieldProps) {
    return (
        <Field>
            {label && (
                <FieldLabel>
                    {label} {required && '*'}
                </FieldLabel>
            )}

            <AvatarUpload
                value={value}
                onChange={onChange}
                disabled={disabled}
            />

            {description && <FieldDescription>{description}</FieldDescription>}

            {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
            )}
        </Field>
    );
}
