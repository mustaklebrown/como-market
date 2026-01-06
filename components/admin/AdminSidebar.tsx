"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Settings,
    LogOut,
    Tags,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const sidebarLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const SidebarContent = () => (
        <div className="flex flex-col h-full py-4">
            <div className="px-6 mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tighter uppercase italic text-primary">
                        Como<span className="text-foreground">Admin</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 px-4 space-y-1">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            <div className="px-4 mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={async () => {
                        await signOut();
                        router.push('/sign-in');
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="sidebar-desktop">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-background shadow-sm border-border">
                        <Menu className="w-5 h-5 text-foreground" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-card">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    );
}
