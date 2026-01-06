
'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { IProduct } from '@/constants/data'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'

interface ProductCardProps {
    product: IProduct;
    index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-2xl hover:border-primary/50 dark:hover:border-primary/50"
        >
            {/* Image Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && (
                        <Badge className="bg-green-500 text-white border-none text-[10px] font-bold uppercase tracking-wider">
                            New
                        </Badge>
                    )}
                    {product.discountPrice && (
                        <Badge className="bg-red-500 text-white border-none text-[10px] font-bold uppercase tracking-wider">
                            Sale
                        </Badge>
                    )}
                    {product.isFeatured && (
                        <Badge variant="secondary" className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button */}
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                        e.preventDefault();
                        setLiked(!liked);
                    }}
                    className={cn(
                        "absolute top-4 right-4 z-10 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-red-500 hover:scale-110",
                        liked ? "text-red-500 bg-white" : "text-white"
                    )}
                >
                    <Heart className={cn("h-5 w-5", liked && "fill-current")} />
                    <span className="sr-only">Add to wishlist</span>
                </Button>

                {/* Quick Add Overlay (Mobile visible, Desktop on hover) */}
                <div className="absolute inset-x-4 bottom-4 z-10 translate-y-[-20px] transition-transform duration-300 group-hover:translate-y-0 max-md:translate-y-0">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                        }}
                        className="w-full rounded-full bg-primary  text-black dark:text-white backdrop-blur-md shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Quick Add
                    </Button>
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">4.8</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-neutral-200 dark:border-neutral-800">
                        {product.category}
                    </Badge>
                </div>

                <Link href={`/product/${product.slug}`} className="group-hover:text-primary transition-colors duration-300">
                    <h3 className="line-clamp-1 text-lg font-bold text-neutral-900 dark:text-white">
                        {product.name}
                    </h3>
                </Link>

                <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Premium {product.category.toLowerCase()} designed for performance.
                </p>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-primary">
                                ${product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
                            </span>
                            {product.discountPrice && (
                                <span className="text-sm font-medium text-neutral-400 line-through">
                                    ${product.price.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden sm:flex text-neutral-500 hover:text-primary p-0 h-auto font-medium hover:bg-transparent"
                    >
                        View Details →
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
