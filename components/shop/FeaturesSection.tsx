
"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Phone } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On all orders over $99"
    },
    {
        icon: RotateCcw,
        title: "30 Days Return",
        description: "Money back guarantee"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "100% protected payments"
    },
    {
        icon: Phone,
        title: "24/7 Support",
        description: "Dedicated support team"
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-20 border-t border-dashed border-gray-200 dark:border-white/10">
            <div className="mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 text-primary transition-colors duration-300">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
