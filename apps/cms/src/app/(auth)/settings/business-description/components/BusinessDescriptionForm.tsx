import { CompanyMedia, Media } from '@booksuite/sdk'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    useTheme,
} from '@mui/material'
import { useFormikContext } from 'formik'
import { Info } from 'lucide-react'
import { useState } from 'react'

import { SortableBannerMediaItem } from '@/app/(auth)/marketing/banner/components/SortableBannerMediaItem'
import { FormContainer } from '@/components/atoms/FormContainer'
import { FormSection } from '@/components/atoms/FormSection'
import { MediaGallery } from '@/components/organisms/MediaGallery'
import { BusinessDescriptionFormData } from '../utils/config'

import { SortableMediaItem } from './SortableMediaItem'

export const BusinessDescriptionForm = () => {
    const theme = useTheme()
    const {
        getFieldProps,
        errors,
        touched,
        handleChange,
        values,
        setFieldValue,
    } = useFormikContext<BusinessDescriptionFormData>()

    const [isMediaBannerGalleryOpen, setIsMediaBannerGalleryOpen] =
        useState(false)

    const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false)

    const handleMediaBannerChange = (selectedMedia: Media[]) => {
        const [media] = selectedMedia

        if (!media) return

        const formattedMedia = [
            {
                mediaId: media.id,
                order: 0,
                media: {
                    id: media.id,
                    url: media.url,
                    companyId: media.companyId,
                    metadata: media.metadata,
                },
            },
        ]

        setFieldValue('medias', formattedMedia)
        setIsMediaBannerGalleryOpen(false)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    )

    const handleMediaChange = (selectedMedia: Media[]) => {
        const formattedMedia: CompanyMedia[] = selectedMedia.map(
            (media, index) => {
                const sameMedia = values.companyMedias.find(
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

        setFieldValue('companyMedias', formattedMedia)
        setIsMediaGalleryOpen(false)
    }

    const handleMediaDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = values.companyMedias.findIndex(
                (item) => item.media.id === active.id,
            )
            const newIndex = values.companyMedias.findIndex(
                (item) => item.media.id === over.id,
            )

            const newMedias = arrayMove(
                values.companyMedias,
                oldIndex,
                newIndex,
            ).map((item, index) => ({
                ...item,
                order: index,
            }))

            setFieldValue('companyMedias', newMedias)
        }
    }

    return (
        <FormContainer>
            <FormSection>
                <TextField
                    label="Nome da Propriedade"
                    disabled
                    fullWidth
                    {...getFieldProps('name')}
                />

                <TextField
                    label="Descrição Curta"
                    multiline
                    rows={4}
                    fullWidth
                    error={
                        touched.shortDescription &&
                        Boolean(errors.shortDescription)
                    }
                    helperText={
                        touched.shortDescription && errors.shortDescription
                    }
                    {...getFieldProps('shortDescription')}
                />

                <TextField
                    label="Descrição Longa - Sobre Nós"
                    multiline
                    rows={6}
                    fullWidth
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    {...getFieldProps('description')}
                />
            </FormSection>

            <FormSection
                title="Fotos e vídeos"
                variant="outlined"
                rightAction={
                    <Button onClick={() => setIsMediaGalleryOpen(true)}>
                        Selecionar Mídia
                    </Button>
                }
            >
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleMediaDragEnd}
                >
                    <SortableContext
                        items={values.companyMedias.map(
                            (item) => item.media.id,
                        )}
                        strategy={rectSortingStrategy}
                    >
                        <Grid container columns={[2, 4, 8]} spacing={2} mt={4}>
                            {values.companyMedias.map((item) => (
                                <Grid size={1} key={item.media.id}>
                                    <SortableMediaItem
                                        key={item.media.id}
                                        mediaItem={item}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </SortableContext>
                </DndContext>

                <MediaGallery
                    isOpen={isMediaGalleryOpen}
                    onClose={() => setIsMediaGalleryOpen(false)}
                    selectedItems={values.companyMedias.map(
                        (item) => item.media.id,
                    )}
                    initialItems={values.companyMedias.map(
                        (item) => item.media,
                    )}
                    onItemsChange={handleMediaChange}
                />
            </FormSection>

            <FormSection title="Banner de compartilhamento">
                <FormSection
                    title="Banner Inicial"
                    variant="outlined"
                    rightAction={
                        <Button
                            onClick={() => setIsMediaBannerGalleryOpen(true)}
                        >
                            Selecionar Mídia
                        </Button>
                    }
                >
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                    >
                        <SortableContext
                            items={values.medias.map((item) => item.mediaId)}
                            strategy={rectSortingStrategy}
                        >
                            {values.medias.map((item) => (
                                <Box key={item.mediaId} mt={5} mb={5}>
                                    <SortableBannerMediaItem mediaItem={item} />
                                </Box>
                            ))}
                        </SortableContext>
                    </DndContext>

                    <MediaGallery
                        isOpen={isMediaBannerGalleryOpen}
                        onClose={() => setIsMediaBannerGalleryOpen(false)}
                        selectedItems={values.medias.map(
                            (item) => item.mediaId,
                        )}
                        initialItems={values.medias.map((item) => item.media)}
                        onItemsChange={handleMediaBannerChange}
                        maxItems={1}
                        minItems={1}
                    />
                </FormSection>

                <FormSection>
                    <Box
                        bgcolor="grey.100"
                        p={4}
                        borderRadius={1}
                        display="flex"
                        alignItems="center"
                    >
                        <Box display="flex" alignItems="center" gap={4}>
                            <Info color={theme.palette.blue[900]} />
                            <Typography variant="body2" color="blue.900">
                                1. A imagem será exibida quando você
                                compartilhar o site em alguma rede social ou
                                aplicativo de mensagens.
                                <br />
                                <br />
                                2. A imagem será utilizada no banner principal
                                do site quando não houver nenhum banner
                                específico cadastrado no menu marketing/banners.
                            </Typography>
                        </Box>
                    </Box>
                </FormSection>

                <FormSection title="Informações do Banner - página inicial">
                    <TextField
                        label="Título Principal"
                        fullWidth
                        error={
                            touched.bannerTitle && Boolean(errors.bannerTitle)
                        }
                        helperText={touched.bannerTitle && errors.bannerTitle}
                        {...getFieldProps('bannerTitle')}
                        onChange={handleChange('bannerTitle')}
                    />

                    <TextField
                        label="Descrição de Apoio (opcional)"
                        fullWidth
                        error={
                            touched.bannerDescription &&
                            Boolean(errors.bannerDescription)
                        }
                        helperText={
                            touched.bannerDescription &&
                            errors.bannerDescription
                        }
                        {...getFieldProps('bannerDescription')}
                        onChange={handleChange('bannerDescription')}
                    />
                </FormSection>
            </FormSection>
        </FormContainer>
    )
}
