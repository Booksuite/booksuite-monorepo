import { Banner, BannerMedia, BannerPosition } from '@booksuite/sdk'
import { Box, Typography } from '@mui/material'
import { ImageOff } from 'lucide-react'
import { MRT_ColumnDef } from 'material-react-table'

import { themeOptions } from '@/common/theme'

export const BANNER_POSITION_OPTIONS = [
    { value: 'FEATURED_CONTENT', label: 'Banner Fixado' },
    { value: 'HOME_TOP', label: 'Topo da página' },
]

export const ACTION_BUTTON_OPTIONS = [
    { value: 'NONE', label: 'Nenhuma ação' },
    { value: 'SMART_SEARCH', label: 'Busca inteligente' },
    { value: 'CUSTOM', label: 'Ação personalizada' },
    { value: 'SEND_TO_WHATSAPP', label: 'Enviar para WhatsApp' },
]

export const BannerPositionMap: Record<BannerPosition, string> = {
    HOME_TOP: 'Topo da página',
    FEATURED_CONTENT: 'Banner Fixado',
}

type BannerWithMedias = Banner & { medias?: BannerMedia[] }

export const COLUMNS_DEFINITION: MRT_ColumnDef<BannerWithMedias>[] = [
    {
        id: 'image',
        header: '',
        size: 85,
        Cell: ({ row }) => {
            const imageUrl = row.original.medias?.[0]?.media?.url

            return imageUrl ? (
                <Box
                    component="img"
                    src={imageUrl}
                    alt={row.original.name}
                    sx={{
                        objectFit: 'cover',
                        borderRadius: 1,
                        width: '80px',
                        height: '80px',
                        backgroundColor: (theme) => theme.palette.grey[100],
                    }}
                />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '72px',
                        height: '40px',
                        borderRadius: 1,
                        backgroundColor: (theme) => theme.palette.grey[100],
                    }}
                >
                    <ImageOff size={20} color="#9E9E9E" />
                </Box>
            )
        },
    },
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
