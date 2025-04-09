import { UtilityLinks } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'

import { themeOptions } from '@/common/theme'

export const MAX_FEATURED_FACILITIES = 5

export const COLUMNS_DEFINITION: MRT_ColumnDef<UtilityLinks>[] = [
    {
        id: 'title',
        header: 'Titulo',
        accessorKey: 'title',
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: themeOptions.palette?.blueGrey?.[700],
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
        accessorFn: (row) =>
            row.startDate
                ? new Date(row.startDate).toLocaleDateString('pt-BR')
                : '---',
    },

    {
        id: 'endDate',
        header: 'Fim de Exibição',
        accessorKey: 'endDate',
        accessorFn: (row) =>
            row.endDate
                ? new Date(row.endDate).toLocaleDateString('pt-BR')
                : '---',
    },

    {
        id: 'published',
        header: 'Visibilidade',
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: '500',
                    fontSize: '1rem',
                    color: row.original.published ? '#1D7F52' : '#6B7279',
                }}
            >
                {row.original.published ? 'Publicado' : 'Não publicado'}
            </Typography>
        ),
    },
]
