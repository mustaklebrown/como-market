import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Share2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ProductTabs from "@/components/shop/ProductTabs";
import { getProductBySlug, getProducts } from "@/services/product.service";
import AddToCartSection from "@/components/shop/AddToCartSection";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export const revalidate = 3600; // Optimize for Vercel (1 hour)

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: product.name,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: [product.images[0], ...previousImages],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description.substring(0, 160),
            images: [product.images[0]],
        },
    };
}

export default async function ProductDetails({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="pt-32 pb-24 bg-background min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "image": product.images,
                        "description": product.description,
                        "brand": {
                            "@type": "Brand",
                            "name": "Como Market"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://como-market.vercel.app/product/${product.slug}`,
                            "priceCurrency": "USD",
                            "price": product.discountPrice || product.price,
                            "availability": "https://schema.org/InStock"
                        }
                    }),
                }}
            />
            <div className="container max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                    <span>/</span>
                    <a href="/products" className="hover:text-primary transition-colors">Products</a>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Product Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted/30 border border-border/50">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {(product.isFeatured || product.isNew) && (
                                <Badge className={cn(
                                    "absolute top-6 left-6 px-4 py-1.5 text-sm font-semibold shadow-lg",
                                    product.isNew ? "bg-green-500 text-white" : "bg-primary/95 backdrop-blur-md"
                                )}>
                                    {product.isNew ? "New Arrival" : "Exclusive Choice"}
                                </Badge>
                            )}
                        </div>

                        {/* Thumbnail Grid (Mock) */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <div key={i} className={cn(
                                    "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer",
                                    i === 0 ? "border-primary" : "border-transparent hover:border-gray-300 dark:hover:border-gray-700 bg-muted/20"
                                )}>
                                    <Image
                                        src={img}
                                        alt={`${product.name} thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                                    {product.category}
                                </Badge>
                                <div className="flex items-center gap-4">
                                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold">4.9</span>
                                    <span className="text-sm text-muted-foreground">(128 reviews)</span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <span className="text-sm font-medium text-green-500 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    In Stock & Ready to Ship
                                </span>
                            </div>

                            <div className="pt-4 flex items-baseline gap-4">
                                <span className="text-4xl font-black text-primary">
                                    ${product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-2xl font-medium text-muted-foreground line-through">
                                        ${product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 pb-8 border-b border-border/50">
                            {product.description}
                        </p>

                        {/* Order Options */}
                        <AddToCartSection product={product} />

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/5 rounded-2xl">
                                    <Truck className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Free Delivery</p>
                                    <p className="text-[10px] text-muted-foreground">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/5 rounded-2xl">
                                    <RotateCcw className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">30-Day Returns</p>
                                    <p className="text-[10px] text-muted-foreground">Hassle-free policy</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/5 rounded-2xl">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Safe Payment</p>
                                    <p className="text-[10px] text-muted-foreground">100% Secure Checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details Tabs (Dynamic) */}
                <ProductTabs
                    features={product.features}
                    details={product.details || {
                        "Material": "Premium Grade",
                        "Warranty": "2 Years",
                        "Category": product.category,
                        "SKU": product.sku || "N/A"
                    }}
                    description={product.description}
                />
            </div>
        </div>
    );
}
