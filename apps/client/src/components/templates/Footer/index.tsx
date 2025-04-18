'use client'

import { useCurrentCompanyStore } from '@/common/contexts/company'
import { Logo } from '@/components/atoms/Logo'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Route } from 'next'

type NavigationItem = {
    label: string
    href: Route
}

export const Footer: React.FC = () => {
    const { company } = useCurrentCompanyStore()

    if (!company) return null

    const navigationItems: NavigationItem[] = [
        { label: 'Início', href: '/' as Route },
        { label: 'Acomodações', href: '/' as Route },
        { label: 'Experiências', href: '/' as Route },
        { label: 'Pacotes', href: '/' as Route },
        { label: 'Promoções', href: '/' as Route },
        { label: 'Galeria', href: '/' as Route },
    ]

    const secondaryNavigation: NavigationItem[] = [
        { label: 'Novidades', href: '/' as Route },
        { label: 'Atrativos', href: '/' as Route },
        { label: 'Sobre', href: '/' as Route },
        { label: 'Contato', href: '/' as Route },
        { label: 'Minhas reservas', href: '/' as Route },
        { label: 'Políticas', href: '/' as Route },
    ]

    const getSocialLink = (type: string) => {
        return (
            company.contacts?.find((contact) => contact.type === type)?.value ||
            ''
        )
    }

    return (
        <footer className="bg-primary-700 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        {company.logo && (
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-16 w-auto"
                            />
                        )}
                        <div className="text-sm">
                            {company.companyName && (
                                <p className="font-semibold">{company.name}</p>
                            )}
                            {company.identification && (
                                <p>
                                    CNPJ:{' '}
                                    {company.identification.replace(
                                        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                                        '$1.$2.$3/$4-$5',
                                    )}
                                </p>
                            )}
                            <address className="not-italic mt-2">
                                {company.address && (
                                    <p>
                                        {company.address}, {company.number}
                                    </p>
                                )}
                                {company.city && company.state && (
                                    <p>
                                        {company.city}, {company.state}
                                    </p>
                                )}
                                {company.zipcode && (
                                    <p>
                                        CEP:{' '}
                                        {company.zipcode.replace(
                                            /^(\d{5})(\d{3})$/,
                                            '$1-$2',
                                        )}
                                    </p>
                                )}
                            </address>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Menu de navegação
                        </h3>
                        <ul className="space-y-2">
                            {navigationItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-gray-300 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Secondary Navigation */}
                    <div className="mt-8 md:mt-0">
                        <h3 className="text-lg font-semibold mb-4">
                            Outras informações
                        </h3>
                        <ul className="space-y-2">
                            {secondaryNavigation.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-gray-300 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Fale conosco
                        </h3>
                        <div className="space-y-3">
                            {company.contacts?.map((contact) => {
                                if (contact.type === 'whatsapp') {
                                    return (
                                        <p key={contact.value}>
                                            WhatsApp de {contact.category}:{' '}
                                            {contact.value}
                                        </p>
                                    )
                                }
                                if (contact.type === 'phone') {
                                    return (
                                        <p key={contact.value}>
                                            Telefone de {contact.category}:{' '}
                                            {contact.value}
                                        </p>
                                    )
                                }
                                if (contact.type === 'email') {
                                    return (
                                        <p key={contact.value}>
                                            Email de {contact.category}:{' '}
                                            {contact.value}
                                        </p>
                                    )
                                }
                                return null
                            })}
                        </div>

                        <div className="flex gap-4 mt-6">
                            {getSocialLink('facebook') && (
                                <a
                                    href={getSocialLink('facebook')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:text-gray-300 transition-colors"
                                >
                                    <Facebook className="text-xl" />
                                </a>
                            )}
                            {getSocialLink('instagram') && (
                                <a
                                    href={getSocialLink('instagram')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:text-gray-300 transition-colors"
                                >
                                    <Instagram className="text-xl" />
                                </a>
                            )}
                            {getSocialLink('linkedin') && (
                                <a
                                    href={getSocialLink('linkedin')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:text-gray-300 transition-colors"
                                >
                                    <Linkedin className="text-xl" />
                                </a>
                            )}
                            {getSocialLink('x') && (
                                <a
                                    href={getSocialLink('x')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:text-gray-300 transition-colors"
                                >
                                    <Twitter className="text-xl" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-2 flex justify-between items-center gap-4 border-white text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} {company.name}®. Todos os
                        direitos reservados.
                    </p>
                    <p className="mt-2 flex items-center gap-4">
                        Desenvolvido por:{' '}
                        <a
                            href="https://booksuite.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-30"
                        >
                            <Logo.FullLogo />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
