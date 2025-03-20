'use client'

import { useSearchHousingUnitTypes } from '@booksuite/sdk'
import {
    Button,
    CheckboxGroup,
    Flex,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { CirclePlus } from 'lucide-react'
import type React from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { DatePickerBox } from '@/components/atoms/DatePickerBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import type { ServiceFormData } from '../utils/config'

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

    const availablehousingUnitTypes: availableHousingUnitTypes[] = []

    const validNights = [
        { id: 1, name: 'Segunda-feira' },
        { id: 2, name: 'Terça-feira' },
        { id: 3, name: 'Quarta-feira' },
        { id: 4, name: 'Quinta-feira' },
        { id: 5, name: 'Sexta-feira' },
        { id: 6, name: 'Sábado' },
        { id: 7, name: 'Domingo' },
    ]

    /*const optionsPriceAdjustment = [
        { value: 'PERCENT_DISCOUNT', label: 'Desconto Percentual' },
        { value: 'PERCENT_ADD', label: 'Acréscimo Percentual' },
        { value: 'FIXED_DISCOUNT', label: 'Desconto Fixo' },
        { value: 'FIXED_ADD', label: 'Acréscimo Fixo' },
    ]*/

    const optionsBill = [
        { value: 'PER_NIGHT', label: 'Por noite' },
        { value: 'PER_PERSON', label: 'Por pessoa' },
        { value: 'FIXED', label: 'Valor fixo' },
    ]

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
                </Flex>

                <section>
                    <Stack gap={2}>
                        <InputNumberBox
                            label="Mínimo de Diárias"
                            min={1}
                            error={errors.minDaily}
                            formControl={{
                                isInvalid:
                                    !!errors.minDaily && touched.minDaily,
                            }}
                            {...getFieldProps('minDaily')}
                            onChange={handleChange('minDaily')}
                        />
                    </Stack>
                </section>

                <section>
                    <Stack gap={2}>
                        <InputNumberBox
                            label="Antecedência mínima"
                            min={1}
                            error={errors.minNotice}
                            formControl={{
                                isInvalid:
                                    !!errors.minNotice && touched.minNotice,
                            }}
                            {...getFieldProps('minNotice')}
                            onChange={handleChange('minNotice')}
                        />
                    </Stack>
                </section>

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

                {!isLoadingHousingUnitTypes ? (
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
                                {availablehousingUnitTypes.map((housing) => {
                                    const isChecked =
                                        values.availableHousingUnitTypes.some(
                                            (h) =>
                                                h.housingUnitTypeId ===
                                                housing.id,
                                        )

                                    return (
                                        <InputCheckboxBox
                                            key={housing.id}
                                            value={housing.id}
                                            isChecked={isChecked}
                                            onChange={(e) => {
                                                const isChecked =
                                                    e.target.checked
                                                let updatedHousingTypes = [
                                                    ...values.availableHousingUnitTypes,
                                                ]

                                                if (isChecked) {
                                                    updatedHousingTypes.push({
                                                        housingUnitTypeId:
                                                            housing.id,
                                                    })
                                                } else {
                                                    updatedHousingTypes =
                                                        updatedHousingTypes.filter(
                                                            (h) =>
                                                                h.housingUnitTypeId !==
                                                                housing.id,
                                                        )
                                                }

                                                setFieldValue(
                                                    'availableHousingUnitTypes',
                                                    updatedHousingTypes,
                                                )
                                            }}
                                        >
                                            {housing.name}
                                        </InputCheckboxBox>
                                    )
                                })}
                            </Stack>
                        </CheckboxGroup>
                    </section>
                ) : undefined}

                <section>
                    <Text as="h2">Noites válidas</Text>
                    <CheckboxGroup
                        value={values.availableWeekDays}
                        onChange={(selectedIds) => {
                            setFieldValue('availableWeekDays', selectedIds)
                        }}
                    >
                        <Stack spacing={2} direction="column">
                            {validNights.map((night) => (
                                <InputCheckboxBox
                                    key={night.id}
                                    value={night.id}
                                    isChecked={values.availableWeekDays.includes(
                                        night.id,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const updatedNights = isChecked
                                            ? [
                                                  ...values.availableWeekDays,
                                                  night.id,
                                              ]
                                            : values.availableWeekDays.filter(
                                                  (id) => id !== night.id,
                                              )
                                        setFieldValue(
                                            'availableWeekDays',
                                            updatedNights,
                                        )
                                    }}
                                >
                                    {night.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <Text as="h2">Fotos e vídeo</Text>
                    <Text as="h2" mt={2}>
                        Galeria
                    </Text>

                    <FieldArray name="medias">
                        {({ remove, push }) => (
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
                        {...getFieldProps('videoUrl')}
                    />
                </section>

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
                    <Text as="h2">Preço</Text>
                    <Stack gap={2}>
                        <InputBox
                            label="Soma dos Extras Selecionados"
                            type="currency"
                            isDisabled
                            /*error={errors.}
                            formControl={{
                                isInvalid: !!errors. && touched.,
                            }}*/
                            {...getFieldProps('')}
                        />

                        {/*<SelectBox
                            label="Ajuste de Preço"
                            options={optionsPriceAdjustment}
                            onChange={(selectedOption: any) =>
                                setFieldValue(
                                    'priceAdjustment',
                                    selectedOption?.value,
                                )
                            }
                            value={optionsPriceAdjustment.find(
                                (opt) => opt.value === values.priceAdjustment,
                            )}
                        />
                        {{errors. && touched. && (
                            <Text color="red.500" fontSize="sm">
                                {errors.}
                            </Text>
                        )}*/}

                        <InputBox
                            label="Preço Final da Experiência"
                            type="currency"
                            error={errors.price}
                            formControl={{
                                isInvalid: !!errors.price && touched.price,
                            }}
                            {...getFieldProps('price')}
                        />

                        <SelectBox
                            label="Tipo de Cobrança"
                            options={optionsBill}
                            onChange={(selectedOption: any) =>
                                setFieldValue('billType', selectedOption?.value)
                            }
                            value={optionsBill.find(
                                (opt) => opt.value === values.billType,
                            )}
                        />

                        {errors.billType && touched.billType && (
                            <Text color="red.500" fontSize="sm">
                                {errors.billType}
                            </Text>
                        )}
                    </Stack>
                </section>

                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
