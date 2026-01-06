'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { IProduct } from '@/constants/data'

interface HeroProps {
    initialProducts: IProduct[];
}

const defaultSlides = [
    {
        title: "The Ultimate",
        highlight: "Apple Watch",
        suffix: "Series",
        description: "Experience the pinnacle of wearable technology. Precision-engineered for health, fitness, and seamless connectivity.",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
        color: "bg-primary/10",
        accent: "text-primary"
    },
    {
        title: "Next Gen",
        highlight: "Smart Audio",
        suffix: "Experience",
        description: "Immerse yourself in pure sound. Active noise cancellation and high-fidelity audio designed for the passionate listener.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1352",
        color: "bg-blue-500/10",
        accent: "text-blue-500"
    },
    {
        title: "Premium",
        highlight: "Fitness Tech",
        suffix: "Gear",
        description: "Push your limits with advanced tracking and analytics. Designed to help you achieve your personal best, every single day.",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=1352",
        color: "bg-purple-500/10",
        accent: "text-purple-500"
    }
]

const Hero = ({ initialProducts }: HeroProps) => {
    const [current, setCurrent] = useState(0)

    // Map products to slides if available, otherwise use default slides
    // Map products to slides if available, otherwise use default slides
    const slides = React.useMemo(() => {
        if (initialProducts.length > 0) {
            return initialProducts.slice(0, 3).map((product, idx) => ({
                title: product.isNew ? "New Discovery" : "Featured",
                highlight: product.name,
                suffix: `in ${product.category}`,
                description: product.description,
                image: product.images[0],
                color: idx === 0 ? "bg-primary/10" : idx === 1 ? "bg-blue-500/10" : "bg-purple-500/10",
                accent: idx === 0 ? "text-primary" : idx === 1 ? "text-blue-500" : "text-purple-500",
                slug: product.slug
            }));
        }
        return defaultSlides;
    }, [initialProducts]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <section className="w-full bg-background flex h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4">
            <div className="w-full max-w-7xl mx-auto min-h-[32rem] px-6 py-12 lg:flex lg:items-center lg:gap-12 relative">

                {/* LEFT */}
                <div className="flex w-full items-center lg:w-1/2 z-10">
                    {/* Dots */}
                    <div className="hidden lg:flex flex-col gap-3 mr-8">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={cn(
                                    "h-3 w-3 rounded-full transition-colors duration-300",
                                    current === i ? "bg-primary" : "bg-muted-foreground/40 hover:bg-primary"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Text */}
                    <div className="hero-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                                    {slides[current].title} <span className={cn("italic font-serif", slides[current].accent)}>{slides[current].highlight}</span> {slides[current].suffix}
                                </h1>

                                <p className="mt-5 text-base text-muted-foreground sm:text-lg leading-relaxed line-clamp-2">
                                    {slides[current].description}
                                </p>

                                <div className="hero-btn">
                                    <Link
                                        href={initialProducts.length > 0 ? `/product/${(slides[current] as any).slug}` : "/products"}
                                        className={cn(
                                            buttonVariants({ variant: "default", size: "lg" }),
                                            'hover:scale-[1.03] transition-transform  px-8'
                                        )}
                                    >
                                        Shop Now
                                    </Link>
                                    <Link
                                        href="/collections"
                                        className={cn(
                                            buttonVariants({ variant: "outline", size: "lg" }),
                                            'hover:bg-muted transition-colors  px-8'
                                        )}
                                    >
                                        Collections
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hero-right">
                    <AnimatePresence mode="wait" >
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                            className="relative max-w-xl w-full flex items-center justify-center lg:items-start"
                        >
                            <div className="relative w-full">
                                {/* subtle glow */}
                                {/* <div className="absolute -inset-6 rounded-3xl bg-primary/10 p-0 blur-2xl" /> */}

                                <div className="z-10 w-[400px] h-[400px]">
                                    <Image
                                        src={slides[current].image}
                                        alt={slides[current].highlight}
                                        fill
                                        className="rounded-3xl object-cover w-full shadow-xl"
                                        priority
                                    />
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}

export default Hero
