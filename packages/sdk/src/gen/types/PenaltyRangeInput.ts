export const PenaltyRangeDTOPenaltyBy = {
  RESERVATION_PERCENTAGE: 'RESERVATION_PERCENTAGE',
  FULL_DAILIES_PERCENTAGE: 'FULL_DAILIES_PERCENTAGE',
  FIRST_NIGHT_AMOUNT: 'FIRST_NIGHT_AMOUNT',
} as const

type PenaltyRangeDTOPenaltyBy = (typeof PenaltyRangeDTOPenaltyBy)[keyof typeof PenaltyRangeDTOPenaltyBy]

export type PenaltyRangeInput = {
  /**
   * @description Only defined if exists in the DB
   * @type string | undefined
   */
  id?: string
  /**
   * @type number
   */
  daysBeforeCheckIn: number
  /**
   * @type string
   */
  penaltyBy: PenaltyRangeDTOPenaltyBy
  /**
   * @type number
   */
  value: number
}