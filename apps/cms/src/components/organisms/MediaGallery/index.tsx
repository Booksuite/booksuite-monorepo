'use client'

import {
    MediaPaginated,
    searchMedia,
    useUploadMedia,
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
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, UploadIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'

import { AddUrlModal } from './components/AddUrlModal'
import { MediaItems } from './components/MediaItems'
import { ITEMS_PER_PAGE } from './constants'
import { MediaGalleryProps, MediaUrlInfo } from './types'

export const MediaGallery: React.FC<MediaGalleryProps> = ({
    isOpen,
    onClose,
    onItemsChange,
    initialItems = [],
    minItems,
    maxItems = 20,
    allowVideos = true,
    allowExternalUrls = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const modalBodyRef = useRef<HTMLDivElement>(null)

    const queryClient = useQueryClient()

    const [selectedItems, setSelectedItems] = useState<string[]>(
        initialItems.map((item) => item.id),
    )

    const companyId = useCurrentCompanyId()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
    } = useInfiniteQuery<MediaPaginated>({
        queryKey: ['searchMedia', companyId],
        queryFn: async ({ pageParam = 1 }) => {
            const result = await searchMedia(
                { companyId },
                {
                    pagination: {
                        page: Number(pageParam),
                        itemsPerPage: ITEMS_PER_PAGE,
                    },
                    order: { orderBy: 'createdAt', direction: 'desc' },
                },
            )
            return result
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage || undefined
        },
        enabled: isOpen,
    })

    // Update selectedItems when initialItems change
    useEffect(() => {
        setSelectedItems(initialItems.map((item) => item.id))
    }, [initialItems])

    const allMediaItems = useMemo(() => {
        if (!data) return initialItems

        const fetchedItems = data.pages.flatMap((page) => page?.items || [])
        const initialItemIds = initialItems.map((item) => item.id)

        const missingInitialItems = initialItems.filter((item) =>
            initialItemIds.includes(item.id),
        )

        const initialItemsInFetched = fetchedItems.filter(
            (item) => !initialItemIds.includes(item.id),
        )

        const combinedItems = [...missingInitialItems, ...initialItemsInFetched]

        return combinedItems
    }, [data, initialItems])

    // Set up scroll event for infinite loading
    useEffect(() => {
        if (!isOpen || !modalBodyRef.current) return

        const handleScroll = () => {
            if (!modalBodyRef.current || !hasNextPage || isFetchingNextPage)
                return

            const { scrollTop, scrollHeight, clientHeight } =
                modalBodyRef.current

            const scrollPosition = scrollTop + clientHeight
            const scrollThreshold = scrollHeight * 0.8

            if (scrollPosition >= scrollThreshold) {
                fetchNextPage()
            }
        }

        const modalBodyElement = modalBodyRef.current
        modalBodyElement.addEventListener('scroll', handleScroll)

        handleScroll()

        return () => {
            if (modalBodyElement)
                modalBodyElement.removeEventListener('scroll', handleScroll)
        }
    }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage, data])

    const { mutateAsync: createMedia, isPending: isUpsertPending } =
        useUpsertMedia({
            mutation: {
                onSettled: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['searchMedia', companyId],
                    })
                },
            },
        })

    const { mutateAsync: uploadMedia, isPending: isUploadPending } =
        useUploadMedia({
            mutation: {
                onSettled: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['searchMedia', companyId],
                    })
                },
            },
        })

    const handleRemoveItem = (index: number) => {
        const updatedItems = [...allMediaItems]
        updatedItems.splice(index, 1)
        // setAllMediaItems(updatedItems)
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

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        const file = files[0]

        try {
            await uploadMedia({
                companyId,
                data: {
                    file,
                },
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const disabled =
        isLoading ||
        isUpsertPending ||
        isUploadPending ||
        (minItems && selectedItems.length < minItems) ||
        selectedItems.length >= maxItems

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="5xl"
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent height="80vh" maxH="80vh">
                <ModalHeader>
                    Galeria de mídias
                    <HStack
                        mt={2}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {allowExternalUrls && (
                            <AddUrlModal
                                allowVideos={allowVideos}
                                onAddUrl={handleAddUrl}
                            />
                        )}

                        <Button
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            leftIcon={<UploadIcon size={16} />}
                            isDisabled={
                                allMediaItems.length >= maxItems ||
                                isUploadPending
                            }
                            variant="outline"
                        >
                            {isUploadPending ? 'Enviando...' : 'Fazer upload'}
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody p={0} ref={modalBodyRef}>
                    <Box bg="gray.100" p={6} borderRadius="md" overflowY="auto">
                        {isLoading ? (
                            <SimpleGrid columns={[2, 4, 8]} gap={3}>
                                {Array.from({ length: 8 }).map((_, index) => (
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
                        ) : allMediaItems.length > 0 ? (
                            <>
                                <MediaItems
                                    medias={allMediaItems}
                                    isLoading={isFetching}
                                    selectedItems={selectedItems}
                                    handleDeleteSelected={handleDeleteSelected}
                                    handleSelectItem={handleSelectItem}
                                    handleRemoveItem={handleRemoveItem}
                                />
                                {isFetchingNextPage && (
                                    <Flex justifyContent="center" py={4} mt={2}>
                                        <Skeleton height="30px" width="100px" />
                                    </Flex>
                                )}
                            </>
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
                                allMediaItems.filter((media) =>
                                    selectedItems.includes(media.id),
                                ),
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
