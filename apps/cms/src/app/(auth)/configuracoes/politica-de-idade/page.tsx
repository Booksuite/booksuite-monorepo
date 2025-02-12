'use client'

import { PageHeader } from '@/components/shared/PageHeader'
import InputBox from '@/components/shared/form/InputBox'
import InputNumberBox from '@/components/shared/form/InputNumberBox'
import SelectBox from '@/components/shared/form/SelectBox'
import { SwitchBox } from '@/components/shared/form/SwitchBox'
import { Icons } from '@/components/svgs/icons'
import { Button, Flex, Stack } from '@chakra-ui/react'

export default function PoliticaDeIdade() {
    function handleSubmit() {
        console.log('oi')
    }

    return (
        <div className="PoliticaDeIdade">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Política de Idade</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <h2>Crianças</h2>

                        <SwitchBox
                            label="Aceitar Crianças"
                            id="status"
                            name="status"
                            // onChange={() => {
                            //   status === "Ativo" ? setStatus("Inativo") : setStatus("Ativo");
                            // }}
                            // isChecked={status === "Ativo"}
                            defaultChecked={true}
                        />

                        <Flex direction="column" gap={2} className="mt-4">
                            <h2 className="mb-0">Faixa Etária 1</h2>

                            <InputNumberBox
                                name="minNotice"
                                defaultValue={0}
                                label="Idade Inicial"
                            />
                            <InputNumberBox
                                name="minNotice"
                                defaultValue={6}
                                label="Idade Final"
                            />

                            <SelectBox
                                name="priceAdjustment"
                                options={[
                                    {
                                        value: 'Grátis',
                                        label: 'Grátis',
                                    },
                                    {
                                        value: 'Nome Lorem',
                                        label: 'Nome Lorem',
                                    },
                                    {
                                        value: 'Lorem Ipsum',
                                        label: 'Lorem Ipsum',
                                    },
                                ]}
                                defaultValue={{
                                    value: 'Grátis',
                                    label: 'Grátis',
                                }}
                                label="Tipo de cobrança"
                            />
                        </Flex>

                        <Flex direction="column" gap={2} className="mt-4">
                            <h2 className="mb-0">Faixa Etária 2</h2>

                            <InputNumberBox
                                name="minNotice"
                                defaultValue={7}
                                label="Idade Inicial"
                            />
                            <InputNumberBox
                                name="minNotice"
                                defaultValue={17}
                                label="Idade Final"
                            />

                            <SelectBox
                                name="priceAdjustment"
                                options={[
                                    {
                                        value: 'Valor absoluto em reais',
                                        label: 'Valor absoluto em reais',
                                    },
                                    {
                                        value: 'Nome Lorem',
                                        label: 'Nome Lorem',
                                    },
                                    {
                                        value: 'Lorem Ipsum',
                                        label: 'Lorem Ipsum',
                                    },
                                ]}
                                defaultValue={{
                                    value: 'Valor absoluto em reais',
                                    label: 'Valor absoluto em reais',
                                }}
                                label="Tipo de cobrança"
                            />

                            <InputBox
                                label="Valor por criança por diária (R$)"
                                defaultValue={'150,00'}
                            />
                        </Flex>

                        <Button
                            variant={'outline'}
                            type="button"
                            leftIcon={<Icons.Plus />}
                            className="mt-4"
                        >
                            Adicionar faixa etária
                        </Button>
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
