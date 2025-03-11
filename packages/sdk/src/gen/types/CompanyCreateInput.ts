import type { CompanyContactInput } from './CompanyContactInput.ts'
import type { CompanyFacilityInput } from './CompanyFacilityInput.ts'
import type { CompanySettingsInput } from './CompanySettingsInput.ts'

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
   * @type string | undefined
   */
  responsibleEmail?: string
  /**
   * @type string | undefined
   */
  responsiblePhone?: string
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
   * @type string | undefined
   */
  stateRegistration?: string
  /**
   * @type string | undefined
   */
  municipalRegistration?: string
  /**
   * @type string
   */
  address: string
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
   * @type array
   */
  facilities: CompanyFacilityInput[]
  /**
   * @type string
   */
  city: string
}