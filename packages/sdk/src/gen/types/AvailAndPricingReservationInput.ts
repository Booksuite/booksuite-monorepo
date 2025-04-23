import type { HousingUnit } from './HousingUnit.ts'
import type { User } from './User.ts'

export type AvailAndPricingReservationDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type AvailAndPricingReservationDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type AvailAndPricingReservationInput = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  status: AvailAndPricingReservationDTOStatus
  /**
   * @type string
   */
  saleChannel: AvailAndPricingReservationDTOSaleChannel
  /**
   * @type string, date
   */
  startDate: string
  /**
   * @type string, date
   */
  endDate: string
  /**
   * @type number
   */
  totalDays: number | null
  /**
   * @type number
   */
  finalPrice: number
  /**
   * @type number
   */
  adults: number
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
  /**
   * @type string
   */
  reservationCode: string
  /**
   * @type string
   */
  sellerUserId: string | null
  /**
   * @type string
   */
  guestUserId: string
  /**
   * @type string
   */
  companyId: string
  /**
   * @type string
   */
  housingUnitId: string | null
  /**
   * @type string
   */
  rateOptionId: string | null
  /**
   * @type string, date-time
   */
  deletedAt: string | null
  housingUnit: HousingUnit | null
  /**
   * @type object
   */
  guestUser: User
}