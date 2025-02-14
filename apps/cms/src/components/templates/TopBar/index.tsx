import {
    BellIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    SearchIcon,
} from '@chakra-ui/icons'
import {
    Avatar,
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
} from '@chakra-ui/react'
import { TopBarProps } from './types'

export const TopBar = ({
    onToggleSidebar,
    userName,
    userImageSrc,
}: TopBarProps) => {
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            h="64px"
            px={4}
            bg="white"
            boxShadow="sm"
        >
            <Flex align="center" h="full">
                <Center h="full">
                    <IconButton
                        icon={<HamburgerIcon />}
                        aria-label="Toggle Sidebar"
                        onClick={onToggleSidebar}
                        variant="ghost"
                        size="md"
                    />
                </Center>
                <Center h="full" ml={4}>
                    <InputGroup maxW="400px">
                        <InputLeftElement pointerEvents="none" h="40px">
                            <SearchIcon color="gray.300" />
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
                        rightIcon={<ChevronDownIcon />}
                        variant="ghost"
                        h="40px"
                        display="flex"
                        alignItems="center"
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >
                        <Text fontWeight="medium">BookSuite Admin</Text>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Perfil</MenuItem>
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>

                <Avatar size="sm" bg="blue.900" color="white" />

                <IconButton
                    icon={<ExternalLinkIcon />}
                    aria-label="External Link"
                    variant="ghost"
                    size="md"
                />

                <IconButton
                    icon={<BellIcon />}
                    aria-label="Notifications"
                    variant="ghost"
                    size="md"
                />
            </Flex>
        </Flex>
    )
}
