import { Alert, AlertIcon, AlertTitle, Td, Th, Tr } from '@chakra-ui/react'
import { flexRender, RowData,Table as ReactTable } from '@tanstack/react-table'

import { getTableCellSkeleton, getTableColumnType } from '../../utils'

export interface TableRowsProps<T extends RowData> {
    isLoading?: boolean
    table: ReactTable<T>
    emptyMessage?: string
}

export const TableRows = <T extends RowData>({
    isLoading,
    table,
    emptyMessage,
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
        <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
                <Td
                    key={cell.id}
                    className={getTableColumnType(cell)}
                    color="#486581"
                    fontSize="sm"
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
            ))}
        </Tr>
    ))
}
