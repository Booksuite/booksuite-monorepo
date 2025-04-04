import { BillingType, ReservationOptionFull } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'

import { BILLING_TYPE_RESERVATION_OPTION_MAPPING } from '@/common/constants/billingType'
import { themeOptions } from '@/common/theme'

export const MAX_FEATURED_FACILITIES = 5

export const billingTypes: BillingType[] = [
    'PER_GUEST_DAILY',
    'PER_GUEST',
    'DAILY',
    'PER_RESERVATION',
    'PER_HOUSING_UNIT',
]

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
                    color: themeOptions.palette?.blueGrey?.[700],
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'billingType',
        header: 'Tipo de Cobrança',

        Cell: ({ row }) => (
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: '#486581',
                    fontWeight: '400'
                }}
            >
                {BILLING_TYPE_RESERVATION_OPTION_MAPPING[
                    row.original.billingType
                ] || ''}
            </Typography>
        ),
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
