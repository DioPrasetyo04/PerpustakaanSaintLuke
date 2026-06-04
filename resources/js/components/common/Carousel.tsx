import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination as SwiperPagination,
    Autoplay,
    FreeMode,
    A11y,
    Keyboard,
} from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

type CarouselProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getKey?: (item: T, index: number) => React.Key;
    /** Responsive slidesPerView config keyed by min-width breakpoint. */
    breakpoints?: SwiperOptions['breakpoints'];
    spaceBetween?: number;
    /** false to disable, or a delay in ms for autoplay. */
    autoplay?: boolean | number;
    loop?: boolean;
    freeMode?: boolean;
    className?: string;
    ariaLabel?: string;
};

const defaultBreakpoints: SwiperOptions['breakpoints'] = {
    0: { slidesPerView: 1.15 },
    480: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
};

function Carousel<T>({
    items,
    renderItem,
    getKey,
    breakpoints = defaultBreakpoints,
    spaceBetween = 24,
    autoplay = false,
    loop = false,
    freeMode = false,
    className,
    ariaLabel = 'carousel',
}: CarouselProps<T>) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    if (!items?.length) return null;

    const navButton =
        'flex h-11 w-11 items-center justify-center rounded-full border border-black/5 ' +
        'bg-white/80 text-gray-700 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 ' +
        'hover:scale-110 hover:bg-white hover:text-brand ' +
        'dark:border-white/10 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-brand ' +
        'disabled:cursor-not-allowed disabled:opacity-0';

    return (
        <div className={cn('relative', className)} role="region" aria-label={ariaLabel}>
            <button
                ref={prevRef}
                type="button"
                aria-label="Previous slide"
                className={cn(
                    navButton,
                    'absolute top-1/2 -left-2 z-20 -translate-y-1/2 md:-left-5',
                )}
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                ref={nextRef}
                type="button"
                aria-label="Next slide"
                className={cn(
                    navButton,
                    'absolute top-1/2 -right-2 z-20 -translate-y-1/2 md:-right-5',
                )}
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            <Swiper
                modules={[
                    Navigation,
                    SwiperPagination,
                    Autoplay,
                    FreeMode,
                    A11y,
                    Keyboard,
                ]}
                breakpoints={breakpoints}
                spaceBetween={spaceBetween}
                loop={loop}
                freeMode={freeMode}
                keyboard={{ enabled: true }}
                grabCursor
                autoplay={
                    autoplay
                        ? {
                              delay:
                                  typeof autoplay === 'number' ? autoplay : 4500,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                          }
                        : false
                }
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    if (
                        swiper.params.navigation &&
                        typeof swiper.params.navigation !== 'boolean'
                    ) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                className="!px-1 !pt-2 !pb-12"
            >
                {items.map((item, index) => (
                    <SwiperSlide
                        key={getKey ? getKey(item, index) : index}
                        className="!h-auto"
                    >
                        {renderItem(item, index)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carousel;
