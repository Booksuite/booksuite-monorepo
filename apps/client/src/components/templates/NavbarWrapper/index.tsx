'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/templates/Navbar'

export const NavbarWrapper: React.FC = () => {
    const pathname = usePathname()

    if (pathname === '/') {
        return null
    }

    return (
        <>
            <Navbar />
            <span className="bg-white py-12 items-center flex flex-col gap-4" />
        </>
    )
}
