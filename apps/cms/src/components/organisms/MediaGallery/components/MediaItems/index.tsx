import { Media } from '@booksuite/sdk'
import {
    Button,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
} from '@chakra-ui/react'
import { Search, X } from 'lucide-react'
import pluralize from 'pluralize'
import { useState } from 'react'

import { MediaItems } from '@/components/organisms/MediaItems'

interface MediaItemsProps {
    medias: Media[]
    selectedItems?: string[]
    isLoading?: boolean
    onSelectItem: (item: string) => void
    onUnselectAll: () => void
}

export const GalleryMediaItems: React.FC<MediaItemsProps> = ({
    medias,
    selectedItems = [],
    isLoading,
    onSelectItem,
    onUnselectAll,
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
                        onClick={onUnselectAll}
                    >
                        Desmarcar todos
                    </Button>
                </HStack>
            </HStack>

            <MediaItems
                medias={filteredMedias}
                selectable
                selectedItems={selectedItems}
                onSelectItem={onSelectItem}
                actions={[
                    {
                        id: 'delete',
                        children: 'Excluir',
                        onClick: onUnselectAll,
                    },
                ]}
            />
        </>
    )
}
