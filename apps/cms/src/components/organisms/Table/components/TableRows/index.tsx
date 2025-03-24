import { Alert, AlertIcon, AlertTitle, Td, Th, Tr } from '@chakra-ui/react'
import { flexRender, Table as ReactTable, RowData } from '@tanstack/react-table'

import { getTableCellSkeleton, getTableColumnType } from '../../utils'

export interface TableRowsProps<T extends RowData> {
    isLoading?: boolean
    table: ReactTable<T>
    emptyMessage?: string
    onRowClick?: (row: T) => void
}

export const TableRows = <T extends RowData>({
    isLoading,
    table,
    emptyMessage,
    onRowClick,
}: TableRowsProps<T>) => {
    if (isLoading)
        return Array.from({ length: 2 }).map((_, index) => (
            <Tr key={index}>
                {table.getFlatHeaders().map((header) => (
                    <Th key={header.id} className={getTableColumnType(header)}>
                        {getTableCellSkeleton(header)}
                    </Th>
                ))}
            </Tr>
        ))

    if (table.getRowCount() <= 0)
        return (
            <Tr>
                <Td
                    colSpan={table.getFlatHeaders().length}
                    bg="transparent !important"
                    border="none"
                >
                    <Alert status="warning" borderRadius="8px">
                        <AlertIcon />
                        <AlertTitle>{emptyMessage}</AlertTitle>
                    </Alert>
                </Td>
            </Tr>
        )

    return table.getRowModel().rows.map((row) => (
        <Tr
            key={row.id}
            cursor={onRowClick ? 'pointer' : 'default'}
            _hover={{
                '& td:not(.drag-handle)': {
                    backgroundColor: onRowClick
                        ? 'gray.200 !important'
                        : 'transparent',
                },
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <Td
                    transition="background-color 0.2s ease-in-out"
                    key={cell.id}
                    className={getTableColumnType(cell)}
                    color="#486581"
                    fontSize="sm"
                    onClick={() => {
                        if (getTableColumnType(cell) === 'actions') return
                        onRowClick?.(row.original)
                    }}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
            ))}
        </Tr>
    ))
}
