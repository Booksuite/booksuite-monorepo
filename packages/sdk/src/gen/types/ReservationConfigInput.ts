export const ReservationConfigDTOReservationDepositType = {
  PERCENTAGE_ON_RESERVATION: 'PERCENTAGE_ON_RESERVATION',
  FULL_AMOUNT_ON_RESERVATION: 'FULL_AMOUNT_ON_RESERVATION',
  DAYLIES_FULL_AMOUNT_ON_RESERVATION: 'DAYLIES_FULL_AMOUNT_ON_RESERVATION',
  FIRST_DAYLY_ON_RESERVATION: 'FIRST_DAYLY_ON_RESERVATION',
  NO_CHARGE: 'NO_CHARGE',
} as const

type ReservationConfigDTOReservationDepositType = (typeof ReservationConfigDTOReservationDepositType)[keyof typeof ReservationConfigDTOReservationDepositType]

export type ReservationConfigInput = {
  /**
   * @description Percentage added at the end of purchase
   * @type number
   */
  tax: number
  /**
   * @type string
   */
  reservationDepositType: ReservationConfigDTOReservationDepositType
  /**
   * @type number
   */
  reservationDepositTypeValue: number
  /**
   * @type string
   */
  reservationPolicy: string
}