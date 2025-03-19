import {
    Skeleton,
    SkeletonText,
    TableCellProps,
    TableColumnHeaderProps,
    TableProps,
} from '@chakra-ui/react'
import { Cell, Header, RowData } from '@tanstack/react-table'

export function getTableColumnType<T extends RowData>(
    data: Header<T, unknown> | Cell<T, unknown>,
): string {
    return (data.column.columnDef.meta?.type || data.column.id) as string
}

export function getTableProps(withDragHandle = false): TableProps {
    return {
        css: {
            borderCollapse: 'separate',
            borderSpacing: '0 16px',
            '& thead': {
                '& th': {
                    padding: 12,
                    '&.drag-handle': {
                        width: '30px',
                        padding: 6,
                    },
                },
            },
            '& > tr': {
                '& td, & > th': {
                    border: 'none',
                    padding: 12,
                    '&:not(.drag-handle)': {
                        backgroundColor: '#F0F4F8',
                        [`&:nth-child(${withDragHandle ? '2' : '1'})`]: {
                            borderTopLeftRadius: '16px',
                            borderBottomLeftRadius: '16px',
                        },
                        '&:last-child': {
                            borderTopRightRadius: '16px',
                            borderBottomRightRadius: '16px',
                        },
                    },
                },
            },
        },
    }
}

export function getTableHeaderCellProps<T>(
    header: Header<T, unknown>,
): TableColumnHeaderProps {
    return {
        css: {
            width: header.column.getSize(),
        },
    }
}

export function getTableCellSkeleton<T extends RowData>(
    header: Header<T, unknown>,
): React.ReactNode {
    const type = getTableColumnType(header)

    switch (type) {
        case 'drag-handle':
            return null
        case 'image':
            return (
                <Skeleton h="72px" w="72px" noOfLines={1} borderRadius="lg" />
            )
        default:
            return <SkeletonText noOfLines={1} />
    }
}

export function getTableCellProps<T extends RowData>(
    cell: Cell<T, unknown>,
): TableCellProps {
    return {
        className: cell.column.id === 'drag-handle' ? 'drag-handle' : '',
    }
}
