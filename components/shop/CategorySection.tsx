
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { ICategory } from '@/constants/data';

interface CategoriesSectionProps {
    initialCategories: ICategory[];
}

const CategoriesSection = ({ initialCategories }: CategoriesSectionProps) => {
    const categoriesToShow = initialCategories.length > 0 ? initialCategories : [];

    return (
        <section className="py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                    Shop by <span className="text-primary dark:text-primary">Category</span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
                    Discover our premium selection of smart audio devices and accessories designed for the ultimate listening experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoriesToShow.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.name}`}
                            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={category.image || '/placeholder.jpg'}
                                    alt={category.name}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                                <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                                <p className="text-gray-200 text-sm line-clamp-2">
                                    {category.description || `Explore our ${category.name} collection.`}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link href="/products" className={cn("px-6 py-3", buttonVariants({ variant: "default" }))}>
                        Explore All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
