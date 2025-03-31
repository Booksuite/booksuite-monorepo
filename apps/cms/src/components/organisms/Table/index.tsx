import { Alert, useTheme } from '@mui/material'
import {
    MaterialReactTable,
    MaterialReactTableProps,
    MRT_RowData,
} from 'material-react-table'

import { getErrorMessage } from '@/common/utils'
type TableProps<T extends MRT_RowData> = MaterialReactTableProps<T> & {
    onRowClick?: (item: T) => void
    error?: unknown
    noDataMessage?: string
}

export const Table = <T extends MRT_RowData>({
    onRowClick,
    error,
    noDataMessage = 'Nenhum registro encontrado',
    ...props
}: TableProps<T>) => {
    const theme = useTheme()

    return (
        <>
            {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <MaterialReactTable<T>
                enableBottomToolbar={false}
                enableTopToolbar={false}
                enableColumnActions={false}
                positionActionsColumn="last"
                defaultColumn={{
                    size: 40,
                    enableSorting: false,
                    ...props.defaultColumn,
                }}
                displayColumnDefOptions={{
                    'mrt-row-actions': { header: '' },
                    'mrt-row-drag': { header: '' },
                }}
                muiTableProps={{
                    sx: {
                        borderCollapse: 'separate',
                        borderSpacing: `0 ${theme.spacing(2)}`,
                    },
                    ...props.muiTableProps,
                }}
                muiTableHeadRowProps={{
                    sx: {
                        boxShadow: '0',
                    },
                }}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                        onRowClick?.(row.original)
                    },
                    sx: {
                        backgroundColor: 'transparent',
                        '& td': {
                            border: 'none',
                            padding: theme.spacing(2),
                            [`&${props.enableRowDragging ? ':not(:first-child)' : ''}`]:
                                {
                                    backgroundColor: 'blueGrey.50',
                                    [`&:nth-child(${props.enableRowDragging ? '2' : '1'})`]:
                                        {
                                            borderTopLeftRadius: '16px',
                                            borderBottomLeftRadius: '16px',
                                        },
                                    '&:last-child': {
                                        borderTopRightRadius: '16px',
                                        borderBottomRightRadius: '16px',
                                    },
                                },
                        },
                        ...(onRowClick
                            ? {
                                  cursor: 'pointer',
                                  [`&:hover td${props.enableRowDragging ? ':not(:first-child)' : ''}`]:
                                      {
                                          backgroundColor: 'blueGrey.100',
                                      },
                              }
                            : {}),
                        '&:hover td:after': {
                            backgroundColor: 'transparent',
                        },
                    },
                })}
                muiTableBodyCellProps={{
                    sx: {
                        color: 'blueGrey.600',
                    },
                }}
                muiTableHeadCellProps={{
                    sx: {
                        color: 'blueGrey.600',
                        fontWeight: 'normal',
                        border: 'none',
                    },
                }}
                muiTablePaperProps={{
                    elevation: 0,
                    sx: { boxShadow: 'none' },
                }}
                muiSkeletonProps={({ column }) => ({
                    animation: 'wave',
                    sx: {
                        ...(column.id === 'image'
                            ? {
                                  transform: 'none',
                              }
                            : {}),
                    },
                    ...(column.id === 'image'
                        ? {
                              width: '72px',
                              height: '72px',
                          }
                        : {}),
                })}
                renderEmptyRowsFallback={() => (
                    <Alert severity="info">{noDataMessage}</Alert>
                )}
                {...props}
                state={{
                    showLoadingOverlay: false,
                    ...props.state,
                }}
            />
        </>
    )
}
