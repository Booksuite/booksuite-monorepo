import { Logo } from '@/components/atoms/Logo'
import { NavMenu } from '@/components/molecules/NavMenu'
import { LinkType } from '@/components/molecules/NavMenu/types'
import { Box, VStack } from '@chakra-ui/react'
import { SideBarProps } from './types'

export const SideBar = ({ isOpen }: SideBarProps) => {
    const mainLinks: LinkType[] = [
        { href: '/', label: 'Início' },
        { href: '/mapa', label: 'Mapa' },
        { href: '/relatorios', label: 'Relatórios' },
        { href: '/meu-negocio', label: 'Meu Negócio' },
        { href: '/marketing', label: 'Marketing' },
    ]

    const footerLinks: LinkType[] = [
        { href: '/configuracoes', label: 'Configurações' },
    ]

    return (
        <Box
            as="aside"
            bg="primary.900"
            color="primary.50"
            width={isOpen ? '280px' : '0'}
            transition="width 0.3s"
            overflow="hidden"
            position="relative"
            minH="100vh"
        >
            <VStack spacing={0} h="full" py={8} px={6} align="stretch">
                <Logo />
                <Box flex={1}>
                    <NavMenu links={mainLinks} />
                </Box>
                <Box>
                    <NavMenu links={footerLinks} isFooter />
                </Box>
            </VStack>
        </Box>
    )
}
