export const FacilityResponseDTOType = {
  HOUSING_UNIT_TYPE: 'HOUSING_UNIT_TYPE',
  COMPANY: 'COMPANY',
} as const

type FacilityResponseDTOType = (typeof FacilityResponseDTOType)[keyof typeof FacilityResponseDTOType]

export const FacilityResponseDTOCategory = {
  GENERAL: 'GENERAL',
  FOOD_AND_BEVERAGES: 'FOOD_AND_BEVERAGES',
  LEISURE_AREAS: 'LEISURE_AREAS',
  ACTIVITIES: 'ACTIVITIES',
  STRUCTURE: 'STRUCTURE',
  LANGUAGES_SPOKEN: 'LANGUAGES_SPOKEN',
  INTERNET: 'INTERNET',
  SERVICES: 'SERVICES',
  BED_TYPES: 'BED_TYPES',
} as const

type FacilityResponseDTOCategory = (typeof FacilityResponseDTOCategory)[keyof typeof FacilityResponseDTOCategory]

export type Facility = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  type: FacilityResponseDTOType
  /**
   * @type string
   */
  category: FacilityResponseDTOCategory
  /**
   * @type string
   */
  name: string
  /**
   * @type string
   */
  icon: string | null
}