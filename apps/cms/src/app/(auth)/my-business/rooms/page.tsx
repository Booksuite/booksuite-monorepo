'use client'

import {
    HousingUnitTypeFull,
    HousingUnitTypeOrderByDTOOrderBy,
    useSearchHousingUnitTypes,
} from '@booksuite/sdk'
import {
    HStack,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react'
import {
    ColumnDef,
    functionalUpdate,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Plus, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import pluralize from 'pluralize'
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { formatCurrency } from '@/common/utils/currency'
import { LinkButton } from '@/components/atoms/LinkButton'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'
import { PaginationControls } from '../../../../components/molecules/PaginationControl'

import { HousingUnitTypeRowActionsMenu } from './components/RowActionsMenu'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

const columnsDefinition: ColumnDef<HousingUnitTypeFull>[] = [
    {
        id: 'image',
        size: 85,
        cell: ({ row }) => (
            <Image
                src={row.original.medias[0]?.media.url}
                alt={row.original.name}
                objectFit="cover"
                borderRadius="lg"
                width="72px"
                height="72px"
            />
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
        cell: ({ row }) => (
            <Text fontWeight="bold" fontSize="md" color="#486581">
                {row.original.name}
            </Text>
        ),
    },
    {
        id: 'weekdaysPrice',
        header: 'Dia de semana',
        accessorFn: (row) =>
            row.weekdaysPrice ? formatCurrency(row.weekdaysPrice) : '-',
    },
    {
        id: 'weekendPrice',
        header: 'Fim de semana',
        accessorFn: (row) =>
            row.weekendPrice ? formatCurrency(row.weekendPrice) : '-',
    },
    {
        id: 'maxGuests',
        header: 'Max. de hóspedes',
        accessorFn: (row) =>
            row.maxGuests
                ? `${row.maxGuests} ${pluralize('hóspede', row.maxGuests)}`
                : 'Sem limites',
    },
    {
        id: 'housingUnits',
        header: 'Unidades',
        accessorFn: (row) =>
            `${row.housingUnits.length} ${pluralize('unidade', row.housingUnits.length)}`,
    },
    {
        id: 'actions',
        size: 50,
        cell: ({ row }) => (
            <HousingUnitTypeRowActionsMenu item={row.original} />
        ),
    },
]

export default function Rooms() {
    const { push } = useRouter()

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

    const table = useReactTable({
        data: housingUnitTypes?.items ?? [],
        columns: columnsDefinition,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        state: {
            sorting: [
                {
                    id: orderBy,
                    desc: orderDirection === 'desc',
                },
            ],
        },
        onSortingChange: (sorting) => {
            const newValue = functionalUpdate(sorting, [
                {
                    id: orderBy,
                    desc: orderDirection === 'desc',
                },
            ])

            setOrder(
                newValue[0]?.id ?? 'name',
                newValue[0]?.desc ? 'desc' : 'asc',
            )
        },
    })

    const handleRowClick = (row: HousingUnitTypeFull) => {
        push(`/my-business/rooms/${row.id}`)
    }

    return (
        <div className="Acomodacoes">
            <PageHeader
                title="Acomodações"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/rooms/create"
                        leftIcon={<Plus size={16} />}
                    >
                        Adicionar
                    </LinkButton>
                }
            />

            <VStack gap={4} alignItems="stretch">
                <HStack flex={1} justifyContent="space-between">
                    <ChipFilter
                        items={chipItems}
                        value={selectedFilters}
                        onChange={setSelectedFilters}
                    />
                    <InputGroup w="300px">
                        <Input
                            type="text"
                            placeholder="Pesquisar"
                            value={searchInputValue}
                            onChange={(e) =>
                                setSearchInputValue(e.target.value)
                            }
                        />
                        <InputRightElement>
                            <IconButton
                                variant="ghost"
                                aria-label="Pesquisar"
                                size="sm"
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
                        </InputRightElement>
                    </InputGroup>
                </HStack>

                <Table
                    onRowClick={handleRowClick}
                    table={table}
                    error={error}
                    isLoading={isLoading}
                />

                <HStack justifyContent="flex-end">
                    <PaginationControls
                        page={page}
                        prevPage={housingUnitTypes?.prevPage ?? null}
                        nextPage={housingUnitTypes?.nextPage ?? null}
                        totalPages={housingUnitTypes?.totalPages ?? 0}
                        totalItems={housingUnitTypes?.totalItems ?? 0}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                        onPageChange={setPage}
                    />
                </HStack>
            </VStack>
        </div>
    )
}
