import type { ServiceHousingUnitTypeInput } from './ServiceHousingUnitTypeInput.ts'
import type { ServiceMediaInput } from './ServiceMediaInput.ts'

export type ServiceCreateInput = {
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
  billType: string
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
   * @type string
   */
  seasonStart: string
  /**
   * @type string
   */
  seasonEnd: string
  /**
   * @type array
   */
  availableWeekDays: number[]
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
   * @type string | undefined
   */
  coverMediaId?: string
  /**
   * @type array
   */
  medias: ServiceMediaInput[]
  /**
   * @type array
   */
  availableHousingUnitTypes: ServiceHousingUnitTypeInput[]
}