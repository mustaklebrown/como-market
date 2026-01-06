import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Collections',
    description: 'Explore our curated collections of premium lifestyle goods, electronics, and fashion.',
}

export default function CollectionsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
