'use client'

import {
    SpecialDateFull,
    SpecialDateOrderBy,
    useSearchServices,
    useUpdateSpecialDate,
} from '@booksuite/sdk'
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
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
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
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

const COLUMNS_DEFINITION: MRT_ColumnDef<SpecialDateFull>[] = [
    {
        id: 'image',
        header: '',
        size: 85,
        Cell: ({ row }) => (
            <Image
                src={row.original.medias[0]?.media.url}
                alt={row.original.name}
                sx={{
                    objectFit: 'cover',
                    borderRadius: 2,
                    width: '72px',
                    height: '72px',
                }}
            />
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        size: 200,
        accessorKey: 'name',
        enableSorting: true,
        Cell: ({ row }) => (
            <Typography fontWeight="bold" fontSize="1rem" color="#486581">
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'date',
        header: 'Data',
        accessorFn: (row) =>
            row.startDate
                ? new Date(row.startDate).toLocaleDateString('pt-BR')
                : '-',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        Cell: ({ row }) => {
            const { published, startDate } = row.original
            const now = new Date()
            const eventDate = startDate ? new Date(startDate) : null

            let text = 'Inativa'
            let color = 'inherit'

            if (published && eventDate) {
                if (eventDate > now) {
                    text = 'Programada'
                    color = '#E0AE15'
                } else if (eventDate.toDateString() === now.toDateString()) {
                    text = 'Hoje'
                    color = '#1D7F52'
                } else {
                    text = 'Finalizada'
                    color = '#D63841'
                }
            }

            return <span style={{ color, fontWeight: 'bold' }}>{text}</span>
        },
    },
    {
        id: 'published',
        header: 'Visibilidade',
        accessorFn: (row) => (row.published ? 'Publicado' : 'Não Publicado'),
    },
]

export default function SpecialDates() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<SpecialDateOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/prices-and-periods/special-dates',
        })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/prices-and-periods/special-dates',
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
        data: specialDates,
        isLoading,
        error,
    } = useSearchServices(
        { companyId },
        {
            pagination: { page, itemsPerPage },
            order: { orderBy, direction: orderDirection },
            filter:
                selectedFilters.length > 0
                    ? {
                          published: selectedFilters.includes('published'),
                      }
                    : undefined,
        },
        { query: searchQuery.length > 0 ? searchQuery : undefined },
    )

    const { mutate: updateSpecialDate } = useUpdateSpecialDate()

    const handleRowClick = (row: SpecialDateFull) => {
        push(`/my-business/prices-and-periods/special-dates/${row.id}` as Route)
    }

    const handleTogglePublished = (item: SpecialDateFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    updateSpecialDate({
                        id: item.id!,
                        data: { published: !item.published },
                    })
                },
            },
            cancelButton: { children: 'Cancelar' },
        })
    }

    const handleDelete = (item: SpecialDateFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {
                    updateSpecialDate({
                        id: item.id!,
                        data: { published: false },
                    })
                },
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: SpecialDateFull) => {
        push(
            `/my-business/prices-and-periods/special-dates/${item.id}` as Route,
        )
    }

    return (
        <div className="special_dates">
            <PageHeader
                title="Datas Especiais"
                backLButtonLabel="Preços e Períodos"
                backButtonHref="/my-business/prices-and-periods"
                headerRight={
                    <LinkButton
                        href="/my-business/prices-and-periods/special-dates/create"
                        startIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />

            <Stack spacing={2}>
                <Stack
                    direction="row"
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
                    data={specialDates?.items ?? []}
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
                            onClick={() => closeMenu()}
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
                            { id: orderBy, desc: orderDirection === 'desc' },
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
                        count={specialDates?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </div>
    )
}
