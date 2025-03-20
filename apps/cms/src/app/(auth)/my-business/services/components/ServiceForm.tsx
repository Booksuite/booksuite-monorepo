'use client'

import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    Select,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus } from 'lucide-react'
import type React from 'react'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { DatePickerBox } from '@/components/atoms/DatePickerBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import type { ServiceFormData } from '../utils/config'
import { VALID_NIGHTS } from '../utils/constants'

export const ServiceForm: React.FC = () => {
    interface availableHousingUnitTypes {
        id: string
        name: string
    }

    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<ServiceFormData>()

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading: isLoadingHousingUnitTypes } =
        useSearchHousingUnitTypes(
            {
                companyId: companyId,
            },
            {
                pagination: { itemsPerPage: 100, page: 1 },
            },
        )

    const companyId = useCurrentCompanyId()
    const {
        data: housingUnitTypes,
        isLoading: isLoadingHousingUnitTypes,
        error,
    } = useSearchHousingUnitTypes(
        {
            companyId: companyId,
        },
        {
            pagination: { itemsPerPage: 100, page: 1 },
        },
    )

    housingUnitTypes?.items.map((housing) => {
        availablehousingUnitTypes.push({ id: housing.id, name: housing.name })
    })

    return (
        <Form>
            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Experiência"
                        error={errors.name}
                        formControl={{
                            isInvalid: !!errors.name && touched.name,
                        }}
                        {...getFieldProps('name')}
                    />

                    <InputBox
                        label="Preço Final da Experiência"
                        type="currency"
                        error={errors.price}
                        formControl={{
                            isInvalid: !!errors.price && touched.price,
                        }}
                        {...getFieldProps('price')}
                        onChange={handleChange('price')}
                    />

                    <Select
                        size="lg"
                        onChange={(selectedOption) =>
                            setFieldValue(
                                'billingType',
                                selectedOption.target.value,
                            )
                        }
                    >
                        <option value="" disabled selected hidden>
                            Selecione um tipo de cobrança
                        </option>
                        {Object.entries(BILLING_TYPE_MAPPING).map(
                            ([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ),
                        )}
                    </Select>

                    <InputNumberBox
                        label="Mínimo de Diárias"
                        min={1}
                        error={errors.minDaily}
                        formControl={{
                            isInvalid: !!errors.minDaily && touched.minDaily,
                        }}
                        {...getFieldProps('minDaily')}
                        onChange={handleChange('minDaily')}
                    />

                    <InputNumberBox
                        label="Antecedência mínima"
                        min={1}
                        error={errors.minNotice}
                        formControl={{
                            isInvalid: !!errors.minNotice && touched.minNotice,
                        }}
                        {...getFieldProps('minNotice')}
                        onChange={handleChange('minNotice')}
                    />
                </Flex>

                <section>
                    <Text as="h2">Configurações de Venda</Text>
                    <Stack gap={2}>
                        <Flex justify="space-between" align="center">
                            <Text>Vender online no site</Text>
                            <Switch
                                {...getFieldProps('onlineSale')}
                                isChecked={values.onlineSale}
                                onChange={(e) =>
                                    setFieldValue(
                                        'onlineSale',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <Text>Vender online no painel</Text>
                            <Switch
                                {...getFieldProps('panelSale')}
                                isChecked={values.panelSale}
                                onChange={(e) =>
                                    setFieldValue('panelSale', e.target.checked)
                                }
                            />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <Text>Vender em períodos específicos</Text>
                            <Switch
                                {...getFieldProps('seasonalSale')}
                                isChecked={values.seasonalSale}
                                onChange={(e) =>
                                    setFieldValue(
                                        'seasonalSale',
                                        e.target.checked,
                                    )
                                }
                            />
                        </Flex>
                    </Stack>
                </section>

                {values.seasonalSale && (
                    <section>
                        <Text as="h2">Períodos de Venda</Text>
                        <Stack gap={2}>
                            <h4>Início do Período de Venda</h4>
                            <DatePickerBox
                                value={values.seasonStart}
                                onChange={(date) =>
                                    setFieldValue('seasonStart', date)
                                }
                                error={errors.seasonStart}
                                formControl={{
                                    isInvalid:
                                        !!errors.seasonStart &&
                                        touched.seasonStart,
                                }}
                            />

                            <h4>Fim do Período de Venda</h4>
                            <DatePickerBox
                                value={values.seasonEnd}
                                onChange={(date) =>
                                    setFieldValue('seasonEnd', date)
                                }
                                error={errors.seasonEnd}
                                formControl={{
                                    isInvalid:
                                        !!errors.seasonEnd && touched.seasonEnd,
                                }}
                            />
                        </Stack>
                    </section>
                )}

                <section>
                    <Text as="h2">Adultos</Text>
                    <InputNumberBox
                        label="Número de adultos"
                        error={errors.adults}
                        min={0}
                        formControl={{
                            isInvalid: !!errors.adults && touched.adults,
                        }}
                        {...getFieldProps('adults')}
                        onChange={handleChange('adults')}
                    />
                </section>

                {!isLoadingHousingUnitTypes && !!housingUnitTypes && (
                    <section>
                        <Text as="h2">Acomodações Válidas</Text>
                        <CheckboxGroup
                            value={values.availableHousingUnitTypes.map(
                                (h) => h.housingUnitTypeId,
                            )}
                            onChange={(selectedIds) => {
                                setFieldValue(
                                    'availableHousingUnitTypes',
                                    selectedIds.map((id) => ({
                                        housingUnitTypeId: id,
                                    })),
                                )
                            }}
                        >
                            <Stack spacing={2} direction="column">
                                {housingUnitTypes.items.map((housing) => {
                                    return (
                                        <InputCheckboxBox
                                            key={housing.id}
                                            value={housing.id}
                                        >
                                            {housing.name}
                                        </InputCheckboxBox>
                                    )
                                })}
                            </Stack>
                        </CheckboxGroup>
                    </section>
                )}

                <section>
                    <Text as="h2">Noites válidas</Text>
                    <CheckboxGroup
                        value={values.availableWeekDays}
                        onChange={(newValue) => {
                            console.log(newValue)
                            setFieldValue(
                                'availableWeekDays',
                                newValue.map(Number),
                            )
                        }}
                    >
                        <Stack spacing={2} direction="column">
                            {VALID_NIGHTS.map((night) => (
                                <Checkbox key={night.name} value={night.value}>
                                    {night.name}`
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section> */}

                <section>
                    <Text as="h2">Descrição e Informação</Text>
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

                    <TextAreaBox
                        mt={2}
                        label="Informações gerais e observações"
                        maxLength={500}
                        error={errors.notes}
                        formControl={{
                            isInvalid: !!errors.notes && touched.notes,
                        }}
                        {...getFieldProps('notes')}
                    />
                </section>

                <section>
                    <Text as="h2">Fotos e vídeo</Text>
                    <Text as="h2" mt={2}>
                        Galeria
                    </Text>

                    <FieldArray name="medias">
                        {({ push }) => (
                            <>
                                <Gallery.Root
                                    items={values.medias.map(
                                        (media) =>
                                            `/placeholder.svg?height=200&width=300&mediaId=${media.mediaId}`,
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
                                            mediaId: `media-${Date.now()}`,
                                            isFeatured: false,
                                            order: values.medias.length,
                                        })
                                    }
                                >
                                    Adicionar Imagem
                                </Button>
                            </>
                        )}
                    </FieldArray>

                    <Text as="h2" mt={2}>
                        Vídeo
                    </Text>

                    <InputBox
                        label="URL do Vídeo (Youtube somente)"
                        error={errors.coverMediaId}
                        formControl={{
                            isInvalid:
                                !!errors.coverMediaId && touched.coverMediaId,
                        }}
                        {...getFieldProps('coverMediaId')}
                    />
                </section>

                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
