'use client'

import {
    SeasonRuleFull,
    SeasonRuleOrderBy,
    seasonRulesControllerUpdate,
    useSearchSeasonRules,
} from '@booksuite/sdk'
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
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
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { TableRowActionItem } from '@/components/molecules/TableRowActionItem'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'
import dayjs from 'dayjs'
import { theme } from '@/common/theme'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

const COLUMNS_DEFINITION: MRT_ColumnDef<SeasonRuleFull>[] = [
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        size: 200,
        enableSorting: true,
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
        id: 'startDate',
        header: 'Inicio',
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
                {row.original.startDate
                    ? dayjs(row.original.startDate).format('DD/MM/YYYY')
                    : '-'}
            </Typography>
        ),
    },
    {
        id: 'endDate',
        header: 'Fim',
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
                {row.original.endDate
                    ? dayjs(row.original.endDate).format('DD/MM/YYYY')
                    : '-'}
            </Typography>
        ),
    },
    {
        header: 'Status',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => {
            const { published, startDate, endDate } = row.original

            const now = dayjs()
            const start = startDate ? dayjs(startDate) : null
            const end = endDate ? dayjs(endDate) : null

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
                        color,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginLeft: '10px',
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

export default function SeasonRules() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([
        'published',
    ])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<SeasonRuleOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/prices-and-periods/season-rules',
        })

    const { page, itemsPerPage, setPage, setItemsPerPage } =
        useSearchParamsPagination({
            currentPath: '/my-business/prices-and-periods/season-rules',
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
        data: seasonRules,
        isLoading,
        error,
    } = useSearchSeasonRules(
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

    const handleRowClick = (row: SeasonRuleFull) => {
        push(`/my-business/prices-and-periods/season-rules/${row.id}`)
    }

    const handleDuplicate = () => {
        // TODO: push(`/my-business/prices-and-periods/season-rules/${item.id}/duplicate`)
    }

    const handleTogglePublished = (item: SeasonRuleFull) => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButton: {
                children: 'Confirmar',
                onClick: () => {
                    seasonRulesControllerUpdate(
                        {
                            companyId,
                            id: item.id!,
                        },
                        {
                            published: !item.published,
                        },
                    )
                },
            },
            cancelButton: {
                children: 'Cancelar',
            },
        })
    }

    const handleDelete = (item: SeasonRuleFull) => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButton: {
                children: 'Excluir',
                onClick: () => {
                    return null
                },
            },
            variant: 'error',
        })
    }

    const handleEdit = (item: SeasonRuleFull) => {
        push(`/my-business/prices-and-periods/season-rules/${item.id}`)
    }

    return (
        <div className="season_rules">
            <PageHeader
                title="Regras de Temporada"
                backLButtonLabel="Preços e Períodos"
                backButtonHref="/my-business/prices-and-periods"
                headerRight={
                    <LinkButton
                        href="/my-business/prices-and-periods/season-rules/create"
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
                    data={seasonRules?.items ?? []}
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
                        count={seasonRules?.totalPages ?? 0}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </Stack>
        </div>
    )
}
