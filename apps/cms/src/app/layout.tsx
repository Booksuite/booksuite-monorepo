import { Inter } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

import { Providers } from './providers'

export const metadata = {
    title: 'Booksuite',
    description: '',
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt" className={inter.className}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
