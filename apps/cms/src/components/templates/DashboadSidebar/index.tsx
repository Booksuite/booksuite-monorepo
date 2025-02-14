import { Logo } from '@/components/atoms/Logo'
import { NavMenu } from '@/components/molecules/NavMenu'
import { LinkItem } from '@/components/molecules/NavMenu/types'
import { Box, VStack } from '@chakra-ui/react'
import { DashboadSidebarProps } from './types'

export const DashboadSidebar: React.FC<DashboadSidebarProps> = ({ isOpen }) => {
    const mainLinks: LinkItem[] = [
        { href: '/', label: 'Início' },
        { href: '/mapa', label: 'Mapa' },
        { href: '/relatorios', label: 'Relatórios' },
        { href: '/meu-negocio', label: 'Meu Negócio' },
        { href: '/marketing', label: 'Marketing' },
    ]

    const footerLinks: LinkItem[] = [
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
