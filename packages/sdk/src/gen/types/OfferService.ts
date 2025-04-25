import type { Service } from './Service.ts'

export type OfferService = {
  /**
   * @type string
   */
  id: string
  /**
   * @type object
   */
  service: Service
}