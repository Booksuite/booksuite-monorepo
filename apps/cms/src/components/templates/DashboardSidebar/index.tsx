'use client'

import {
    Avatar,
    Box,
    Circle,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react'
import {
    Bell,
    Briefcase,
    ChevronDown,
    ExternalLink,
    FileText,
    HelpCircle,
    Home,
    Map,
    Megaphone,
    Settings,
    X,
} from 'lucide-react'
import type React from 'react'

import { NavMenu } from './components/NavMenu'
import type { DashboardSidebarProps } from './types'

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    isOpen,
    onClose,
    userImageSrc,
}) => {
    const mainLinks = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/mapa', label: 'Mapa', icon: Map },
        { href: '/relatorios', label: 'Relatórios', icon: FileText },
        { href: '/meu-negocio', label: 'Meu Negócio', icon: Briefcase },
        { href: '/marketing', label: 'Marketing', icon: Megaphone },
        { href: '/bookstore', label: 'Bookstore', icon: Briefcase },
        { href: '/configuracoes', label: 'Configurações', icon: Settings },
    ]

    const footerLinks = [
        {
            href: '/ir-para-site',
            label: 'Ir para o site',
            icon: ExternalLink,
            isFooter: true,
        },
        {
            href: '/suporte',
            label: 'Suporte',
            icon: HelpCircle,
            isFooter: true,
        },
    ]

    const isMobile = useBreakpointValue({ base: true, md: false })
    const isCollapsed = !isOpen && !isMobile

    const SidebarContent = (
        <VStack
            spacing={0}
            h="full"
            py={6}
            px={isCollapsed ? 2 : 4}
            w="full"
            align={isCollapsed ? 'center' : 'stretch'}
            bg="#0A2A6B"
        >
            <Flex
                direction="column"
                w="full"
                mb={6}
                align={isCollapsed ? 'center' : 'flex-start'}
            >
                {isCollapsed ? (
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                        b
                    </Text>
                ) : (
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                        book
                        <Text as="span" fontWeight="normal">
                            suite
                        </Text>
                    </Text>
                )}
            </Flex>

            {!isCollapsed && (
                <Flex
                    w="full"
                    align="center"
                    justify="space-between"
                    mb={6}
                    px={2}
                    bg={'whiteAlpha.100'}
                    padding={2}
                    borderRadius="md"
                    cursor="pointer"
                >
                    <HStack spacing={3}>
                        <Circle
                            size="32px"
                            overflow="hidden"
                            border={'2px solid #0077DD80'}
                        >
                            <Avatar
                                size="sm"
                                src={userImageSrc}
                                name="Chalé Lagoa"
                            />
                        </Circle>
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="white"
                            noOfLines={1}
                        >
                            Chalé Lagoa da Serra
                        </Text>
                    </HStack>
                    <ChevronDown size={16} color="white" />
                </Flex>
            )}

            {isCollapsed && (
                <Flex bg={'whiteAlpha.100'} borderRadius="md" cursor="pointer">
                    <Circle
                        size="32px"
                        overflow="hidden"
                        bg="blue.900"
                        border={'2px solid #0077DD80'}
                    >
                        <Avatar
                            size="sm"
                            src={userImageSrc}
                            name="Chalé Lagoa"
                        />
                    </Circle>
                </Flex>
            )}

            <NavMenu links={mainLinks} isCollapsed={isCollapsed} />

            <Box flex="1" />

            <NavMenu links={footerLinks} isCollapsed={isCollapsed} isFooter />
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
                    <DrawerContent bg="#0A2A6B">
                        <VStack
                            spacing={6}
                            h="full"
                            py={6}
                            px={4}
                            w="full"
                            align="stretch"
                        >
                            <Flex
                                as="header"
                                align="center"
                                justify="space-between"
                                w="full"
                                mb={4}
                            >
                                <IconButton
                                    icon={<X size={24} />}
                                    onClick={onClose}
                                    variant="ghost"
                                    color="white"
                                    aria-label="Close menu"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                />

                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="white"
                                >
                                    book
                                    <Text as="span" fontWeight="normal">
                                        suite
                                    </Text>
                                </Text>

                                <HStack spacing={4}>
                                    <IconButton
                                        icon={<Bell size={24} />}
                                        aria-label="Notifications"
                                        variant="ghost"
                                        color="white"
                                        _hover={{ bg: 'whiteAlpha.200' }}
                                    />
                                    <Circle
                                        size="32px"
                                        overflow="hidden"
                                        bg="blue.900"
                                    >
                                        <Avatar
                                            size="sm"
                                            src={userImageSrc}
                                            name="Chalé Lagoa"
                                        />
                                    </Circle>
                                </HStack>
                            </Flex>

                            <Flex
                                w="full"
                                align="center"
                                justify="space-between"
                                px={2}
                            >
                                <HStack spacing={3}>
                                    <Circle
                                        size="32px"
                                        overflow="hidden"
                                        bg="blue.900"
                                    >
                                        <Avatar
                                            size="sm"
                                            src={userImageSrc}
                                            name="Chalé Lagoa"
                                        />
                                    </Circle>
                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="white"
                                    >
                                        Chalé Lagoa da Serra
                                    </Text>
                                </HStack>
                                <ChevronDown size={16} color="white" />
                            </Flex>

                            <NavMenu links={mainLinks} />

                            <Box flex="1" />

                            <NavMenu links={footerLinks} isFooter />
                        </VStack>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Box
            as="aside"
            bg="#0A2A6B"
            color="white"
            width={isCollapsed ? '70px' : '280px'}
            transition="width 0.3s"
            overflow="hidden"
            position="relative"
            minH="100vh"
        >
            {SidebarContent}
        </Box>
    )
}
