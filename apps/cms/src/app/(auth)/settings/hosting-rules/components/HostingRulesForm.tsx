import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react'
import { Info, PlusCircle, Trash } from 'lucide-react'
import { useState } from 'react'

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { SwitchBox } from '@/components/atoms/SwitchBox'

export const HostingRulesForm = () => {
    const [periods, setPeriods] = useState([
        { id: 1, startDate: '', endDate: '' },
    ])
    const [specificDays, setSpecificDays] = useState(false)

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
        <div>
            <Stack spacing={4}>
                <SelectBox
                    label="Horário do Check-in"
                    name="checkinTime"
                    options={[
                        { label: '14:00', value: '14:00' },
                        { label: '15:00', value: '15:00' },
                        { label: '16:00', value: '16:00' },
                        { label: '17:00', value: '17:00' },
                        { label: '18:00', value: '18:00' },
                        { label: '19:00', value: '19:00' },
                        { label: '20:00', value: '20:00' },
                        { label: '21:00', value: '21:00' },
                        { label: '22:00', value: '22:00' },
                        { label: '23:00', value: '23:00' },
                    ]}
                />
                <SelectBox
                    label="Horário do Check-out"
                    name="checkoutTime"
                    options={[
                        { label: '06:00', value: '06:00' },
                        { label: '07:00', value: '07:00' },
                        { label: '08:00', value: '08:00' },
                        { label: '09:00', value: '09:00' },
                        { label: '10:00', value: '10:00' },
                        { label: '11:00', value: '11:00' },
                        { label: '12:00', value: '12:00' },
                        { label: '13:00', value: '13:00' },
                    ]}
                />
                <InputNumberBox label="Mínimo de diárias" name="minDays" />
            </Stack>

            <Stack mt={8} spacing={4}>
                <h3 style={{ fontWeight: '600', marginBottom: '0' }}>
                    Noites do fim de semana
                </h3>
                <Flex justifyContent={'space-between'}>
                    <InputCheckboxBox name="sunday" value="sunday">
                        Domingo
                    </InputCheckboxBox>
                    <InputCheckboxBox name="monday" value="monday">
                        Segunda
                    </InputCheckboxBox>
                    <InputCheckboxBox name="tuesday" value="tuesday">
                        Terça
                    </InputCheckboxBox>
                    <InputCheckboxBox name="wednesday" value="wednesday">
                        Quarta
                    </InputCheckboxBox>
                    <InputCheckboxBox name="thursday" value="thursday">
                        Quinta
                    </InputCheckboxBox>
                    <InputCheckboxBox name="friday" value="friday">
                        Sexta
                    </InputCheckboxBox>
                    <InputCheckboxBox name="saturday" value="saturday">
                        Sábado
                    </InputCheckboxBox>
                </Flex>
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
                        isChecked={specificDays}
                        onChange={(e) => setSpecificDays(e.target.checked)}
                    />
                    <h3 style={{ fontWeight: '600', marginBottom: '0' }}>
                        Hospedar somente em dias específicos?
                    </h3>
                </Flex>
                {specificDays && (
                    <Flex justifyContent={'space-between'} wrap="wrap" gap={2}>
                        <InputCheckboxBox name="sunday2" value="sunday2">
                            Domingo
                        </InputCheckboxBox>
                        <InputCheckboxBox name="monday2" value="monday2">
                            Segunda
                        </InputCheckboxBox>
                        <InputCheckboxBox name="tuesday2" value="tuesday2">
                            Terça
                        </InputCheckboxBox>
                        <InputCheckboxBox name="wednesday2" value="wednesday2">
                            Quarta
                        </InputCheckboxBox>
                        <InputCheckboxBox name="thursday2" value="thursday2">
                            Quinta
                        </InputCheckboxBox>
                        <InputCheckboxBox name="friday2" value="friday2">
                            Sexta
                        </InputCheckboxBox>
                        <InputCheckboxBox name="saturday2" value="saturday2">
                            Sábado
                        </InputCheckboxBox>
                    </Flex>
                )}
            </Stack>
            <Stack mt={8}>
                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </div>
    )
}
