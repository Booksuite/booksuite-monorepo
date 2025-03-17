import {
    Skeleton,
    SkeletonText,
    TableCellProps,
    TableColumnHeaderProps,
    TableProps,
} from '@chakra-ui/react'
import { Cell, Header } from '@tanstack/react-table'

export function getTableProps(withDragHandle = false): TableProps {
    return {
        css: {
            borderCollapse: 'separate',
            borderSpacing: '0 16px',
            '& thead': {
                '& th': {
                    padding: 12,
                },
            },
            '& > tr': {
                '& td, & th': {
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

export function getTableCellSkeleton<T>(
    header: Header<T, unknown>,
): React.ReactNode {
    switch (header.column.id) {
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

export function getTableCellProps<T>(cell: Cell<T, unknown>): TableCellProps {
    return {
        className: cell.column.id === 'drag-handle' ? 'drag-handle' : '',
    }
}
