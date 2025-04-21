import {
    Avatar,
    Box,
    Button,
    Drawer,
    IconButton,
    Stack,
    styled,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import {
    Bell,
    Building2,
    Home,
    Map,
    Megaphone,
    Settings,
    X,
} from 'lucide-react'
import type React from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/user'
import { Logo } from '@/components/atoms/Logo'

import { NavMenu } from './components/NavMenu'
import type { LinkItem } from './components/NavMenu/types'
import type { DashboardSidebarProps } from './types'

const StyledBox = styled(Box)(({ theme }) => ({
    background: theme.palette.blue[900],
    color: 'white',
    transition: 'width 0.3s',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '100vh',
}))

const CollapseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
    borderRadius: '50%',
}))

const BusinessSelectorButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1.5),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    borderRadius: theme.shape.borderRadius,
}))

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    isOpen,
    onClose,
    userImageSrc,
    isCollapsed,
    onToggleCollapse,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { company } = useCurrentCompanyStore()

    const mainLinks: LinkItem[] = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/map', label: 'Mapa', icon: Map },
        { href: '/my-business', label: 'Meu negócio', icon: Building2 },
        { href: '/marketing', label: 'Marketing', icon: Megaphone },
        { href: '/settings', label: 'Configurações', icon: Settings },
    ]

    const BusinessSelector = (
        <BusinessSelectorButton
            variant="text"
            disableRipple
            sx={{
                justifyContent: isCollapsed ? 'center' : 'space-between',
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                    src={company?.logo || ''}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'white',
                    }}
                />
                {!isCollapsed && (
                    <Typography variant="body1" fontWeight="medium" noWrap>
                        {company?.name || 'Empresa'}
                    </Typography>
                )}
            </Stack>
        </BusinessSelectorButton>
    )

    const SidebarContent = (
        <Stack
            spacing={7}
            sx={{
                height: '100vh',
                py: 3,
                px: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Stack px={3} py={10}>
                {!isCollapsed ? <Logo.FullLogo /> : <Logo.LogoIcon />}
            </Stack>

            <Stack alignItems="center">{BusinessSelector}</Stack>

            {!isCollapsed && (
                <Typography
                    variant="body2"
                    sx={{
                        color: '#B8B8CF',
                        fontWeight: 500,
                        px: 1,
                    }}
                >
                    Menu
                </Typography>
            )}

            <Stack
                sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
                <Box>
                    <NavMenu links={mainLinks} isCollapsed={isCollapsed} />
                </Box>
            </Stack>

            {!isMobile && onToggleCollapse && (
                <CollapseButton
                    size="small"
                    onClick={onToggleCollapse}
                    aria-label="Toggle sidebar"
                ></CollapseButton>
            )}
        </Stack>
    )

    if (isMobile) {
        return (
            <Drawer
                open={isOpen}
                onClose={onClose}
                anchor="left"
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.primary.dark,
                        color: 'white',
                        width: '100%',
                    },
                }}
            >
                <Stack
                    sx={{
                        height: '100%',
                        py: 3,
                        px: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 3 }}
                    >
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <X />
                        </IconButton>

                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                            <Logo.LogoText />
                        </Box>

                        <Stack direction="row" spacing={1}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                <Bell size={24} />
                            </IconButton>
                            <Avatar
                                src={userImageSrc}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: theme.palette.primary.dark,
                                }}
                            />
                        </Stack>
                    </Stack>

                    {BusinessSelector}

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#B8B8CF',
                            fontWeight: 500,
                            px: 1,
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Menu
                    </Typography>

                    <Stack
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box>
                            <NavMenu links={mainLinks} isCollapsed={false} />
                        </Box>
                    </Stack>
                </Stack>
            </Drawer>
        )
    }

    return (
        <StyledBox width={isCollapsed ? 80 : 280}>{SidebarContent}</StyledBox>
    )
}
