import { UtilityLinks } from '@booksuite/sdk'
import { Typography } from '@mui/material'
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
                    ? new Date(row.original.startDate).toLocaleDateString(
                          'pt-BR',
                      )
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
                    ? new Date(row.original.endDate).toLocaleDateString('pt-BR')
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
                    color: row.original.published ? '#1D7F52' : '#6B7279',
                }}
            >
                {row.original.published ? 'Publicado' : 'Não publicado'}
            </Typography>
        ),
    },
]
