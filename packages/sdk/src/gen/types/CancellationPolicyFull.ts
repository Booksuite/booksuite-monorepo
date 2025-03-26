import type { CancellationPolicyPenalty } from './CancellationPolicyPenalty.ts'
import type { PenaltyRange } from './PenaltyRange.ts'

export type CancellationPolicyFull = {
  /**
   * @type string
   */
  id: string
  defaultPenaltyBy: CancellationPolicyPenalty
  /**
   * @description Only defined if penalty is not FIRST_NIGHT_AMOUNT
   * @type number
   */
  defaultValue: number
  /**
   * @type boolean
   */
  applyCancellationTax: boolean | null
  /**
   * @type boolean
   */
  extraCancellationTax: boolean | null
  /**
   * @type number
   */
  withdrawalPeriod: number
  /**
   * @type string
   */
  dynamicDescription: string | null
  /**
   * @type string
   */
  otherDescription: string | null
  /**
   * @type string
   */
  flexModel: string | null
  /**
   * @type string
   */
  balancedModel: string | null
  /**
   * @type string
   */
  moderateModel: string | null
  /**
   * @type string
   */
  hardModel: string | null
  /**
   * @type array
   */
  penaltyRanges: PenaltyRange[]
}