'use client'

import {
    HousingUnitTypeFull,
    HousingUnitTypeOrderByDTOOrderBy,
    useSearchHousingUnitTypes,
    useUpdateHousingUnitType,
} from '@booksuite/sdk'
import {
    IconButton,
    InputAdornment,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
} from '@mui/material'
import { Copy, Edit, Plus, Search, Trash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import { COLUMNS_DEFINITION } from './constants'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

export default function Rooms() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()
    const { mutate: updateHousingUnitType } = useUpdateHousingUnitType()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<HousingUnitTypeOrderByDTOOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/rooms',
        })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/rooms',
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
    const {
        data: housingUnitTypes,
        isLoading,
        error,
    } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page, itemsPerPage },
            order: {
                orderBy,
                direction: orderDirection,
            },
            filter:
                selectedFilters.length > 0
                    ? {
                          published: selectedFilters.includes('published'),
                      }
                    : undefined,
        },
        { query: searchQuery.length > 0 ? searchQuery : undefined },
        { query: { enabled: undefined } },
    )

    const handleRowClick = (row: HousingUnitTypeFull) => {
        push(`/my-business/rooms/${row.id}`)
    }

    const handleDuplicate = (item: HousingUnitTypeFull) => {
        // TODO: push(`/my-business/rooms/${item.id}/duplicate`)
    }

    const handleTogglePublished = (item: HousingUnitTypeFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButtonText: 'Confirmar',
            variant: item.published ? 'warning' : 'info',
            onConfirm: () => {
                updateHousingUnitType({
                    companyId,
                    id: item.id,
                    data: {
                        published: !item.published,
                    },
                })
            },
        })
    }

    const handleDelete = (item: HousingUnitTypeFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButtonText: 'Excluir',
            variant: 'error',
            onConfirm: () => {
                // TODO: implement actual delete functionality
                // console.log('Deleted:', item.id)
            },
        })
    }

    const handleEdit = (item: HousingUnitTypeFull) => {
        push(`/my-business/rooms/${item.id}`)
    }

    return (
        <div>
            <PageHeader
                title="Acomodações"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/rooms/create"
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
                    data={housingUnitTypes?.items ?? []}
                    enableRowActions
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <MenuItem
                            key="edit"
                            onClick={() => {
                                handleEdit(row.original)
                                closeMenu()
                            }}
                        >
                            <ListItemIcon>
                                <Edit size={16} />
                            </ListItemIcon>
                            <ListItemText>Editar</ListItemText>
                        </MenuItem>,
                        <MenuItem
                            key="toggle-published"
                            onClick={() => {
                                handleTogglePublished(row.original)
                                closeMenu()
                            }}
                        >
                            <ListItemIcon>
                                <Edit size={16} />
                            </ListItemIcon>
                            <ListItemText>
                                {row.original.published
                                    ? 'Despublicar'
                                    : 'Publicar'}
                            </ListItemText>
                        </MenuItem>,
                        <MenuItem
                            key="duplicate"
                            onClick={() => {
                                handleDuplicate(row.original)
                                closeMenu()
                            }}
                        >
                            <ListItemIcon>
                                <Copy size={16} />
                            </ListItemIcon>
                            <ListItemText>Duplicar</ListItemText>
                        </MenuItem>,
                        <MenuItem
                            key="delete"
                            onClick={() => {
                                handleDelete(row.original)
                                closeMenu()
                            }}
                        >
                            <ListItemIcon>
                                <Trash size={16} />
                            </ListItemIcon>
                            <ListItemText>Excluir</ListItemText>
                        </MenuItem>,
                    ]}
                    state={{
                        sorting: [
                            {
                                id: orderBy,
                                desc: orderDirection === 'desc',
                            },
                        ],
                    }}
                    onSortingChange={(sorting) => {
                        const newValue =
                            typeof sorting === 'function'
                                ? sorting([
                                      {
                                          id: orderBy,
                                          desc: orderDirection === 'desc',
                                      },
                                  ])
                                : sorting

                        setOrder(
                            newValue[0]?.id ?? 'name',
                            newValue[0]?.desc ? 'desc' : 'asc',
                        )
                    }}
                    onRowClick={handleRowClick}
                />

                <Stack direction="row" justifyContent="flex-end">
                    <PaginationControls
                        page={page}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                        count={housingUnitTypes?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </div>
    )
}
