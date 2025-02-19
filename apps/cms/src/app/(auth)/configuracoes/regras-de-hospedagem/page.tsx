'use client'

import {
    Alert,
    AlertDescription,
    Button,
    CheckboxGroup,
    Flex,
    Stack,
} from '@chakra-ui/react'

import DateRangeBox from '@/components/atoms/Input/DateRangeBox'
import InputCheckboxBox from '@/components/atoms/Input/InputCheckboxBox'
import InputNumberBox from '@/components/atoms/Input/InputNumberBox'
import SelectBox from '@/components/atoms/Input/SelectBox'
import { SwitchBox } from '@/components/atoms/Input/SwitchBox'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Icons } from '@/components/svgs/icons'

export default function RegrasDeHospedagem() {
    function handleSubmit() {
        console.log('oi')
    }

    return (
        <div className="RegrasDeHospedagem">
            <PageHeader.Root>
                <PageHeader.BackLink href="/configuracoes">
                    Configurações
                </PageHeader.BackLink>

                <PageHeader.Title>Regras de Hospedagem</PageHeader.Title>
            </PageHeader.Root>

            <form onSubmit={handleSubmit}>
                <Stack gap={8}>
                    <Flex direction="column" gap={2}>
                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: '14:00',
                                    label: '14:00',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            defaultValue={{
                                value: '14:00',
                                label: '14:00',
                            }}
                            label="Horário do Check-in"
                        />

                        <SelectBox
                            name="priceAdjustment"
                            options={[
                                {
                                    value: 'Personalizado',
                                    label: 'Personalizado',
                                },
                                { value: 'Nome Lorem', label: 'Nome Lorem' },
                                { value: 'Lorem Ipsum', label: 'Lorem Ipsum' },
                            ]}
                            label="Horário do Check-out"
                        />

                        <InputNumberBox
                            name="minNotice"
                            defaultValue={2}
                            label="Mínimo de Diárias Padrão"
                        />

                        <section className="mt-4">
                            <h2>Noites do fim de semana</h2>

                            <CheckboxGroup
                                defaultValue={['Sexta-feira', 'Sábado']}
                            >
                                <Stack spacing={[2]} direction={['column']}>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Domingo'}
                                    >
                                        Domingo
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Segunda-feira'}
                                    >
                                        Segunda-feira
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Terça-feira'}
                                    >
                                        Terça-feira
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Quarta-feira'}
                                    >
                                        Quarta-feira
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Quinta-feira'}
                                    >
                                        Quinta-feira
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Sexta-feira'}
                                    >
                                        Sexta-feira
                                    </InputCheckboxBox>
                                    <InputCheckboxBox
                                        name="noites"
                                        value={'Sábado'}
                                    >
                                        Sábado
                                    </InputCheckboxBox>
                                </Stack>
                            </CheckboxGroup>

                            <Alert
                                className="mt-2"
                                justifyContent={'center'}
                                gap={2}
                            >
                                <Icons.Info className="!w-auto" />
                                <AlertDescription>
                                    <b>Atenção:</b> as noites não selecionadas
                                    serão automaticamente consideradas dia de
                                    semana.
                                </AlertDescription>
                            </Alert>
                        </section>

                        <section className="mt-4">
                            <Stack spacing={2}>
                                <h2 className="m-0">Períodos de hospedagem</h2>

                                <SelectBox
                                    name="priceAdjustment"
                                    options={[
                                        {
                                            value: 'Personalizado',
                                            label: 'Personalizado',
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
                                        value: 'Personalizado',
                                        label: 'Personalizado',
                                    }}
                                    label="Períodos de hospedagem"
                                />
                            </Stack>

                            <h3 className="mt-4 mb-2">
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap={2}
                                >
                                    Período de Hospedagem 1
                                    <button type="button">
                                        <Icons.Minus color="var(--clr-error)" />
                                    </button>
                                </Flex>
                            </h3>

                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <DateRangeBox
                                        asSingleDate
                                        label="Início do Período de Hospedagem"
                                        singleDateValue="01/12/2024"
                                    />
                                    <DateRangeBox
                                        asSingleDate
                                        label="Fim do Período de Hospedagem"
                                        singleDateValue="02/01/2025"
                                    />
                                </Stack>

                                <Button
                                    variant="outline"
                                    leftIcon={<Icons.Plus />}
                                >
                                    Adicionar período
                                </Button>
                            </Stack>
                        </section>

                        <SwitchBox
                            my={2}
                            label="Hospedar somente em dias específicos?"
                            defaultChecked
                            flexProps={{ justifyContent: 'space-between' }}
                        />

                        <CheckboxGroup defaultValue={['Sexta-feira', 'Sábado']}>
                            <Stack spacing={[2]} direction={['column']}>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Domingo'}
                                >
                                    Domingo
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Segunda-feira'}
                                >
                                    Segunda-feira
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Terça-feira'}
                                >
                                    Terça-feira
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Quarta-feira'}
                                >
                                    Quarta-feira
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Quinta-feira'}
                                >
                                    Quinta-feira
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Sexta-feira'}
                                >
                                    Sexta-feira
                                </InputCheckboxBox>
                                <InputCheckboxBox
                                    name="noites"
                                    value={'Sábado'}
                                >
                                    Sábado
                                </InputCheckboxBox>
                            </Stack>
                        </CheckboxGroup>
                    </Flex>

                    <Button type="submit">Salvar</Button>
                </Stack>
            </form>
        </div>
    )
}
