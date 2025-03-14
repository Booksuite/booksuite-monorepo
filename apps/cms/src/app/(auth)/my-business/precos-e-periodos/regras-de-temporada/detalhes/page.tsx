import {
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'

interface DetalhesTemporadaProps {}

export default function DetalhesTemporada({}: DetalhesTemporadaProps) {
    return (
        <div className="DetalhesTemporada">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/precos-e-periodos/regras-de-temporada">
                        Regras de Temporada
                    </PageHeader.BackLink>

                    <SwitchBox
                        label="Ativa"
                        id="status"
                        name="status"
                        defaultChecked
                    />
                </Flex>

                <PageHeader.Title>Detalhes da Temporada</PageHeader.Title>
            </PageHeader.Root>

            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Temporada"
                        defaultValue="Temporada de inverno"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Início da Temporada"
                        singleDateValue="20/06/2024"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Fim da Temporada"
                        singleDateValue="22/09/2024"
                    />

                    <InputNumberBox
                        label="Mínimo de Diárias"
                        defaultValue={2}
                    />
                </Flex>

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

                <section>
                    <h2>Categorias válidas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Chalé Imperial
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Chalé Diamante
                            </InputCheckboxBox>
                            <InputCheckboxBox>Chalé Encantos</InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <h2>Ajuste de Preço por diária</h2>

                    <SimpleGrid spacing={2}>
                        <SelectBox
                            options={[
                                {
                                    value: 'Aumento em percentual',
                                    label: 'Aumento em percentual',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            label="Tipo de Variação de Preço"
                        />

                        <InputBox
                            label="Variação do Preço Geral"
                            defaultValue="10%"
                        />
                    </SimpleGrid>

                    <h4 className="mt-4">
                        <b>Categoria 1</b> (preço por diária)
                    </h4>

                    <SimpleGrid spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (dia da semana)"
                                defaultValue={1690}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (dia da semana)"
                                defaultValue={1859}
                                type="currency"
                            />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (final da semana)"
                                defaultValue={1890}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (final da semana)"
                                defaultValue={2079}
                                type="currency"
                            />
                        </Stack>
                    </SimpleGrid>

                    <h4 className="mt-4">
                        <b>Categoria 2</b> (preço por diária)
                    </h4>

                    <SimpleGrid spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (dia da semana)"
                                defaultValue={1590}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (dia da semana)"
                                defaultValue={1759}
                                type="currency"
                            />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (final da semana)"
                                defaultValue={1690}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (final da semana)"
                                defaultValue={1859}
                                type="currency"
                            />
                        </Stack>
                    </SimpleGrid>

                    <h4 className="mt-4">
                        <b>Categoria 3</b> (preço por diária)
                    </h4>

                    <SimpleGrid spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (dia da semana)"
                                defaultValue={1490}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (dia da semana)"
                                defaultValue={1639}
                                type="currency"
                            />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <InputBox
                                label="Base (final da semana)"
                                defaultValue={1590}
                                type="currency"
                                isDisabled
                            />

                            <InputBox
                                label="Novo (final da semana)"
                                defaultValue={1749}
                                type="currency"
                            />
                        </Stack>
                    </SimpleGrid>
                </section>

                <Button>Salvar</Button>
            </Stack>
        </div>
    )
}
