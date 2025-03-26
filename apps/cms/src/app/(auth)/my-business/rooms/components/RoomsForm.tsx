'use client'

import type { HousingUnitTypeMedia, Media } from '@booksuite/sdk'
import {
    Box,
    Button,
    Flex,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import { FieldArray, Form, useFormikContext } from 'formik'
import { useState } from 'react'

import InputBox from '@/components/atoms/InputBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { RoomsFormData } from '../utils/config'

import { HousingUnitTypeFacilitiesField } from './HousingUnitTypeFacilitiesField'
import { SortableMediaItem } from './SortableMediaItem'

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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor),
    )

    const handleMediaChange = (selectedMedia: Media[]) => {
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

    const handleMediaDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = values.medias.findIndex(
                (item) => item.media.id === active.id,
            )
            const newIndex = values.medias.findIndex(
                (item) => item.media.id === over.id,
            )

            const newMedias = arrayMove(values.medias, oldIndex, newIndex).map(
                (item, index) => ({
                    ...item,
                    order: index,
                }),
            )

            setFieldValue('medias', newMedias)
        }
    }

    const handleSetFeatured = (index: number, isFeatured: boolean) => {
        const currentCoverIndex = values.medias.findIndex(
            (media) => media.isFeatured,
        )
        if (currentCoverIndex >= 0)
            setFieldValue(`medias.${currentCoverIndex}.isFeatured`, false)

        setFieldValue(`medias.${index}.isFeatured`, isFeatured)
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
                    <Box
                        p={6}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <HStack gap={2} align="center" justify="space-between">
                            <h2>Fotos e vídeos</h2>

                            <Button
                                onClick={() => setIsMediaGalleryOpen(true)}
                                variant="solid"
                                size="sm"
                                colorScheme="blue"
                            >
                                Selecionar Mídia
                            </Button>
                        </HStack>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleMediaDragEnd}
                        >
                            <SortableContext
                                items={values.medias.map(
                                    (item) => item.media.id,
                                )}
                                strategy={rectSortingStrategy}
                            >
                                <SimpleGrid columns={[2, 4, 8]} gap={3} mt={4}>
                                    {values.medias.map((item, index) => (
                                        <SortableMediaItem
                                            key={item.media.id}
                                            mediaItem={item}
                                            index={index}
                                            handleSetFeatured={
                                                handleSetFeatured
                                            }
                                        />
                                    ))}
                                </SimpleGrid>
                            </SortableContext>
                        </DndContext>
                    </Box>

                    <MediaGallery
                        isOpen={isMediaGalleryOpen}
                        onClose={() => setIsMediaGalleryOpen(false)}
                        selectedItems={values.medias.map(
                            (item) => item.media.id,
                        )}
                        initialItems={values.medias.map((item) => item.media)}
                        onItemsChange={handleMediaChange}
                    />
                </section>

                <HousingUnitTypeFacilitiesField />
            </Stack>
        </Form>
    )
}
