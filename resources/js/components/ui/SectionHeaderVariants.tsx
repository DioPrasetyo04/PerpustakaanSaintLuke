import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority'
import {motion} from 'framer-motion';
import React from 'react'

export const headerVariants = cva(
  [
    "font-poppins",
    "tracking-tight",
    "transition-all duration-300",
    "select-none"
  ],
  {
    variants: {
      align: {
        center: "text-center mx-auto",
        left: "text-left",
        right: "text-right",
      },

      size: {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
        "2xl": "text-5xl",
      },

      color: {
        default:
          "text-gray-900",

        muted:
          "text-gray-600",

        white:
          "text-white",

        primary:
          "text-indigo-600",
      },

      hover: {
        none: "",

        scale: "hover:scale-105",

        lift: "hover:-translate-y-1 hover:scale-[1.02]",

        glow:
          "hover:text-indigo-600",

        underline:
          "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full",
      },

      weight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
        black: "font-black",
      },
    },

    defaultVariants: {
      align: "center",
      size: "xl",
      color: "default",
      hover: "none",
      weight: "bold",
    },
  }
);

type SectionHeaderProps = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headerVariants> & {
    title: string;
    subtitle?: string
}

const SectionHeader = ({
    title,
    subtitle,
    align,
    size,
    color,
    hover,
    weight,
    className
}: SectionHeaderProps) => {
  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("mb-12", align=== "center" && "text-center")}
        >
            <h2 className={cn(headerVariants({align, size, color, hover, weight}), className)}>
                {title}
            </h2>

            {subtitle && (
                <p className={cn(headerVariants({align, size: "md", color: "default", hover, weight}), "max-w-2xl mt-5")}>
                    {subtitle}
                </p>
            )}
    </motion.div>
  )
}

export default SectionHeader;
