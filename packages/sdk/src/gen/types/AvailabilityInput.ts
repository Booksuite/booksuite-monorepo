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
  unavailabilitySource: UnavailableSource
  /**
   * @description Unavailability reason
   */
  unavailableReason: UnavailabilityReason
  /**
   * @description Unavailability reason message
   * @type string
   */
  unavailableReasonMessage: string
}