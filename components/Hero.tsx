import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl mt-24 mb-12 group">
            {/* Background Graphic elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            {/* Main Content */}
            <div className="container relative z-10 px-6 flex flex-col items-center text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Premium Collection 2026</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white max-w-4xl text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    ELEVATE YOUR <span className="text-primary italic">LIFESTYLE</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    Discover a curated selection of premium products designed for those who appreciate excellence and timeless style.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
                    <Link href="/products">
                        <Button className="px-8 py-6 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_40px_rgba(var(--primary),0.3)] border-none">
                            Explore Collection
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/collections">
                        <Button variant="outline" className="px-8 py-6 bg-white/5 text-white font-bold rounded-xl border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm">
                            View Categories
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Decorative side text */}
            <div className="absolute left-10 bottom-10 hidden lg:block vertical-text">
                <p className="text-white/20 font-black text-6xl select-none tracking-widest uppercase origin-bottom-left -rotate-90">
                    COMOMARKET
                </p>
            </div>
        </section>
    )
}
