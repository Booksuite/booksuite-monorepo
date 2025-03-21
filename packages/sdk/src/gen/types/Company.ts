import type { MapCoordinatesInput } from './MapCoordinatesInput.ts'
import type { Media } from './Media.ts'

export type CompanyResponseDTOType = 'INN' | 'HOTEL' | 'RESORT' | 'CHALET' | 'FARM_HOTEL' | 'AIRBNB' | 'HOSTEL' | 'FLAT_APART_HOTEL' | 'CAMPING' | 'OTHER'

export type Company = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  slug: string
  /**
   * @type string
   */
  shortDescription: string | null
  /**
   * @type string
   */
  description: string | null
  /**
   * @type string
   */
  type: CompanyResponseDTOType
  /**
   * @type string
   */
  timezone: string | null
  /**
   * @type string
   */
  logo: string | null
  /**
   * @type string
   */
  favIcon: string | null
  /**
   * @type string
   */
  responsible: string
  /**
   * @type string
   */
  responsibleEmail: string | null
  /**
   * @type string
   */
  responsiblePhone: string | null
  /**
   * @type string
   */
  docType: string
  /**
   * @type string
   */
  identification: string
  /**
   * @type string
   */
  companyName: string
  /**
   * @type string
   */
  stateRegistration: string | null
  /**
   * @type string
   */
  municipalRegistration: string | null
  /**
   * @type string
   */
  address: string
  /**
   * @type string
   */
  zipcode: string
  /**
   * @type string
   */
  number: string
  /**
   * @type string
   */
  country: string
  /**
   * @type string
   */
  state: string
  /**
   * @type string
   */
  city: string
  mapCoordinates: MapCoordinatesInput
  /**
   * @type string
   */
  bannerTitle: string | null
  /**
   * @type string
   */
  bannerDescription: string | null
  bannerImage: Media | null
}