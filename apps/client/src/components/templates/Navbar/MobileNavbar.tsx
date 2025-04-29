import {
    BaggageClaim,
    CalendarRange,
    Menu,
    ShoppingCart,
    X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { useCart } from '@/common/hooks/useCart'
import { cn } from '@/common/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'

import { NAVIGATION_LINKS } from './constants'

interface MobileNavbarProps {
    darkMode?: boolean
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
    darkMode = false,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { company } = useCurrentCompanyStore()
    const pathname = usePathname()
    const router = useRouter()
    const { housingUnits, services } = useCart()
    const cartCount = housingUnits.length + services.length

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [isMenuOpen])

    return (
        <>
            <header className="w-full z-50 relative">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={cn(
                                'p-2',
                                darkMode ? 'text-white' : 'text-grey-primary',
                            )}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <Link href="/" className="flex items-center">
                            <Avatar className="w-20 h-20 border-2 border-primary-500 bg-primary-100">
                                <AvatarImage
                                    src={
                                        company?.logo ??
                                        '/placeholder.svg?height=48&width=48'
                                    }
                                    alt="Logo da empresa"
                                />
                                <AvatarFallback className="bg-primary-100 text-primary-500 font-semibold">
                                    {company?.name?.[0] ?? 'C'}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <button
                            className="p-2 relative text-white"
                            onClick={() => router.push('/cart')}
                        >
                            <ShoppingCart
                                className={cn(
                                    'h-6 w-6',
                                    darkMode
                                        ? 'text-white'
                                        : 'text-grey-primary',
                                )}
                            />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-0 bg-systemColors-orange text-white text-xs rounded-full px-1.5 text-center font-regular">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="absolute inset-0 z-50 bg-white h-screen flex flex-col justify-between px-4 py-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-grey-primary"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto mt-8">
                        <ul className="flex flex-col space-y-6">
                            {NAVIGATION_LINKS.map((link, index) => {
                                const isActive = pathname === link.href
                                return (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cn(
                                                'text-grey-primary text-xl font-regular transition-all duration-200',
                                                {
                                                    'font-medium text-primary-500':
                                                        isActive,
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

                    <div className="flex flex-row mb-16 gap-4">
                        <Button
                            variant="default"
                            onClick={() => {
                                router.push('/')
                                setIsMenuOpen(false)
                            }}
                            className="w-full text-white gap-2 h-16"
                        >
                            <CalendarRange className="h-6 w-6" />
                            Reservar
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                router.push('/')
                                setIsMenuOpen(false)
                            }}
                            className="w-full text-primary-500 gap-2 h-16"
                        >
                            <BaggageClaim className="h-6 w-6" />
                            Minhas reservas
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
