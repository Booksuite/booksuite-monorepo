import { Button, CheckboxGroup, Flex, Stack } from '@chakra-ui/react'

import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import SelectBox from '@/components/atoms/SelectBox'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function OpcoesDeTarifasPage() {
    return (
        <div className="OpcoesDeTarifas">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/opcoes-de-tarifas">
                        Opcoes de Tarifas
                    </PageHeader.BackLink>

                    <SwitchBox
                        label="Ativa"
                        id="status"
                        name="status"
                        defaultChecked
                    />
                </Flex>

                <PageHeader.Title>Detalhes da Tarifa</PageHeader.Title>
            </PageHeader.Root>

            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Tarifa"
                        defaultValue="Pensão Completa"
                    />
                </Flex>

                <section>
                    <Stack direction={'column'} spacing={2}>
                        <h2 className="mb-0">Preço</h2>

                        <SelectBox
                            options={[
                                {
                                    value: 'Por pessoa por diária',
                                    label: 'Por pessoa por diária',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={[
                                {
                                    value: 'Por pessoa por diária',
                                    label: 'Por pessoa por diária',
                                },
                            ]}
                            label="Tipo de Cobrança"
                        />

                        <InputBox
                            label="Valor adicional"
                            type="currency"
                            defaultValue={255}
                        />
                    </Stack>
                </section>

                <section>
                    <Stack direction={'column'} spacing={2}>
                        <h2 className="mb-0">Itens inclusos</h2>

                        <InputBox
                            label="Item incluso"
                            defaultValue={'Café da manhã'}
                        />
                        <InputBox
                            label="Item incluso"
                            defaultValue={'Almoço'}
                        />
                        <InputBox
                            label="Item incluso"
                            defaultValue={'Jantar'}
                        />

                        <Button variant={'outline'} leftIcon={<Icons.Plus />}>
                            Adicionar item
                        </Button>
                    </Stack>
                </section>

                <section>
                    <h2>Categorias válidas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Categoria 1
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Categoria 2
                            </InputCheckboxBox>
                            <InputCheckboxBox>Categoria 3</InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <h2>Noites válidas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Domingo
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Segunda-feira
                            </InputCheckboxBox>
                            <InputCheckboxBox>Terça-feira</InputCheckboxBox>
                            <InputCheckboxBox>Quarta-feira</InputCheckboxBox>
                            <InputCheckboxBox>Quinte-feira</InputCheckboxBox>
                            <InputCheckboxBox>Sexta-feira</InputCheckboxBox>
                            <InputCheckboxBox>Sábado</InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>
                </section>

                <Button>Salvar</Button>
            </Stack>
        </div>
    )
}
