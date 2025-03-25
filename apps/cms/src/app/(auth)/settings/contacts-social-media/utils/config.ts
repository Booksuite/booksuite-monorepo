import {
    CompanyContactResponseDTOType,
    CompanyCreateInput,
    CompanyFull,
} from '@booksuite/sdk'
import * as yup from 'yup'

export type ContactsData = Pick<CompanyCreateInput, 'contacts'>

export const createContactsFormInitialValues = (
    data?: CompanyFull | null,
): ContactsData => ({
    contacts: data?.contacts || [],
})

export const companyContactSchema = yup.object({
    type: yup
        .mixed<CompanyContactResponseDTOType>()
        .oneOf(
            ['phone', 'email', 'instagram', 'facebook', 'linkedin', 'x'],
            'Tipo de contato inválido',
        )
        .required('O tipo de contato é obrigatório'),
    value: yup.string().required('Contato é Obrigátorio'),
})
