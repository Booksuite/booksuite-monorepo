'use client'

import { HousingUnitTypeMedia } from '@booksuite/sdk'
import { Button, Flex, Stack, Text, VStack } from '@chakra-ui/react'
import { FieldArray, Form, useFormikContext } from 'formik'
import { useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { MediaGallery } from '@/components/organisms/MediaGallery/MediaGallery'
import { MediaItem } from '@/components/organisms/MediaGallery/types'
import { RoomsFormData } from '../utils/config'

import { HousingUnitTypeFacilitiesField } from './HousingUnitTypeFacilitiesField'

export const RoomsForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<RoomsFormData>()

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const handleMediaChange = (selectedMedia: MediaItem[]) => {
        const formattedMedia: HousingUnitTypeMedia[] = selectedMedia.map(
            (media, index) => {
                const sameMedia = values.medias.find(
                    (item) => item.media.id === media.id,
                )
                const isFeatured = !!sameMedia?.isFeatured
                const order = sameMedia?.order || index

                return {
                    id: media.id,
                    isFeatured,
                    order,
                    media,
                }
            },
        )

        setFieldValue('medias', formattedMedia)
        setIsMediaGalleryOpen(false)
    }

    return (
        <Form>
            <Stack gap={8}>
                <Flex direction="column" gap={2}>
                    <InputBox
                        label="Nome da Acomodação"
                        error={errors.name}
                        formControl={{
                            isInvalid: !!errors.name && touched.name,
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
                    <Stack gap={2}>
                        <FieldArray name="housingUnits">
                            {({ remove, push }) => (
                                <>
                                    <InputNumberBox
                                        label="Unidades disponíveis"
                                        value={values.housingUnits.length}
                                        onChange={({
                                            target: { value: newValue },
                                        }) => {
                                            if (
                                                newValue >
                                                values.housingUnits.length
                                            ) {
                                                push({
                                                    name: (
                                                        values.housingUnits
                                                            .length + 1
                                                    ).toString(),
                                                })
                                            } else if (
                                                newValue <
                                                values.housingUnits.length
                                            ) {
                                                remove(
                                                    values.housingUnits.length -
                                                        1,
                                                )
                                            }
                                        }}
                                    />

                                    <VStack gap={2}>
                                        {values.housingUnits.map((_, index) => {
                                            const error =
                                                errors.housingUnits?.[index]
                                            const errorMessage =
                                                typeof error !== 'string'
                                                    ? error?.name
                                                    : ''

                                            return (
                                                <InputBox
                                                    key={index}
                                                    label="Nome da unidade"
                                                    error={errorMessage}
                                                    value={
                                                        values.housingUnits?.[
                                                            index
                                                        ]?.name
                                                    }
                                                    onChange={({
                                                        target: { value },
                                                    }) => {
                                                        setFieldValue(
                                                            `housingUnits.${index}.name`,
                                                            value,
                                                        )
                                                    }}
                                                />
                                            )
                                        })}
                                    </VStack>
                                </>
                            )}
                        </FieldArray>
                    </Stack>
                </section>
                <section>
                    <Text as="h4">Hóspedes</Text>

                    <Stack gap={2}>
                        <InputNumberBox
                            label="Máximo de Hóspedes"
                            error={errors.maxGuests}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxGuests && touched.maxGuests,
                            }}
                            {...getFieldProps('maxGuests')}
                            onChange={handleChange('maxGuests')}
                        />
                        <InputNumberBox
                            label="Mínimo de Hóspedes"
                            min={1}
                            error={errors.minGuests}
                            formControl={{
                                isInvalid:
                                    !!errors.minGuests && touched.minGuests,
                            }}
                            {...getFieldProps('minGuests')}
                            onChange={handleChange('minGuests')}
                        />

                        <InputNumberBox
                            label="Máximo de Adultos"
                            error={errors.maxAdults}
                            min={1}
                            formControl={{
                                isInvalid:
                                    !!errors.maxAdults && touched.maxAdults,
                            }}
                            {...getFieldProps('maxAdults')}
                            onChange={handleChange('maxAdults')}
                        />
                        <InputNumberBox
                            label="Máximo de Crianças"
                            error={errors.maxChildren}
                            formControl={{
                                isInvalid:
                                    !!errors.maxChildren && touched.maxChildren,
                            }}
                            {...getFieldProps('maxChildren')}
                            onChange={handleChange('maxChildren')}
                        />
                    </Stack>
                </section>
                <section>
                    <h4>Preço Base por Diária</h4>

                    <Stack gap={2}>
                        <InputBox
                            label="Preço durante a semana"
                            type="currency"
                            error={errors.weekdaysPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.weekdaysPrice &&
                                    touched.weekdaysPrice,
                            }}
                            {...getFieldProps('weekdaysPrice')}
                            onChange={handleChange('weekdaysPrice')}
                        />
                        <InputBox
                            label="Preço fim de semana"
                            type="currency"
                            error={errors.weekendPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.weekendPrice &&
                                    touched.weekendPrice,
                            }}
                            {...getFieldProps('weekendPrice')}
                            onChange={handleChange('weekendPrice')}
                        />
                        <InputBox
                            label="Valor por adulto extra"
                            type="currency"
                            error={errors.extraAdultPrice}
                            formControl={{
                                isInvalid:
                                    !!errors.extraAdultPrice &&
                                    touched.extraAdultPrice,
                            }}
                            {...getFieldProps('extraAdultPrice')}
                            onChange={handleChange('extraAdultPrice')}
                        />
                        <InputNumberBox
                            label="Cobrar valor extra por adulto acima de"
                            error={errors.chargeExtraAdultHigherThan}
                            formControl={{
                                isInvalid:
                                    !!errors.chargeExtraAdultHigherThan &&
                                    touched.chargeExtraAdultHigherThan,
                            }}
                            {...getFieldProps('chargeExtraAdultHigherThan')}
                            onChange={handleChange(
                                'chargeExtraAdultHigherThan',
                            )}
                        />
                    </Stack>
                </section>
                <section>
                    <h2>Fotos e vídeo</h2>
                    <h4>Galeria</h4>

                    <Button onClick={() => setIsMediaGalleryOpen(true)} mb={4}>
                        Selecionar Mídia
                    </Button>

                    {values.medias.length > 0 ? (
                        values.medias.map((item) => (
                            <div key={item.media.id}>{item.media.url}</div>
                        ))
                    ) : (
                        <Text color="red.500">
                            {errors.medias
                                ? 'É necessário selecionar pelo menos uma mídia'
                                : ''}
                        </Text>
                    )}

                    {isMediaGalleryOpen && (
                        <MediaGallery
                            isOpen={isMediaGalleryOpen}
                            onClose={() => setIsMediaGalleryOpen(false)}
                            selectedItems={values.medias.map(
                                (item) => item.media.id,
                            )}
                            initialItems={values.medias.map(
                                (item) => item.media,
                            )}
                            onItemsChange={handleMediaChange}
                        />
                    )}
                </section>

                <HousingUnitTypeFacilitiesField />

                <Button type="submit" size="lg">
                    Salvar
                </Button>
            </Stack>
        </Form>
    )
}
