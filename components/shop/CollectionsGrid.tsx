"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    _count: {
        products: number;
    };
}

export default function CollectionsGrid({ categories }: { categories: Category[] }) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {categories.map((category, index) => (
                <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                >
                    <Link
                        href={`/products?category=${encodeURIComponent(category.name)}`}
                        className="group block relative h-full"
                    >
                        <div className={`relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 ${index === 0 ? "aspect-square" : "aspect-4/5"}`}>
                            {/* Image */}
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
                                    <Sparkles className="w-16 h-16 text-primary/30" />
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                {/* Badge */}
                                <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                                    {category._count.products} Products
                                </span>

                                {/* Title & Description */}
                                <div className="space-y-3">
                                    <h3 className={`font-bold text-white ${index === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                                        {category.name}
                                    </h3>
                                    <p className="text-white/70 line-clamp-2 max-w-md">
                                        {category.description || `Explore our ${category.name.toLowerCase()} collection.`}
                                    </p>
                                </div>

                                {/* CTA */}
                                <div className="mt-6 flex items-center gap-2 text-white font-medium">
                                    <span className="group-hover:underline underline-offset-4">Shop Collection</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
