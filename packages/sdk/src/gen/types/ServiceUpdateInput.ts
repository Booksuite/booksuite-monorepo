import type { ServiceHousingUnitTypeInput } from './ServiceHousingUnitTypeInput.ts'
import type { ServiceMediaInput } from './ServiceMediaInput.ts'

export type ServiceUpdateInput = {
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
  billType?: string
  /**
   * @type number | undefined
   */
  price?: number
  /**
   * @type number | undefined
   */
  adults?: number
  /**
   * @type number | undefined
   */
  minDaily?: number
  /**
   * @type number | undefined
   */
  minNotice?: number
  /**
   * @type boolean | undefined
   */
  onlineSale?: boolean
  /**
   * @type boolean | undefined
   */
  panelSale?: boolean
  /**
   * @type boolean | undefined
   */
  seasonalSale?: boolean
  /**
   * @type string | undefined
   */
  seasonStart?: string
  /**
   * @type string | undefined
   */
  seasonEnd?: string
  /**
   * @type array | undefined
   */
  availableWeekDays?: number[]
  /**
   * @type string | undefined
   */
  description?: string
  /**
   * @type string | undefined
   */
  included?: string
  /**
   * @type string | undefined
   */
  notes?: string
  /**
   * @type string
   */
  coverMediaId?: string | null
  /**
   * @type array | undefined
   */
  medias?: ServiceMediaInput[]
  /**
   * @type array | undefined
   */
  availableHousingUnitTypes?: ServiceHousingUnitTypeInput[]
}