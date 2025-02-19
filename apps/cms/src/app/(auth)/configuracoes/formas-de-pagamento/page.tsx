'use client'

import { Alert, AlertDescription, Button, Flex, Stack } from '@chakra-ui/react'

import InputBox from '@/components/atoms/Input/InputBox'
import SelectBox from '@/components/atoms/SelectBox'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function FormasDePagamento() {
    function handleSubmit() {
        console.log('oi')
    }

    return (
        <div className="FormasDePagamento">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Formas de Pagamento</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <h2 className="mt-4 mb-2">Impostos e Taxas</h2>

                        <InputBox label="Imposto incidente (%)" />

                        <h2 className="mt-4 mb-2">Garantias da Reserva</h2>

                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: 'Valor parcial da reserva',
                                    label: 'Valor parcial da reserva',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={{
                                value: 'Valor parcial da reserva',
                                label: 'Valor parcial da reserva',
                            }}
                            label="Tipo de garantia"
                        />

                        <InputBox
                            label="Percentual cobrado no ato (%)"
                            defaultValue={50}
                        />

                        <Alert
                            className="mt-2"
                            justifyContent={'center'}
                            gap={2}
                        >
                            <Icons.Info className="!w-auto" />
                            <AlertDescription>
                                <b>Importante:</b> a garantia da reserva é o
                                valor que o seu cliente deve pagar ao efetuar a
                                reserva online.
                            </AlertDescription>
                        </Alert>

                        <section className="mt-4">
                            <Stack spacing={2}>
                                <h2 className="mt-0">Formas de pagamento</h2>

                                <section>
                                    <h2 className="m-0">Pix instantâneo</h2>

                                    <SwitchBox
                                        my={2}
                                        label="Aceitar Pix"
                                        defaultChecked
                                        flexProps={{
                                            justifyContent: 'space-between',
                                        }}
                                    />

                                    <InputBox
                                        label="Oferecer desconto no pix em % (opcional)"
                                        defaultValue={5}
                                    />
                                </section>

                                <Stack className="mt-4">
                                    <h2 className="m-0">Cartão de Crédito</h2>

                                    <SwitchBox
                                        my={2}
                                        label="Aceitar Cartão de créditro"
                                        defaultChecked
                                        flexProps={{
                                            justifyContent: 'space-between',
                                        }}
                                    />

                                    <SelectBox
                                        name="priceAdjustment"
                                        options={[
                                            {
                                                value: '6x',
                                                label: '6x',
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
                                            value: '6x',
                                            label: '6x',
                                        }}
                                        label="Número máximo de parcelas"
                                    />

                                    <InputBox label="Valor mínimo da parcela (opcional)" />

                                    <SwitchBox
                                        my={2}
                                        label="Cobrar taxa de juros de cartão"
                                        defaultChecked
                                        flexProps={{
                                            justifyContent: 'space-between',
                                        }}
                                    />

                                    <InputBox
                                        label="Juros para parcelamento em 1x (%)"
                                        defaultValue={'0,99'}
                                    />
                                    <InputBox
                                        label="Juros para parcelamento em 2x (%)"
                                        defaultValue={'1,99'}
                                    />
                                    <InputBox
                                        label="Juros para parcelamento em 3x (%)"
                                        defaultValue={'3,99'}
                                    />
                                    <InputBox
                                        label="Juros para parcelamento em 4x (%)"
                                        defaultValue={'5,99'}
                                    />
                                    <InputBox
                                        label="Juros para parcelamento em 5x (%)"
                                        defaultValue={'7,99'}
                                    />
                                    <InputBox
                                        label="Juros para parcelamento em 6x (%)"
                                        defaultValue={'9,99'}
                                    />
                                </Stack>

                                <section className="mt-4">
                                    <h2 className="m-0">Cartão de Débito</h2>

                                    <SwitchBox
                                        my={2}
                                        label="Aceitar Cartão de débito"
                                        defaultChecked
                                        flexProps={{
                                            justifyContent: 'space-between',
                                        }}
                                    />

                                    <InputBox label="Oferecer desconto em % (opcional)" />
                                </section>

                                <section className="mt-4">
                                    <h2 className="m-0">Direto no hotel</h2>

                                    <SwitchBox
                                        my={2}
                                        label="Aceitar Pagamento Direto no Hotel"
                                        defaultChecked
                                        flexProps={{
                                            justifyContent: 'space-between',
                                        }}
                                    />

                                    <InputBox label="Oferecer desconto em % (opcional)" />
                                </section>
                            </Stack>
                        </section>
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
