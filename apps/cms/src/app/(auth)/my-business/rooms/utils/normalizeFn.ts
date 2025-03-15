import {
    HousingUnitTypeFacility,
    HousingUnitTypeFacilityInput,
    HousingUnitTypeMedia,
    HousingUnitTypeMediaInput,
} from '@booksuite/sdk'

export function normalizeHousingUnitTypeFacilityInput(
    facility: HousingUnitTypeFacility[],
): HousingUnitTypeFacilityInput[] {
    return facility.map((f) => ({
        facilityId: f.facility.id,
        isFeatured: f.isFeatured || false,
    }))
}

export function normalizeHousingUnitTypeMediaInput(
    media: HousingUnitTypeMedia[],
): HousingUnitTypeMediaInput[] {
    return media.map((m) => ({
        mediaId: m.media.id,
        isFeatured: m.isFeatured || false,
        order: m.order || 0,
    }))
}
