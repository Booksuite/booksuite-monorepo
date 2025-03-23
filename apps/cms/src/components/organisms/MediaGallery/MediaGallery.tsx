'use client'

import {
    searchMediaQueryKey,
    useSearchMedia,
    useUpsertMedia,
} from '@booksuite/sdk'
import {
    Box,
    Button,
    Flex,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Skeleton,
    Text,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Plus, UploadIcon } from 'lucide-react'
import { sort } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'

import { AddUrlModal } from './components/AddUrlModal'
import { MediaItems } from './components/MediaItems'
import { MediaGalleryProps, MediaUrlInfo } from './types'
export const MediaGallery: React.FC<MediaGalleryProps> = ({
    isOpen,
    onClose,
    onItemsChange,
    initialItems = [],
    maxItems = 20,
    allowVideos = true,
    allowExternalUrls = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    useEffect(() => {
        setSelectedItems(initialItems.map((item) => item.id))
    }, [initialItems])

    const companyId = useCurrentCompanyId()
    const { data: medias, isLoading } = useSearchMedia(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            order: { orderBy: 'createdAt', direction: 'desc' },
        },
        {},
        {
            query: {
                enabled: isOpen,
                refetchOnMount: true,
                select: (data) =>
                    sort(
                        data.items,
                        (item) =>
                            +!initialItems.map((i) => i.id).includes(item.id),
                    ),
                initialData: { items: initialItems },
            },
        },
    )

    const queryKey = searchMediaQueryKey(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            order: { orderBy: 'createdAt', direction: 'desc' },
        },
        {},
    )

    const { mutateAsync: createMedia, isPending } = useUpsertMedia({
        mutation: {
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey })
            },
        },
    })

    const handleRemoveItem = (index: number) => {
        if (!medias) return
        const updatedItems = [...medias]
        updatedItems.splice(index, 1)
        onItemsChange?.(updatedItems)
    }

    const handleSelectItem = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId))
        } else {
            setSelectedItems([...selectedItems, itemId])
        }
    }

    const handleDeleteSelected = () => {
        setSelectedItems([])
    }

    const handleAddUrl = async (info: MediaUrlInfo) => {
        await createMedia({
            companyId,
            data: {
                metadata: { mimetype: info.mimetype },
                url: info.url,
            },
        })
    }

    const disabled =
        isLoading ||
        isPending ||
        selectedItems.length === 0 ||
        selectedItems.length >= maxItems

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="5xl"
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent maxH="80vh">
                <ModalHeader>
                    Galeria de mídias
                    <HStack
                        mt={2}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {allowExternalUrls && (
                            <AddUrlModal onAddUrl={handleAddUrl} />
                        )}

                        <Button
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            leftIcon={<UploadIcon size={16} />}
                            isDisabled={!medias || medias.length >= maxItems}
                            variant="outline"
                        >
                            Fazer upload
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={`${allowVideos ? 'image/*,video/*' : 'image/*'}`}
                            style={{ display: 'none' }}
                        />
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody p={0}>
                    <Box bg="gray.100" p={6} borderRadius="md" overflowY="auto">
                        {isLoading ? (
                            <SimpleGrid columns={[2, 4, 8]} gap={3}>
                                {Array.from({ length: 32 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        aspectRatio={1}
                                        borderRadius="md"
                                        css={{
                                            animationDelay: `${index * 0.03}s`,
                                        }}
                                    />
                                ))}
                            </SimpleGrid>
                        ) : medias && medias.length > 0 ? (
                            <MediaItems
                                medias={medias}
                                isLoading={isLoading}
                                selectedItems={selectedItems}
                                handleDeleteSelected={handleDeleteSelected}
                                handleSelectItem={handleSelectItem}
                                handleRemoveItem={handleRemoveItem}
                            />
                        ) : (
                            <Flex
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                border="2px dashed"
                                borderColor="gray.300"
                                borderRadius="md"
                                minH="200px"
                                cursor="pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Plus size={24} color="gray" />
                                <Text mt={2} color="gray.500">
                                    Clique para adicionar arquivos
                                </Text>
                            </Flex>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        disabled={disabled}
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => {
                            onItemsChange?.(
                                medias?.filter((media) =>
                                    selectedItems.includes(media.id),
                                ) || [],
                            )
                            onClose()
                        }}
                    >
                        Selecionar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
