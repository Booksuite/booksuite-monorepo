import type { PenaltyRange } from './PenaltyRange.ts'

export type CancellationPolicyResponseFullDTODefaultPenaltyBy = 'RESERVATION_PERCENTAGE' | 'FULL_DAILIES_PERCENTAGE' | 'FIRST_NIGHT_AMOUNT'

export type CancellationPolicyFull = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  text: string
  /**
   * @type string
   */
  defaultPenaltyBy: CancellationPolicyResponseFullDTODefaultPenaltyBy
  /**
   * @description Only defined if penalty is not FIRST_NIGHT_AMOUNT
   * @type number
   */
  defaultValue: number
  /**
   * @type array
   */
  penaltyRanges: PenaltyRange[]
}