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
    Grid,
    IconButton,
    Modal,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, UploadIcon, X as CloseIcon } from 'lucide-react'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { getErrorMessage } from '@/common/utils'

import { AddUrlModal } from './components/AddUrlModal'
import { GalleryMediaItems } from './components/MediaItems'
import {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from './components/StyledComponents'
import { ITEMS_PER_PAGE } from './constants'
import { MediaGalleryProps, MediaUrlInfo } from './types'
import { getGalleryDescription } from './utils'

export const MediaGallery: React.FC<MediaGalleryProps> = ({
    isOpen,
    onClose,
    onItemsChange,
    initialItems = [],
    minItems,
    maxItems,
    allowVideos = true,
    allowExternalUrls = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const modalBodyRef = useRef<HTMLDivElement>(null)

    const queryClient = useQueryClient()
    const companyId = useCurrentCompanyId()

    const { enqueueSnackbar } = useSnackbar()

    const [selectedItems, setSelectedItems] = useState<string[]>(
        initialItems.map((item) => item.id),
    )

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
                    filter: !allowVideos
                        ? {
                              type: 'image',
                          }
                        : undefined,
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

    const handleSelectItem = (itemId: string) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId))
        } else {
            if (maxItems && selectedItems.length >= maxItems) {
                enqueueSnackbar(
                    `Você pode selecionar no máximo ${maxItems} mídias`,
                    {
                        variant: 'error',
                    },
                )
                return
            }
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
            enqueueSnackbar(getErrorMessage(error), {
                variant: 'error',
            })
        }
    }

    const disabled =
        isLoading ||
        isUpsertPending ||
        isUploadPending ||
        (!!minItems && selectedItems.length < minItems) ||
        (!!maxItems && selectedItems.length > maxItems)

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="media-gallery-modal"
        >
            <ModalContent>
                <ModalHeader sx={{ px: 6, py: 4, borderBottom: 'none' }}>
                    <Typography variant="h6">Galeria de mídias</Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                    >
                        {getGalleryDescription(minItems, maxItems)}
                    </Typography>
                    <Stack
                        direction="row"
                        gap={1}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {allowExternalUrls && (
                            <AddUrlModal
                                allowVideos={allowVideos}
                                onAddUrl={handleAddUrl}
                                disabled={
                                    !!maxItems &&
                                    allMediaItems.length >= maxItems
                                }
                            />
                        )}

                        <Button
                            size="small"
                            onClick={() => fileInputRef.current?.click()}
                            startIcon={<UploadIcon size={16} />}
                            disabled={
                                !!maxItems && allMediaItems.length >= maxItems
                            }
                            variant="outlined"
                        >
                            Fazer upload
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Stack>
                    <IconButton
                        size="small"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon size={20} />
                    </IconButton>
                </ModalHeader>
                <ModalBody ref={modalBodyRef}>
                    <Box sx={{ bgcolor: 'grey.100', p: 6 }}>
                        {isLoading ? (
                            <Grid container spacing={2} columns={[2, 4, 9]}>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <Grid size={1} key={index}>
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height="100%"
                                            sx={{
                                                aspectRatio: '1',
                                                borderRadius: 1,
                                                animation: `animation-delay: ${index * 0.03}s`,
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : allMediaItems.length > 0 ? (
                            <>
                                <GalleryMediaItems
                                    medias={allMediaItems}
                                    isLoading={isFetching}
                                    selectedItems={selectedItems}
                                    onUnselectAll={handleDeleteSelected}
                                    onSelectItem={handleSelectItem}
                                />
                                {isFetchingNextPage && (
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        py={2}
                                        mt={1}
                                    >
                                        <Skeleton height={30} width={100} />
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed',
                                    borderColor: 'grey.300',
                                    borderRadius: 1,
                                    minHeight: 200,
                                    cursor: 'pointer',
                                }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Plus size={24} color="gray" />
                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Clique para adicionar arquivos
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter sx={{ p: 6, borderTop: 'none' }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        disabled={disabled}
                        variant="contained"
                        color="primary"
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
