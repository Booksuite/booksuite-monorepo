import type { CompanyContactInput } from './CompanyContactInput.ts'
import type { CompanyFacilityInput } from './CompanyFacilityInput.ts'
import type { CompanySettingsInput } from './CompanySettingsInput.ts'
import type { MapCoordinatesInput } from './MapCoordinatesInput.ts'

export type CompanyUpdateInput = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type boolean | undefined
   */
  published?: boolean
  /**
   * @type string | undefined
   */
  slug?: string
  /**
   * @type string
   */
  shortDescription?: string | null
  /**
   * @type string
   */
  description?: string | null
  /**
   * @type string
   */
  timezone?: string | null
  /**
   * @type string
   */
  logo?: string | null
  /**
   * @type string
   */
  favIcon?: string | null
  settings?: CompanySettingsInput | null
  /**
   * @type array | undefined
   */
  contacts?: CompanyContactInput[]
  /**
   * @type string | undefined
   */
  responsible?: string
  /**
   * @type string
   */
  responsibleEmail?: string | null
  /**
   * @type string
   */
  responsiblePhone?: string | null
  /**
   * @type string | undefined
   */
  docType?: string
  /**
   * @type string | undefined
   */
  identification?: string
  /**
   * @type string | undefined
   */
  companyName?: string
  /**
   * @type string
   */
  stateRegistration?: string | null
  /**
   * @type string
   */
  municipalRegistration?: string | null
  /**
   * @type string | undefined
   */
  address?: string
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
   * @type array | undefined
   */
  facilities?: CompanyFacilityInput[]
  /**
   * @type string | undefined
   */
  city?: string
  mapCoordinates: MapCoordinatesInput
  /**
   * @type string
   */
  bannerImageId?: string | null
  /**
   * @type string
   */
  bannerTitle?: string | null
  /**
   * @type string
   */
  bannerDescription?: string | null
}