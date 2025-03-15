export type ReservationConfigResponseDTOReservationDepositType =
  | 'PERCENTAGE_ON_RESERVATION'
  | 'FULL_AMOUNT_ON_RESERVATION'
  | 'DAYLIES_FULL_AMOUNT_ON_RESERVATION'
  | 'FIRST_DAYLY_ON_RESERVATION'
  | 'NO_CHARGE'

export type ReservationConfig = {
  /**
   * @type string
   */
  id: string
  /**
   * @description Percentage added at the end of purchase
   * @type number
   */
  tax: number | null
  /**
   * @type string
   */
  reservationDepositType: ReservationConfigResponseDTOReservationDepositType
  /**
   * @type number
   */
  reservationDepositTypeValue: number | null
  /**
   * @type string
   */
  reservationPolicy: string
}