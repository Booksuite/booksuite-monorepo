export const ReservationResponseDTOStatus = {
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  CHECKED_OUT: 'CHECKED_OUT',
  ABANDONED: 'ABANDONED',
  CANCELLED: 'CANCELLED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  OVERBOOKED: 'OVERBOOKED',
  WAITING_LIST: 'WAITING_LIST',
} as const

type ReservationResponseDTOStatus = (typeof ReservationResponseDTOStatus)[keyof typeof ReservationResponseDTOStatus]

export const ReservationResponseDTOSaleChannel = {
  RECEPTION: 'RECEPTION',
  PHONE: 'PHONE',
  WHATSAPP: 'WHATSAPP',
  INSTAGRAM: 'INSTAGRAM',
  TIKTOK: 'TIKTOK',
  EMAIL: 'EMAIL',
  BOOKSUITE: 'BOOKSUITE',
  OTHER: 'OTHER',
} as const

type ReservationResponseDTOSaleChannel = (typeof ReservationResponseDTOSaleChannel)[keyof typeof ReservationResponseDTOSaleChannel]

export type Reservation = {
  /**
   * @type string
   */
  status: ReservationResponseDTOStatus
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationResponseDTOSaleChannel
  /**
   * @type string, date-time
   */
  startDate: string
  /**
   * @type string, date-time
   */
  endDate: string
  /**
   * @type object
   */
  totalDays: object
  /**
   * @type object
   */
  adults: object
  /**
   * @type object
   */
  children: object
  /**
   * @type string
   */
  notes: string
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
}