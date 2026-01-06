
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/constants/data";
import ProductCard from "./ProductCard";

interface FeaturedProductsProps {
    initialProducts: IProduct[];
}

export default function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
    const featuredList = initialProducts.length > 0 ? initialProducts : [];

    return (
        <section className="py-28 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="featured-header">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Featured{" "}
                            <span className="text-primary">Products</span>
                        </h2>
                        <p className="max-w-2xl text-lg text-muted-foreground">
                            Carefully selected smart audio products combining precision
                            engineering, modern design, and immersive sound.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="lg"
                        className="group gap-2 text-base"
                        asChild
                    >
                        <Link href="/products">
                            View all products
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredList.map((product, index) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

