'use client'

import { Button, Link } from '@chakra-ui/react'

import { ChipFilter } from '@/components/organisms/ChipFilter'
//import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default async function Experiencias() {
    const chipItems = [
        { key: '1', label: 'Ativas' },
        { key: '2', label: 'Inativas' },
        { key: '3', label: 'Todas' },
    ]

    return (
        <div className="Experiencias">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Experiências</PageHeader.Title>
            </PageHeader.Root>

            <div>
                <ChipFilter items={chipItems} />

                {/*<List.Root>
                    {experiences &&
                        experiences.map((experience: Experience) => (
                            <Link
                                href={`experiencias/${experience.id}`}
                                key={experience.id}
                            >
                                <List.Item
                                    title={experience.name}
                                    subtitle={
                                        <>
                                            {experience.price.toLocaleString(
                                                'pt-BR',
                                                {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                },
                                            )}{' '}
                                            <br /> {getSales(experience)}
                                        </>
                                    }
                                    status={experience.status}
                                />
                            </Link>
                        ))}
                </List.Root>*/}

                <Button
                    as={Link}
                    href="experiencias/criar"
                    className="mt-[2.5rem] w-full"
                    leftIcon={<Icons.Plus />}
                >
                    Adicionar Experiência
                </Button>
            </div>
        </div>
    )
}
