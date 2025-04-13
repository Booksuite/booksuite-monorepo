import { Banner, CompanyFull, Media } from '@booksuite/sdk'
import * as yup from 'yup'

export interface BannerMedia {
    mediaId: string
    order: number
    media: Media
}

export type BusinessDescriptionFormData = Pick<
    CompanyFull,
    | 'bannerDescription'
    | 'shortDescription'
    | 'description'
    | 'bannerTitle'
    | 'name'
    | 'bannerImage'
> & {
    medias: BannerMedia[]
}

function normalize(media: Media | undefined | null): BannerMedia {
    return {
        media: media || {
            id: '',
            url: '',
            companyId: '',
            metadata: { mimetype: '' },
        },
        mediaId: media?.id || '',
        order: 0,
    }
}

export const businessDescriptionInitialValues = (
    data?: Partial<CompanyFull> | null,
): BusinessDescriptionFormData => ({
    name: data?.name || '',
    shortDescription: data?.shortDescription || '',
    description: data?.description || '',
    bannerTitle: data?.bannerTitle || '',
    bannerDescription: data?.bannerDescription || '',
    bannerImage: data?.bannerImage || null,
    medias: [normalize(data?.bannerImage)],
})

export const businessDescriptionFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    shortDescription: yup.string().nullable(),
    description: yup.string().nullable(),
    bannerTitle: yup.string().nullable(),
    bannerDescription: yup.string().nullable(),
})
