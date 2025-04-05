import { Button, MenuItem, Stack, TextField } from '@mui/material'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import { NumberInput } from '@/components/atoms/NumberInput'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { PriceList } from '@/components/organisms/PriceList'

export default function NovaReserva() {
    async function submit() {
        'use server'
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
                    <TextField
                        select
                        label="Status da Reserva"
                        name="status"
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="Reservado">Reservado</MenuItem>
                        <MenuItem value="Disponível">Disponível</MenuItem>
                    </TextField>
                    <section>
                        <h4>Detalhes da Reserva</h4>

                        <Stack spacing={2}>
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

                            <TextField
                                select
                                label="Nome da acomodação"
                                name="hotelName"
                                fullWidth
                                variant="outlined"
                            >
                                <MenuItem value="Chalé Imperial">
                                    Chalé Imperial
                                </MenuItem>
                                <MenuItem value="Nome Lorem">
                                    Nome Lorem
                                </MenuItem>
                                <MenuItem value="Lorem Ipsum">
                                    Lorem Ipsum
                                </MenuItem>
                            </TextField>

                            <NumberInput
                                label="Adultos"
                                max={10}
                                name="adults"
                                defaultValue={5}
                            />

                            <NumberInput
                                label="Crianças (0 a 6)"
                                name="childs"
                            />

                            <NumberInput label="Crianças (7 a 17)" />

                            <InputBox
                                label="Total das Diárias"
                                type="currency"
                                name="total"
                            />

                            <TextField
                                select
                                label="Canal de Venda"
                                name="canal-de-venda"
                                fullWidth
                                variant="outlined"
                            >
                                <MenuItem value="Central de Reservas">
                                    Central de Reservas
                                </MenuItem>
                                <MenuItem value="Nome Lorem">
                                    Nome Lorem
                                </MenuItem>
                                <MenuItem value="Lorem Ipsum">
                                    Lorem Ipsum
                                </MenuItem>
                            </TextField>

                            <TextAreaBox label="Observações (visível para o hóspede)" />
                        </Stack>
                    </section>

                    <section>
                        <h2>Extras</h2>

                        <PriceList.Root notFoundText="Nenhum Extra Adicionado">
                            <PriceList.Item
                                title="Pacote Romântico"
                                unityValue={100.33}
                                value={1}
                            />
                            <PriceList.Item
                                title="Pacote Romântico 2"
                                unityValue={100}
                                value={1}
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

                    <Button type="submit" disabled>
                        Enviar
                    </Button>
                </Stack>
            </form>
        </div>
    )
}
