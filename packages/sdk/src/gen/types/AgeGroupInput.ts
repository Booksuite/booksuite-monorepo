import type { AgeGroupChargeType } from './AgeGroupChargeType.ts'

export type AgeGroupInput = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type number
   */
  initialAge: number
  /**
   * @type number
   */
  finalAge: number
  chargeType: AgeGroupChargeType
  /**
   * @type number | undefined
   */
  value?: number
}