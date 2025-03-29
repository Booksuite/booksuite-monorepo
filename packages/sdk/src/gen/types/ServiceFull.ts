import type { BillingType } from './BillingType.ts'
import type { Media } from './Media.ts'
import type { ServiceHousingUnitType } from './ServiceHousingUnitType.ts'
import type { ServiceMedia } from './ServiceMedia.ts'

export type ServiceFull = {
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
  billingType: BillingType
  /**
   * @type number
   */
  price: number
  /**
   * @type number
   */
  adults: number
  /**
   * @type number
   */
  minDaily: number
  /**
   * @type number
   */
  minNotice: number
  /**
   * @type boolean
   */
  onlineSale: boolean
  /**
   * @type boolean
   */
  panelSale: boolean
  /**
   * @type boolean
   */
  seasonalSale: boolean
  /**
   * @type string, date-time
   */
  seasonStart: string
  /**
   * @type string, date-time
   */
  seasonEnd: string
  /**
   * @type string
   */
  description: string
  /**
   * @type string
   */
  included: string
  /**
   * @type string
   */
  notes: string
  /**
   * @type array
   */
  availableWeekDays: number[]
  coverMedia: Media | null
  /**
   * @type array
   */
  medias: ServiceMedia[]
  /**
   * @type array
   */
  availableHousingUnitTypes: ServiceHousingUnitType[] | null
}