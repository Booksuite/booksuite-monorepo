import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type GeneralData = Pick<CompanyFull, 'name' | 'docType' | 'timezone'>;

export const createFormInitialValues = (data?: CompanyFull): GeneralData => ({
    name: data?.name || '',
    docType: data?.docType || '',
    timezone: data?.timezone || '',
})

export const generalDataSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    docType: yup.string().required('Tipo de documento é obrigatório'),
    timezone: yup.string().required('Fuso horário é obrigatório'),
})
