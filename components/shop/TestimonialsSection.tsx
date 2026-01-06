
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Alex Martin",
        role: "Audio Engineer",
        image: "/avatars/user-1.jpg",
        rating: 5,
        quote:
            "The sound quality is absolutely phenomenal. Deep bass, crystal-clear mids, and zero distortion even at high volume. Easily the best audio purchase I’ve made this year.",
    },
    {
        name: "Sarah Johnson",
        role: "Product Designer",
        image: "/avatars/user-2.jpg",
        rating: 5,
        quote:
            "Beautifully designed and incredibly comfortable. I use them daily for work and travel. Noise cancellation is on another level.",
    },
    {
        name: "Daniel Kim",
        role: "Tech Reviewer",
        image: "/avatars/user-3.jpg",
        rating: 5,
        quote:
            "COMOMARKET consistently delivers premium products. Build quality, performance, and attention to detail are all top-tier.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        What Our Customers Say
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Trusted by audiophiles, creators, and professionals worldwide.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            viewport={{ once: true }}
                            className="
                relative rounded-3xl p-8
                bg-muted/40
                border border-border/50
                shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className="h-4 w-4 fill-orange-400 text-orange-400"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground leading-relaxed mb-8">
                                “{t.quote}”
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">{t.name}</p>
                                    <p className="text-sm text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

