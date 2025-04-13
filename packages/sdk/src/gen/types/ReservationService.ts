import type { Service } from './Service.ts'

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
  service: Service
}