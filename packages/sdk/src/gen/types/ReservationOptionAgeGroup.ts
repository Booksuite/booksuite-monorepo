import type { AgeGroupInput } from './AgeGroupInput.ts'

export type ReservationOptionAgeGroup = {
  /**
   * @type string
   */
  id: string
  ageGroup: AgeGroupInput
  /**
   * @type number
   */
  price: number
}