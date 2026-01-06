
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Timer, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const PromoSection = () => {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32  text-gray-900 dark:text-white transition-colors duration-300">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />

            <div className=" mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
                                <Zap className="h-4 w-4 fill-primary" />
                                Limited Time Offer
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                                Experience Sound <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-400">
                                    Like Never Before
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                                Immerse yourself in crystal-clear audio with our latest Noise-Cancelling Pro Series.
                                Designed for audiophiles who demand nothing but the absolute best.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: Timer, label: "30h Battery Life", desc: "Keep the music playing" },
                                { icon: ShieldCheck, label: "2-Year Warranty", desc: "We've got you covered" },
                                { icon: Zap, label: "Fast Charging", desc: "10 mins = 3 hours playback" },
                                { icon: CheckCircle2, label: "Active NC", desc: "World-class noise cancellation" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                            <feature.icon className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{feature.label}</h3>
                                        <p className="text-sm text-gray-600 dark:text-neutral-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/20">
                                Shop Now - $299
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white bg-transparent">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: true }}
                        className="relative mx-auto lg:ml-auto"
                    >
                        {/* Circle Background */}
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-full blur-3xl transform scale-90" />

                        <div className="relative border-2 border-primary group rounded-3xl overflow-hidden">
                            <div className="relative z-10 w-full max-w-[350px] mx-auto">
                                <Image
                                    src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000"
                                    alt="Premium Headphones"
                                    width={500}
                                    height={500}
                                    className="w-full object-cover drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"

                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -left-6 md:bottom-10 md:left-0 z-20 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-4 rounded-2xl shadow-xl hover:bg-white/90 dark:hover:bg-white/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-neutral-400">Stock Status</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Selling Fast 🔥</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
