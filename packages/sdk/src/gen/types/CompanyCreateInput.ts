import type { CompanyContactInput } from './CompanyContactInput.ts'
import type { CompanyFacilityInput } from './CompanyFacilityInput.ts'
import type { CompanySettingsInput } from './CompanySettingsInput.ts'
import type { MapCoordinatesInput } from './MapCoordinatesInput.ts'

export type CompanyCreateInput = {
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
   * @type string | undefined
   */
  shortDescription?: string
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type string | undefined
   */
  timezone?: string
  /**
   * @type string | undefined
   */
  logo?: string
  /**
   * @type string | undefined
   */
  favIcon?: string
  /**
   * @type object | undefined
   */
  settings?: CompanySettingsInput
  /**
   * @type array | undefined
   */
  contacts?: CompanyContactInput[]
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
  docType: string
  /**
   * @type string | undefined
   */
  identification?: string
  /**
   * @type string | undefined
   */
  companyName?: string
  /**
   * @type string | undefined
   */
  stateRegistration?: string
  /**
   * @type string | undefined
   */
  municipalRegistration?: string
  /**
   * @type string | undefined
   */
  address?: string
  /**
   * @type string | undefined
   */
  zipcode?: string
  /**
   * @type string | undefined
   */
  number?: string
  /**
   * @type string | undefined
   */
  country?: string
  /**
   * @type string | undefined
   */
  state?: string
  /**
   * @type string | undefined
   */
  city?: string
  /**
   * @type array | undefined
   */
  facilities?: CompanyFacilityInput[]
  mapCoordinates: MapCoordinatesInput
  /**
   * @type string | undefined
   */
  bannerImageId?: string
  /**
   * @type string | undefined
   */
  bannerTitle?: string
  /**
   * @type string | undefined
   */
  bannerDescription?: string
}