import { useEffect, useRef, useState } from 'react';

type UseCountUpOptionsProps = {
    target: number;
    duration?: number;
    start?: boolean;
};

export const useCountUp = ({
    duration = 180,
    start = true,
    target,
}: UseCountUpOptionsProps) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);

            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * target));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(step);
            }
        };

        frameRef.current = requestAnimationFrame(step);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [target, duration, start]);

    return count;
};
