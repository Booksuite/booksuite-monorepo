'use client'

import { Media, ServiceMedia, useSearchHousingUnitTypes } from '@booksuite/sdk'
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    HStack,
    Select,
    SimpleGrid,
    Stack,
    Switch,
    Text,
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
import { Form, useFormikContext } from 'formik'
import type React from 'react'
import { useState } from 'react'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { useCurrentCompanyId } from '@/common/contexts/user'
import { DatePickerBox } from '@/components/atoms/DatePickerBox'
import InputBox from '@/components/atoms/InputBox'
import InputCheckboxBox from '@/components/atoms/InputCheckboxBox'
import { InputNumberBox } from '@/components/atoms/InputNumberBox'
import { TextAreaBox } from '@/components/atoms/TextAreaBox'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { SortableMediaItem } from '../../rooms/components/SortableMediaItem'
import type { ServiceFormData } from '../utils/config'
import { VALID_NIGHTS } from '../utils/constants'

export const ServiceForm: React.FC = () => {
    const {
        getFieldProps,
        touched,
        errors,
        values,
        handleChange,
        setFieldValue,
    } = useFormikContext<ServiceFormData>()

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor),
    )

    const handleMediaChange = (selectedMedia: Media[]) => {
        const formattedMedia: ServiceMedia[] = selectedMedia.map(
            (media, index) => {
                const sameMedia = values.medias.find(
                    (item) => item.media.id === media.id,
                )
                const order = sameMedia?.order || index
                values.coverMediaId = media.id

                return {
                    id: media.id,
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

    const companyId = useCurrentCompanyId()
    const { data: housingUnitTypes, isLoading: isLoadingHousingUnitTypes } =
        useSearchHousingUnitTypes(
            {
                companyId: companyId,
            },
            {
                pagination: { itemsPerPage: 1000, page: 1 },
            },
        )

    const availableHousingUnitTypes = housingUnitTypes?.items

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
                                {availableHousingUnitTypes?.map((housing) => (
                                    <InputCheckboxBox
                                        key={housing.id}
                                        value={housing.id}
                                        isChecked={values.availableHousingUnitTypes.includes(
                                            { housingUnitTypeId: housing.id },
                                        )}
                                    >
                                        {housing.name}
                                    </InputCheckboxBox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </section>
                )}

                <section>
                    <Text as="h2">Noites válidas</Text>
                    <CheckboxGroup
                        value={values.availableWeekDays}
                        onChange={(newValue) => {
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
                    <h2>Fotos e Vídeos</h2>

                    <Box
                        p={6}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                    >
                        <HStack gap={2} align="center" justify="space-between">
                            <h2>Galeria de Fotos</h2>

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
            </Stack>
        </Form>
    )
}
