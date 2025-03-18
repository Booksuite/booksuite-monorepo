import {
    Button,
    Table as ChakraTable,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import {
    flexRender,
    type Table as ReactTable,
    type RowData,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo } from 'react'

import {
    getTableCellSkeleton,
    getTableColumnType,
    getTableHeaderCellProps,
    getTableProps,
} from './utils'

interface TableProps<T extends RowData> {
    table: ReactTable<T>
    isLoading?: boolean
}

export const Table = <T extends RowData>({
    table,
    isLoading,
}: TableProps<T>) => {
    const withDragHandle = useMemo(
        () =>
            table
                .getFlatHeaders()
                .some((header) => getTableColumnType(header) === 'drag-handle'),
        [table],
    )

    return (
        <ChakraTable {...getTableProps(withDragHandle)}>
            <Thead>
                <Tr>
                    {table.getFlatHeaders().map((header) => {
                        const isSorted =
                            table.getState().sorting[0]?.id === header.column.id
                        const orderDirectionDesc =
                            table.getState().sorting[0]?.desc ?? false

                        return (
                            <Th
                                key={header.id}
                                className={getTableColumnType(header)}
                                {...getTableHeaderCellProps(header)}
                            >
                                {header.column.columnDef.enableSorting ? (
                                    <Button
                                        variant="link"
                                        onClick={header.column.getToggleSortingHandler()}
                                        rightIcon={
                                            isSorted ? (
                                                orderDirectionDesc ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronUp size={16} />
                                                )
                                            ) : undefined
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </Button>
                                ) : (
                                    <Text color="gray.500">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Text>
                                )}
                            </Th>
                        )
                    })}
                </Tr>
            </Thead>
            {isLoading
                ? Array.from({ length: 2 }).map((_, index) => (
                      <Tr key={index}>
                          {table.getFlatHeaders().map((header) => (
                              <Th
                                  key={header.id}
                                  className={getTableColumnType(header)}
                              >
                                  {getTableCellSkeleton(header)}
                              </Th>
                          ))}
                      </Tr>
                  ))
                : table.getRowModel().rows.map((row) => (
                      <Tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                              <Td
                                  key={cell.id}
                                  className={getTableColumnType(cell)}
                              >
                                  {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                  )}
                              </Td>
                          ))}
                      </Tr>
                  ))}
        </ChakraTable>
    )
}
