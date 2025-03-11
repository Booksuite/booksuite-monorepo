'use client'

import { Button, Link } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function OfertasECupons() {
    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="OfertasECupons">
            <PageHeader.Root>
                <PageHeader.BackLink href="/my-business/precos-e-periodos">
                    Preços e Períodos
                </PageHeader.BackLink>

                <PageHeader.Title>Ofertas e Cupons</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                <List.Root>
                    <Link href="ofertas-e-cupons/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Mês dos Namorados"
                            subtitle={'01/03/2024 a 31/03/2024'}
                            status="Ativa"
                        />
                    </Link>

                    <Link href="ofertas-e-cupons/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Mês dos Namorados"
                            subtitle={'01/03/2024 a 31/03/2024'}
                            status="Ativa"
                        />
                    </Link>

                    <Link href="ofertas-e-cupons/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Mês dos Namorados"
                            subtitle={'01/03/2024 a 31/03/2024'}
                            status="Ativa"
                        />
                    </Link>

                    <Link href="ofertas-e-cupons/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Mês dos Namorados"
                            subtitle={'01/03/2024 a 31/03/2024'}
                            status="Ativa"
                        />
                    </Link>
                </List.Root>

                <Button
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar Oferta
                </Button>
            </div>
        </div>
    )
}
