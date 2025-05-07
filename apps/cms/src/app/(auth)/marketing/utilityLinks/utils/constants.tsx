import { theme } from '@/common/theme'
import { UtilityLinks } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import { MRT_ColumnDef } from 'material-react-table'

export const MAX_FEATURED_FACILITIES = 5

export const COLUMNS_DEFINITION: MRT_ColumnDef<UtilityLinks>[] = [
    {
        id: 'title',
        header: 'Titulo',
        accessorKey: 'title',
        size: 150,
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.title}
            </Typography>
        ),
    },

    {
        id: 'startDate',
        header: 'Inicio de Exibição',
        accessorKey: 'startDate',
        size: 200,
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.startDate
                    ? dayjs(row.original.startDate).format('DD/MM/YYYY')
                    : '---'}
            </Typography>
        ),
    },

    {
        id: 'endDate',
        header: 'Fim de Exibição',
        accessorKey: 'endDate',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.endDate
                    ? dayjs(row.original.endDate).format('DD/MM/YYYY')
                    : '---'}
            </Typography>
        ),
    },

    {
        id: 'published',
        header: 'Visibilidade',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'left',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '14px',
                    marginLeft: '10px',
                    color: row.original.published
                        ? theme.palette.success.main
                        : theme.palette.blueGrey[700],
                }}
            >
                {row.original.published ? 'Publicado' : 'Não publicado'}
            </Typography>
        ),
    },
]
