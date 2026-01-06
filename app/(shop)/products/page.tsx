
import ProductCard from "@/components/shop/ProductCard";
import { getProducts } from "@/services/product.service";
import ProductFilters from "@/components/shop/ProductFilters";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Products",
    description: "Browse our wide range of premium products, from electronics to lifestyle essentials.",
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string; minPrice?: string; maxPrice?: string }>;
}) {
    const products = await getProducts();
    const resolvedParams = await searchParams;

    const selectedCategory = resolvedParams.category || "All";
    const sortOption = resolvedParams.sort || "newest";
    const minPrice = resolvedParams.minPrice ? Number(resolvedParams.minPrice) : 0;
    const maxPrice = resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : Infinity;

    const derivedCategories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    // 1. Filter by Category
    let filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    // 2. Filter by Price
    if (minPrice > 0 || maxPrice < Infinity) {
        filteredProducts = filteredProducts.filter(p => {
            const price = p.discountPrice || p.price;
            return price >= minPrice && price <= maxPrice;
        });
    }

    // 3. Sort
    filteredProducts.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;

        switch (sortOption) {
            case "price_asc":
                return priceA - priceB;
            case "price_desc":
                return priceB - priceA;
            case "newest":
            default:
                // Assuming getProducts already returns sorted by date desc, 
                // but if we need explicit sort:
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
                return 0;
        }
    });

    return (
        <div className="pt-32 pb-16 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="product-header">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-primary">
                            Collections
                        </h1>
                        <p className="text-xl text-muted-primary max-w-2xl">
                            Explore our meticulously curated selection of premium lifestyle goods and high-performance gear.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Suspense fallback={<div className="h-12 w-full bg-muted animate-pulse rounded-full mb-10" />}>
                    <ProductFilters categories={derivedCategories} />
                </Suspense>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center">
                        <h3 className="text-2xl font-bold text-muted-foreground">No products found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters or search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
