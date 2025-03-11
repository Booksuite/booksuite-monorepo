import type { ServiceCategoryInput } from './ServiceCategoryInput.ts'
import type { ServiceMediaCreateInput } from './ServiceMediaCreateInput.ts'

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
  videoUrl?: string
  /**
   * @type array
   */
  medias: ServiceMediaCreateInput[]
  /**
   * @type array
   */
  category: ServiceCategoryInput[]
}