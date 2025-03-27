import { CompanyContactInput, CompanyCreateInput } from '@booksuite/sdk'
import * as yup from 'yup'

export type ContactsData = Pick<CompanyCreateInput, 'contacts'>

export const createContactsFormInitialValues = (
    data?: CompanyContactInput[] | null,
): ContactsData => ({
    contacts: data || [],
})

export const companyContactSchema = yup.object({
    contacts: yup.array().min(1),
})
