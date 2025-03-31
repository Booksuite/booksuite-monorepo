'use client'

import {
    AspectRatio,
    Box,
    Button,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useToken,
} from '@chakra-ui/react'
import { Check, ChevronDown } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { MediaItemProps } from './types'
import { getMediaItem } from './utils'

export const MediaItem: React.FC<PropsWithChildren<MediaItemProps>> = ({
    onSelect,
    item,
    isSelected,
    actions,
    selectable,
    children,
    ...props
}) => {
    const [blue, blackAlpha] = useToken('colors', [
        'blue.500',
        'blackAlpha.300',
    ])

    const handleClick = () => {
        if (selectable) {
            onSelect?.(item)
        }
    }

    const hoverable = !!actions || selectable

    return (
        <Box
            position="relative"
            borderRadius="md"
            className={`${hoverable ? 'hoverable' : ''} ${isSelected ? 'selected' : ''}`}
            {...props}
            css={{
                '& .container': {
                    outline: 'transparent',
                },

                '&.selected': {
                    '& .container': {
                        outline: `3px solid ${blue}`,
                    },

                    '& .checkbox': {
                        opacity: 1,
                    },
                },

                '& .hideable': {
                    opacity: 0,
                },

                '&.hoverable:hover': {
                    '& .hideable': {
                        opacity: 1,
                    },

                    '& .container': {
                        outline: `3px solid ${blue}`,
                        backgroundColor: blackAlpha,
                    },

                    '& .checkbox': {
                        opacity: 1,
                    },

                    '& .menu-button': {
                        opacity: 1,
                    },
                },
            }}
        >
            <AspectRatio ratio={1} borderRadius="md" overflow="hidden">
                {getMediaItem(item)}
            </AspectRatio>

            <Flex
                borderRadius="md"
                position="absolute"
                onClick={handleClick}
                className="container"
                top={0}
                left={0}
                right={0}
                bottom={0}
                p={1.5}
                bg="transparent"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.2s"
            >
                {selectable && (
                    <Button
                        size="xs"
                        className="checkbox"
                        variant="solid"
                        colorScheme={isSelected ? 'blue' : 'gray'}
                        onClick={handleClick}
                        opacity={0}
                        position="absolute"
                        top={1}
                        left={1}
                        transition="opacity 0.2s"
                        borderRadius="sm"
                        p={0}
                        minW="20px"
                        h="20px"
                    >
                        {isSelected && <Check size={12} />}
                    </Button>
                )}

                {!!actions && (
                    <Menu>
                        <MenuButton
                            className="menu-button"
                            opacity={0}
                            position="absolute"
                            top={1}
                            right={1}
                            as={IconButton}
                            icon={<ChevronDown size={16} />}
                            variant="solid"
                            aria-label="Opções"
                            size="xs"
                        />
                        <MenuList p={0}>
                            {actions?.map((action) => (
                                <MenuItem key={action.id} {...action} />
                            ))}
                        </MenuList>
                    </Menu>
                )}

                {children}
            </Flex>
        </Box>
    )
}
