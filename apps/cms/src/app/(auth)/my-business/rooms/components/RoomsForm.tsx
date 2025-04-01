'use client'

import type { HousingUnitTypeMedia, Media } from '@booksuite/sdk'
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
import { Box, Button, Grid, Stack, TextField, useTheme } from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { useState } from 'react'

import { FormSection } from '@/components/atoms/FormSection'
import { NumberInput } from '@/components/atoms/NumberInput'
import { TextFieldCurrency } from '@/components/atoms/TextFieldCurrency'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { RoomsFormData } from '../utils/config'

import { HousingUnitTypeFacilitiesField } from './HousingUnitTypeFacilitiesField'
import { SortableMediaItem } from './SortableMediaItem'

export const RoomsForm: React.FC = () => {
    const theme = useTheme()
    const { getFieldProps, errors, values, handleChange, setFieldValue } =
        useFormikContext<RoomsFormData>()

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
        <>
            <Stack gap={4}>
                <FormSection>
                    <TextField
                        label="Nome da Acomodação"
                        error={!!errors.name}
                        helperText={errors.name}
                        {...getFieldProps('name')}
                    />

                    <TextField
                        multiline
                        rows={4}
                        label="Descrição"
                        error={!!errors.description}
                        helperText={errors.description}
                        {...getFieldProps('description')}
                    />
                </FormSection>
                <FormSection title="Unidades disponíveis">
                    <FieldArray name="housingUnits">
                        {({ remove, push }) => (
                            <>
                                <NumberInput
                                    label="Unidades disponíveis"
                                    value={values.housingUnits.length}
                                    min={1}
                                    readOnly
                                    onChange={(e) => {
                                        const newValueNumber = Number(
                                            e.target.value,
                                        )
                                        if (Number.isNaN(newValueNumber)) return

                                        if (
                                            newValueNumber >
                                            values.housingUnits.length
                                        ) {
                                            push({
                                                name: (
                                                    values.housingUnits.length +
                                                    1
                                                ).toString(),
                                            })
                                        } else if (
                                            newValueNumber <
                                            values.housingUnits.length
                                        ) {
                                            remove(
                                                values.housingUnits.length - 1,
                                            )
                                        }
                                    }}
                                />

                                <Stack gap={2}>
                                    {values.housingUnits.map((_, index) => {
                                        const error =
                                            errors.housingUnits?.[index]
                                        const errorMessage =
                                            typeof error !== 'string'
                                                ? error?.name
                                                : ''

                                        return (
                                            <TextField
                                                key={index}
                                                label="Nome da unidade"
                                                error={!!errorMessage}
                                                helperText={errorMessage}
                                                value={
                                                    values.housingUnits?.[index]
                                                        ?.name
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
                                </Stack>
                            </>
                        )}
                    </FieldArray>
                </FormSection>
                <FormSection title="Hóspedes">
                    <NumberInput
                        label="Máximo de Hóspedes"
                        error={!!errors.maxGuests}
                        helperText={errors.maxGuests}
                        min={1}
                        {...getFieldProps('maxGuests')}
                        onChange={handleChange('maxGuests')}
                    />
                    <NumberInput
                        label="Mínimo de Hóspedes"
                        min={1}
                        error={!!errors.minGuests}
                        helperText={errors.minGuests}
                        {...getFieldProps('minGuests')}
                        onChange={handleChange('minGuests')}
                    />

                    <NumberInput
                        label="Máximo de Adultos"
                        error={!!errors.maxAdults}
                        helperText={errors.maxAdults}
                        min={1}
                        {...getFieldProps('maxAdults')}
                        onChange={handleChange('maxAdults')}
                    />
                    <NumberInput
                        label="Máximo de Crianças"
                        error={!!errors.maxChildren}
                        helperText={errors.maxChildren}
                        min={1}
                        {...getFieldProps('maxChildren')}
                        onChange={handleChange('maxChildren')}
                    />
                </FormSection>
                <FormSection title="Preço Base por Diária">
                    <TextFieldCurrency
                        label="Preço durante a semana"
                        error={!!errors.weekdaysPrice}
                        helperText={errors.weekdaysPrice}
                        {...getFieldProps('weekdaysPrice')}
                        onChange={handleChange('weekdaysPrice')}
                    />
                    <TextFieldCurrency
                        label="Preço fim de semana"
                        error={!!errors.weekendPrice}
                        helperText={errors.weekendPrice}
                        {...getFieldProps('weekendPrice')}
                        onChange={handleChange('weekendPrice')}
                    />
                    <TextFieldCurrency
                        label="Valor por adulto extra"
                        error={!!errors.extraAdultPrice}
                        helperText={errors.extraAdultPrice}
                        {...getFieldProps('extraAdultPrice')}
                        onChange={handleChange('extraAdultPrice')}
                    />
                    <NumberInput
                        label="Cobrar valor extra por adulto acima de"
                        error={!!errors.chargeExtraAdultHigherThan}
                        helperText={errors.chargeExtraAdultHigherThan}
                        {...getFieldProps('chargeExtraAdultHigherThan')}
                        onChange={handleChange('chargeExtraAdultHigherThan')}
                    />
                </FormSection>
                <FormSection
                    title="Fotos e vídeos"
                    p={3}
                    borderRadius={1}
                    border="1px solid"
                    borderColor="blueGrey.200"
                    position="relative"
                >
                    <Box
                        position="absolute"
                        top={theme.spacing(3)}
                        right={theme.spacing(3)}
                    >
                        <Button onClick={() => setIsMediaGalleryOpen(true)}>
                            Selecionar Mídia
                        </Button>
                    </Box>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleMediaDragEnd}
                    >
                        <SortableContext
                            items={values.medias.map((item) => item.media.id)}
                            strategy={rectSortingStrategy}
                        >
                            <Grid
                                container
                                columns={[2, 4, 8]}
                                spacing={2}
                                mt={4}
                            >
                                {values.medias.map((item, index) => (
                                    <Grid size={1} key={item.media.id}>
                                        <SortableMediaItem
                                            key={item.media.id}
                                            mediaItem={item}
                                            index={index}
                                            handleSetFeatured={
                                                handleSetFeatured
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </SortableContext>
                    </DndContext>

                    <MediaGallery
                        isOpen={isMediaGalleryOpen}
                        onClose={() => setIsMediaGalleryOpen(false)}
                        selectedItems={values.medias.map(
                            (item) => item.media.id,
                        )}
                        initialItems={values.medias.map((item) => item.media)}
                        onItemsChange={handleMediaChange}
                    />
                </FormSection>

                <HousingUnitTypeFacilitiesField />
            </Stack>
        </>
    )
}
