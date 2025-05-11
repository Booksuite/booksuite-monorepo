import { BillingType, RateOptionFull } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { theme } from '@/common/theme'

export const MAX_FEATURED_FACILITIES = 5

export const billingTypes: BillingType[] = [
    'PER_GUEST_DAILY',
    'PER_GUEST',
    'DAILY',
    'PER_RESERVATION',
    'PER_HOUSING_UNIT',
]

export const COLUMNS_DEFINITION: MRT_ColumnDef<RateOptionFull>[] = [
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
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
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'billingType',
        header: 'Tipo de Cobrança',
        accessorKey: 'billingType',
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
                    fontWeight: '400',
                }}
            >
                {BILLING_TYPE_MAPPING[row.original.billingType] || ''}
            </Typography>
        ),
    },

    {
        id: 'published',
        header: 'Visibilidade',
        accessorKey: 'published',
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
                    fontWeight: '500',
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
