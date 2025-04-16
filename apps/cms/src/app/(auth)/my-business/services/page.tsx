'use client'

import {
    ServiceFull,
    ServiceOrderBy,
    useSearchServices,
    useUpdateService,
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
import { MRT_ColumnDef } from 'material-react-table'
import { useRouter } from 'next/navigation'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { formatCurrency } from '@/common/utils/currency'
import { Image } from '@/components/atoms/Image'
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { TableRowActionItem } from '@/components/molecules/TableRowActionItem'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

const COLUMNS_DEFINITION: MRT_ColumnDef<ServiceFull>[] = [
    {
        id: 'image',
        header: '',
        size: 85,
        Cell: ({ row }) => (
            <Image
                src={row.original.medias[0]?.media.url}
                alt={row.original.name}
                style={{
                    width: '72px',
                    height: '72px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                }}
            />
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
        Cell: ({ row }: { row: { original: ServiceFull } }) => (
            <span
                style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#486581',
                }}
            >
                {row.original.name}
            </span>
        ),
    },
    {
        id: 'price',
        header: 'Preço',
        accessorFn: (row) => (row.price ? formatCurrency(row.price) : '-'),
    },
    {
        id: 'published',
        header: 'Status',
        accessorFn: (row) => (row.published ? 'Ativo' : 'Inativo'),
    },
]

export default function Services() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()
    const { mutate: updateService } = useUpdateService()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<ServiceOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/services',
        })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/services',
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
        data: services,
        isLoading,
        error,
    } = useSearchServices(
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
    )

    const handleRowClick = (row: ServiceFull) => {
        push(`/my-business/services/${row.id}`)
    }

    const handleDuplicate = () => {
        // TODO: push(`/my-business/services/${item.id}/duplicate`)
    }

    const handleTogglePublished = (item: ServiceFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    updateService({
                        companyId,
                        id: item.id,
                        data: {
                            published: !item.published,
                        },
                    })
                },
            },
            cancelButton: {
                children: 'Cancelar',
            },
        })
    }

    const handleDelete = (item: ServiceFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {},
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: ServiceFull) => {
        push(`/my-business/services/${item.id}`)
    }

    return (
        <>
            <PageHeader
                title="Serviços"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/services/create"
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
                    data={services?.items ?? []}
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
                                handleDuplicate()
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
                        count={services?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </>
    )
}
