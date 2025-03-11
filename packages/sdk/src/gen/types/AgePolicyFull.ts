import type { AgeGroup } from './AgeGroup.ts'

export type AgePolicyFull = {
  /**
   * @type string
   */
  id: string
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
  ageGroups: AgeGroup[]
}