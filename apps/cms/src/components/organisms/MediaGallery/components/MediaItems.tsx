import { Media } from '@booksuite/sdk'
import {
    Button,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Spinner,
    Text,
} from '@chakra-ui/react'
import { Search, X } from 'lucide-react'
import pluralize from 'pluralize'
import { useState } from 'react'

import { MediaGalleryItem } from './MediaItem'

interface MediaItemsProps {
    medias: Media[]
    selectedItems: string[]
    isLoading?: boolean
    handleDeleteSelected: () => void
    handleSelectItem: (item: string) => void
    handleRemoveItem: (index: number) => void
}

export const MediaItems: React.FC<MediaItemsProps> = ({
    medias,
    selectedItems,
    isLoading,
    handleDeleteSelected,
    handleSelectItem,
    handleRemoveItem,
}) => {
    const [searchInput, setSearchInput] = useState('')

    const filteredMedias = medias.filter((media) =>
        media.url.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
        <>
            <HStack justifyContent="space-between" mb={4}>
                <InputGroup
                    maxW={300}
                    size="sm"
                    css={{ input: { background: 'white' } }}
                >
                    <Input
                        placeholder="Pesquisar"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <InputRightElement>
                        {searchInput.length > 0 ? (
                            <IconButton
                                size="xs"
                                variant="ghost"
                                icon={<X size={14} />}
                                aria-label={'Limpar'}
                                onClick={() => setSearchInput('')}
                            />
                        ) : (
                            <Search size={14} />
                        )}
                    </InputRightElement>
                </InputGroup>
                <HStack gap={3}>
                    {isLoading && <Spinner size="sm" color="gray.400" />}
                    <Flex justifyContent="space-between">
                        <Text fontSize="sm" color="gray.500">
                            {selectedItems.length}{' '}
                            {pluralize('item', selectedItems.length)}{' '}
                            selecionados
                        </Text>
                    </Flex>

                    <Button
                        disabled={selectedItems.length < 1}
                        size="sm"
                        leftIcon={<X />}
                        variant="outline"
                        onClick={handleDeleteSelected}
                    >
                        Desmarcar todos
                    </Button>
                </HStack>
            </HStack>
            <SimpleGrid columns={[2, 4, 8]} gap={3}>
                {filteredMedias.map((item, index) => (
                    <MediaGalleryItem
                        key={item.id || `${item.url}-${index}`}
                        item={item}
                        isSelected={selectedItems.includes(item.id || item.url)}
                        onSelect={() => handleSelectItem(item.id || item.url)}
                        onRemove={() => handleRemoveItem(index)}
                    />
                ))}
            </SimpleGrid>
        </>
    )
}
