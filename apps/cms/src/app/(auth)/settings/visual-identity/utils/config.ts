import { CompanyFull, CompanyUpdateInput, Media } from '@booksuite/sdk'
import { omit } from 'radash'
import * as yup from 'yup'

export type VisualIdentityFormData = Pick<
    CompanyUpdateInput,
    'settings' | 'logo' | 'favIcon'
> & {
    logoMedia: Media | null
    favIconMedia: Media | null
}

export function normalizeVisualIdentityFormData(
    data: VisualIdentityFormData,
): CompanyUpdateInput {
    return {
        ...omit(data, ['logoMedia', 'favIconMedia']),
    }
}

export const createvisualIdentityInitialValues = (
    data?: Partial<CompanyFull> | null,
): VisualIdentityFormData => ({
    ...data,
    logo: data?.logo || '',
    favIcon: data?.favIcon || '',
    settings: data?.settings || {},
    logoMedia: null,
    favIconMedia: null,
})

export const visualIdentityFormSchema = yup.object({
    logo: yup.string(),
    favIcon: yup.string(),
})
