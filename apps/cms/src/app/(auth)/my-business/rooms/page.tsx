'use client'

import { HousingUnitTypeFull, useSearchHousingUnitTypes } from '@booksuite/sdk'
import { Box, Image, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { LinkButton } from '@/components/atoms/LinkButton'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { PageHeader } from '@/components/organisms/PageHeader'

import { formatCurrency } from '@/common/utils/currency'
import {
    getTableCellSkeleton,
    getTableHeaderCellProps,
    getTableProps,
} from '@/common/utils/table'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import pluralize from 'pluralize'

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
                borderRadius="lg"
                width="72px"
                height="72px"
            />
        ),
    },
    {
        header: 'Nome',
        accessorKey: 'name',
        cell: ({ row }) => (
            <Text fontWeight="bold" fontSize="md">
                {row.original.name}
            </Text>
        ),
    },
    {
        header: 'Dia de semana',
        accessorFn: (row) =>
            row.weekdaysPrice ? formatCurrency(row.weekdaysPrice) : '-',
    },
    {
        header: 'Fim de semana',
        accessorFn: (row) =>
            row.weekendPrice ? formatCurrency(row.weekendPrice) : '-',
    },
    {
        header: 'Max. de hóspedes',
        accessorFn: (row) =>
            row.maxGuests
                ? `${row.maxGuests} ${pluralize('hóspede', row.maxGuests)}`
                : 'Sem limites',
    },
    {
        header: 'Unidade',
        accessorFn: (row) =>
            `${row.housingUnits.length} ${pluralize('unidade', row.housingUnits.length)}`,
    },
]

export default function Rooms() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
    const itemsPerPage = searchParams.get('itemsPerPage')
        ? Number(searchParams.get('itemsPerPage'))
        : 10

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading } = useSearchHousingUnitTypes(
        { companyId },
        {
            pagination: { page, itemsPerPage },
            filter:
                selectedFilters.length > 0
                    ? {
                          published: selectedFilters.includes('published'),
                      }
                    : undefined,
        },
    )

    const table = useReactTable({
        data: housingUnitTypes?.items ?? [],
        columns: columnsDefinition,
        getCoreRowModel: getCoreRowModel(),
    })

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

            <Box>
                <ChipFilter
                    items={chipItems}
                    value={selectedFilters}
                    onChange={setSelectedFilters}
                />

                <Table {...getTableProps()}>
                    <Thead>
                        <Tr>
                            {table.getFlatHeaders().map((header) => (
                                <Th
                                    key={header.id}
                                    {...getTableHeaderCellProps(header)}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    {isLoading
                        ? Array.from({ length: 4 }).map(() => (
                              <Tr>
                                  {table.getFlatHeaders().map((header) => (
                                      <Th
                                          key={header.id}
                                          className={
                                              header.column.id === 'drag-handle'
                                                  ? 'drag-handle'
                                                  : ''
                                          }
                                      >
                                          {getTableCellSkeleton(header)}
                                      </Th>
                                  ))}
                              </Tr>
                          ))
                        : table.getRowModel().rows.map((row) => (
                              <Tr key={row.original.id}>
                                  {row.getVisibleCells().map((cell) => (
                                      <Td key={cell.id}>
                                          {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext(),
                                          )}
                                      </Td>
                                  ))}
                              </Tr>
                          ))}
                </Table>
            </Box>
        </div>
    )
}
