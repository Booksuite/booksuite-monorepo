import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type GeneralData = Pick<CompanyFull, 'name' | 'timezone' | 'type'>

export const createFormInitialValues = (
    data?: CompanyFull | null,
): GeneralData => ({
    name: data?.name || '',
    timezone: data?.timezone || '',
    type: data?.type || 'HOTEL',
})

export const generalDataSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    timezone: yup.string().required('Fuso horário é obrigatório'),
    type: yup.string().required('Fuso horário é obrigatório'),
})
