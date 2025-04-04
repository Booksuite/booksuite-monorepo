import { ReservationOptionFull } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { formatCurrency } from '@/common/utils/currency'

export const MAX_FEATURED_FACILITIES = 5

export const COLUMNS_DEFINITION: MRT_ColumnDef<ReservationOptionFull>[] = [
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#486581',
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'price',
        header: 'Preço',

        accessorFn: (row) =>
            row.additionalAdultPrice
                ? formatCurrency(row.additionalAdultPrice)
                : '-',
    },
    {
        id: 'billingType',
        header: 'Tipo de Cobrança',

        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#486581',
                }}
            >
                {BILLING_TYPE_MAPPING[row.original.billingType] || ''}
            </Typography>
        ),
    },

    {
        id: 'published',
        header: 'Status',
        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#486581',
                }}
            >
                {row.original.published ? 'Ativo' : 'Inativo'}
            </Typography>
        ),
    },
]
