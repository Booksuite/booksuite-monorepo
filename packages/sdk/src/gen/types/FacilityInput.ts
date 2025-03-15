export type FacilityDTOType = 'HOUSING_UNIT_TYPE' | 'COMPANY'

export type FacilityDTOCategory =
  | 'GENERAL'
  | 'FOOD_AND_BEVERAGES'
  | 'LEISURE_AREAS'
  | 'ACTIVITIES'
  | 'STRUCTURE'
  | 'LANGUAGES_SPOKEN'
  | 'INTERNET'
  | 'SERVICES'
  | 'BED_TYPES'

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