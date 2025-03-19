import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Table as ChakraTable,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { flexRender, type RowData } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo } from 'react'

import { getErrorMessage } from '@/common/utils'

import { TableRows, TableRowsProps } from './components/TableRows'
import {
    getTableColumnType,
    getTableHeaderCellProps,
    getTableProps,
} from './utils'

interface TableProps<T extends RowData> extends TableRowsProps<T> {
    error?: unknown
    errorTitle?: string
    errorFallbackMessage?: string
}

export const Table = <T extends RowData>({
    table,
    error,
    isLoading,
    errorFallbackMessage = 'Erro desconhecido',
    errorTitle = 'Erro ao carregar tabela',
    emptyMessage = 'Nenhum resultado encontrado',
    ...props
}: TableProps<T>) => {
    const withDragHandle = useMemo(
        () =>
            table
                .getFlatHeaders()
                .some((header) => getTableColumnType(header) === 'drag-handle'),
        [table],
    )

    return (
        <>
            <ChakraTable {...getTableProps(withDragHandle)}>
                <Thead>
                    <Tr>
                        {table.getFlatHeaders().map((header) => {
                            const isSorted =
                                table.getState().sorting[0]?.id ===
                                header.column.id
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
                                                        <ChevronDown
                                                            size={16}
                                                        />
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

                {!error && (
                    <TableRows
                        isLoading={isLoading}
                        table={table}
                        emptyMessage={emptyMessage}
                        {...props}
                    />
                )}
            </ChakraTable>

            {!!error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errorTitle}</AlertTitle>
                    <AlertDescription>
                        {getErrorMessage(error, errorFallbackMessage)}
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}
