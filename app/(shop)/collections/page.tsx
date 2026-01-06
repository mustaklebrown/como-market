import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import CollectionsGrid from '@/components/shop/CollectionsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Collections | Como Market',
    description: 'Explore our carefully curated collections designed to elevate every aspect of your lifestyle.',
};

export const revalidate = 3600; // Optimize for Vercel with ISR (1 hour)

async function getCategories() {
    return await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
}

export default async function CollectionsPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
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
                    </div>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {categories.length === 0 ? (
                        <div className="text-center py-32">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No Collections Yet</h3>
                            <p className="text-muted-foreground mb-6">Check back soon for our curated collections.</p>
                            <Button asChild>
                                <Link href="/products">Browse All Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <CollectionsGrid categories={categories} />
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div>
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
                    </div>
                </div>
            </section>
        </div>
    );
}
