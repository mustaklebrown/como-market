
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ProductTabsProps {
    features?: string[];
    details?: any;
    description?: string;
}

export default function ProductTabs({ features, details, description }: ProductTabsProps) {
    const tabs = [
        { id: "features", label: "Features", count: features?.length },
        { id: "specs", label: "Specifications", count: details ? Object.keys(details).length : 0 },
        { id: "shipping", label: "Shipping", count: null },
    ].filter(tab => tab.count !== 0);

    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "features");

    return (
        <div className="mt-24 pt-16 border-t border-border/50">
            {/* Tab Headers */}
            <div className="flex flex-wrap gap-8 mb-12 border-b border-border/50 pb-px">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "relative pb-4 text-lg font-bold transition-colors duration-300",
                            activeTab === tab.id
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "features" && (
                            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
                                {features?.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex gap-4 group hover:translate-x-1 transition-transform"
                                    >
                                        <div className="mt-1.5 shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </div>
                                        <p className="text-lg text-muted-foreground leading-relaxed font-medium">{feature}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="max-w-3xl">
                                <div className="divide-y divide-border/50 bg-muted/5 rounded-3xl border border-border/30 overflow-hidden shadow-sm">
                                    {Object.entries(details || {}).map(([key, value], i) => (
                                        <div key={i} className="flex flex-col sm:flex-row justify-between p-6 hover:bg-muted/30 transition-colors gap-2">
                                            <span className="font-semibold text-muted-foreground uppercase tracking-wider text-sm">{key}</span>
                                            <span className="font-bold text-foreground text-lg">{value as string}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div className="max-w-2xl space-y-8">
                                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                                    <h4 className="text-xl font-bold mb-4">Fast & Secure Delivery</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We partner with leading global carriers to ensure your order arrives safely and on time.
                                        Expected delivery within 3-5 business days for standard shipping.
                                    </p>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-6">
                                    <li className="flex gap-3 items-center">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span className="font-medium">Free standard shipping over $50</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span className="font-medium">Express delivery available</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span className="font-medium">Tracking number included</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <span className="font-medium">Eco-friendly packaging</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
