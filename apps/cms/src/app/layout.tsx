import './globals.css'

import pluralize from 'pluralize'

import { Providers } from './providers'

export const metadata = {
    title: 'Booksuite',
    description: '',
}

pluralize.addPluralRule('item', 'itens')

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return <Providers>{children}</Providers>
}
