import { CompanyContact, CompanyContactInput, CompanyContactResponseDTOType } from '@booksuite/sdk'
import * as yup from 'yup'

export type ContactsFormData = CompanyContactInput

export const createContactsFormInitialValues = (
    data?: CompanyContact | null,
): ContactsFormData => ({
    type: data?.type || 'x',
    value: data?.value || '',
})

export const companyContactSchema = yup.object({
    type: yup
        .mixed<CompanyContactResponseDTOType>()
        .oneOf(
            ['phone', 'email', 'instagram', 'facebook', 'linkedin', 'x'],
            'Tipo de contato inválido',
        )
        .required('O tipo de contato é obrigatório'),
    value: yup.string().required('Contato é Obrigátorio')
})
