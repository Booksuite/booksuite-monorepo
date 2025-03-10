import { components } from '../db.schema'

export type Company = components['schemas']['CompanyResponseDTO']
export type CompanyFull = components['schemas']['CompanyResponseFullDTO']
export type HousingUnitType =
    components['schemas']['HousingUnitTypeResponseDTO']
export type HousingUnitTypeFull =
    components['schemas']['HousingUnitTypeResponseFullDTO']
export type HousingUnit = components['schemas']['HousingUnitResponseDTO']
export type Facility = components['schemas']['FacilityResponseDTO']
export type HousingUnitTypeFacility =
    components['schemas']['HousingUnitTypeFacilityResponseDTO']
export type Media = components['schemas']['MediaResponseDTO']
export type HousingUnitTypeMedia =
    components['schemas']['HousingUnitTypeMediaResponseDTO']
export type AgePolicy = components['schemas']['AgePolicyResponseDTO']
export type AgePolicyFull = components['schemas']['AgePolicyResponseFullDTO']
export type AgeGroup = components['schemas']['AgeGroupResponseDTO']
export type ReservationConfig =
    components['schemas']['ReservationConfigResponseDTO']
export type CancellationPolicy =
    components['schemas']['CancellationPolicyResponseFullDTO']
export type PenaltyRange = components['schemas']['PenaltyRangeResponseDTO']
export type Service = components['schemas']['ServiceResponseDTO']
export type ServiceFull = components['schemas']['ServiceResponseFullDTO']
export type ServiceMedia = components['schemas']['ServiceMediaResponseDTO']
export type ServiceCategory =
    components['schemas']['ServiceCategoryResponseDTO']
export type Reservation = components['schemas']['ReservationResponseDTO']
export type ReservationFull =
    components['schemas']['ReservationResponseFullDTO']
export type ReservationService =
    components['schemas']['ReservationServiceResponseDTO']
export type User = components['schemas']['UserResponseDTO']
export type Banner = components['schemas']['BannerResponseDTO']
export type BannerFull = components['schemas']['BannerResponseFullDTO']
export type BannerMedia = components['schemas']['BannerMediaResponseDTO']
export type CompanySettings =
    components['schemas']['CompanySettingsResponseDTO']
export type CompanySettingsTheme =
    components['schemas']['CompanySettingsThemeResponseDTO']
export type CompanyContact = components['schemas']['CompanyContactResponseDTO']
export type CompanyFacility =
    components['schemas']['CompanyFacilityResponseDTO']
export type Metadata = components['schemas']['MetadataDto']

// Pagination types
export type PaginatedHousingUnitType =
    components['schemas']['HousingUnitTypePaginatedResponseDTO']
export type PaginatedService =
    components['schemas']['ServicePaginatedResponseDTO']
export type PaginatedReservation =
    components['schemas']['ReservationResponsePaginatedDTO']
export type PaginatedFacility =
    components['schemas']['FacilityResponsePaginatedDTO']
export type PaginatedMedia = components['schemas']['MediaResponsePaginatedDTO']
export type PaginatedBanner =
    components['schemas']['BannerResponsePaginatedDTO']

// DTO types for creating/updating
export type HousingUnitTypeCreateDTO =
    components['schemas']['HousingUnitTypeCreateDTO']
export type CompanyCreateDTO = components['schemas']['CompanyCreateDTO']
export type AgePolicyDTO = components['schemas']['AgePolicyDTO']
export type ReservationConfigDTO = components['schemas']['ReservationConfigDTO']
export type CancellationPolicyDTO =
    components['schemas']['CancellationPolicyDTO']
export type ServiceCreateDTO = components['schemas']['ServiceCreateDTO']
export type ReservationCreateDTO = components['schemas']['ReservationCreateDTO']
export type FacilityDTO = components['schemas']['FacilityDTO']
export type MediaDTO = components['schemas']['MediaDTO']
export type BannerCreateDTO = components['schemas']['BannerCreateDTO']
