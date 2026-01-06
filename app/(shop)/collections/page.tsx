"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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

export default function CollectionsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

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
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Curated for You
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                            Our <span className="text-primary">Collections</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Discover carefully curated categories designed to elevate every aspect of your lifestyle.
                            From everyday essentials to statement pieces.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-[4/5] rounded-3xl bg-muted animate-pulse" />
                            ))}
                        </div>
                    ) : categories.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32"
                        >
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No Collections Yet</h3>
                            <p className="text-muted-foreground mb-6">Check back soon for our curated collections.</p>
                            <Button asChild>
                                <Link href="/products">Browse All Products</Link>
                            </Button>
                        </motion.div>
                    ) : (
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
                                        <div className={`relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 ${index === 0 ? "aspect-square" : "aspect-[4/5]"}`}>
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
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                                    <Sparkles className="w-16 h-16 text-primary/30" />
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

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
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Browse our complete catalog of premium products.
                        </p>
                        <Button size="lg" asChild className="rounded-full px-8">
                            <Link href="/products">
                                View All Products
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
