import type { Service } from './Service.ts'

export type ReservationService = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  qtd: number
  /**
   * @type number
   */
  totalPrice: number
  /**
   * @type object
   */
  service: Service
}