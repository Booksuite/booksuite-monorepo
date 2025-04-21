'use client'

import { PropsWithChildren } from 'react'

import { Footer } from '@/components/templates/Footer'
import { Navbar } from '@/components/templates/Navbar'

import { usePageLayoutStore } from './store'

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { hideNavbar, hideFooter, darkMode } = usePageLayoutStore()

    return (
        <>
            {!hideNavbar && <Navbar darkMode={darkMode} />}
            <main>{children}</main>
            {!hideFooter && <Footer />}
        </>
    )
}
