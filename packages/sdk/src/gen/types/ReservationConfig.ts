export enum ReservationConfigResponseDTOReservationDepositType {
  'PERCENTAGE_ON_RESERVATION' = 'PERCENTAGE_ON_RESERVATION',
  'FULL_AMOUNT_ON_RESERVATION' = 'FULL_AMOUNT_ON_RESERVATION',
  'DAYLIES_FULL_AMOUNT_ON_RESERVATION' = 'DAYLIES_FULL_AMOUNT_ON_RESERVATION',
  'FIRST_DAYLY_ON_RESERVATION' = 'FIRST_DAYLY_ON_RESERVATION',
  'NO_CHARGE' = 'NO_CHARGE',
}

export type ReservationConfig = {
  /**
   * @type string
   */
  id: string
  /**
   * @description Percentage added at the end of purchase
   * @type object
   */
  tax: object
  /**
   * @type string
   */
  reservationDepositType: ReservationConfigResponseDTOReservationDepositType
  /**
   * @type object
   */
  reservationDepositTypeValue: object
  /**
   * @type string
   */
  reservationPolicy: string
}