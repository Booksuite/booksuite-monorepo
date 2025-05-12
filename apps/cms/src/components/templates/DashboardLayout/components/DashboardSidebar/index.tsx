import {
    Avatar,
    Box,
    Button,
    Drawer,
    Stack,
    styled,
    Typography,
    useTheme,
} from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type React from 'react'

import { useCurrentCompanyStore } from '@/common/contexts/user'
import { Logo } from '@/components/atoms/Logo'
import { DRAWER_WIDTH, MAIN_MENU_ITEMS } from '../../constants'
import { useDashboardSidebarStore } from '../../stores/dashboardSidebar'
import { NavLink } from '../NavLink'

const BusinessSelectorButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    borderRadius: theme.shape.borderRadius,
}))

export const DashboardSidebar: React.FC = () => {
    const pathname = usePathname()
    const theme = useTheme()

    const { company } = useCurrentCompanyStore()

    const { isOpen, setIsOpen } = useDashboardSidebarStore()

    return (
        <Drawer
            open={isOpen}
            variant="persistent"
            onClose={() => setIsOpen(false)}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: theme.palette.primary.dark,
                        color: 'white',
                        width: DRAWER_WIDTH,
                    },
                },
            }}
        >
            <Stack sx={{ px: 2.5, pt: 6.25, pb: 2.5, gap: 3 }}>
                <Box sx={{ flex: 1, textAlign: 'flex-start' }}>
                    <Logo.FullLogo />
                </Box>

                <BusinessSelectorButton fullWidth>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            flex: 1,
                            minWidth: 0, // Allows Stack to shrink below content size
                        }}
                    >
                        <Avatar
                            src={company?.logo || ''}
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'white',
                                flexShrink: 0, // Prevents Avatar from shrinking
                            }}
                        />
                        <Box
                            sx={{
                                flexGrow: 1,
                                minWidth: 0,
                                overflow: 'hidden',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: 'left',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {company?.name || 'Empresa'}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ flexShrink: 0, mt: 2 }}>
                        <ChevronDown size={16} />
                    </Box>
                </BusinessSelectorButton>

                <Typography
                    variant="body2"
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                    }}
                >
                    Menu
                </Typography>

                <Stack>
                    {MAIN_MENU_ITEMS.map((link) => {
                        const isHome = link.href === '/'
                        const isActive = isHome
                            ? pathname === link.href
                            : pathname.startsWith(link.href)
                        return (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                isActive={isActive}
                                icon={link.icon}
                                label={link.label}
                            />
                        )
                    })}
                </Stack>
            </Stack>
        </Drawer>
    )
}
