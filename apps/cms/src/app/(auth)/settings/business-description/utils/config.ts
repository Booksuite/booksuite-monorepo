import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type BusinessDescriptionFormData = Pick<
    CompanyFull,
    | 'bannerDescription'
    | 'shortDescription'
    | 'description'
    | 'bannerTitle'
    | 'name'
    | 'bannerImage'
> & {
    bannerFile?: File
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
    bannerFile: undefined,
})

// Adicionar galeria ou file explorer no front para enviar uma imagem
// export const transformBusinessDescriptionForSubmit = (
//     formData: BusinessDescriptionFormData,
// ): Partial<CompanyFull> => {
//     const { bannerImage, ...rest } = formData

//     return {
//         ...rest,
//         bannerImage: bannerImage.length > 0 ? bannerImage[0] : null,
//     }
// }

export const businessDescriptionFormSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    shortDescription: yup.string().nullable(),
    description: yup.string().nullable(),
    bannerTitle: yup.string().nullable(),
    bannerDescription: yup.string().nullable(),
})
