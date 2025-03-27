'use client'

import {
    ServiceFull,
    ServiceOrderByDTOOrderBy,
    useSearchServices,
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
import { debounce } from 'radash'
import { useEffect, useRef, useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useSearchParamsOrder } from '@/common/hooks/useOrder'
import { useSearchParamsPagination } from '@/common/hooks/usePagination'
import { formatCurrency } from '@/common/utils/currency'
import { LinkButton } from '@/components/atoms/LinkButton'
import { PaginationControls } from '@/components/molecules/PaginationControl'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Table } from '@/components/organisms/Table'

const chipItems = [
    { key: 'published', label: 'Publicadas' },
    { key: 'unpublished', label: 'Não publicadas' },
]

const columnsDefinition: ColumnDef<ServiceFull>[] = [
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
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { orderBy, orderDirection, setOrder } =
        useSearchParamsOrder<ServiceOrderByDTOOrderBy>({
            defaultOrder: 'name',
            currentPath: '/my-business/services',
        })

    const handleRowClick = (row: ServiceFull) => {
        push(`/my-business/services/${row.id}`)
    }

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

    const table = useReactTable({
        data: services?.items ?? [],
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

    return (
        <div className="Services">
            <PageHeader
                title="Serviços"
                backLButtonLabel="Meu Negócio"
                backButtonHref="/my-business"
                headerRight={
                    <LinkButton
                        href="/my-business/services/create"
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
                    table={table}
                    error={error}
                    isLoading={isLoading}
                    onRowClick={handleRowClick}
                />

                <HStack justifyContent="flex-end">
                    <PaginationControls
                        page={page}
                        prevPage={services?.prevPage ?? null}
                        nextPage={services?.nextPage ?? null}
                        totalPages={services?.totalPages ?? 0}
                        totalItems={services?.totalItems ?? 0}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                        onPageChange={setPage}
                    />
                </HStack>
            </VStack>
        </div>
    )
}
