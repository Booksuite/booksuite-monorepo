'use client'

import { Button, Link } from '@chakra-ui/react'

import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SimpleFilter } from '@/components/organisms/SimpleFilter/SimpleFilter'
import { Icons } from '@/components/svgs/icons'

export default function OfertasECupons() {
    return (
        <div className="OfertasECupons">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio/precos-e-periodos">
                    Preços e Períodos
                </PageHeader.BackLink>

                <PageHeader.Title>Ofertas e Cupons</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <SimpleFilter
                    className="mb-[1rem]"
                    items={[
                        { label: 'Ativas', checked: true },
                        { label: 'Inativas' },
                        { label: 'Todas' },
                    ]}
                    name="filtro"
                    onChange={(values: Array<string>) => {
                        console.log('Change Filter', values)
                    }}
                />

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
