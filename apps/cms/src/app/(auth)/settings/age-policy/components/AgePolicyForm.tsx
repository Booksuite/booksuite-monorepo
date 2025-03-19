import { Button, HStack, Stack, Switch, Text, VStack } from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CircleMinus, CirclePlus } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'

export type AgePolicyFormData = {
    acceptChildren: boolean
    adultMinAge: number
    ageGroups: { initialAge: number; finalAge: number; chargeType: string }[]
}

export const AgePolicyForm = () => {
    const { getFieldProps, touched, errors, values, setFieldValue } =
        useFormikContext<AgePolicyFormData>()

    return (
        <Form>
            <Stack spacing={4}>
                <h2>Adultos</h2>
                <InputNumberBox
                    label="Idade inicial para adultos"
                    error={errors.adultMinAge}
                    formControl={{
                        isInvalid: !!errors.adultMinAge && touched.adultMinAge,
                    }}
                    {...getFieldProps('adultMinAge')}
                />
                <Text fontSize="sm" color="gray.500">
                    Importante: selecione acima qual idade o sistema deve
                    considerar adulto (cobrando valor integral).
                </Text>

                <h2>Crianças</h2>
                <HStack justifyContent={'space-between'}>
                    <h2 style={{ fontWeight: 400 }}>Aceitar Crianças</h2>
                    <Switch
                        isChecked={values.acceptChildren}
                        onChange={(e) =>
                            setFieldValue('acceptChildren', e.target.checked)
                        }
                    />
                </HStack>

                {values.acceptChildren && (
                    <FieldArray name="ageGroups">
                        {({ push, remove }) => (
                            <Stack spacing={4}>
                                {values.ageGroups.map((_, index) => {
                                    const error =
                                        typeof errors.ageGroups?.[index] ===
                                        'object'
                                            ? errors.ageGroups[index]
                                            : undefined

                                    return (
                                        <VStack
                                            key={index}
                                            spacing={2}
                                            alignItems={'start'}
                                        >
                                            <HStack
                                                justifyContent="space-between"
                                                w="100%"
                                            >
                                                <h2>
                                                    Faixa Etária - Crianças{' '}
                                                    {index + 1}
                                                </h2>
                                                <Button
                                                    rightIcon={<CircleMinus />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                />
                                            </HStack>
                                            <InputNumberBox
                                                label="Idade Inicial"
                                                error={error?.initialAge}
                                                formControl={{
                                                    isInvalid:
                                                        !!error?.initialAge &&
                                                        touched.ageGroups?.[
                                                            index
                                                        ]?.initialAge,
                                                }}
                                                {...getFieldProps(
                                                    `ageGroups.${index}.initialAge`,
                                                )}
                                            />
                                            <InputNumberBox
                                                label="Idade Final"
                                                error={error?.finalAge}
                                                formControl={{
                                                    isInvalid:
                                                        !!error?.finalAge &&
                                                        touched.ageGroups?.[
                                                            index
                                                        ]?.finalAge,
                                                }}
                                                {...getFieldProps(
                                                    `ageGroups.${index}.finalAge`,
                                                )}
                                            />
                                            <InputBox
                                                label="Tipo de cobrança"
                                                error={error?.chargeType}
                                                formControl={{
                                                    isInvalid:
                                                        !!error?.chargeType &&
                                                        touched.ageGroups?.[
                                                            index
                                                        ]?.chargeType,
                                                }}
                                                {...getFieldProps(
                                                    `ageGroups.${index}.chargeType`,
                                                )}
                                            />
                                        </VStack>
                                    )
                                })}
                                <Button
                                    mt={3}
                                    variant="outline"
                                    width={'100%'}
                                    leftIcon={<CirclePlus size={16} />}
                                    mb={4}
                                    onClick={() =>
                                        push({
                                            initialAge: 0,
                                            finalAge: 0,
                                            chargeType: '',
                                        })
                                    }
                                >
                                    Adicionar Faixa Etária
                                </Button>
                            </Stack>
                        )}
                    </FieldArray>
                )}

                <Button type="submit">Salvar</Button>
            </Stack>
        </Form>
    )
}
