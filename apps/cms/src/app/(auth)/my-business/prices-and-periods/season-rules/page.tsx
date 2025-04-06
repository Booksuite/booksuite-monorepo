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

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

const COLUMNS_DEFINITION: MRT_ColumnDef<SeasonRuleFull>[] = [
    {
        id: 'name',
        header: 'Nome',
        size: 200,
        accessorKey: 'name',
        enableSorting: true,
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#486581',
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'startDate',
        header: 'Inicio',
        accessorFn: (row) =>
            row.startDate
                ? new Date(row.startDate).toLocaleDateString('pt-BR')
                : '-',
    },
    {
        id: 'endDate',
        header: 'Fim',
        accessorFn: (row) =>
            row.endDate
                ? new Date(row.endDate).toLocaleDateString('pt-BR')
                : '-',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        Cell: ({ row }) => {
            const { published, startDate, endDate } = row.original

            const now = new Date()
            const start = startDate ? new Date(startDate) : null
            const end = endDate ? new Date(endDate) : null

            let text = 'Inativa'
            let color = 'inherit'

            if (published) {
                if (start && end) {
                    if (now >= start && now <= end) {
                        text = 'Em Andamento'
                        color = '#1D7F52'
                    } else if (now < start) {
                        text = 'Programada'
                        color = '#E0AE15'
                    } else if (now > end) {
                        text = 'Finalizada'
                        color = '#D63841'
                    }
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

export default function SeasonRules() {
    const { push } = useRouter()
    const { showDialog } = useConfirmationDialog()

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
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
