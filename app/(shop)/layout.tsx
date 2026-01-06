import Navbar from '@/components/Navbar'
import React from 'react'

const LayoutShpPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="pt-28 min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default LayoutShpPage