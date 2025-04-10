import { BannerFull, BannerPosition } from '@booksuite/sdk'
import { Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'

import { themeOptions } from '@/common/theme'

export const BannerPositionMap: Record<BannerPosition, string> = {
    HOME_TOP: 'Topo da página',
    FEATURED_CONTENT: 'Banner Fixado',
}

export const COLUMNS_DEFINITION: MRT_ColumnDef<BannerFull>[] = [
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
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
        id: 'bannerPosition',
        header: 'Posição do Banner',
        accessorKey: 'bannerPosition',
        accessorFn: (row) => BannerPositionMap[row.position],
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
