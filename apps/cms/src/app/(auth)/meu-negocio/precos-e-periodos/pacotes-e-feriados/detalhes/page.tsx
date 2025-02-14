import {
    Button,
    CheckboxGroup,
    Flex,
    SimpleGrid,
    Stack,
} from '@chakra-ui/react'

import DateRangeBox from '@/components/shared/form/DateRangeBox'
import InputBox from '@/components/shared/form/InputBox'
import InputCheckboxBox from '@/components/shared/form/InputCheckboxBox'
import InputNumberBox from '@/components/shared/form/InputNumberBox'
import SelectBox from '@/components/shared/form/SelectBox'
import { SwitchBox } from '@/components/shared/form/SwitchBox'
import { TextAreaBox } from '@/components/shared/form/TextAreaBox'
import { Gallery } from '@/components/shared/Gallery'
import { PageHeader } from '@/components/shared/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function DetalhesPacotesEFeriados() {
    return (
        <div className="DetalhesPacotesEFeriados">
            <PageHeader.Root>
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <PageHeader.BackLink href="/meu-negocio/precos-e-periodos/pacotes-e-feriados">
                        Pacotes e Feriados
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
                        label="Nome do Pacote ou Feriado"
                        defaultValue="Pacote de Réveillon"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Início do Pacote ou Feriado"
                        singleDateValue="20/12/2024"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Fim do Pacote ou Feriado"
                        singleDateValue="02/01/2025"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Início do Período de Compras"
                        singleDateValue="20/06/2024"
                    />

                    <DateRangeBox
                        asSingleDate
                        label="Fim do Período de Compras"
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

                <section>
                    <h2>Informações</h2>

                    <h4>Informações</h4>

                    <SimpleGrid spacing={2}>
                        <TextAreaBox
                            label="Descrição"
                            maxLength={250}
                            defaultValue="Luxuoso e exclusivo, possui piscina aquecida com vista para a lagoa. Na suíte imperial, conta com banheira de hidro e lareira. Ainda possui cozinha completa, lareira na sala, churrasqueira e fogo de chão."
                        />

                        <TextAreaBox
                            label="Informações gerais e observações"
                            defaultValue={
                                'Horários de saída: 10h, 13h30 ou 15h30;\nO valor do pacote descrito é para 2 pessoas;\nIdade recomendada para crianças à partir de 10 anos de idade;\nServiço exclusivo para hóspedes com reserva na pousada;\nEm caso de mau tempo, será reembolsado o valor do passeio no check-out de sua estadia. Lotação máxima de 2 adultos + 1 criança;'
                            }
                        />
                    </SimpleGrid>
                </section>

                <section>
                    <h2>Fotos e vídeo</h2>
                    <h4>Galeria</h4>

                    <Gallery.Root
                        items={[
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                            '/imagem-exemplo.png',
                        ]}
                    />

                    <h4 className="mt-4">Vídeo</h4>

                    <InputBox
                        label="URL de Vídeo do Youtube (opcional)"
                        defaultValue="https://www.youtube.com/shorts/q-RfC9"
                    />
                </section>

                <section>
                    <h2>Divulgação</h2>

                    <SwitchBox
                        label="Exibir nos destaques do site"
                        id="showOnFeatures"
                        name="showOnFeatures"
                        flexProps={{ justifyContent: 'space-between' }}
                        defaultChecked
                    />
                </section>

                <Button>Salvar</Button>
            </Stack>
        </div>
    )
}
