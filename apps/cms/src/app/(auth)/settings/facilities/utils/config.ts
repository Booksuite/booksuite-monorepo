import { CompanyFull } from '@booksuite/sdk'
import * as yup from 'yup'

import { normalizeCompanyFacilityInput } from './normalizeFn'

export type CompanyFacilitiesData = Pick<CompanyFull, 'facilities'>

export const createFacilitiesInitialValues = (
    data?: CompanyFacilitiesData,
): CompanyFacilitiesData => ({
    facilities: normalizeCompanyFacilityInput(data?.facilities || []),
})

export const facilitiesFormSchema = yup.object({
    facilities: yup.array().of(
        yup.object({
            isFeatured: yup.boolean().optional(),
            facilityId: yup.string().required('Comodidade é obrigatório'),
        }),
    ),
})
