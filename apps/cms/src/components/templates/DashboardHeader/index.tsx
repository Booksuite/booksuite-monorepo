import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { Bell, ExternalLink, Menu as MenuIcon, Search } from 'lucide-react'

import { Logo } from '@/components/atoms/Logo'

import type { DashboardHeaderProps } from './types'

export const DashboardHeader = ({
    onToggleSidebar,
    userImageSrc,
}: DashboardHeaderProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <AppBar
            position="static"
            elevation={1}
            sx={{
                bgcolor: 'background.paper',
                color: 'blue.900',
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={onToggleSidebar}
                    edge="start"
                    sx={{
                        marginLeft: 2,
                        color: 'blue.900',
                        marginRight: 2,
                        ...(isMobile && {
                            display: 'none',
                        }),
                    }}
                >
                    <MenuIcon size={24} />
                </IconButton>

                {isMobile && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Logo.LogoText />
                    </Box>
                )}

                {!isMobile && (
                    <TextField
                        variant="outlined"
                        placeholder="Pesquisar"
                        size="small"
                        sx={{
                            maxWidth: '400px',
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'background.default',
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'blue.900',
                                opacity: 0.7,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search
                                        color={theme.palette.blue[900]}
                                        size={20}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={4}>
                    <Typography variant="body1" fontWeight="medium">
                        Admin Booksuite
                    </Typography>

                    <Avatar
                        src={userImageSrc}
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: theme.palette.primary.main,
                        }}
                    />

                    <IconButton size="small" color="inherit">
                        <ExternalLink size={20} />
                    </IconButton>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton size="small" color="inherit">
                            <Bell size={20} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
