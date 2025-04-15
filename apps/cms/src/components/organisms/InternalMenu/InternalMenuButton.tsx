import { Stack, Box } from '@mui/material'
import { ChevronRight } from 'lucide-react'
import type { Route } from 'next'
import NextLink, { LinkProps } from 'next/link'

interface InternalMenuButtonProps extends LinkProps<Route> {
    icon: React.ReactNode
    title: string
}

export const InternalMenuButton: React.FC<InternalMenuButtonProps> = ({
    icon,
    title,
    ...props
}) => {
    return (
        <NextLink
            {...props}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    bgcolor: 'grey.100',
                    px: 3,
                    py: 4,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    isolation: 'isolate',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '200%',
                        height: '100%',
                        background:
                            'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
                        transition: 'transform 0.6s ease',
                        zIndex: -1,
                    },
                    '&:hover': {
                        '&::before': {
                            transform: 'translateX(100%)',
                        },
                    },
                }}
            >
                <Stack
                    direction="row"
                    gap={2}
                    alignItems="center"
                    sx={{ zIndex: 1 }}
                >
                    {icon}
                    {title}
                </Stack>

                <ChevronRight style={{ zIndex: 1 }} />
            </Box>
        </NextLink>
    )
}
