import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import { Info, PlusCircle, Trash } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { SwitchBox } from '@/components/atoms/SwitchBox'
import { HostingRulesData } from '../utils/config'
import { AVAILABLE_WEEK_DAYS, HOSTING_SPECIFIC_DAYS } from '../utils/contants'

export const HostingRulesForm = () => {
    const { getFieldProps, values, setFieldValue } =
        useFormikContext<HostingRulesData>()

    const checkInOptions = [
        { label: '14:00', value: 14 },
        { label: '15:00', value: 15 },
        { label: '16:00', value: 16 },
        { label: '17:00', value: 17 },
        { label: '18:00', value: 18 },
        { label: '19:00', value: 19 },
        { label: '20:00', value: 20 },
        { label: '21:00', value: 21 },
        { label: '22:00', value: 22 },
        { label: '23:00', value: 23 },
    ]

    const checkOutOptions = [
        { label: '06:00', value: 6 },
        { label: '07:00', value: 7 },
        { label: '08:00', value: 8 },
        { label: '09:00', value: 9 },
        { label: '10:00', value: 10 },
        { label: '11:00', value: 11 },
        { label: '12:00', value: 12 },
        { label: '13:00', value: 13 },
    ]

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
                    <SelectBox
                        label="Horário do Check-in"
                        options={checkInOptions}
                        value={checkInOptions.find(
                            (o) => o.value === getFieldProps('checkIn').value,
                        )}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setFieldValue('checkIn', e.target.value)
                        }
                    />
                    <SelectBox
                        label="Horário do Check-out"
                        name="checkoutTime"
                        options={checkOutOptions}
                        value={checkOutOptions.find(
                            (o) => o.value === getFieldProps('checkIn').value,
                        )}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            setFieldValue('checkOut', e.target.value)
                        }
                    />
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
                        <Stack spacing={2} justifyContent={'space-between'}>
                            {AVAILABLE_WEEK_DAYS.map((night) => (
                                <Checkbox key={night.name} value={night.value}>
                                    {night.name}`
                                </Checkbox>
                            ))}
                        </Stack>
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
                        Períodos de hospedagem
                    </h2>
                    {periods.map((period, index) => (
                        <Box key={period.id} w="100%">
                            <Flex gap={4} alignItems="center">
                                <h3 style={{ fontWeight: '600', margin: '0' }}>
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
                    <Button
                        leftIcon={<PlusCircle />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={addPeriod}
                        size={'lg'}
                    >
                        Adicionar período
                    </Button>
                </Stack>
                <Stack mt={8} spacing={4}>
                    <Flex alignItems="center" gap={2}>
                        <SwitchBox
                            name="specificDays"
                            isChecked={values.hostingOnSpecificDays}
                            onChange={(e) =>
                                setFieldValue(
                                    'hostingOnSpecificDays',
                                    e.target.checked,
                                )
                            }
                        />
                        <h3 style={{ fontWeight: '600', marginBottom: '0' }}>
                            Hospedar somente em dias específicos?
                        </h3>
                    </Flex>
                    {values.hostingOnSpecificDays && (
                        <CheckboxGroup
                            value={values.hostingOnSpecificDays}
                            onChange={(newValue) => {
                                setFieldValue(
                                    'hostingOnSpecificDays',
                                    newValue.map(Number),
                                )
                            }}
                        >
                            <Stack spacing={2} justifyContent={'space-between'}>
                                {HOSTING_SPECIFIC_DAYS.map((night) => (
                                    <Checkbox
                                        key={night.name}
                                        value={night.value}
                                    >
                                        {night.name}`
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    )}
                </Stack>
                <Stack mt={8}>
                    <Button type="submit" size="lg">
                        Salvar
                    </Button>
                </Stack>
            </div>
        </Form>
    )
}
