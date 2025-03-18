'use client'

import {
    Button,
    CheckboxGroup,
    Flex,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import React from 'react'

import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { OfferCouponsFormData } from '../utils/config'

export const OfferCouponsForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<OfferCouponsFormData>()

    const categories = [
        { id: 1, name: 'Chalé Diamante' },
        { id: 2, name: 'Suíte Deluxe' },
    ]

    const paymentMethods = [
        { id: 1, name: 'Pix' },
        { id: 2, name: 'Cartão de Crédito' },
        { id: 3, name: 'No Hotel' },
    ]

    const optionsBill = [
        { value: 'PER_NIGHT', label: 'Desconto em Percentual' },
    ]

    const validNights = [
        { id: 'monday', name: 'Segunda-feira' },
        { id: 'tuesday', name: 'Terça-feira' },
        { id: 'wednesday', name: 'Quarta-feira' },
        { id: 'thursday', name: 'Quinta-feira' },
        { id: 'friday', name: 'Sexta-feira' },
        { id: 'saturday', name: 'Sábado' },
        { id: 'sunday', name: 'Domingo' },
    ]

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

                {/* Adicionar Campo Date Faltante (Esperar o a PR do service ser mergeada pra pegar o componente DatePickerBox)       */}
                {/* <section>
                    <Text as="h2">Períodos Válidos</Text>
                </section> */}

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

                    <CheckboxGroup
                        value={values.housingUnitTypes.map((c) => c.id)}
                        onChange={(selectedIds) => {
                            const selectedCategories = categories.filter(
                                (cat) => selectedIds.includes(cat.id),
                            )
                            setFieldValue(
                                'housingUnitTypes',
                                selectedCategories,
                            )
                        }}
                    >
                        <Stack spacing={2} direction="column">
                            {categories.map((cat) => (
                                <InputCheckboxBox
                                    key={cat.id}
                                    value={cat.id}
                                    isChecked={values.housingUnitTypes.some(
                                        (c) => c.id === cat.id,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const newCategories = isChecked
                                            ? [...values.housingUnitTypes, cat]
                                            : values.housingUnitTypes.filter(
                                                  (c) => c.id !== cat.id,
                                              )
                                        setFieldValue(
                                            'housingUnitTypes',
                                            newCategories,
                                        )
                                    }}
                                >
                                    {cat.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <Text as="h3">Formas de Pagamento</Text>

                    <CheckboxGroup
                        value={values.paymentMethods.map((p) => p.id)}
                        onChange={(selectedIds) => {
                            const selectedMethods = paymentMethods.filter((p) =>
                                selectedIds.includes(p.id),
                            )
                            setFieldValue('paymentMethods', selectedMethods)
                        }}
                    >
                        <Stack spacing={2} direction="column">
                            {paymentMethods.map((p) => (
                                <InputCheckboxBox
                                    key={p.id}
                                    value={p.id}
                                    isChecked={values.paymentMethods.some(
                                        (p2) => p2.id === p2.id,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const newMethods = isChecked
                                            ? [...values.paymentMethods, p]
                                            : values.paymentMethods.filter(
                                                  (p2) => p2.id !== p.id,
                                              )
                                        setFieldValue(
                                            'paymentMethods',
                                            newMethods,
                                        )
                                    }}
                                >
                                    {p.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <Text as="h3">Noites válidas</Text>
                    <CheckboxGroup
                        value={values.nights}
                        onChange={(selectedIds) =>
                            setFieldValue('validNights', selectedIds)
                        }
                    >
                        <Stack spacing={2} direction="column">
                            {validNights.map((night) => (
                                <InputCheckboxBox
                                    key={night.name}
                                    value={night.name}
                                    isChecked={values.nights.includes(
                                        night.name,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const updatedNights = isChecked
                                            ? [...values.nights, night.name]
                                            : values.nights.filter(
                                                  (id) => id !== night.name,
                                              )
                                        setFieldValue('nights', updatedNights)
                                    }}
                                >
                                    {night.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <Text as={'h2'}>Ajuste de Preço por Diária</Text>
                    <Stack gap={2}>
                        <SelectBox
                            label="Tipo de Variação de Preço"
                            options={optionsBill}
                            onChange={(selectedOption: any) =>
                                setFieldValue('billType', selectedOption?.value)
                            }
                            value={optionsBill.find(
                                (opt) =>
                                    opt.value === values.priceVariationsType,
                            )}
                        />

                        {/* Passar o tipo desse campo para porcentagem ao invés de currency */}
                        <InputBox
                            label="Valor"
                            type="currency"
                            error={errors.priceVariationValue}
                            formControl={{
                                isInvalid:
                                    !!errors.priceVariationValue &&
                                    touched.priceVariationValue,
                            }}
                            {...getFieldProps('priceVariationValue')}
                        />
                    </Stack>
                </section>

                <section>
                    <Text as={'h4'}>Regras de Exibição</Text>

                    <Stack gap={1}>
                        <Flex justify="space-between" align="center">
                            <Text as="h3">Exibir nos destaques do Site</Text>
                            <Switch
                                {...getFieldProps('showOnFeatures')}
                                isChecked={values.showOnFeatures}
                                onChange={(e) =>
                                    setFieldValue(
                                        'showOnFeatures',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>

                        <Flex justify="space-between" align="center">
                            <Text as="h3">Mostrar Tag de Desconto</Text>
                            <Switch
                                {...getFieldProps('showDiscountTag')}
                                isChecked={values.showDiscountTag}
                                onChange={(e) =>
                                    setFieldValue(
                                        'showDiscountTag',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <Text as="h3">Oferta Exclusiva com Cupom?</Text>
                            <Switch
                                {...getFieldProps('coupon')}
                                isChecked={values.coupon}
                                onChange={(e) =>
                                    setFieldValue('coupon', e.target.checked)
                                }
                            />
                        </Flex>

                        <Flex direction={'column'} gap={2}>
                            {values.coupon ? (
                                <InputBox
                                    label="Código de Cupom"
                                    maxLength={250}
                                    error={errors.couponCode}
                                    formControl={{
                                        isInvalid:
                                            !!errors.couponCode &&
                                            touched.couponCode,
                                    }}
                                    {...getFieldProps('couponCode')}
                                />
                            ) : undefined}
                        </Flex>
                    </Stack>
                </section>

                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
