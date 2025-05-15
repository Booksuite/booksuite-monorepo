import { Box } from '@mui/material'

import { LogoIcon } from './LogoIcon'
import { LogoText } from './LogoText'
import { LogoIconDark } from './LogoIconDark'
import { LogoTextDark } from './LogoTextDark'

export const Logo = {
    LogoText: LogoText,
    LogoIcon: LogoIcon,
    LogoIconDark: LogoIconDark,
    LogoTextDark: LogoTextDark,
    FullLogo: () => (
        <Box display="flex" alignItems="center" gap={2}>
            <LogoIcon />
            <LogoText />
        </Box>
    ),
    FullLogoDark: () => (
        <Box display="flex" alignItems="center" gap={2}>
            <LogoIconDark />
            <LogoTextDark />
        </Box>
    ),
}
