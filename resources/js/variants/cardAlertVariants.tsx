import { cva } from 'class-variance-authority';

export const cardAlertVariants = cva(
    'card w-full rounded-lg border backdrop-blur-md transition-all',
    {
        variants: {
            variant: {
                default: 'border-white bg-white text-black',
                success: 'border-white bg-white text-green-600',
                error: 'border-white bg-white text-red-600',
                failed: 'border-white bg-white text-yellow-600',
                info: 'border-white bg-white text-blue-600',
            },
            size: {
                default: 'max-w-full p-2 md:max-w-md md:p-4 lg:max-w-lg lg:p-4',
                sm: 'max-w-[100px] p-2 md:max-w-sm md:p-3 lg:max-w-md lg:p-3',
                md: 'max-w-[120px] p-2 md:max-w-md md:p-4 lg:max-w-lg lg:p-4',
                lg: 'max-w-[140px] p-2 md:max-w-md md:p-4 lg:max-w-lg lg:p-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);
