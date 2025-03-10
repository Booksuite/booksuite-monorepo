import {
    Avatar,
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react'
import { Bell, X } from 'lucide-react'
import type React from 'react'

import { Logo } from '@/components/atoms/Logo'

import { NavMenu } from './components/NavMenu'
import type { LinkItem } from './components/NavMenu/types'
import type { DashboardSidebarProps } from './types'

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    isOpen,
    onClose,
    userImageSrc,
}) => {
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

    const isMobile = useBreakpointValue({ base: true, md: false })

    const SidebarContent = (
        <VStack spacing={6} h="full" py={6} px={4} w="full" align="stretch">
            <Logo />
            <NavMenu links={mainLinks} />
            <NavMenu links={footerLinks} />
        </VStack>
    )

    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay>
                    <DrawerContent bg="primary.900" color="white">
                        <VStack
                            spacing={100}
                            h="full"
                            py={6}
                            px={2}
                            w="full"
                            align="center"
                            textAlign="center"
                        >
                            <Flex
                                as="header"
                                align="center"
                                justify="space-between"
                                w="full"
                                px={4}
                                bg="primary.900"
                                color="white"
                            >
                                <IconButton
                                    icon={<X />}
                                    onClick={onClose}
                                    variant="ghost"
                                    color="white"
                                    aria-label="Close menu"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                />

                                <Box
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="white"
                                >
                                    book
                                    <span style={{ fontWeight: 'normal' }}>
                                        suite
                                    </span>
                                </Box>

                                <Flex gap={2}>
                                    <IconButton
                                        icon={<Bell size={24} />}
                                        aria-label="Notifications"
                                        variant="ghost"
                                        color="white"
                                        _hover={{ bg: 'whiteAlpha.200' }}
                                    />
                                    <Avatar
                                        size="sm"
                                        bg="blue.900"
                                        color="white"
                                        src={userImageSrc}
                                        alignSelf="center"
                                    />
                                </Flex>
                            </Flex>

                            <NavMenu links={mainLinks} />
                            <NavMenu links={footerLinks} />
                        </VStack>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Box
            as="aside"
            bg="primary.900"
            color="white"
            width={isOpen ? '280px' : '0'}
            transition="width 0.3s"
            overflow="hidden"
            position="relative"
            minH="100vh"
        >
            {SidebarContent}
        </Box>
    )
}
