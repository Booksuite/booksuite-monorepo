import {
    Box,
    Button,
    HStack,
    Stack,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'

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
                <Button type="submit">Salvar</Button>
            </Stack>
        </Form>
    )
}
