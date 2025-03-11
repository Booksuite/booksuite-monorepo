export enum PenaltyRangeResponseDTOPenaltyBy {
  'RESERVATION_PERCENTAGE' = 'RESERVATION_PERCENTAGE',
  'FULL_DAILIES_PERCENTAGE' = 'FULL_DAILIES_PERCENTAGE',
  'FIRST_NIGHT_AMOUNT' = 'FIRST_NIGHT_AMOUNT',
}

export type PenaltyRange = {
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
  penaltyBy: PenaltyRangeResponseDTOPenaltyBy
  /**
   * @type number
   */
  value: number
}