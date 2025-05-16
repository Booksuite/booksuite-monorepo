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
import { useDashboardSidebarStore } from '../../stores/dashboardSidebar'

import type { DashboardHeaderProps } from './types'

export const DashboardHeader = ({ userImageSrc }: DashboardHeaderProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { toggleIsOpen } = useDashboardSidebarStore()

    return (
        <AppBar
            position="static"
            elevation={1}
            sx={{
                bgcolor: 'background.paper',
                color: 'blue.900',
                boxShadow: '0 0 3px 0 rgba(0, 0, 0, .2)',
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={() => toggleIsOpen()}
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
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search
                                            color={theme.palette.blue[900]}
                                            size={20}
                                        />
                                    </InputAdornment>
                                ),
                            },
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
