import { useTheme } from '@mui/material'
import {
    MaterialReactTable,
    MaterialReactTableProps,
    MRT_RowData,
} from 'material-react-table'
type TableProps<T extends MRT_RowData> = MaterialReactTableProps<T> & {
    onRowClick?: (item: T) => void
}

export const Table = <T extends MRT_RowData>({
    onRowClick,
    ...props
}: TableProps<T>) => {
    const theme = useTheme()

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
                                backgroundColor: '#F0F2F8',
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
                                      backgroundColor: '#ecefF4',
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
                    color: '#486581',
                },
            }}
            muiTableHeadCellProps={{
                sx: {
                    color: '#486581',
                    fontWeight: 'normal',
                    border: 'none',
                },
            }}
            muiTablePaperProps={{
                elevation: 0,
                sx: { boxShadow: 'none' },
            }}
            {...props}
        />
    )
}
