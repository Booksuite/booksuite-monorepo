'use client'

import {
    BillingType,
    ReservationOptionFull,
    ReservationOptionOrderBy,
    useReservationOptionsControllerUpdate,
    useSearchReservationOption,
} from '@booksuite/sdk'
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
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { TableRowActionItem } from '@/components/molecules/TableRowActionItem'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

import { billingTypes, COLUMNS_DEFINITION } from './constants'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

export default function ReservationOptions() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()
    const { mutateAsync: updateReservationOptions } =
        useReservationOptionsControllerUpdate()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<ReservationOptionOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/reservation-options',
        })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/reservation-options',
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
        data: reservationOptions,
        isLoading,
        error,
    } = useSearchReservationOption(
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
                          published:
                              selectedFilters.includes('published') ||
                              (selectedFilters.includes('unpublished') &&
                                  !selectedFilters.some((f) =>
                                      billingTypes.includes(f as BillingType),
                                  ))
                                  ? selectedFilters.includes('published')
                                  : undefined,
                      }
                    : undefined,
        },
        { query: searchQuery.length > 0 ? searchQuery : undefined },
    )

    const handleRowClick = (row: ReservationOptionFull) => {
        push(`/my-business/reservation-options/${row.id}`)
    }

    const handleTogglePublished = (item: ReservationOptionFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    updateReservationOptions({
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDuplicate = (item: ReservationOptionFull) => {
        // TODO: push(`/my-business/rooms/${item.id}/duplicate`)
    }

    const handleDelete = (item: ReservationOptionFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {
                    // TODO: implement actual delete functionality
                },
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: ReservationOptionFull) => {
        push(`/my-business/reservation-options/${item.id}`)
    }

    return (
        <>
            <PageHeader
                title="Opções de Tarifa"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/reservation-options/create"
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
                    data={reservationOptions?.items ?? []}
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
                    state={{
                        isLoading,
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
                        count={reservationOptions?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </>
    )
}
