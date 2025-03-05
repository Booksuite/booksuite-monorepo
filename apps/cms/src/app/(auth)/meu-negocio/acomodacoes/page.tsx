import { Button, Link } from '@chakra-ui/react'

import type { Acomodacao } from '@/common/types/Acomodacao'
import { ChipFilter } from '@/components/organisms/ChipFilter'
import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'
import { fetcher } from '@/common/services/fetcher'

export default async function Acomodacoes() {
    const data = await fetcher(`/property`)
    const properties = data.properties

    function getTotalUnitsLabel(units: number) {
        let slug = 'unidade'

        if (units > 1) {
            slug = 'unidades'
        }

        return `${units} ${slug}`
    }

    function getTotalGuestsLabel(guests: number) {
        let slug = 'hóspede'

        if (guests > 1) {
            slug = 'hóspedes'
        }

        return `Até ${guests} ${slug}`
    }

    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="Acomodacoes">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Acomodações</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                <List.Root>
                    {properties?.map((property: Acomodacao) => (
                        <Link
                            href={`acomodacoes/${property.id}`}
                            key={property.id}
                        >
                            <List.Item
                                title={property.name}
                                subtitle={
                                    <>
                                        {property.weekdaysPrice.toLocaleString(
                                            'pt-BR',
                                            {
                                                style: 'currency',
                                                currency: 'BRL',
                                            },
                                        )}
                                        {' / '}
                                        {property.weekendPrice.toLocaleString(
                                            'pt-BR',
                                            {
                                                style: 'currency',
                                                currency: 'BRL',
                                            },
                                        )}{' '}
                                        <br />{' '}
                                        {getTotalUnitsLabel(
                                            property.avaiableGuests,
                                        )}
                                        {' / '}
                                        {getTotalGuestsLabel(
                                            property.maxGuests,
                                        )}
                                    </>
                                }
                                status="Ativa"
                            />
                        </Link>
                    ))}
                </List.Root>

                <Button
                    as={Link}
                    href="acomodacoes/criar"
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar Acomodação
                </Button>
            </div>
        </div>
    )
}
