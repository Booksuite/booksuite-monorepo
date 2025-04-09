import { UtilityLinksInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type UtilityLinkData = UtilityLinksInput

export const createUtilityLinksInitialValues = (
    data?: UtilityLinksInput | null,
): UtilityLinkData => ({
    title: data?.title || '',
    buttonLink: data?.buttonLink || '',
    published: data?.published || false,
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
})

export const utilityLinksFormSchema = yup.object({
    title: yup.string().required('O título é obrigatório'),
    buttonLink: yup
        .string()
        .url('O link deve ser uma URL válida')
        .required('O link do botão é obrigatório'),
    published: yup.boolean().required(),
    startDate: yup.string().optional().nullable(),
    endDate: yup.string().optional().nullable(),
})
