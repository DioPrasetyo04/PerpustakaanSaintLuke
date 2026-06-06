import HeroSection from '@/components/Section/Home/Hero/Hero';
import Stats from '@/components/Section/Home/Stats/Stats';
import FeatureBooks from '@/components/Section/Home/FeatureBooks/FeatureBooks';
import Categories from '@/components/Section/Home/Category/Categories';
import AnnouncementsSection from '@/components/Section/Home/Announcements/Announcements';
import LiveTicker from '@/components/Section/Home/LiveTicker/LiveTicker';
import Spotlight from '@/components/Section/Home/Spotlight/Spotlight';
import Trending from '@/components/Section/Home/Trending/Trending';
import Events from '@/components/Section/Home/Events/Events';
import PublishersMarquee from '@/components/Section/Home/Publishers/PublishersMarquee';
import Testimonials from '@/components/Section/Home/Testimonials/Testimonials';
import Faq from '@/components/Section/Home/FAQ/Faq';
import {
    TrustBar,
    HowToBorrow,
    WhyUs,
    CtaJoin,
} from '@/components/Section/Home/Extras/Extras';
import { usePage } from '@inertiajs/react';
import type { HomePageProps } from '@/types/HomePage/HomePageProps';

const home = () => {
    const { data, state } = usePage<HomePageProps>().props;
    return (
        <>
            <HeroSection books={data.books.data} />
            <LiveTicker activities={data.live_activities} />
            <TrustBar />
            <Spotlight book={data.books.data[0]} />
            <FeatureBooks books={data.books} state={state.books} />
            <Categories categories={data.categories} state={state.categories} />
            <HowToBorrow />
            <Trending books={data.books.data} />
            <Stats
                dataCountBooks={data.count_of_all_books}
                dataCountVisitors={data.count_of_all_visitors}
                dataCountUsers={data.count_of_all_users}
                visitorData={data.charts.visitor_chart}
                bookData={data.charts.book_chart}
                categoryData={data.charts.category_chart}
                memberData={data.charts.member_chart}
            />
            <WhyUs />
            <Testimonials testimonials={data.testimonials} />
            <Events events={data.events} />
            <PublishersMarquee publishers={data.publishers} />
            <AnnouncementsSection
                informations={data.informations}
                state={state.informations}
            />
            <Faq />
            <CtaJoin />
        </>
    );
};

export default home;
