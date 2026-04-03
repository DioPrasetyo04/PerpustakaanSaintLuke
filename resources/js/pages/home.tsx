import HeroSection from '@/components/Section/Hero/Hero';
import Stats from '@/components/Section/Stats/Stats';
import FeatureBooks from '@/components/Section/FeatureBooks/FeatureBooks';
import Categories from '@/components/Section/Category/Categories';
import AnnouncementsSection from '@/components/Section/Announcements/Announcements';
import { Footer } from '@/components/common/Footer';
import Faq from '@/components/Section/FAQ/Faq';

const home = () => {
    return (
        <>
            <HeroSection />
            <Stats />
            <FeatureBooks />
            <Categories />
            <AnnouncementsSection />
            <Faq />
            <Footer />
        </>
    );
};

export default home;
