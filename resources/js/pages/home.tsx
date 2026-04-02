import HeroSection from '@/components/Section/Hero/Hero';
import Navbar from '@/components/Layouts/Navbar/Navbar';
import Stats from '@/components/Section/Stats/Stats';
import React from 'react';
import FeatureBooks from '@/components/Section/FeatureBooks/FeatureBooks';

const home = () => {
    return (
        <>
            <HeroSection />
            <Stats />
            <FeatureBooks />
        </>
    );
};

export default home;
