'use client';

import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const CartSheet = () => {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
        setIsHydrated(true);
    }, []);

    const totalPrice = getTotalPrice();
    const totalItems = isHydrated ? getTotalItems() : 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className='relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 group'>
                    <ShoppingBag className='h-5 w-5 md:h-6 md:w-6 group-hover:scale-110' />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in-50 duration-300">
                            {totalItems}
                        </span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="p-6 border-b border-border/50">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        Your Cart
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {!isHydrated || items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl font-semibold">Your cart is empty</p>
                                <p className="text-sm text-muted-foreground max-w-[200px]">
                                    Looks like you haven't added anything to your cart yet.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="rounded-full px-8">
                                <Link href="/products">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative aspect-square w-20 h-20 rounded-xl overflow-hidden bg-muted/30 shrink-0 border border-border/50">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-0.5">
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    className="font-bold text-sm line-clamp-1 hover:text-primary transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                                                    {item.category}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1 hover:text-red-500 transition-colors text-muted-foreground/50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 bg-muted/30 rounded-full p-1 border border-border/50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-background transition-colors text-primary"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="font-bold text-sm text-primary">
                                                ${((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <SheetFooter className="p-6 border-t border-border/50 bg-muted/10">
                        <div className="w-full space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-medium">Free</span>
                                </div>
                                <Separator className="my-2 bg-border/50" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button size="lg" className="w-full rounded-full h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    Checkout Now
                                </Button>
                                <Button variant="outline" size="lg" className="w-full rounded-full h-12 font-bold" asChild>
                                    <Link href="/cart">View Shopping Cart</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
