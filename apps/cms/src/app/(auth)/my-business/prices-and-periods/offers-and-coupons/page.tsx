'use client'

import {
    Offer,
    OrderDirection,
    useSearchOffers,
    useUpdateOffer,
} from '@booksuite/sdk'
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
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
import { theme } from '@/common/theme'
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

const COLUMNS_DEFINITION: MRT_ColumnDef<Offer>[] = [
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
        size: 200,
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'purchaseStartDate',
        header: 'Início da Compra',
        accessorKey: 'purchaseStartDate',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.purchaseStartDate
                    ? dayjs(row.original.purchaseStartDate).format('DD/MM/YYYY')
                    : '-'}
            </Typography>
        ),
    },
    {
        id: 'purchaseEndDate',
        header: 'Fim da Compra',
        accessorKey: 'purchaseEndDate',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.purchaseEndDate
                    ? dayjs(row.original.purchaseEndDate).format('DD/MM/YYYY')
                    : '-'}
            </Typography>
        ),
    },
    {
        header: 'Status',
        accessorKey: 'status',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => {
            const { published, purchaseStartDate, purchaseEndDate } =
                row.original

            const now = dayjs()
            const start = purchaseStartDate ? dayjs(purchaseStartDate) : null
            const end = purchaseEndDate ? dayjs(purchaseEndDate) : null

            let text = 'Inativa'
            let color = 'inherit'

            if (published) {
                if (start && end) {
                    if (now.isAfter(start) && now.isBefore(end)) {
                        text = 'Em Andamento'
                        color = theme.palette.success.main
                    } else if (now.isBefore(start)) {
                        text = 'Programada'
                        color = theme.palette.warning.main
                    } else if (now.isAfter(end)) {
                        text = 'Finalizada'
                        color = theme.palette.error.main
                    }
                }
            }

            return (
                <Typography
                    sx={{
                        fontSize: '14px',
                        marginLeft: '10px',
                        color,
                    }}
                >
                    {text}
                </Typography>
            )
        },
    },
    {
        id: 'published',
        header: 'Visibilidade',
        accessorKey: 'published',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                    color: row.original.published
                        ? theme.palette.success.main
                        : theme.palette.blueGrey[700],
                }}
            >
                {row.original.published ? 'Publicado' : 'Não Publicado'}
            </Typography>
        ),
    },
]

export default function OffersAndCoupons() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([
        'published',
    ])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } = useSearchParamsOrder<'name'>({
        defaultOrder: 'name',
        currentPath: '/my-business/prices-and-periods/offers-and-coupons',
    })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/prices-and-periods/offers-and-coupons',
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
        data: offers,
        isLoading,
        error,
    } = useSearchOffers(
        { companyId },
        {
            pagination: { page, itemsPerPage },
            order: {
                orderBy,
                direction: orderDirection as OrderDirection,
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

    const { mutateAsync: updateOffer } = useUpdateOffer()

    const handleRowClick = (row: Offer) => {
        push(`/my-business/prices-and-periods/offers-and-coupons/${row.id}`)
    }

    const handleDuplicate = () => {
        // TODO: Implement duplicate functionality
    }

    const handleTogglePublished = (item: Offer) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    updateOffer({
                        companyId,
                        id: item.id!,
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

    const handleDelete = (item: Offer) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {
                    return null // TODO: Implement delete functionality
                },
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: Offer) => {
        push(`/my-business/prices-and-periods/offers-and-coupons/${item.id}`)
    }

    return (
        <div className="offers_and_coupons">
            <PageHeader
                title="Ofertas e Cupons"
                backLButtonLabel="Preços e Períodos"
                backButtonHref="/my-business/prices-and-periods"
                headerRight={
                    <LinkButton
                        href="/my-business/prices-and-periods/offers-and-coupons/create"
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

                    <Box sx={{ width: '300px' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Pesquisar"
                            value={searchInputValue}
                            onChange={(e) =>
                                setSearchInputValue(e.target.value)
                            }
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
                    </Box>
                </Stack>

                <Table
                    columns={COLUMNS_DEFINITION}
                    data={offers?.items ?? []}
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
                        count={offers?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </div>
    )
}
