import { CheckboxGroup, Flex, Stack, Switch, Text } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { OfferCouponsFormData } from '../utils/config'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'

export const OfferCouponsForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<OfferCouponsFormData>()

    return (
        <Form>
            <Stack gap={8}>
                <Flex direction={'column'} gap={2}>
                    <InputBox
                        label="Nome da Oferta"
                        maxLength={250}
                        error={errors.description}
                        formControl={{
                            isInvalid:
                                !!errors.description && touched.description,
                        }}
                        {...getFieldProps('name')}
                    />
                    <TextAreaBox
                        label="Descrição"
                        maxLength={250}
                        error={errors.description}
                        formControl={{
                            isInvalid:
                                !!errors.description && touched.description,
                        }}
                        {...getFieldProps('description')}
                    />
                </Flex>

                <section>
                    <Text as="h2">Condições de Aplicabilidade</Text>

                    <Stack gap={2}>
                        <InputNumberBox
                            label="Estádia Minima (opcional)"
                            error={errors.minDaily}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.minDaily && touched.minDaily,
                            }}
                            {...getFieldProps('minDaily')}
                            onChange={handleChange('minDaily')}
                        />

                        <InputNumberBox
                            label="Estádia Máxima (opcional)"
                            error={errors.maxDaily}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxDaily && touched.maxDaily,
                            }}
                            {...getFieldProps('maxDaily')}
                            onChange={handleChange('maxDaily')}
                        />

                        <InputNumberBox
                            label="Antecedência Mínima (opcional)"
                            error={errors.minNotice}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.minNotice && touched.minNotice,
                            }}
                            {...getFieldProps('minNotice')}
                            onChange={handleChange('minNotice')}
                        />

                        <InputNumberBox
                            label="Antecedência Máxima (opcional)"
                            error={errors.maxNotice}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxNotice && touched.maxNotice,
                            }}
                            {...getFieldProps('maxNotice')}
                            onChange={handleChange('maxNotice')}
                        />

                        <Flex justify="space-between" align="center">
                            <Text as="h3">Válido para reservas abandonada</Text>
                            <Switch
                                {...getFieldProps('validCancelledReservation')}
                                isChecked={values.validCancelledReservation}
                                onChange={(e) =>
                                    setFieldValue(
                                        'validCancelledReservation',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>

                        <Flex justify="space-between" align="center">
                            <Text as="h3">Válido para Pacotes e Feriados</Text>
                            <Switch
                                {...getFieldProps('validPackagesAndHolidays')}
                                isChecked={values.validPackagesAndHolidays}
                                onChange={(e) =>
                                    setFieldValue(
                                        'validPackagesAndHolidays',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>
                    </Stack>
                </section>
                
                <section>
                    <Text as="h3">Categorias válidas</Text>

                    {/*TODO - Checkboxes */}
                </section>
            </Stack>
        </Form>
    )
}
