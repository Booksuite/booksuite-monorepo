import type { CancellationPolicyPenalty } from './CancellationPolicyPenalty.ts'
import type { PenaltyRangeInput } from './PenaltyRangeInput.ts'

export type CancellationPolicyInput = {
  /**
   * @type boolean | undefined
   */
  applyCancellationTax?: boolean
  defaultPenaltyBy: CancellationPolicyPenalty
  /**
   * @description Only defined if penalty is not FIRST_NIGHT_AMOUNT
   * @type number
   */
  defaultValue: number
  /**
   * @type boolean | undefined
   */
  extraCancellationTax?: boolean
  /**
   * @type number
   */
  withdrawalPeriod: number
  /**
   * @type string | undefined
   */
  dynamicDescription?: string
  /**
   * @type string | undefined
   */
  otherDescription?: string
  /**
   * @type string | undefined
   */
  flexModel?: string
  /**
   * @type string | undefined
   */
  balancedModel?: string
  /**
   * @type string | undefined
   */
  moderateModel?: string
  /**
   * @type string | undefined
   */
  hardModel?: string
  /**
   * @type array
   */
  penaltyRanges: PenaltyRangeInput[]
}