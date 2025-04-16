import { Box, IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GalleryItem: React.FC<any> = ({ index, src, alt }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
                '& img': {
                    width: '100%',
                    height: 'auto',
                },
            }}
        >
            <img src={src} alt={alt} />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {index !== undefined && (
                    <Box
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: 'white',
                            px: 2,
                        }}
                    >
                        {index + 1}
                    </Box>
                )}

                <IconButton
                    aria-label="Opções"
                    size="small"
                    sx={{
                        bgcolor: 'white',
                        color: 'primary.dark',
                        borderBottomLeftRadius: 1,
                        '&:hover': {
                            bgcolor: 'white',
                        },
                    }}
                >
                    <MoreVert />
                </IconButton>
            </Box>
        </Box>
    )
}
