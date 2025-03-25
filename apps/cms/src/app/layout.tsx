import '@/assets/styles/index.scss'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import './globals.css'

import { Source_Sans_3 } from 'next/font/google'
import pluralize from 'pluralize'

import { Providers } from './providers'

const source_sans = Source_Sans_3({ subsets: ['latin'] })

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
        <html lang="pt">
            <body className={` ${source_sans.className}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
