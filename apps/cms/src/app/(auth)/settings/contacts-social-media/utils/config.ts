import { CompanyCreateInput, CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

export type ContactsData = Pick<CompanyCreateInput, 'contacts'>

export const createContactsFormInitialValues = (
    data?: CompanyFull | null,
): ContactsData => ({
    contacts: data?.contacts || [],
})

export const companyContactSchema = yup.object({
    contacts: yup.array().min(1),
})
