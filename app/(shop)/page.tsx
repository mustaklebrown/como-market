import Hero from "@/components/shop/Hero";
import CategoriesSection from "@/components/shop/CategorySection";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import PromoSection from "@/components/shop/PromoSection";
import FeaturesSection from "@/components/shop/FeaturesSection";
import NewsletterSection from "@/components/shop/NewsletterSection";
import TestimonialsSection from "@/components/shop/TestimonialsSection";
import { getFeaturedProducts, getCategories } from "@/services/product.service";

export const revalidate = 3600; // Optimize for Vercel (1 hour)

export default async function Page() {
    const [products, categories] = await Promise.all([
        getFeaturedProducts(),
        getCategories()
    ]);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero initialProducts={products} />
            <CategoriesSection initialCategories={categories} />
            <FeaturedProducts initialProducts={products} />
            <PromoSection />
            <FeaturesSection />
            <TestimonialsSection />
            <NewsletterSection />
        </div>
    );
}

