'use client'

import { Button, Flex, Link } from '@chakra-ui/react'

import { List } from '@/components/shared/List'
import { PageHeader } from '@/components/shared/PageHeader'
import { SimpleFilter } from '@/components/shared/SimpleFilter/SimpleFilter'
import { Icons } from '@/components/svgs/icons'

interface OpcoesDeTarifaProps {}

export default function OpcoesDeTarifa({}: OpcoesDeTarifaProps) {
    return (
        <div className="OpcoesDeTarifa">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio">
                        Meu Negócio
                    </PageHeader.BackLink>
                </Flex>

                <PageHeader.Title>Opções de Tarifa</PageHeader.Title>
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
                </List.Root>

                <Button className="mt-4 w-full" leftIcon={<Icons.Plus />}>
                    Adicionar Tarifa
                </Button>
            </div>
        </div>
    )
}
