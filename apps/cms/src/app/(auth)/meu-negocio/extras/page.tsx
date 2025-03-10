'use client'

import { Button, Link } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
//import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default async function Extras() {

    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="Extras">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Extras</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                {/*<List.Root>
                    {extras?.map((extra: Extra, index: number) => (
                        <Link href={`extras/${extra.id}`} key={index}>
                            <List.Item
                                title={extra.name}
                                subtitle={
                                    <>
                                        {extra.price.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}{' '}
                                        <br /> {getSales(extra)}
                                    </>
                                }
                                status="Ativo"
                            />
                        </Link>
                    ))}
                </List.Root>*/}

                <Button
                    as={Link}
                    href="extras/criar"
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar Extra
                </Button>
            </div>
        </div>
    )
}
