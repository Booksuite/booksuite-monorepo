export const FacilityDTOType = {
  HOUSING_UNIT_TYPE: 'HOUSING_UNIT_TYPE',
  COMPANY: 'COMPANY',
} as const

type FacilityDTOType = (typeof FacilityDTOType)[keyof typeof FacilityDTOType]

export const FacilityDTOCategory = {
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

type FacilityDTOCategory = (typeof FacilityDTOCategory)[keyof typeof FacilityDTOCategory]

export type FacilityInput = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type string
   */
  type: FacilityDTOType
  /**
   * @type string
   */
  category: FacilityDTOCategory
  /**
   * @type string
   */
  name: string
  /**
   * @type object | undefined
   */
  icon?: object
}