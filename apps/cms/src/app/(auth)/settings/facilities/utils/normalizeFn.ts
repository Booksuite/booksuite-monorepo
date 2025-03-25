import { CompanyFacility, CompanyFacilityInput } from '@booksuite/sdk'

export function normalizeCompanyFacilityInput(
    facility: CompanyFacility[],
): CompanyFacilityInput[] {
    return facility.map((f) => ({
        facilityId: f.facility.id || '',
    }))
}
