'use client'

import { Button, Flex } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
//import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

interface OpcoesDeTarifaProps {}

export default function OpcoesDeTarifa({}: OpcoesDeTarifaProps) {
    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="OpcoesDeTarifa">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business">
                        Meu Negócio
                    </PageHeader.BackLink>
                </Flex>

                <PageHeader.Title>Opções de Tarifa</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                {/*<List.Root>
                    <Link href="opcoes-de-tarifas/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Somente hospedagem"
                            subtitle={<>R$ 0,00</>}
                            status="Ativa"
                        />
                    </Link>

                    <Link href="opcoes-de-tarifas/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Com café da manhã"
                            subtitle={<>R$ 80,00 / por pessoa por diária</>}
                            status="Programada"
                            statusColor="yellow"
                        />
                    </Link>

                    <Link href="opcoes-de-tarifas/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Pensão completa"
                            subtitle={<>R$ 255,00 / por pessoa por diária</>}
                            status="Ativa"
                        />
                    </Link>
                </List.Root>*/}

                <Button className="mt-4 w-full" leftIcon={<Icons.Plus />}>
                    Adicionar Tarifa
                </Button>
            </div>
        </div>
    )
}
