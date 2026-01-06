
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Input } from "../ui/input";

export default function NewsletterSection() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background with noise texture */}
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5" />

            <div className="mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Join Our Community
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Subscribe to our newsletter and get <span className="text-primary font-semibold">10% off</span> your first order, plus early access to new drops.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="relative flex-1 max-w-md mx-auto sm:mx-0 w-full">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-14 pl-12 pr-4 rounded-full border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus-visible:ring-primary placeholder:text-gray-400 dark:text-white text-base"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-14 rounded-full px-8 text-base font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                        >
                            Subscribe Now
                        </Button>
                    </motion.form>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No spam, unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}
