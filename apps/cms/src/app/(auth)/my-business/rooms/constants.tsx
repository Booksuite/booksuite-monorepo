import { HousingUnitTypeFull } from '@booksuite/sdk'
import { Box, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import pluralize from 'pluralize'

import { formatCurrency } from '@/common/utils/currency'
import { Image } from '@/components/atoms/Image'

export const MAX_FEATURED_FACILITIES = 5

export const COLUMNS_DEFINITION: MRT_ColumnDef<HousingUnitTypeFull>[] = [
    {
        id: 'image',
        header: '',
        size: 85,
        Cell: ({ row }) => (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Image
                    src={row.original.medias[0]?.media.url}
                    alt={row.original.name}
                    sx={{
                        objectFit: 'cover',
                        borderRadius: 2,
                        width: '72px',
                        height: '72px',
                    }}
                />
            </Box>
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
        enableSorting: true,
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
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        id: 'weekdaysPrice',
        header: 'Dia de semana',
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
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.weekdaysPrice
                    ? formatCurrency(row.original.weekdaysPrice)
                    : '-'}
            </Typography>
        ),
    },
    {
        id: 'weekendPrice',
        header: 'Fim de semana',
        muiTableHeadCellProps: {
            sx: {
                textAlign: 'right',
                border: 'none',
                fontWeight: 'medium',
            },
        },
        Cell: ({ row }) => (
            <Typography
                sx={{
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.weekendPrice
                    ? formatCurrency(row.original.weekendPrice)
                    : '-'}
            </Typography>
        ),
    },
    {
        id: 'maxGuests',
        header: 'Max. de hóspedes',
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
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.maxGuests
                    ? `${row.original.maxGuests} ${pluralize('hóspede', row.original.maxGuests)}`
                    : 'Sem limites'}
            </Typography>
        ),
    },
    {
        id: 'housingUnits',
        header: 'Unidades',
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
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.housingUnits.length
                    ? `${row.original.housingUnits.length} ${pluralize('unidade', row.original.housingUnits.length)}`
                    : 'Sem unidades'}
            </Typography>
        ),
    },
    {
        id: 'published',
        header: 'Status',
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
                    textAlign: 'left',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
            >
                {row.original.published ? 'Publicado' : 'Não publicado'}
            </Typography>
        ),
    },
]
