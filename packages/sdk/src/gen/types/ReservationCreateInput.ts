import type { ReservationAgeGroupInput } from './ReservationAgeGroupInput.ts'
import type { ReservationServiceInput } from './ReservationServiceInput.ts'
import type { ReservationSummaryInput } from './ReservationSummaryInput.ts'

export type ReservationCreateDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationCreateDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type ReservationCreateInput = {
  /**
   * @type string
   */
  status: ReservationCreateDTOStatus
  /**
   * @type object
   */
  summary: ReservationSummaryInput
  /**
   * @type string
   */
  guestUserId: string
  /**
   * @type string
   */
  sellerUserId: string
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationCreateDTOSaleChannel
  /**
   * @type string
   */
  startDate: string
  /**
   * @type string
   */
  endDate: string
  /**
   * @type number
   */
  adults: number
  /**
   * @type array
   */
  ageGroups: ReservationAgeGroupInput[]
  /**
   * @type string
   */
  notes: string
  /**
   * @type string
   */
  housingUnitId: string
  /**
   * @type string
   */
  housingUnitTypeId: string
  /**
   * @type array
   */
  services: ReservationServiceInput[]
  /**
   * @type string | undefined
   */
  rateOptionId?: string
}