'use client'

import { useSession } from 'next-auth/react'
import { LuExternalLink } from 'react-icons/lu'

import HamburgerButton from '@/src/components/header/utils/HamburgerButton'
import ArrowDown from '@/src/components/svgs/icons/ArrowDown'
import NotificationIcon from '@/src/components/svgs/icons/NotificationIcon'
import { Image, Stack } from '@chakra-ui/react'

import SearchBox from './utils/SearchBox'

export function TopBar() {
    const { data: session } = useSession()

    return (
        <header className="TopBar">
            <Stack direction="row" alignItems="center" gap={4}>
                <HamburgerButton />

                <SearchBox />
            </Stack>

            <Stack direction="row" alignItems="center" gap={4}>
                <button type="button">
                    <Stack direction="row" alignItems="center" gap={4}>
                        <div>
                            {session?.user?.name}
                            <ArrowDown />
                        </div>

                        <Image
                            className="box-border"
                            borderRadius={'50vw'}
                            borderWidth={'0.125rem'}
                            borderStyle="solid"
                            borderColor={'#E9ECEF66'}
                            boxSize="2.5rem"
                            objectFit="cover"
                            src="/profile-pic.png"
                        />
                    </Stack>
                </button>

                <button type="button">
                    <LuExternalLink className="external" />
                </button>

                <button type="button" className="notifications">
                    <NotificationIcon className="notifications__icon" />

                    <div className="notifications__number">4</div>
                </button>
            </Stack>
        </header>
    )
}
