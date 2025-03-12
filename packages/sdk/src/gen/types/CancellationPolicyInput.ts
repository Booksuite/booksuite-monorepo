import type { PenaltyRangeInput } from './PenaltyRangeInput.ts'

export const CancellationPolicyDTODefaultPenaltyBy = {
  RESERVATION_PERCENTAGE: 'RESERVATION_PERCENTAGE',
  FULL_DAILIES_PERCENTAGE: 'FULL_DAILIES_PERCENTAGE',
  FIRST_NIGHT_AMOUNT: 'FIRST_NIGHT_AMOUNT',
} as const

type CancellationPolicyDTODefaultPenaltyBy = (typeof CancellationPolicyDTODefaultPenaltyBy)[keyof typeof CancellationPolicyDTODefaultPenaltyBy]

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