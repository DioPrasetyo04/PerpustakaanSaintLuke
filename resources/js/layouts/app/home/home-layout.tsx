'use client';

import { Mockup, MockupFrame } from '@/components/ui/mockup';
import Image from 'next/image';

// Responsive Desktop Mockup Demo
export function MockupResponsive() {
    return (
        <MockupFrame>
            <Mockup type="responsive">
                <Image
                    src="https://www.launchuicomponents.com/app-light.png"
                    alt="Desktop application"
                    width={800}
                    height={450}
                    className="w-full"
                />
            </Mockup>
        </MockupFrame>
    );
}

// Mobile Mockup Demo
export function MockupMobile() {
    return (
        <MockupFrame size="large">
            <Mockup type="mobile">
                <Image
                    src="https://www.launchuicomponents.com/mobile-app-light.png"
                    alt="Mobile application"
                    width={350}
                    height={700}
                    className="w-full"
                />
            </Mockup>
        </MockupFrame>
    );
}
