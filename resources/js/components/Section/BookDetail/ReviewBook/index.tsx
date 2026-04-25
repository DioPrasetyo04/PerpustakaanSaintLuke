import { Card } from '@/components/ui/card';
import React from 'react';

export default function SectionReviewBook() {
    return (
        <Card className="border-4 border-primary/30 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6 shadow-2xl sm:p-10">
            {/* Header Section */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 shadow-xl">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="text-center sm:text-left">
                        <h2 className="mb-2 font-['Poppins'] text-3xl font-black text-white drop-shadow-lg sm:text-4xl">
                            📝 User Reviews ({reviews.data.length})
                        </h2>
                        <p className="text-lg text-white/90">
                            {t.headerReviews}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Badge className="bg-accent px-6 py-3 text-xl text-white shadow-lg">
                            ⭐ {book.rating} Average
                        </Badge>
                        <Button className="bg-white font-bold text-primary shadow-lg hover:bg-gray-100">
                            <Star className="mr-2 h-4 w-4 fill-accent text-accent" />
                            Sort by Rating
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                {reviewsData.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: index * 0.15,
                        }}
                        className="transform rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl sm:p-8"
                    >
                        <div className="flex gap-6">
                            {/* Reviewer Avatar with Badge */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg">
                                    #{index + 1}
                                </div>
                                <img
                                    src={review.userAvatar}
                                    alt={review.userName}
                                    className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-xl ring-4 ring-primary/20 sm:h-24 sm:w-24"
                                />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-accent to-yellow-500 px-3 py-1 shadow-lg">
                                    <div className="flex items-center gap-1">
                                        {[...Array(review.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-3 w-3 fill-white text-white"
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="min-w-0 flex-1">
                                {/* Reviewer Info */}
                                <div className="mb-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex-1">
                                            <h3 className="mb-1 flex items-center gap-2 font-['Poppins'] text-xl font-black text-gray-900 sm:text-2xl">
                                                {review.userName}
                                                <span className="text-green-500">
                                                    ✓
                                                </span>
                                            </h3>
                                            <p className="text-sm font-medium text-gray-600">
                                                📧 {review.userEmail}
                                            </p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <div className="mb-2 flex flex-wrap items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-6 w-6 ${
                                                            i < review.rating
                                                                ? 'fill-accent text-accent drop-shadow-md'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-lg font-bold text-primary">
                                                    {review.rating}
                                                    .0
                                                </span>
                                            </div>
                                            <p className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500">
                                                🕐 {review.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Comment */}
                                <div className="mb-4 rounded-xl border-l-4 border-primary bg-gradient-to-br from-gray-50 to-blue-50 p-5 shadow-md">
                                    <p className="text-base leading-relaxed font-medium text-gray-800 italic sm:text-lg">
                                        "{review.comment}"
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <button className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-green-600 hover:to-green-700 hover:shadow-xl">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                            />
                                        </svg>
                                        👍 Helpful
                                    </button>
                                    <button className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl">
                                        <MessageSquare className="h-5 w-5" />
                                        💬 Reply
                                    </button>
                                    <button className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-red-600 hover:to-red-700 hover:shadow-xl">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                                            />
                                        </svg>
                                        🚩 Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More Section */}
            <div className="mt-10 border-t-4 border-dashed border-primary/30 pt-8 text-center">
                <p className="mb-4 text-lg font-semibold text-gray-600">
                    Want to see more reviews?
                </p>
                <Button className="transform bg-gradient-to-r from-primary to-secondary px-10 py-6 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:from-primary/90 hover:to-secondary/90 hover:shadow-2xl">
                    📚 Load More Reviews
                </Button>
            </div>
        </Card>
    );
}
