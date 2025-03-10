'use client'

import { Button, CheckboxGroup, Flex, Stack } from '@chakra-ui/react'

import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function Comodidades() {
    function handleSubmit() {}

    return (
        <div className="Comodidades">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Comodidades</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <h2>Top 5 destaques</h2>

                        <CheckboxGroup>
                            <Stack spacing={[2]} direction={['column']}>
                                <InputCheckboxBox defaultChecked>
                                    Banheira de hidromassagem
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Piscina aquecida
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Cozinha completa
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Área gourmet
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Vista para a lagoa
                                </InputCheckboxBox>
                            </Stack>
                        </CheckboxGroup>

                        <Button
                            className="mt-4 w-full"
                            variant="outline"
                            leftIcon={<Icons.Plus />}
                        >
                            Selecionar
                        </Button>

                        <h2 className="mt-4">Demais Comodidades</h2>

                        <CheckboxGroup>
                            <Stack spacing={[2]} direction={['column']}>
                                <InputCheckboxBox defaultChecked>
                                    Ar condicionado
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Balanço suspenso
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Cafeteira dolce gusto
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Churrasqueira
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Cofre
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Ducha dupla
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Fogo de chão
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Garagem privativa
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Internet Wi-Fi
                                </InputCheckboxBox>
                                <InputCheckboxBox defaultChecked>
                                    Toalhas
                                </InputCheckboxBox>
                            </Stack>
                        </CheckboxGroup>

                        <Button
                            className="mt-4 w-full"
                            variant="outline"
                            leftIcon={<Icons.Plus />}
                        >
                            Selecionar
                        </Button>
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
