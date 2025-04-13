import type { AgeGroupInput } from './AgeGroupInput.ts'

export type ReservationAgeGroup = {
  /**
   * @type number
   */
  quantity: number
  /**
   * @type string
   */
  ageGroupId: string
  /**
   * @type string
   */
  reservationId: string
  /**
   * @type object
   */
  ageGroup: AgeGroupInput
}