'use client'

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

import { DateRangeBox } from '@/components/atoms/DateRangeBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import SelectBox from '@/components/atoms/SelectBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { Gallery } from '@/components/organisms/Gallery'
import type { ServiceFormData } from '../utils/config'

export const ServiceForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<ServiceFormData>()

    const categories = [
        { id: '1', name: 'Categoria 1' },
        { id: '2', name: 'Categoria 2' },
        { id: '3', name: 'Categoria 3' },
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
                            <DateRangeBox
                                label="Início do Período de Venda"
                                singleDateValue={values.seasonStart}
                                /*error={errors.seasonStart}
                                formControl={{
                                    isInvalid:
                                        !!errors.seasonStart &&
                                        touched.seasonStart,
                                }}*/
                                {...getFieldProps('seasonStart')}
                            />
                            <DateRangeBox
                                label="Fim do Período de Venda"
                                singleDateValue={values.seasonEnd}
                                /*error={errors.seasonEnd}
                                formControl={{
                                    isInvalid:
                                        !!errors.seasonEnd && touched.seasonEnd,
                                }}*/
                                {...getFieldProps('seasonEnd')}
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

                <section>
                    <Text as="h2">Categorias</Text>
                    <CheckboxGroup
                        value={values.category.map((c) => c.id)}
                        onChange={(selectedIds) => {
                            const selectedCategories = categories.filter(
                                (cat) => selectedIds.includes(cat.id),
                            )
                            setFieldValue('category', selectedCategories)
                        }}
                    >
                        <Stack spacing={2} direction="column">
                            {categories.map((cat) => (
                                <InputCheckboxBox
                                    key={cat.id}
                                    value={cat.id}
                                    isChecked={values.category.some(
                                        (c) => c.id === cat.id,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const newCategories = isChecked
                                            ? [...values.category, cat]
                                            : values.category.filter(
                                                  (c) => c.id !== cat.id,
                                              )
                                        setFieldValue('category', newCategories)
                                    }}
                                >
                                    {cat.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </section>

                <section>
                    <Text as="h2">Noites válidas</Text>
                    {/*<CheckboxGroup
                        value={values.validNights} 
                        onChange={(selectedIds) =>
                            setFieldValue('validNights', selectedIds)
                        }
                    >
                        <Stack spacing={2} direction="column">
                            {validNights.map((night) => (
                                <InputCheckboxBox
                                    key={night.id}
                                    value={night.id}
                                    isChecked={values.validNights.includes(
                                        night.id,
                                    )}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked
                                        const updatedNights = isChecked
                                            ? [...values.validNights, night.id]
                                            : values.validNights.filter(
                                                  (id) => id !== night.id,
                                              )
                                        setFieldValue(
                                            'validNights',
                                            updatedNights,
                                        )
                                    }}
                                >
                                    {night.name}
                                </InputCheckboxBox>
                            ))}
                        </Stack>
                    </CheckboxGroup>*/}
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
                                    //onRemove={(index) => remove(index)}
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
                        error={errors.videoUrl}
                        formControl={{
                            isInvalid: !!errors.videoUrl && touched.videoUrl,
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
