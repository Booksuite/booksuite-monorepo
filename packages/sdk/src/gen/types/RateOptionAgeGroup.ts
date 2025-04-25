import type { AgeGroupInput } from './AgeGroupInput.ts'

export type RateOptionAgeGroup = {
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