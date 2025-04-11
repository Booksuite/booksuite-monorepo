'use client'

import { BannerFull, useSearchBanners, useUpdateBanner } from '@booksuite/sdk'
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import {
    Check,
    CheckCheck,
    Copy,
    Edit,
    Plus,
    Search,
    Trash,
    X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { TableRowActionItem } from '@/components/molecules/TableRowActionItem'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import { COLUMNS_DEFINITION } from './utils/constants'

export interface BannersProps {}

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

export default function Banners() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()

    const { mutateAsync: updateBanner } = useUpdateBanner()

    const [selectedFilters, setSelectedFilters] = useState<string[]>(['all'])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/marketing/banner',
        })

    const debouncedSearch = useRef(
        debounce({ delay: 350 }, (search: string) => {
            setSearchQuery(search)
        }),
    )

    useEffect(() => {
        debouncedSearch.current(searchInputValue)
    }, [debouncedSearch, searchInputValue])

    const companyId = useCurrentCompanyId()

    const { data: banners, error } = useSearchBanners(
        {
            companyId,
        },
        !selectedFilters.includes('all')
            ? {
                  pagination: { page, itemsPerPage },
                  filter:
                      selectedFilters.length > 0
                          ? {
                                published:
                                    selectedFilters.includes('published'),
                            }
                          : undefined,
              }
            : { pagination: { page, itemsPerPage } },
        { query: searchQuery.length > 0 ? searchQuery : undefined },
        { query: { enabled: undefined } },
    )

    const handleDuplicate = (item: BannerFull) => {
        // TODO: push(`/my-business/rooms/${item.id}/duplicate`)
    }

    const handleRowClick = (row: BannerFull) => {
        push(`/marketing/banner/${row.id}`)
    }

    const handleTogglePublished = (item: BannerFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.title}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    updateBanner({
                        companyId,
                        id: item.id,
                        data: { published: !item.published },
                    })
                },
            },
            cancelButton: {
                children: 'Cancelar',
            },
        })
    }

    const handleDelete = (item: BannerFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.title}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {
                    console.log('Excluir', item.id)
                    // TODO: implement actual delete functionality
                },
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: BannerFull) => {
        push(`/marketing/banner/${item.id}`)
    }

    return (
        <>
            <PageHeader
                title="Banners"
                backLButtonLabel="Marketing"
                backButtonHref="/marketing"
                headerRight={
                    <LinkButton
                        href="/marketing/banner/create"
                        startIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />

            <Stack spacing={2}>
                <Stack
                    direction="row"
                    flex={1}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <ChipFilter
                        items={chipItems}
                        value={selectedFilters}
                        onChange={setSelectedFilters}
                    />

                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Pesquisar"
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setSearchInputValue('')
                                                setSearchQuery('')
                                            }}
                                        >
                                            {searchQuery.length > 0 ? (
                                                <X size={16} />
                                            ) : (
                                                <Search size={16} />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Stack>

                <Table
                    columns={COLUMNS_DEFINITION}
                    data={banners?.items ?? []}
                    error={error}
                    enableRowActions
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <TableRowActionItem
                            key="edit"
                            label="Editar"
                            Icon={Edit}
                            onClick={() => {
                                handleEdit(row.original)
                                closeMenu()
                            }}
                        />,
                        <TableRowActionItem
                            key="toggle-published"
                            label={
                                row.original.published
                                    ? 'Despublicar'
                                    : 'Publicar'
                            }
                            Icon={row.original.published ? CheckCheck : Check}
                            onClick={() => {
                                handleTogglePublished(row.original)
                                closeMenu()
                            }}
                        />,
                        <TableRowActionItem
                            key="duplicate"
                            label="Duplicar"
                            Icon={Copy}
                            onClick={() => {
                                handleDuplicate(row.original)
                                closeMenu()
                            }}
                        />,
                        <TableRowActionItem
                            key="delete"
                            label="Excluir"
                            Icon={Trash}
                            onClick={() => {
                                handleDelete(row.original)
                                closeMenu()
                            }}
                        />,
                    ]}
                    onRowClick={handleRowClick}
                />

                <Stack direction="row" justifyContent="flex-end">
                    <PaginationControls
                        page={page}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                        count={banners?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </>
    )
}
