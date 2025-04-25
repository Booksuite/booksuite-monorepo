import type { UnavailabilityReason } from './UnavailabilityReason.ts'
import type { UnavailableSource } from './UnavailableSource.ts'

export type AvailabilityInput = {
  /**
   * @description Availability
   * @type boolean
   */
  available: boolean
  /**
   * @description Unavailability source
   */
  unavailabilitySource: UnavailableSource | null
  /**
   * @description Unavailability reason
   */
  unavailableReason: UnavailabilityReason | null
  /**
   * @description Unavailability reason message
   * @type object
   */
  unavailableReasonMessage: object | null
}