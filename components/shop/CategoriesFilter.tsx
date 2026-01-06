
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoriesFilterProps {
    categories: string[];
}

export default function CategoriesFilter({ categories }: CategoriesFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category") || "All";

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap items-center gap-3 mb-10">
            <Button variant="outline" size="sm" className="rounded-full hidden md:flex h-10 px-6">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
            </Button>
            <div className="h-6 w-px bg-border hidden md:block mx-2" />
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border",
                        activeCategory === cat
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                            : "bg-muted/30 text-muted-foreground border-transparent hover:border-border hover:bg-muted hover:text-foreground"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
