import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import {
    Bell,
    ChevronDown,
    ExternalLink,
    Menu as MenuIcon,
    Search,
} from 'lucide-react'
import { useState } from 'react'

import { Logo } from '@/components/atoms/Logo'

import type { DashboardHeaderProps } from './types'

export const DashboardHeader = ({
    onToggleSidebar,
    userImageSrc,
}: DashboardHeaderProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    if (isMobile) {
        return (
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        onClick={onToggleSidebar}
                        edge="start"
                        sx={{
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                        }}
                    >
                        <MenuIcon size={24} />
                    </IconButton>

                    <Box
                        sx={{
                            fontSize: '2xl',
                            fontWeight: 'regular',
                            color: 'white',
                        }}
                    >
                        <Logo.LogoText />
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <IconButton
                            color="inherit"
                            sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            <Bell size={24} />
                        </IconButton>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'primary.900',
                                color: 'white',
                            }}
                            src={userImageSrc}
                        />
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                        onClick={onToggleSidebar}
                        edge="start"
                        size="medium"
                    >
                        <MenuIcon size={24} />
                    </IconButton>
                    <TextField
                        placeholder="Pesquisar"
                        size="small"
                        sx={{ maxWidth: '400px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="gray" size={20} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                        endIcon={<ChevronDown size={20} />}
                        onClick={handleClick}
                        variant="text"
                        disableRipple
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            BookSuite Admin
                        </Typography>
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        <MenuItem onClick={handleClose}>Sair</MenuItem>
                    </Menu>

                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.900',
                            color: 'white',
                        }}
                        src={userImageSrc}
                    />

                    <IconButton size="medium">
                        <ExternalLink size={20} />
                    </IconButton>

                    <IconButton size="medium">
                        <Bell size={20} />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
