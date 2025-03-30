import { CompanyFull, Media } from '@booksuite/sdk'
import * as yup from 'yup'

export type BusinessDescriptionFormData = {
    name: string
    shortDescription: string | null
    description: string | null
    bannerImage: Media[]
    bannerTitle: string | null
    bannerDescription: string | null
}

export const businessDescriptionInitialValues = (
    data?: Partial<CompanyFull> | null,
): BusinessDescriptionFormData => ({
    name: data?.name || '',
    shortDescription: data?.shortDescription || '',
    description: data?.description || '',
    bannerImage: data?.bannerImage ? [data.bannerImage] : [],
    bannerTitle: data?.bannerTitle || '',
    bannerDescription: data?.bannerDescription || '',
})

export const transformBusinessDescriptionForSubmit = (
    formData: BusinessDescriptionFormData,
): Partial<CompanyFull> => {
    const { bannerImage, ...rest } = formData

    return {
        ...rest,
        bannerImage: bannerImage.length > 0 ? bannerImage[0] : null,
    }
}

export const businessDescriptionFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    shortDescription: yup.string().nullable(),
    description: yup.string().nullable(),
    bannerImage: yup.array().min(1, 'A imagem do banner é obrigatória'),
    bannerTitle: yup.string().nullable(),
    bannerDescription: yup.string().nullable(),
})
