import { Flex } from '@chakra-ui/react'

import { LogoIcon } from './LogoIcon'
import { LogoText } from './LogoText'

export const Logo = {
    LogoText: LogoText,
    LogoIcon: LogoIcon,

    FullLogo: () => (
        <Flex align={'center'} gap={2}>
            <LogoIcon />
            <LogoText />
        </Flex>
    ),
}
