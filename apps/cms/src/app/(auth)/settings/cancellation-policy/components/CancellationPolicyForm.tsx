import {
    Box,
    Button,
    HStack,
    IconButton,
    Stack,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CircleMinus, CirclePlus } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { CancellationPolicyFormData } from '../utils/config'

export const CancellationPolicyForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<CancellationPolicyFormData>()

    return (
        <Form>
            <Stack spacing={4}>
                <HStack justifyContent={'space-between'}>
                    <h2 style={{ fontWeight: '600' }}>
                        Aplicar taxa de cancelamento
                    </h2>
                    <Switch
                        isChecked={
                            values.defaultPenaltyBy !== 'FIRST_NIGHT_AMOUNT'
                        }
                        onChange={(e) =>
                            setFieldValue(
                                'defaultPenaltyBy',
                                e.target.checked
                                    ? 'RESERVATION_PERCENTAGE'
                                    : 'FIRST_NIGHT_AMOUNT',
                            )
                        }
                    />
                </HStack>
                {values.defaultPenaltyBy !== 'FIRST_NIGHT_AMOUNT' && (
                    <VStack spacing={4} alignItems={'start'}>
                        <h2 style={{ fontWeight: 400 }}>
                            Regras de cancelamento padrão
                        </h2>
                        <SelectBox
                            label="Seletor de penalização"
                            error={errors.defaultPenaltyBy}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultPenaltyBy &&
                                    touched.defaultPenaltyBy,
                            }}
                            {...getFieldProps('defaultPenaltyBy')}
                            onChange={handleChange('defaultPenaltyBy')}
                        ></SelectBox>
                        <InputBox
                            label="Valor padrão (%)"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            onChange={handleChange('defaultValue')}
                        />
                        <InputNumberBox
                            label="Período de desistência (dias)"
                            error={errors.defaultValue}
                            formControl={{
                                isInvalid:
                                    !!errors.defaultValue &&
                                    touched.defaultValue,
                            }}
                            {...getFieldProps('defaultValue')}
                            onChange={handleChange('defaultValue')}
                        />
                        <Box
                            bg={'gray.100'}
                            p={3}
                            borderRadius={'md'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <Text fontSize={'md'} color={'#0B1F51'}>
                                A <b>taxa de cancelamento padrão</b> é aplicada
                                sempre que uma reserva for cancelada após o{' '}
                                <b>período de arrependimento</b> da compra de
                                acordo com o CDC (código de defesa do consumidor
                                - artigo 49).
                                <br />
                                <br />
                                <b>
                                    Dentro do período de desistência é
                                    reembolsado 100% do valor pago.
                                </b>
                            </Text>
                        </Box>
                    </VStack>
                )}

                <HStack justifyContent={'space-between'} mt={4}>
                    <h2 style={{ fontWeight: '600' }}>
                        Aplicar taxas de penalização personalizadas
                    </h2>
                    <Switch
                    /*isChecked={values.enablePenaltyRanges}
                        onChange={(e) =>
                            setFieldValue(
                                'enablePenaltyRanges',
                                e.target.checked,
                            )
                        }*/
                    />
                </HStack>

                {/* add {values.enablePenaltyRanges && (*/}
                {values.defaultPenaltyBy && (
                    <FieldArray name="penaltyRanges">
                        {({ push, remove }) => (
                            <VStack alignItems={'start'}>
                                {values.penaltyRanges.map((penalty, index) => (
                                    <Stack
                                        key={index}
                                        p={4}
                                        w="100%"
                                        spacing={4}
                                    >
                                        <HStack
                                            justifyContent={'space-between'}
                                        >
                                            <h3>
                                                Taxa de penalização {index + 1}
                                            </h3>
                                            <IconButton
                                                icon={<CircleMinus />}
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => remove(index)}
                                                aria-label={''}
                                            />
                                        </HStack>
                                        <InputNumberBox
                                            label="Dias antes do check-in"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.daysBeforeCheckIn`,
                                            )}
                                            onChange={handleChange(
                                                `penaltyRanges.${index}.daysBeforeCheckIn`,
                                            )}
                                        />
                                        <SelectBox
                                            label="Seletor de penalização"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.penaltyBy`,
                                            )}
                                        />
                                        <InputBox
                                            label="Valor em %"
                                            {...getFieldProps(
                                                `penaltyRanges.${index}.value`,
                                            )}
                                        />
                                        <Button
                                            mt={3}
                                            variant="outline"
                                            width={'100%'}
                                            leftIcon={<CirclePlus size={16} />}
                                            mb={4}
                                            onClick={() =>
                                                push({
                                                    daysBeforeCheckIn: '',
                                                    penaltyBy:
                                                        'RESERVATION_PERCENTAGE',
                                                    value: '',
                                                })
                                            }
                                        >
                                            Adicionar taxa de penalização
                                        </Button>
                                        <Box
                                            bg={'gray.100'}
                                            p={3}
                                            borderRadius={'md'}
                                            display={'flex'}
                                            alignItems={'center'}
                                        >
                                            <Text
                                                fontSize={'md'}
                                                color={'#0B1F51'}
                                            >
                                                As taxas adicionais de
                                                cancelamento são multas
                                                aplicadas para cancelamentos
                                                próximos à data do check-in,
                                                podendo haver uma ou mais taxas
                                                adicionais.
                                                <br />
                                                <br />
                                                <b>Atenção:</b> esta taxa não é
                                                cumulativa com a taxa de
                                                cancelamento padrão.
                                                <br />
                                                <br />
                                                Essa cobrança visa compensar
                                                possíveis perdas do
                                                estabelecimento, garantindo um
                                                ressarcimento adequado diante do
                                                risco de não conseguir realocar
                                                a acomodação no mesmo período.
                                            </Text>
                                        </Box>
                                    </Stack>
                                ))}
                            </VStack>
                        )}
                    </FieldArray>
                )}

                <Button type="submit">Salvar</Button>
            </Stack>
        </Form>
    )
}
