import {
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'
import { MenuItem, TextField } from '@mui/material'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { NumberInput } from '@/components/atoms/NumberInput'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function DetalhesOfertasECupons() {
    return (
        <div className="DetalhesOfertasECupons">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/my-business/prices-and-periods/offers-and-coupons">
                        Ofertas
                    </PageHeader.BackLink>

                    <SwitchBox
                        label="Ativa"
                        id="status"
                        name="status"
                        defaultChecked
                    />
                </Flex>

                <PageHeader.Title>Detalhes do Pacote</PageHeader.Title>
            </PageHeader.Root>

            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Oferta"
                        defaultValue="Promoção Mês dos Namorados"
                    />

                    <TextAreaBox
                        label="Descrição (opcional)"
                        maxLength={250}
                        defaultValue={
                            'Reserve no mês de Junho de 2024 com diversas oportunidades e descontos'
                        }
                    />
                </Flex>

                <section>
                    <h2>Períodos válidas</h2>

                    <Stack spacing={2}>
                        <h4>Período de Compras</h4>

                        <DateRangeBox
                            asSingleDate
                            label="Início do Períodos de Compras"
                            singleDateValue="20/12/2024"
                        />
                        <DateRangeBox
                            asSingleDate
                            label="Fim do Período de Compras"
                            singleDateValue="02/01/2025"
                        />
                    </Stack>

                    <SwitchBox
                        my={4}
                        label="Períodos de estaida específicos?"
                        defaultChecked
                        flexProps={{ justifyContent: 'space-between' }}
                    />

                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <h4>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    Período de Estadia 1
                                    <button type="button">
                                        <Icons.Minus color="var(--clr-error)" />
                                    </button>
                                </Flex>
                            </h4>

                            <DateRangeBox
                                asSingleDate
                                label="Início do Período de Estadia"
                                singleDateValue="20/12/2024"
                            />
                            <DateRangeBox
                                asSingleDate
                                label="Fim do Período de Estadia"
                                singleDateValue="02/01/2025"
                            />
                        </Stack>

                        <Stack spacing={2}>
                            <h4>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    Período de Estadia 2
                                    <button type="button">
                                        <Icons.Minus color="var(--clr-error)" />
                                    </button>
                                </Flex>
                            </h4>

                            <DateRangeBox
                                asSingleDate
                                label="Início do Período de Estadia"
                                singleDateValue="20/12/2024"
                            />
                            <DateRangeBox
                                asSingleDate
                                label="Fim do Período de Estadia"
                                singleDateValue="02/01/2025"
                            />
                        </Stack>

                        <Button variant="outline" leftIcon={<Icons.Plus />}>
                            Adicionar período
                        </Button>
                    </Stack>
                </section>

                <section>
                    <h2>Condições de Aplicabilidade</h2>

                    <Stack spacing={2}>
                        <NumberInput
                            label="Estadia Mínima (opcional)"
                            defaultValue={2}
                        />

                        <NumberInput
                            label="Estadia Máxima (opcional)"
                            defaultValue={2}
                        />

                        <NumberInput
                            label="Antecedência Mínima (opcional)"
                            defaultValue={2}
                        />

                        <NumberInput
                            label="Antecedência Máxima (opcional)"
                            defaultValue={2}
                        />

                        <SwitchBox
                            label="Válido para reservas abandonadas"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />
                        <SwitchBox
                            label="Válido para Pacotes e Feriados"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />
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
                    <h2>Formas de pagamento</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Cartão de Crédito
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Cartão de Débito
                            </InputCheckboxBox>
                            <InputCheckboxBox>Pix</InputCheckboxBox>
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

                <section>
                    <h2>Extras e experiências inclusas</h2>

                    <CheckboxGroup>
                        <Stack spacing={[2]} direction={['column']}>
                            <InputCheckboxBox defaultChecked>
                                Passeio de Veleiro
                            </InputCheckboxBox>
                            <InputCheckboxBox defaultChecked>
                                Passeio de Balão
                            </InputCheckboxBox>
                            <InputCheckboxBox>
                                Passeio de Stand-up
                            </InputCheckboxBox>
                        </Stack>
                    </CheckboxGroup>

                    <Button
                        className="mt-4 w-full"
                        variant="outline"
                        leftIcon={<Icons.Plus />}
                    >
                        Mostrar Mais
                    </Button>
                </section>

                <section>
                    <h2>Ajuste de Preço por diária</h2>

                    <SimpleGrid spacing={2}>
                        <TextField
                            select
                            label="Tipo de Variação de Preço"
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value="Aumento em percentual">
                                Aumento em percentual
                            </MenuItem>
                            <MenuItem value="Nome Lorem">Nome Lorem</MenuItem>
                            <MenuItem value="Lorem Ipsum">Lorem Ipsum</MenuItem>
                        </TextField>

                        <InputBox
                            label="Variação do Preço Geral"
                            defaultValue="10%"
                        />

                        <h4>Regras de exibição</h4>

                        <SwitchBox
                            label="Exibir nos destaques do site"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />
                        <SwitchBox
                            label="Mostrar tag de desconto"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />
                        <SwitchBox
                            label="Oferta exclusiva com cupom?"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />

                        <InputBox
                            label="Código do Cupom"
                            defaultValue={'RAMON10'}
                        />
                    </SimpleGrid>
                </section>

                <Button>Salvar</Button>
            </Stack>
        </div>
    )
}
