
'use client'
import { navlinks } from '@/constants/data'
import { cn } from '@/lib/utils'
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { CartSheet } from './shop/CartSheet'
import { useSession, signIn, signOut } from '@/lib/auth-client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session } = useSession()

    return (
        <nav className='fixed top-2 md:top-6 left-0 right-0 z-50 px-2 md:px-4'>
            <div className='max-w-7xl mx-auto rounded-2xl border border-white/20 shadow-lg bg-background/60 backdrop-blur-xl px-4 md:px-6 py-3 flex justify-between items-center gap-x-4 md:gap-x-8'>
                {/* Logo */}
                <div className='flex shrink-0 z-50'>
                    <Link href="/" className='text-xl md:text-2xl font-black text-primary tracking-tighter uppercase italic'>
                        Como<span className='dark:text-white text-black'>Market</span>
                    </Link>
                </div>

                {/* Main Navigation - Desktop */}
                <ul className='navlinks'>
                    {navlinks.map((nav, i) => {
                        const isActive = pathname === nav.href
                        return (
                            <Link
                                key={i}
                                href={nav.href}
                                className={cn(
                                    "text-sm font-semibold transition-all duration-300 relative group py-1",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {nav.name}
                                {/* <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left",
                                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} /> */}
                            </Link>
                        )
                    })}
                </ul>

                {/* Right Actions: Search & Cart */}
                <div className='flex items-center gap-x-2 md:gap-x-4 flex-1 md:flex-none justify-end'>
                    <div className='relative w-full max-w-[160px] lg:max-w-[200px] hidden sm:block group'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
                        <Input
                            placeholder='Search products...'
                            className='pl-9 bg-muted/40 border-none h-9 text-sm focus-visible:ring-1 focus-visible:ring-primary'
                        />
                    </div>

                    <div className='flex items-center gap-x-2 md:gap-x-4'>
                        <ModeToggle />
                        <button className='sm:hidden p-2 text-muted-foreground hover:text-primary transition-colors'>
                            <Search className='h-5 w-5' />
                        </button>

                        <CartSheet />

                        {/* User Menu */}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                            <AvatarFallback>{session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className='w-4 h-4' />}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {session.user.role === 'admin' && (
                                        <DropdownMenuItem onClick={() => router.push('/admin')}>
                                            Admin Dashboard
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button size="sm" onClick={() => router.push('/sign-in')} className="hidden lg:flex">
                                Sign In
                            </Button>
                        )}


                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-full left-2 right-2 md:left-4 md:right-4 mt-2 p-4 bg-background/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl lg:hidden overflow-hidden max-h-[80vh] overflow-y-auto"
                    >
                        <ul className="flex flex-col gap-2">
                            {navlinks.map((nav, i) => {
                                const isActive = pathname === nav.href
                                return (
                                    <li key={i}>
                                        <Link
                                            href={nav.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cn(
                                                "flex items-center p-3 rounded-xl text-lg font-medium transition-colors",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-muted text-foreground"
                                            )}
                                        >
                                            {nav.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border">
                            {session ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 p-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} />
                                            <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{session.user.name}</span>
                                            <span className="text-xs text-muted-foreground">{session.user.email}</span>
                                        </div>
                                    </div>
                                    {session.user.role === 'admin' && (
                                        <Button variant="outline" className="w-full" onClick={() => router.push('/admin')}>
                                            Admin Dashboard
                                        </Button>
                                    )}
                                    <Button variant="destructive" className="w-full" onClick={() => signOut()}>Sign Out</Button>
                                </div>
                            ) : (
                                <Button className="w-full rounded-xl" size="lg" onClick={() => router.push('/sign-in')}>Sign In</Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
