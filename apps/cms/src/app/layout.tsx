import './globals.css'

import { Inter } from 'next/font/google'
import pluralize from 'pluralize'

import { Providers } from './providers'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata = {
    title: 'Booksuite',
    description: '',
}

pluralize.addPluralRule('item', 'itens')

interface RootLayoutProps {
    children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt" className={inter.variable}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
