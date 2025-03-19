import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import {
    Bell,
    ChevronDown,
    ExternalLink,
    Menu as MenuIcon,
    Search,
} from 'lucide-react'

import { Logo } from '@/components/atoms/Logo'

import type { DashboardHeaderProps } from './types'

export const DashboardHeader = ({
    onToggleSidebar,
    userName,
    userImageSrc,
}: DashboardHeaderProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false })

    if (isMobile) {
        return (
            <Flex
                as="header"
                align="center"
                justify="space-between"
                h="64px"
                px={4}
                bg="primary.900"
                color="white"
            >
                <IconButton
                    icon={<MenuIcon size={24} />}
                    aria-label="Toggle Sidebar"
                    onClick={onToggleSidebar}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                />

                <Box fontSize="2xl" fontWeight="regular" color="white">
                    <Logo.LogoText />
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
        )
    }

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            h="64px"
            px={4}
            bg="white"
            boxShadow="sm"
            flexWrap="wrap"
        >
            <Flex align="center" h="full">
                <Center h="full">
                    <IconButton
                        icon={<MenuIcon size={24} />}
                        aria-label="Toggle Sidebar"
                        onClick={onToggleSidebar}
                        variant="ghost"
                        size="md"
                    />
                </Center>
                <Center h="full" ml={4}>
                    <InputGroup maxW="400px">
                        <InputLeftElement pointerEvents="none" h="40px">
                            <Search color="gray" size={20} />
                        </InputLeftElement>
                        <Input
                            type="text"
                            placeholder="Pesquisar"
                            h="40px"
                            borderRadius="md"
                        />
                    </InputGroup>
                </Center>
            </Flex>

            <Flex align="center" h="full" gap={4}>
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDown size={20} />}
                        variant="ghost"
                        h="40px"
                        display="flex"
                        alignItems="center"
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >
                        <Text
                            fontWeight="medium"
                            display={{ base: 'none', md: 'block' }}
                        >
                            BookSuite Admin
                        </Text>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Perfil</MenuItem>
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>

                <Avatar
                    size="sm"
                    bg="blue.900"
                    color="white"
                    src={userImageSrc}
                />

                <IconButton
                    icon={<ExternalLink size={20} />}
                    aria-label="External Link"
                    variant="ghost"
                    size="md"
                />

                <IconButton
                    icon={<Bell size={20} />}
                    aria-label="Notifications"
                    variant="ghost"
                    size="md"
                />
            </Flex>
        </Flex>
    )
}
