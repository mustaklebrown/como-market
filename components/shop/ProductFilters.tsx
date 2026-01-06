"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    SlidersHorizontal,
    ChevronDown,
    ArrowUpDown,
    Check,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductFiltersProps {
    categories: string[];
}

const SORT_OPTIONS = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
];

export default function ProductFilters({ categories }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") || "All";
    const activeSort = searchParams.get("sort") || "newest";
    const activeMinPrice = searchParams.get("minPrice") || "";
    const activeMaxPrice = searchParams.get("maxPrice") || "";

    // Local state for the filter sheet inputs
    const [minPrice, setMinPrice] = useState(activeMinPrice);
    const [maxPrice, setMaxPrice] = useState(activeMaxPrice);

    // Sync local state with URL params when they change externally
    useEffect(() => {
        setMinPrice(activeMinPrice);
        setMaxPrice(activeMaxPrice);
    }, [activeMinPrice, activeMaxPrice]);

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    const activeSortLabel = SORT_OPTIONS.find(o => o.value === activeSort)?.label || "Sort By";
    const activeFilterCount = [activeMinPrice, activeMaxPrice].filter(Boolean).length;

    const applyFilters = () => {
        updateParams({
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
    };

    const clearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        updateParams({
            minPrice: null,
            maxPrice: null,
        });
    };

    return (
        <div className="filters">
            {/* Category Tabs (Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar mask-gradient-right flex-1">
                <button
                    onClick={() => updateParams({ category: null })}
                    className={cn(
                        "whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border flex-shrink-0",
                        activeCategory === "All"
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                    )}
                >
                    All
                </button>
                {categories.filter(c => c !== "All").map((cat) => (
                    <button
                        key={cat}
                        onClick={() => updateParams({ category: cat })}
                        className={cn(
                            "whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border flex-shrink-0",
                            activeCategory === cat
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Actions: Sort & Filter */}
            <div className="flex items-center gap-3 flex-shrink-0">

                {/* Sort Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full gap-2 px-4 border-border hover:border-primary/50">
                            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                            <span className="hidden sm:inline text-sm font-medium">{activeSortLabel}</span>
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-xl">
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider px-2 py-1">Sort By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {SORT_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => updateParams({ sort: option.value })}
                                className={cn(
                                    "flex items-center justify-between rounded-lg cursor-pointer py-2",
                                    activeSort === option.value && "bg-primary/10 text-primary font-bold"
                                )}
                            >
                                {option.label}
                                {activeSort === option.value && <Check className="w-4 h-4" />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Filter Sheet */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant={activeFilterCount > 0 ? "default" : "outline"}
                            className={cn(
                                "rounded-full gap-2 px-4 transition-all",
                                activeFilterCount > 0 ? "border-primary" : "border-border hover:border-primary/50"
                            )}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-white/20 text-inherit">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-sm border-l border-border/50">
                        <SheetHeader className="pb-6 border-b border-border/50">
                            <SheetTitle className="text-2xl font-black">Filters</SheetTitle>
                            <SheetDescription>
                                Refine your search to find exactly what you need.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="py-8 space-y-8">
                            {/* Price Range */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-bold">Price Range</Label>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">USD</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            placeholder="Min"
                                            type="number"
                                            min="0"
                                            className="pl-8 rounded-xl"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-4 h-px bg-border" />
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input
                                            placeholder="Max"
                                            type="number"
                                            min="0"
                                            className="pl-8 rounded-xl"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Add more filters here later (Brand, Size, Color etc.) */}
                        </div>

                        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t border-border/50 bg-background/95 backdrop-blur-sm flex gap-3 flex-col sm:flex-row">
                            <Button variant="outline" onClick={clearFilters} className="flex-1 rounded-full h-12" disabled={activeFilterCount === 0}>
                                Clear All
                            </Button>
                            <SheetClose asChild>
                                <Button onClick={applyFilters} className="flex-1 rounded-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                                    Show Results
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

            </div>
        </div>
    );
}
