import DateRangeBox from '@/components/shared/form/DateRangeBox'
import InputBox from '@/components/shared/form/InputBox'
import InputNumberBox from '@/components/shared/form/InputNumberBox'
import LabelBadge from '@/components/shared/form/LabelBadge'
import { PriceList } from '@/components/shared/form/PriceList'
import SelectBox from '@/components/shared/form/SelectBox'
import { TextAreaBox } from '@/components/shared/form/TextAreaBox'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button, SimpleGrid, Stack } from '@chakra-ui/react'

export default function NovaReserva() {
    async function submit(formData: FormData) {
        'use server'

        console.log(formData.entries())
    }

    return (
        <div className="NovaReserva">
            <PageHeader.Root>
                <PageHeader.BackLink href="/mapa">
                    Lista de Reservas
                </PageHeader.BackLink>

                <PageHeader.Title>Nova Reserva</PageHeader.Title>
            </PageHeader.Root>

            <form action={submit}>
                <Stack gap={8}>
                    <SelectBox
                        options={[
                            { value: 'Reservado', label: 'Reservado' },
                            { value: 'Disponível', label: 'Disponível' },
                        ]}
                        label="Status da Reserva"
                        name="status"
                    />
                    <section>
                        <h4>Detalhes da Reserva</h4>

                        <SimpleGrid spacing={2}>
                            <InputBox
                                label="Nome Completo"
                                name="name"
                                defaultValue="teste"
                            />

                            <InputBox
                                label="E-mail"
                                type="email"
                                name="email"
                            />

                            <InputBox
                                label="Telefone/WhatsApp com DDD"
                                mask={'(99) 99999-9999'}
                                name="tel"
                                defaultValue="(21) 50505-0000"
                            />

                            <DateRangeBox
                                startDateProps={{
                                    name: 'startDate',
                                }}
                                endDateProps={{
                                    name: 'endDate',
                                }}
                                label="Período de estadia"
                            />

                            <SelectBox
                                options={[
                                    {
                                        value: 'Chalé Imperial',
                                        label: 'Chalé Imperial',
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
                                label="Nome da acomodação"
                                name="hotelName"
                            />

                            <InputNumberBox
                                label={<>Adultos</>}
                                max={10}
                                name="adults"
                                defaultValue={5}
                            />

                            <InputNumberBox
                                label={
                                    <>
                                        Crianças{' '}
                                        <LabelBadge>(0 a 6)</LabelBadge>
                                    </>
                                }
                                name="childs"
                            />

                            <InputNumberBox
                                label={
                                    <>
                                        Crianças{' '}
                                        <LabelBadge>(7 a 17)</LabelBadge>
                                    </>
                                }
                            />

                            <InputBox
                                label="Total das Diárias"
                                type="currency"
                                name="total"
                            />

                            <SelectBox
                                options={[
                                    {
                                        value: 'Central de Reservas',
                                        label: 'Central de Reservas',
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
                                label="Canal de Venda"
                                name="canal-de-venda"
                            />

                            <TextAreaBox label="Observações (visível para o hóspede)" />
                        </SimpleGrid>
                    </section>

                    <section>
                        <h2>Extras</h2>

                        <PriceList.Root notFoundText="Nenhum Extra Adicionado">
                            <PriceList.Item
                                title="Pacote Romântico"
                                name={`extra[0]`}
                                unityValue={100.33}
                            />
                            <PriceList.Item
                                title="Pacote Romântico 2"
                                name={`extra[1]`}
                                unityValue={100}
                            />
                        </PriceList.Root>
                    </section>

                    <section>
                        <h2>Experiências</h2>

                        <PriceList.Root notFoundText="Nenhuma Experiência Adicionada"></PriceList.Root>
                    </section>

                    <section>
                        <h2>Transações</h2>

                        <PriceList.Root notFoundText="Nenhum Pagamento Adicionado"></PriceList.Root>
                    </section>

                    <Button type="submit" isDisabled>
                        Enviar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
