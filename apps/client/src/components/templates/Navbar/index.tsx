'use client'

import { ShoppingCart, User } from 'lucide-react'
import { Route } from 'next'
import Link from 'next/link'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/Avatar'

const navigationLinks = [
    { name: 'Início', href: '/' as Route },
    { name: 'Acomodações', href: '/' as Route },
    { name: 'Experiências', href: '/' as Route },
    { name: 'Pacotes', href: '/' as Route },
    { name: 'Promoções', href: '/' as Route },
    { name: 'Galeria', href: '/' as Route },
    { name: 'Novidades', href: '/' as Route },
    { name: 'Atrativos', href: '/' as Route },
    { name: 'Sobre', href: '/' as Route },
    { name: 'Contato', href: '/' as Route },
]

export function Navbar() {
    const { company } = useCurrentCompanyStore()

    return (
        <header className="w-full z-50 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent">
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

                    <nav className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex items-center">
                            {navigationLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-white font-medium hover:text-primary-300 transition-colors px-4"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center">
                        <div className="bg-white rounded-full flex items-center overflow-hidden shadow-sm">
                            <button className="p-3">
                                <ShoppingCart className="h-5 w-5 text-black" />
                            </button>
                            <button className="bg-primary-500 rounded-full p-3 border-2 border-white">
                                <User className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
