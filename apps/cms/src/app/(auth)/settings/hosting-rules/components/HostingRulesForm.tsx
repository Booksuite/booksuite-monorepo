import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    HStack,
    IconButton,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import { Info, PlusCircle, Trash } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { HostingRulesData } from '../utils/config'
import {
    AVAILABLE_WEEK_DAYS,
    CHECKIN_OPTIONS,
    CHECKOUT_OPTIONS,
    HOSTING_SPECIFIC_DAYS,
    OPENING_WINDOW,
    PERIODS,
    SPECIFIC_DAYS,
} from '../utils/contants'

export const HostingRulesForm = () => {
    const { getFieldProps, values, setFieldValue } =
        useFormikContext<HostingRulesData>()

    const [selectedOpening, setSelectedOpening] = useState<number | null>(null)
    const [selectedPeriods, setSelectedPeriods] = useState<number | null>(null)
    const [selectedSpecificDays, setSelectedSpecificDays] = useState<
        number | null
    >(null)

    const getDaysForPeriod = (selectedPeriods: number | null) => {
        switch (selectedPeriods) {
            case 0:
                return 90
            case 1:
                return 180
            case 2:
                return 365
            case 3:
                return 730
            default:
                return ''
        }
    }

    const [periods, setPeriods] = useState([
        { id: 1, startDate: '', endDate: '' },
    ])

    const addPeriod = () => {
        setPeriods([
            ...periods,
            { id: periods.length + 1, startDate: '', endDate: '' },
        ])
    }

    const removePeriod = (id: number) => {
        setPeriods(periods.filter((period) => period.id !== id))
    }

    return (
        <Form>
            <div>
                <Stack spacing={4}>
                    <Select
                        size="lg"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setFieldValue('checkIn', e.target.value)
                        }
                    >
                        <option value="" disabled selected hidden>
                            Horário do Check-In
                        </option>
                        {CHECKIN_OPTIONS.map(({ label }, index) => (
                            <option key={index} value={index}>
                                {label}
                            </option>
                        ))}
                    </Select>

                    <Select
                        size="lg"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setFieldValue('checkOut', e.target.value)
                        }
                    >
                        <option value="" disabled selected hidden>
                            Horário do Check-Out
                        </option>
                        {CHECKOUT_OPTIONS.map(({ label }, index) => (
                            <option key={index} value={index}>
                                {label}
                            </option>
                        ))}
                    </Select>

                    <InputNumberBox
                        label="Mínimo de diárias"
                        {...getFieldProps('minDaily').value}
                        onChange={(e) =>
                            setFieldValue('minDaily', e.target.value)
                        }
                    />
                </Stack>

                <Stack mt={8} spacing={4}>
                    <h3 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Noites do fim de semana
                    </h3>
                    <CheckboxGroup
                        value={values.availableWeekend}
                        onChange={(newValue) => {
                            setFieldValue(
                                'availableWeekend',
                                newValue.map(Number),
                            )
                        }}
                    >
                        <Flex gap={2} justifyContent={'space-between'}>
                            {AVAILABLE_WEEK_DAYS.map((night) => (
                                <Checkbox key={night.name} value={night.value}>
                                    {night.name}`
                                </Checkbox>
                            ))}
                        </Flex>
                    </CheckboxGroup>
                    <Box
                        bg={'gray.100'}
                        p={3}
                        borderRadius={'md'}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Flex align="center" gap={2}>
                            <Info size={23} color={'#0B1F51'} />
                            <Text fontSize={'md'} color={'#0B1F51'}>
                                <b>Atenção:</b> as noites não selecionadas serão
                                automaticamente consideradas dia de semana.
                            </Text>
                        </Flex>
                    </Box>
                </Stack>

                <Stack mt={8} spacing={4}>
                    <h2 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Janela de Disponibilidade
                    </h2>

                    <Select
                        size="lg"
                        value={selectedOpening || ''}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            const value = Number(e.target.value)
                            setSelectedOpening(value)
                        }}
                    >
                        <option value="" disabled selected hidden>
                            Selecione a janela de abertura de hospedagem
                        </option>
                        {OPENING_WINDOW.map(({ label }, index) => (
                            <option key={index} value={index}>
                                {label}
                            </option>
                        ))}
                    </Select>

                    {selectedOpening === 0 && (
                        <Select
                            size="lg"
                            value={selectedPeriods || ''}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value)
                                setSelectedPeriods(value)
                            }}
                        >
                            <option value="" disabled selected hidden>
                                Selecione o período
                            </option>
                            {PERIODS.map(({ label }, index) => (
                                <option key={index} value={index}>
                                    {label}
                                </option>
                            ))}
                        </Select>
                    )}

                    {selectedPeriods !== 4 ? (
                        <InputBox
                            label="Janela de abertura (dias)"
                            value={getDaysForPeriod(selectedPeriods)}
                            isDisabled
                        />
                    ) : (
                        <InputNumberBox
                            label="Janela de abertura (dias)"
                            {...getFieldProps('fixedWindowPeriod')}
                            onChange={(e) =>
                                setFieldValue(
                                    'fixedWindowPeriod',
                                    e.target.value,
                                )
                            }
                        />
                    )}

                    {selectedOpening === 1 &&
                        periods.map((period, index) => (
                            <Box key={period.id} w="100%">
                                <Flex gap={4} alignItems="center">
                                    <h3
                                        style={{
                                            fontWeight: '600',
                                            margin: '0',
                                        }}
                                    >
                                        Período de Hospedagem {index + 1}
                                    </h3>
                                    <IconButton
                                        aria-label="Remover período"
                                        icon={<Trash />}
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => removePeriod(period.id)}
                                    />
                                </Flex>
                                <HStack mt={3} spacing={3}>
                                    <DateRangeBox
                                        label="Início do Período de Hospedagem"
                                        name={`startDate-${period.id}`}
                                    />
                                    <DateRangeBox
                                        label="Fim do Período de Hospedagem"
                                        name={`endDate-${period.id}`}
                                    />
                                </HStack>
                            </Box>
                        ))}
                    {selectedOpening === 1 && (
                        <Button
                            leftIcon={<PlusCircle />}
                            colorScheme="blue"
                            variant="outline"
                            onClick={addPeriod}
                            size={'lg'}
                        >
                            Adicionar período
                        </Button>
                    )}
                </Stack>
                <Stack mt={8} spacing={4}>
                    <Flex alignItems="center" gap={2}>
                        <Select
                            size="lg"
                            value={selectedSpecificDays || ''}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                const value = Number(e.target.value)
                                setSelectedSpecificDays(value)
                            }}
                        >
                            <option value="" disabled selected hidden>
                                Dias de Funcionamento
                            </option>
                            {SPECIFIC_DAYS.map(({ label }, index) => (
                                <option key={index} value={index}>
                                    {label}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                    {selectedSpecificDays === 1 && (
                        <CheckboxGroup
                            value={values.availableWeekDays}
                            onChange={(newValue) => {
                                setFieldValue(
                                    'availableWeekDays',
                                    newValue.map(Number),
                                )
                            }}
                        >
                            <Flex gap={2} justifyContent={'space-between'}>
                                {HOSTING_SPECIFIC_DAYS.map((night) => (
                                    <Checkbox
                                        key={night.name}
                                        value={night.value}
                                    >
                                        {night.name}`
                                    </Checkbox>
                                ))}
                            </Flex>
                        </CheckboxGroup>
                    )}
                </Stack>
            </div>
        </Form>
    )
}
