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
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiCheck, FiMoreVertical, FiTrash2 } from 'react-icons/fi'

import { MediaGalleryItemProps } from '../../types'
import { getMediaItem } from '../../utils'

export const MediaGalleryItem: React.FC<MediaGalleryItemProps> = ({
    item,
    isSelected,
    onSelect,
    onRemove,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        if (!showOptions) {
            setShowOptions(false)
        }
    }

    return (
        <Box
            position="relative"
            borderRadius="md"
            overflow="hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            borderWidth={isSelected ? '2px' : '1px'}
            borderColor={isSelected ? 'blue.500' : 'gray.200'}
        >
            <AspectRatio ratio={1}>{getMediaItem(item)}</AspectRatio>

            <Flex
                position="absolute"
                onClick={onSelect}
                top={0}
                left={0}
                right={0}
                bottom={0}
                p={1.5}
                flexDirection="column"
                justifyContent="space-between"
                bg={isHovered ? 'blackAlpha.200' : 'transparent'}
                transition="background-color 0.2s"
            >
                <Flex justifyContent="space-between">
                    <Button
                        size="xs"
                        variant="solid"
                        colorScheme={isSelected ? 'blue' : 'gray'}
                        onClick={onSelect}
                        opacity={isHovered || isSelected ? 1 : 0}
                        transition="opacity 0.2s"
                        borderRadius="sm"
                        p={0}
                        minW="20px"
                        h="20px"
                    >
                        {isSelected && <FiCheck size={12} />}
                    </Button>

                    <Menu>
                        <MenuButton
                            opacity={isHovered ? 1 : 0}
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="solid"
                            aria-label="Opções"
                            size="xs"
                        />
                        <MenuList p={0}>
                            <MenuItem>
                                <FiTrash2 style={{ marginRight: '5px' }} />{' '}
                                Remover
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}
