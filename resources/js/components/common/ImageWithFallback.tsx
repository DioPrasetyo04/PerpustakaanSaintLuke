import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithFallback({
    src,
    alt,
    style,
    className,
    ...rest
}: ImageWithFallbackProps) {
    const [didError, setDidError] = useState(!src);

    if (didError) {
        return (
            <div
                className={cn(
                    'inline-block bg-muted text-center',
                    className,
                )}
                style={style}
            >
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        src={ERROR_IMG_SRC}
                        alt="Error loading image"
                        data-original-url={src}
                    />
                </div>
            </div>
        );
    }

    return (
        <img
            {...rest}
            src={src}
            alt={alt}
            className={cn(
                'h-full w-full object-cover object-center',
                className,
            )}
            style={style}
            onError={() => setDidError(true)}
        />
    );
}
