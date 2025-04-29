'use client'

import { ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { useCart } from '@/common/hooks/useCart'
import { cn } from '@/common/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/Avatar'

import { NAVIGATION_LINKS } from './constants'
import { MobileNavbar } from './MobileNavbar'

interface NavbarProps {
    darkMode?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode = false }) => {
    const { company } = useCurrentCompanyStore()
    const pathname = usePathname()
    const router = useRouter()
    const { housingUnits, services } = useCart()
    const cartCount = housingUnits.length + services.length

    return (
        <>
            <div className="lg:hidden">
                <MobileNavbar darkMode={darkMode} />
            </div>

            <header className="w-full z-50 hidden lg:block">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <Avatar className="w-16 h-16 border-2 border-primary-500 bg-primary-100">
                                <AvatarImage
                                    src={
                                        company?.logo ??
                                        '/placeholder.svg?height=64&width=64'
                                    }
                                    alt="Logo da empresa"
                                />
                                <AvatarFallback className="bg-primary-100 text-primary-500 font-semibold">
                                    {company?.name?.[0] ?? 'C'}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <nav className="flex flex-1 justify-center">
                            <ul className="flex items-center">
                                {NAVIGATION_LINKS.map((link, index) => {
                                    const isActive = pathname === link.href
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    darkMode
                                                        ? 'text-white hover:text-white'
                                                        : 'text-grey-primary hover:text-grey-primary',
                                                    'font-medium transition-all duration-200 px-4',
                                                    {
                                                        'font-bold': isActive,
                                                        'hover:font-bold':
                                                            !isActive,
                                                        'text-white':
                                                            isActive &&
                                                            darkMode,
                                                        'text-grey-primary':
                                                            isActive &&
                                                            !darkMode,
                                                    },
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                        <div className="flex items-center">
                            <div className="bg-white rounded-full flex items-center overflow-hidden ">
                                <button
                                    className="p-3 relative hover:bg-systemColors-blueLight transition-colors text-grey-primary hover:text-primary-500 rounded-full"
                                    onClick={() => router.push('/cart')}
                                >
                                    <ShoppingCart className="h-5 w-5  transition-colors" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-2 right-0.5 bg-systemColors-orange text-white text-xs rounded-full px-1 text-center font-regular">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                                <button className="bg-primary-500 hover:bg-primary-600 transition-colors rounded-full p-3 border-2 border-white">
                                    <User className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
