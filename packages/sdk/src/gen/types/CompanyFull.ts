import type { CompanyContact } from './CompanyContact.ts'
import type { CompanyFacility } from './CompanyFacility.ts'
import type { CompanySettings } from './CompanySettings.ts'

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
   * @type object | undefined
   */
  shortDescription?: object
  /**
   * @type object | undefined
   */
  description?: object
  /**
   * @type object | undefined
   */
  timezone?: object
  /**
   * @type object | undefined
   */
  logo?: object
  /**
   * @type object | undefined
   */
  favIcon?: object
  /**
   * @type string
   */
  responsible: string
  /**
   * @type object | undefined
   */
  responsibleEmail?: object
  /**
   * @type object | undefined
   */
  responsiblePhone?: object
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
   * @type object | undefined
   */
  stateRegistration?: object
  /**
   * @type object | undefined
   */
  municipalRegistration?: object
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
   * @type string
   */
  city: string
  /**
   * @type object | undefined
   */
  settings?: CompanySettings
  /**
   * @type array | undefined
   */
  contacts?: CompanyContact[]
  /**
   * @type array
   */
  facilities: CompanyFacility[]
}