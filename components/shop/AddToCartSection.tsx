'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { IProduct } from '@/constants/data';

interface AddToCartSectionProps {
    product: IProduct;
}

const AddToCartSection = ({ product }: AddToCartSectionProps) => {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const handleAddToCart = () => {
        // Current addItem basic implementation adds 1. 
        // To support quantity, we can call it multiple times or update the store.
        // For now, let's just add it and then update the quantity if it's > 1.
        // Better: I'll modify the store to accept quantity or just call it multiple times.
        // Actually, I'll just call addItem and then use updateQuantity for the final amount.

        addItem(product);
        if (quantity > 1) {
            // Find the item in the store and update it
            // Note: addItem handles the logic of finding the existing item.
            // A cleaner way is to make addItem accept a quantity.
            // But let's stick to the current store for simplicity and just call it.
            // wait, updateQuantity takes productId and absolute quantity.
            // So if I add 1, then set exact quantity to 'quantity', it works perfectly.
            updateQuantity(product.id, quantity);
        }
    };

    return (
        <div className="space-y-8 mb-10">
            {/* Quantity */}
            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</label>
                <div className="flex items-center w-fit p-1 bg-muted/40 rounded-full border border-border/50">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-colors text-primary"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20"
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 h-14 rounded-full text-lg font-bold bg-foreground text-background hover:bg-foreground/90 transition-all border-none">
                    <button onClick={handleAddToCart}>Buy Now</button>
                </Button>
            </div>
        </div>
    );
};

export default AddToCartSection;
