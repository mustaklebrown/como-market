"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    Heart,
    Leaf,
    Shield,
    Sparkles,
    Target,
    Users,
    Zap
} from 'lucide-react';

const values = [
    {
        icon: Heart,
        title: "Quality First",
        description: "Every product in our collection is handpicked for exceptional quality and craftsmanship."
    },
    {
        icon: Leaf,
        title: "Sustainability",
        description: "We're committed to eco-friendly practices and partnering with sustainable brands."
    },
    {
        icon: Shield,
        title: "Trust & Transparency",
        description: "Honest pricing, authentic products, and a commitment to customer satisfaction."
    },
    {
        icon: Zap,
        title: "Innovation",
        description: "Constantly discovering and bringing you the latest in design and technology."
    }
];

const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "1000+", label: "Premium Products" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Customer Support" }
];

const team = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        bio: "Visionary leader with 15 years in e-commerce."
    },
    {
        name: "Michael Chen",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        bio: "Creating beautiful experiences that delight."
    },
    {
        name: "Emily Rodriguez",
        role: "Product Director",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
        bio: "Curating the finest products from around the world."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                Our Story
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                                Elevating Your <span className="text-primary">Lifestyle</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                ComoMarket was born from a simple belief: everyone deserves access to exceptional products
                                that bring joy to everyday life. We curate only the finest items from around the world.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" asChild className="rounded-full px-8">
                                    <Link href="/products">
                                        Explore Products
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                                    <Link href="/collections">
                                        View Collections
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Image Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
                                            alt="Store atmosphere"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative aspect-square rounded-3xl overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80"
                                            alt="Shopping experience"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="relative aspect-square rounded-3xl overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80"
                                            alt="Premium products"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
                                            alt="Happy customer"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-xl border border-border"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Target className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Est. 2020</p>
                                        <p className="text-sm text-muted-foreground">Serving globally</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</p>
                                <p className="text-muted-foreground font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Heart className="w-4 h-4" />
                            What We Stand For
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The principles that guide everything we do at ComoMarket.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <value.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Users className="w-4 h-4" />
                            Meet the Team
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            The People Behind ComoMarket
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Passionate individuals dedicated to bringing you the best shopping experience.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group text-center"
                            >
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-background shadow-xl">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-3">{member.role}</p>
                                <p className="text-muted-foreground">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl bg-gradient-to-br from-primary to-orange-500 p-12 md:p-16 text-center text-white overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]" />
                            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,white_0%,transparent_50%)]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Start Shopping?
                            </h2>
                            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Join thousands of happy customers and discover products that will transform your everyday life.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" variant="secondary" asChild className="rounded-full px-8 text-primary">
                                    <Link href="/products">
                                        Shop Now
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-white/30 text-white hover:bg-white/10">
                                    <Link href="/sign-up">
                                        Create Account
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
