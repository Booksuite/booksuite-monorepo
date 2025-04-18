import { Box } from '@mui/material'

import { LogoIcon } from './LogoIcon'
import { LogoText } from './LogoText'

export const Logo = {
    LogoText: LogoText,
    LogoIcon: LogoIcon,

    FullLogo: () => (
        <Box display="flex" alignItems="center" gap={2}>
            <LogoIcon />
            <LogoText />
        </Box>
    ),
}
