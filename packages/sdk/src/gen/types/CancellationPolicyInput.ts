import type { PenaltyRangeInput } from './PenaltyRangeInput.ts'

export type CancellationPolicyDTODefaultPenaltyBy = 'RESERVATION_PERCENTAGE' | 'FULL_DAILIES_PERCENTAGE' | 'FIRST_NIGHT_AMOUNT'

export type CancellationPolicyInput = {
  /**
   * @type string
   */
  defaultPenaltyBy: CancellationPolicyDTODefaultPenaltyBy
  /**
   * @description Only defined if penalty is not FIRST_NIGHT_AMOUNT
   * @type number
   */
  defaultValue: number
  /**
   * @type array
   */
  penaltyRanges: PenaltyRangeInput[]
}