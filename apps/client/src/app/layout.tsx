import './globals.css'

import { Inter } from 'next/font/google'

import { PageLayout } from '@/components/templates/PageLayout'
import { Providers } from '@/providers/Providers'

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
                <Providers>
                    <PageLayout>
                        <div>{children}</div>
                    </PageLayout>
                </Providers>
            </body>
        </html>
    )
}
