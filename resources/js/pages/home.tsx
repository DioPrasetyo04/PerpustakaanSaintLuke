import HeroSection from '@/components/Section/Home/Hero/Hero';
import Stats from '@/components/Section/Home/Stats/Stats';
import FeatureBooks from '@/components/Section/Home/FeatureBooks/FeatureBooks';
import Categories from '@/components/Section/Home/Category/Categories';
import AnnouncementsSection from '@/components/Section/Home/Announcements/Announcements';
import Faq from '@/components/Section/Home/FAQ/Faq';
import { usePage } from '@inertiajs/react';
import type { HomePageProps } from '@/types/HomePage/HomePageProps';

const home = () => {
    const { data, state } = usePage<HomePageProps>().props;
    return (
        <>
            <HeroSection />
            <Stats
                dataCountBooks={data.count_of_all_books}
                dataCountAuthors={data.count_of_all_authors}
                dataCountUsers={data.count_of_all_users}
                borrowData={data.charts.borrow_chart}
                bookData={data.charts.book_chart}
                categoryData={data.charts.category_chart}
                memberData={data.charts.member_chart}
            />
            <FeatureBooks books={data.books} state={state.books} />
            <Categories categories={data.categories} state={state.categories} />
            <AnnouncementsSection
                informations={data.informations}
                state={state.informations}
            />
            <Faq />
        </>
    );
};

export default home;
