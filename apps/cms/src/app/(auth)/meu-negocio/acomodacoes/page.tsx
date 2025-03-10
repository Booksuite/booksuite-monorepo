import { Button, Link } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
//import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default async function Acomodacoes() {
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

                {/*<List.Root>
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
                </List.Root>*/}

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
