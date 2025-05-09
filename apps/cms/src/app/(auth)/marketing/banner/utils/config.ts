import { BannerCreateInput, BannerFull, Media } from '@booksuite/sdk'
import dayjs from 'dayjs'
import * as yup from 'yup'

export interface BannerFormMedia {
    mediaId: string
    order: number
    media: Media
}

export type BannerFormData = Omit<BannerCreateInput, 'medias'> & {
    medias: BannerFormMedia[]
}

export const createBannerInitialValues = (
    data?: Partial<BannerFormData> | null,
): BannerFormData => ({
    published: data?.published ?? false,
    name: data?.name ?? '',
    position: data?.position ?? 'HOME_TOP',
    order: 0,
    title: data?.title ?? '',
    description: data?.description ?? '',
    action: data?.action ?? 'NONE',
    actionButtonText: data?.actionButtonText ?? '',
    actionButtonLink: data?.actionButtonLink ?? '',
    startAt: data?.startAt ?? '',
    endAt: data?.endAt ?? '',
    medias: data?.medias ?? [],
})

export const transformToApiData = (
    formData: BannerFormData,
    isCreate = false,
): BannerCreateInput => ({
    name: formData.name,
    published: formData.published,
    position: formData.position,
    order: isCreate ? 0 : formData.order,
    title: formData.title || undefined,
    description: formData.description || undefined,
    action: formData.action,
    actionButtonText: formData.actionButtonText || undefined,
    actionButtonLink: formData.actionButtonLink || undefined,
    startAt: formData.startAt
        ? dayjs(formData.startAt).toISOString()
        : undefined,
    endAt: formData.endAt ? dayjs(formData.endAt).toISOString() : undefined,
    medias: formData.medias.map((item) => ({
        mediaId: item.mediaId,
        order: isCreate ? 0 : item.order,
    })),
})

export const transformFromApiData = (banner: BannerFull): BannerFormData => ({
    name: banner.name,
    published: banner.published,
    position: banner.position,
    order: banner.order ?? 0,
    title: banner.title ?? '',
    description: banner.description ?? '',
    action: banner.action,
    actionButtonText: banner.actionButtonText ?? '',
    actionButtonLink: banner.actionButtonLink ?? '',
    startAt: banner.startAt ?? '',
    endAt: banner.endAt ?? '',
    medias: banner.medias.map((item) => ({
        mediaId: item.media.id,
        order: item.order ?? 0,
        media: item.media,
    })),
})

export const bannerFormSchema = yup.object({
    published: yup.boolean().required(),
    name: yup.string().trim().required('O nome é obrigatório'),
    position: yup
        .mixed<BannerFormData['position']>()
        .oneOf(['HOME_TOP', 'FEATURED_CONTENT'])
        .required('A posição é obrigatória'),
    order: yup.number().required().default(0),
    title: yup.string().trim(),
    description: yup.string().trim(),
    action: yup
        .mixed<BannerFormData['action']>()
        .oneOf(['NONE', 'SMART_SEARCH', 'CUSTOM', 'SEND_TO_WHATSAPP'])
        .required('A ação é obrigatória'),
    actionButtonText: yup.string().trim(),
    actionButtonLink: yup
        .string()
        .trim()
        .url('O link do botão deve ser uma URL válida'),
    startAt: yup.string(),
    endAt: yup.string(),
    medias: yup
        .array()
        .of(
            yup.object({
                mediaId: yup.string().required('ID da mídia é obrigatório'),
                order: yup.number().default(0),
                media: yup
                    .object({
                        id: yup.string().required(),
                        url: yup.string().url().required(),
                        companyId: yup.string().required(),
                        metadata: yup
                            .object({
                                mimetype: yup.string().required(),
                            })
                            .required(),
                    })
                    .required(),
            }),
        )
        .required('É necessário pelo menos uma mídia')
        .min(1, 'Adicione pelo menos uma mídia ao banner'),
})
