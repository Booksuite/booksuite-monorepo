import { Banner, BannerMedia } from '@booksuite/sdk'
import * as yup from 'yup'

export type BannerFormData = Omit<Banner, 'id'> & {
    medias: BannerMedia[]
}

export const createBannerInitialValues = (
    data?: Partial<BannerFormData> | null,
): BannerFormData => ({
    published: data?.published ?? false,
    name: data?.name ?? '',
    position: data?.position ?? 'HOME_TOP',
    order: data?.order ?? null,
    title: data?.title ?? '',
    description: data?.description ?? '',
    action: data?.action ?? 'NONE',
    actionButtonText: data?.actionButtonText ?? '',
    actionButtonLink: data?.actionButtonLink ?? '',
    startAt: data?.startAt ?? '',
    endAt: data?.endAt ?? '',
    medias: data?.medias ?? [],
})

export const bannerFormSchema = yup.object({
    published: yup.boolean().required(),
    name: yup.string().required('O nome é obrigatório'),
    position: yup
        .mixed<BannerFormData['position']>()
        .oneOf(['HOME_TOP', 'FEATURED_CONTENT'])
        .required('A posição é obrigatória'),
    order: yup
        .number()
        .nullable()
        .transform((_, val) => (val === '' ? null : Number(val)))
        .typeError('A ordem deve ser um número'),
    title: yup.string().nullable(),
    description: yup.string().nullable(),
    action: yup
        .mixed<BannerFormData['action']>()
        .oneOf(['NONE', 'SMART_SEARCH', 'CUSTOM', 'SEND_TO_WHATSAPP'])
        .required('A ação é obrigatória'),
    actionButtonText: yup.string().nullable(),
    actionButtonLink: yup
        .string()
        .nullable()
        .url('O link do botão deve ser uma URL válida'),
    startAt: yup.string().nullable(),
    endAt: yup.string().nullable(),
    medias: yup
        .array()
        .of(
            yup.object({
                order: yup
                    .number()
                    .nullable()
                    .transform((_, val) => (val === '' ? null : Number(val)))
                    .typeError('A ordem da mídia deve ser um número'),
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
