import type { AgeGroupInput } from './AgeGroupInput.ts'

export type AgePolicyInput = {
  /**
   * @type boolean
   */
  acceptChildren: boolean
  /**
   * @type number
   */
  adultMinAge: number
  /**
   * @type array
   */
  ageGroups: AgeGroupInput[]
}