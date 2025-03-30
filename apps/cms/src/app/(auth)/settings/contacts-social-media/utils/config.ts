import {
    CompanyContact,
    CompanyContactInput,
    CompanyCreateInput,
} from '@booksuite/sdk'
import * as yup from 'yup'

import { companysocialMedias } from './constants'

export type ContactsData = Pick<CompanyCreateInput, 'contacts'> & {
    email: CompanyContact[]
    phone: CompanyContact[]
    socialMedias: CompanyContact[]
}

export const createContactsFormInitialValues = (
    data?: CompanyContactInput[] | null,
): ContactsData => ({
    email: data?.filter((c) => c.type === 'email') || [],
    phone: data?.filter((c) => c.type === 'phone') || [],
    socialMedias: [
        ...data?.filter((c) => companysocialMedias.includes(c.type)) || [],
        ...companysocialMedias
            .filter((type) => !data?.some((c) => c.type === type))
            .map((type) => ({ type, category: '', value: '' })),
    ],
})

export const companyContactSchema = yup.object({
    contacts: yup.array().min(1),
})
