import { Button, Link } from '@chakra-ui/react'

import { List } from '@/components/organisms/List'
import { PageHeader } from '@/components/organisms/PageHeader'
import { SimpleFilter } from '@/components/organisms/SimpleFilter/SimpleFilter'
import { Icons } from '@/components/svgs/icons'
import { fetcher } from '@/services/fetcher'
import type { Extra } from '@/types/Extra'

export interface ExtrasProps {}

export default async function Extras(props: ExtrasProps) {
    const data = await fetcher(`/extra`)
    const extras = data.extras

    function getSales(data: Extra) {
        if (!data) {
            return ''
        }

        const salesStrings = []

        if (data.onlineSale) {
            salesStrings.push('Site')
        }

        if (data.panelSale) {
            salesStrings.push('Painel')
        }

        if (data.seasonalSale) {
            salesStrings.push('Período')
        }

        return salesStrings.join(' / ')
    }

    return (
        <div className="Extras">
            <PageHeader.Root>
                <PageHeader.BackLink href="/meu-negocio">
                    Meu Negócio
                </PageHeader.BackLink>

                <PageHeader.Title>Extras</PageHeader.Title>
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
                />

                <List.Root>
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
                </List.Root>

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
