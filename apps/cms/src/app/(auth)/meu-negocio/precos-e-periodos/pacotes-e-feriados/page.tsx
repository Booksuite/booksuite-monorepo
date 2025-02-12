'use client'

import { List } from '@/components/shared/List'
import { PageHeader } from '@/components/shared/PageHeader'
import { SimpleFilter } from '@/components/shared/SimpleFilter/SimpleFilter'
import { Icons } from '@/components/svgs/icons'
import { Button, Link } from '@chakra-ui/react'

export default function PacotesEFeriados() {
    return (
        <div className="PacotesEFeriados">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio/precos-e-periodos">
                    Preços e Períodos
                </PageHeader.BackLink>

                <PageHeader.Title>Pacotes e Feriados</PageHeader.Title>
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
                    <Link href="pacotes-e-feriados/detalhes">
                        <List.Item
                            title="Feriado Corpus Christi"
                            subtitle={
                                <>
                                    29/05/2024 a 02/06/2024 <br /> Mínimo 2
                                    diárias
                                </>
                            }
                            status="Ativa"
                        />
                    </Link>

                    <Link href="pacotes-e-feriados/detalhes">
                        <List.Item
                            title="Pacote de Natal"
                            subtitle={
                                <>
                                    23/12/2024 a 27/12/2024 <br /> Mínimo 4
                                    diárias
                                </>
                            }
                            status="Programado"
                        />
                    </Link>

                    <Link href="pacotes-e-feriados/detalhes">
                        <List.Item
                            title="Pacote Réveillon 23/2024"
                            subtitle={
                                <>
                                    27/12/2023 a 02/01/2024 <br /> Mínimo 6
                                    diárias
                                </>
                            }
                            status="Finalizado"
                        />
                    </Link>

                    <Link href="pacotes-e-feriados/detalhes">
                        <List.Item
                            title="Pacote Carnaval 2025"
                            subtitle={
                                <>
                                    28/02/2025 a 04/03/2025 <br /> Mínimo 4
                                    diárias
                                </>
                            }
                            status="Inativo"
                            statusColor="gray"
                        />
                    </Link>
                </List.Root>

                <Button
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar pacote ou feriado
                </Button>
            </div>
        </div>
    )
}
