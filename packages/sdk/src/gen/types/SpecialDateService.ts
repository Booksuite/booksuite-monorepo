import type { Service } from './Service.ts'

export type SpecialDateService = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  serviceId: string
  /**
   * @type object
   */
  service: Service
}