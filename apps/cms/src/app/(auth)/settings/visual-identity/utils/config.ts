import { CompanyFull, CompanyUpdateInput, Media } from '@booksuite/sdk'
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
    const result: CompanyUpdateInput = {}

    if (typeof data.logo !== 'undefined') {
        result.logo = data.logo || null
    }

    if (typeof data.favIcon !== 'undefined') {
        result.favIcon = data.favIcon || null
    }

    if (typeof data.settings !== 'undefined') {
        result.settings = data.settings
    }

    return result
}

export const createvisualIdentityInitialValues = (
    data?: Partial<CompanyFull> | null,
): VisualIdentityFormData => ({
    logo: data?.logo ?? null,
    favIcon: data?.favIcon ?? null,
    settings: data?.settings ?? {},
    logoMedia: null,
    favIconMedia: null,
})

export const visualIdentityFormSchema = yup.object({
    logo: yup.string().nullable(),
    favIcon: yup.string().nullable(),
    settings: yup.object(),
})
