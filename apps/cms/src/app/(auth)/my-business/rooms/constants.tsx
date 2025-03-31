import { HousingUnitTypeFull } from '@booksuite/sdk'
import { Typography } from '@mui/material'
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
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        size: 200,
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
        id: 'weekdaysPrice',
        header: 'Dia de semana',

        accessorFn: (row) =>
            row.weekdaysPrice ? formatCurrency(row.weekdaysPrice) : '-',
    },
    {
        id: 'weekendPrice',
        header: 'Fim de semana',

        accessorFn: (row) =>
            row.weekendPrice ? formatCurrency(row.weekendPrice) : '-',
    },
    {
        id: 'maxGuests',
        header: 'Max. de hóspedes',

        accessorFn: (row) =>
            row.maxGuests
                ? `${row.maxGuests} ${pluralize('hóspede', row.maxGuests)}`
                : 'Sem limites',
    },
    {
        id: 'housingUnits',
        header: 'Unidades',

        accessorFn: (row) =>
            `${row.housingUnits.length} ${pluralize('unidade', row.housingUnits.length)}`,
    },
]
