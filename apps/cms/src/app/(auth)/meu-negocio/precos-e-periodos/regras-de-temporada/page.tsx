'use client'

import { Button, Flex, Link } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

interface RegrasDeTemporadaProps {}

function RegrasDeTemporada({}: RegrasDeTemporadaProps) {
    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="RegrasDeTemporada">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio/precos-e-periodos">
                        Preços e Períodos
                    </PageHeader.BackLink>
                </Flex>

                <PageHeader.Title>Regras de Temporada</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                <List.Root>
                    <Link href="regras-de-temporada/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Temporada de inverno"
                            subtitle={<>20/06/2024 a 22/09/2024</>}
                            status="Em andamento"
                        />
                    </Link>

                    <Link href="regras-de-temporada/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Temporada de inverno"
                            subtitle={<>01/08/2024 a 31/08/2024</>}
                            status="Programada"
                            statusColor="yellow"
                        />
                    </Link>

                    <Link href="regras-de-temporada/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Temporada de inverno"
                            subtitle={<>22/12/2024 a 20/03/2024</>}
                            status="Finalizada"
                        />
                    </Link>

                    <Link href="regras-de-temporada/detalhes">
                        <List.Item
                            variant="secondary"
                            title="Baixa temporada primavera"
                            subtitle={<>23/09/2024 a 21/12/2024</>}
                            status="Inativa"
                        />
                    </Link>
                </List.Root>

                <Button className="mt-4 w-full" leftIcon={<Icons.Plus />}>
                    Adicionar temporada
                </Button>
            </div>
        </div>
    )
}

export default RegrasDeTemporada
