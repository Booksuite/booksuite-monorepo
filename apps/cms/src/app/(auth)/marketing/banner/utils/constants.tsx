import { Banner, BannerMedia, BannerPosition } from '@booksuite/sdk'
import { Box, Typography } from '@mui/material'
import { ImageOff } from 'lucide-react'
import { MRT_ColumnDef } from 'material-react-table'

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
        Cell: ({ row }) => (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                {row.original.medias?.[0]?.media.url ? (
                    <Box
                        component="img"
                        src={row.original.medias[0].media.url}
                        alt={row.original.name}
                        sx={{
                            objectFit: 'cover',
                            borderRadius: 2,
                            width: '72px',
                            height: '72px',
                        }}
                    />
                ) : (
                    <ImageOff size={72} />
                )}
            </Box>
        ),
    },
    {
        id: 'name',
        header: 'Nome',
        accessorKey: 'name',
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
                {row.original.name}
            </Typography>
        ),
    },

    {
        id: 'bannerPosition',
        header: 'Posição do Banner',
        accessorKey: 'bannerPosition',
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
                {BannerPositionMap[row.original.position]}
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
