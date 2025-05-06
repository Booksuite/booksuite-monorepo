import type { CompanyContact } from './CompanyContact.ts'
import type { CompanyFacility } from './CompanyFacility.ts'
import type { CompanyMedia } from './CompanyMedia.ts'
import type { CompanySettings } from './CompanySettings.ts'
import type { MapCoordinatesInput } from './MapCoordinatesInput.ts'
import type { Media } from './Media.ts'

export type CompanyResponseFullDTOType = 'INN' | 'HOTEL' | 'RESORT' | 'CHALET' | 'FARM_HOTEL' | 'AIRBNB' | 'HOSTEL' | 'FLAT_APART_HOTEL' | 'CAMPING' | 'OTHER'

export type CompanyFull = {
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
  type: CompanyResponseFullDTOType
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
  responsibleEmail: string
  /**
   * @type string
   */
  responsiblePhone: string
  /**
   * @type string
   */
  docType: string | null
  /**
   * @type string
   */
  identification: string | null
  /**
   * @type string
   */
  companyName: string | null
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
  address: string | null
  /**
   * @type string
   */
  zipcode: string | null
  /**
   * @type string
   */
  number: string | null
  /**
   * @type string
   */
  country: string | null
  /**
   * @type string
   */
  state: string | null
  /**
   * @type string
   */
  city: string | null
  /**
   * @type string
   */
  privacyPolicyDescription: string
  /**
   * @type string
   */
  privacyPolicySimpleModel: string
  /**
   * @type string
   */
  privacyPolicyFullModel: string
  mapCoordinates: MapCoordinatesInput | null
  /**
   * @type string
   */
  bannerTitle: string | null
  /**
   * @type string
   */
  bannerDescription: string | null
  bannerImage: Media | null
  /**
   * @type array
   */
  companyMedias: CompanyMedia[] | null
  settings: CompanySettings | null
  /**
   * @type array
   */
  contacts: CompanyContact[] | null
  /**
   * @type array
   */
  facilities: CompanyFacility[]
}