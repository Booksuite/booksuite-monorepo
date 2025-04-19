import './globals.css'

import { Inter } from 'next/font/google'

import { Providers } from '@/providers/Providers'
import { Footer } from '@/components/templates/Footer'
import { NavbarWrapper } from '@/components/templates/NavbarWrapper'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
    title: 'Chalé Lagoa da Serra',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NavbarWrapper />
                <Providers>{children}</Providers>
                <Footer />
            </body>
        </html>
    )
}
