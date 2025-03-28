import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus, Info, Trash } from 'lucide-react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { AgePolicyFormData } from '../utils/config'
import { AGE_GROUP_CHARGE_TYPE } from '../utils/constants'

export const AgePolicyForm = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<AgePolicyFormData>()

    return (
        <Form>
            <Stack spacing={8} mt={4}>
                <Stack spacing={4}>
                    <h2 style={{ marginBottom: '0' }}>Adultos</h2>
                    <InputNumberBox
                        label="Idade inicial para adultos"
                        error={errors.adultMinAge}
                        formControl={{
                            isInvalid:
                                !!errors.adultMinAge && touched.adultMinAge,
                        }}
                        {...getFieldProps('adultMinAge')}
                        onChange={handleChange('adultMinAge')}
                    />
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
                                <b>Importante:</b> selecione acima qual idade o
                                sistema deve considerar adulto (cobrando valor
                                integral).
                            </Text>
                        </Flex>
                    </Box>
                </Stack>

                <Stack gap={4} mt={4}>
                    <h2 style={{ marginBottom: '0' }}>Crianças</h2>
                    <Flex alignItems={'center'} gap={2}>
                        <Switch
                            isChecked={values.acceptChildren}
                            onChange={(e) =>
                                setFieldValue(
                                    'acceptChildren',
                                    e.target.checked,
                                )
                            }
                        />
                        <h2 style={{ fontWeight: '400', marginBottom: '0' }}>
                            Aceitar Crianças
                        </h2>
                    </Flex>
                </Stack>

                {values.acceptChildren && (
                    <FieldArray name="ageGroups">
                        {({ push, remove }) => (
                            <Grid templateColumns="1fr" gap={8}>
                                {values.ageGroups.map((_, index) => {
                                    const error =
                                        typeof errors.ageGroups?.[index] ===
                                        'object'
                                            ? errors.ageGroups[index]
                                            : undefined

                                    return (
                                        <Grid
                                            key={index}
                                            templateColumns="1fr"
                                            gap={2}
                                        >
                                            <Flex alignItems="center" gap={2}>
                                                <h2
                                                    style={{
                                                        fontWeight: '400',
                                                        marginBottom: '0',
                                                    }}
                                                >
                                                    Faixa Etária - Crianças{' '}
                                                    {index + 1}
                                                </h2>
                                                <IconButton
                                                    icon={<Trash />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    aria-label="Remove"
                                                />
                                            </Flex>
                                            <Grid
                                                templateColumns="repeat(2, 1fr)"
                                                gap={2}
                                            >
                                                <GridItem>
                                                    <InputNumberBox
                                                        label="Idade Inicial"
                                                        error={
                                                            error?.initialAge
                                                        }
                                                        formControl={{
                                                            isInvalid:
                                                                !!error?.initialAge &&
                                                                touched
                                                                    .ageGroups?.[
                                                                    index
                                                                ]?.initialAge,
                                                        }}
                                                        {...getFieldProps(
                                                            `ageGroups.${index}.initialAge`,
                                                        )}
                                                        onChange={handleChange(
                                                            `ageGroups.${index}.initialAge`,
                                                        )}
                                                    />
                                                </GridItem>
                                                <GridItem>
                                                    <InputNumberBox
                                                        label="Idade Final"
                                                        error={error?.finalAge}
                                                        formControl={{
                                                            isInvalid:
                                                                !!error?.finalAge &&
                                                                touched
                                                                    .ageGroups?.[
                                                                    index
                                                                ]?.finalAge,
                                                        }}
                                                        {...getFieldProps(
                                                            `ageGroups.${index}.finalAge`,
                                                        )}
                                                        onChange={handleChange(
                                                            `ageGroups.${index}.finalAge`,
                                                        )}
                                                    />
                                                </GridItem>
                                                <GridItem>
                                                    <SelectBox
                                                        label="Tipo de cobrança"
                                                        error={
                                                            error?.chargeType
                                                        }
                                                        formControl={{
                                                            isInvalid:
                                                                !!error?.chargeType &&
                                                                touched
                                                                    .ageGroups?.[
                                                                    index
                                                                ]?.chargeType,
                                                        }}
                                                        options={Object.entries(
                                                            AGE_GROUP_CHARGE_TYPE,
                                                        ).map(
                                                            ([
                                                                value,
                                                                label,
                                                            ]) => ({
                                                                label,
                                                                value,
                                                            }),
                                                        )}
                                                        placeholder="Tipo de Cobrança"
                                                        isSearchable={false}
                                                        closeMenuOnSelect
                                                        value={
                                                            values.ageGroups?.[
                                                                index
                                                            ]?.chargeType
                                                                ? Object.entries(
                                                                      AGE_GROUP_CHARGE_TYPE,
                                                                  )
                                                                      .map(
                                                                          ([
                                                                              value,
                                                                              label,
                                                                          ]) => ({
                                                                              label,
                                                                              value,
                                                                          }),
                                                                      )
                                                                      .find(
                                                                          (
                                                                              opt,
                                                                          ) =>
                                                                              opt.value ===
                                                                              (values
                                                                                  .ageGroups[
                                                                                  index
                                                                              ]
                                                                                  ?.chargeType as string),
                                                                      ) || null
                                                                : null
                                                        }
                                                        onChange={(
                                                            option: {
                                                                value: string
                                                            } | null,
                                                        ) =>
                                                            setFieldValue(
                                                                `ageGroups.${index}.chargeType`,
                                                                option?.value ||
                                                                    '',
                                                            )
                                                        }
                                                    />
                                                </GridItem>
                                                {values.ageGroups[index]
                                                    ?.chargeType !== 'FREE' && (
                                                    <GridItem>
                                                        <InputBox
                                                            label="Valor a ser cobrado"
                                                            type="currency"
                                                            error={error?.value}
                                                            formControl={{
                                                                isInvalid:
                                                                    !!error?.value &&
                                                                    touched
                                                                        .ageGroups?.[
                                                                        index
                                                                    ]?.value,
                                                            }}
                                                            {...getFieldProps(
                                                                `ageGroups.${index}.value`,
                                                            )}
                                                            onChange={handleChange(
                                                                `ageGroups.${index}.value`,
                                                            )}
                                                        />
                                                    </GridItem>
                                                )}
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                <Button
                                    mt={3}
                                    variant="outline"
                                    width={'100%'}
                                    leftIcon={<CirclePlus size={16} />}
                                    mb={4}
                                    size={'lg'}
                                    onClick={() =>
                                        push({
                                            initialAge: 0,
                                            finalAge: 0,
                                            value: 0,
                                            chargeType: '',
                                        })
                                    }
                                >
                                    Adicionar Faixa Etária
                                </Button>
                            </Grid>
                        )}
                    </FieldArray>
                )}
            </Stack>
        </Form>
    )
}
