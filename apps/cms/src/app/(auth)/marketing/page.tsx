import { Stack } from '@chakra-ui/react'

import { InternalMenu } from '@/components/organisms/InternalMenu'
import { PageHeader } from '@/components/organisms/PageHeader'
import HomeIcon from '@/components/svgs/icons/HomeIcon'

export default function Marketing() {
    return (
        <div className="Marketing">
            <PageHeader.Root>
                <PageHeader.BackLink href="/">Início</PageHeader.BackLink>

                <PageHeader.Title>Marketing</PageHeader.Title>
            </PageHeader.Root>

            <Stack direction={'column'} gap={2}>
                <InternalMenu.Root>
                    <InternalMenu.Button href="/marketing/banners">
                        <HomeIcon />
                        Banners
                    </InternalMenu.Button>
                </InternalMenu.Root>

                <InternalMenu.Root>
                    <InternalMenu.Button href="/marketing/automacoes">
                        <HomeIcon />
                        Automações
                    </InternalMenu.Button>
                </InternalMenu.Root>
            </Stack>
        </div>
    )
}
