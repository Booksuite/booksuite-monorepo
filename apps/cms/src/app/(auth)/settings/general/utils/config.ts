import { CompanyFull, CompanyUpdateInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type GeneralDataForm = Pick<
    CompanyUpdateInput,
    'name' | 'timezone' | 'type'
>

export const transformFormDataForSubmit = (
    formData: GeneralDataForm,
): CompanyUpdateInput => {
    const transformedFormData = {
        name: formData.name,
        timezone: formData.timezone || null,
        type: formData.type,
    }

    return transformedFormData
}

export const transformFormDataForSubmit = (
    formData: GeneralDataForm,
): CompanyUpdateInput => {
    const transformedFormData = {
        name: formData.name,
        timezone: formData.timezone || null,
        type: formData.type,
    }
    
    return transformedFormData
}

export const createFormInitialValues = (
    data?: Partial<CompanyFull>,
): GeneralDataForm => ({
    name: data?.name || '',
    timezone: data?.timezone || '',
    type: data?.type || 'HOTEL',
})

export const generalDataSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    timezone: yup.string().required('Fuso horário é obrigatório'),
    type: yup.string().required('Fuso horário é obrigatório'),
})
