export type FacilityResponseDTOType = 'HOUSING_UNIT_TYPE' | 'COMPANY'

export type FacilityResponseDTOCategory =
  | 'GENERAL'
  | 'FOOD_AND_BEVERAGES'
  | 'LEISURE_AREAS'
  | 'ACTIVITIES'
  | 'STRUCTURE'
  | 'LANGUAGES_SPOKEN'
  | 'INTERNET'
  | 'SERVICES'
  | 'BED_TYPES'

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