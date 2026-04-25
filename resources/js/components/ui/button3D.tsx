import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
    [
        'relative inline-flex items-center justify-center',
        // Pill shape and border from Image 1 request
        'rounded-2xl border-[1.5px] border-white/60',
        'font-black uppercase tracking-wider',
        'transition-all duration-150 ease-out',
        'select-none cursor-pointer',
        'px-6 h-11',
    ],
    {
        variants: {
            variant: {
                default: [
                    // 3D effect from Image 2
                    'bg-[#65C9B3] text-[#1E5F54]', // Cyan with dark teal text
                    'shadow-[0_5px_0_0_#2B8B75,0_8px_15px_rgba(0,0,0,0.15)]', // 3D ridge + outer drop
                    'hover:-translate-y-[1px]',
                    'hover:bg-[#6DD3BC]',
                    'hover:shadow-[0_6px_0_0_#2B8B75,0_10px_20px_rgba(0,0,0,0.2)]',
                    // Button press simulation
                    'active:translate-y-[5px]',
                    'active:shadow-[0_0px_0_0_#2B8B75,0_0px_0px_rgba(0,0,0,0)]',
                    'data-[state=open]:translate-y-[5px]',
                    'data-[state=open]:shadow-[0_0px_0_0_#2B8B75,0_0px_0px_rgba(0,0,0,0)]',
                ],
                ghost: [
                    // Light/glassy version matching off-state or Image 1 container
                    'bg-white/90 text-gray-800 backdrop-blur-md',
                    'shadow-[0_4px_0_0_#D1D5DB,0_6px_10px_rgba(0,0,0,0.05)]',
                    'hover:bg-white',
                    'hover:-translate-y-[1px]',
                    'hover:shadow-[0_5px_0_0_#D1D5DB,0_8px_15px_rgba(0,0,0,0.1)]',
                    'active:translate-y-[4px]',
                    'active:shadow-[0_0px_0_0_#D1D5DB,0_0px_0px_rgba(0,0,0,0)]',
                    'data-[state=open]:translate-y-[4px]',
                    'data-[state=open]:shadow-[0_0px_0_0_#D1D5DB,0_0px_0px_rgba(0,0,0,0)]',
                ],
                navItem: [
                    'bg-[#C8A45C]/15 text-current border border-transparent backdrop-blur-sm',
                    'shadow-[0_4px_0_0_rgba(200,164,92,0.4)]',
                    'hover:-translate-y-[1px] hover:bg-[#C8A45C]/25',
                    'hover:shadow-[0_5px_0_0_rgba(200,164,92,0.5)]',
                    'active:translate-y-[4px]',
                    'active:shadow-[0_0px_0_0_transparent]',
                    'data-[state=open]:bg-[#C8A45C]/30',
                    'data-[state=open]:translate-y-[4px]',
                    'data-[state=open]:shadow-[0_0px_0_0_transparent]',
                ],
               languageItem: [
                    'inline-flex items-center gap-2',

                    'bg-[#F9FAFB]/80',
                    'text-[#C8A45C]',

                    'border border-[#E5E7EB]/60',
                    'backdrop-blur-md',

                    'px-3 h-9 rounded-xl',

                    // subtle shadow
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',

                    // hover
                    'hover:bg-[#F9FAFB]',
                    'hover:border-[#C8A45C]/30',
                    'hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]',

                    // active soft
                    'active:scale-[0.98]',

                    // open state
                    'data-[state=open]:bg-[#C8A45C]/10',
                    'data-[state=open]:border-[#C8A45C]/40',
                    '[&>svg]:transition-transform',
                    'data-[state=open]:[&>svg]:rotate-180',
                ]
            },
            size: {
                sm: 'h-9 px-5 text-xs',
                default: 'h-11 px-7 text-sm',
                lg: 'h-12 px-8 text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ItemButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const ButtonVariants = React.forwardRef<HTMLButtonElement, ItemButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
ButtonVariants.displayName = 'ButtonVariants';

export { ButtonVariants };
