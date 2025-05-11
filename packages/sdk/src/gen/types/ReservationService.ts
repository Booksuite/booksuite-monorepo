import type { OmitTypeClass } from './OmitTypeClass.ts'

export type ReservationService = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  quantity: number
  /**
   * @type number
   */
  totalPrice: number
  /**
   * @type object
   */
  service: OmitTypeClass
}