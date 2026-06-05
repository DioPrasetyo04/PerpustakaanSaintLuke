import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-input text-cobalt-dk shadow-sm focus:ring-cobalt ' +
                className
            }
        />
    );
}
