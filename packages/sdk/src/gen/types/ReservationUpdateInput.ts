import type { ReservationAgeGroupInput } from './ReservationAgeGroupInput.ts'
import type { ReservationServiceInput } from './ReservationServiceInput.ts'
import type { ReservationSummaryInput } from './ReservationSummaryInput.ts'

export type ReservationUpdateDTOStatus =
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'ABANDONED'
  | 'CANCELLED'
  | 'PAYMENT_FAILED'
  | 'OVERBOOKED'
  | 'WAITING_LIST'

export type ReservationUpdateDTOSaleChannel = 'RECEPTION' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'TIKTOK' | 'EMAIL' | 'BOOKSUITE' | 'OTHER'

export type ReservationUpdateInput = {
  /**
   * @description Base price for the day
   * @type number | undefined
   */
  basePrice?: number
  /**
   * @description Offer amount for the day
   * @type number | undefined
   */
  offerAmount?: number
  /**
   * @description Services price for the day
   * @type number | undefined
   */
  servicesPrice?: number
  /**
   * @description Children price for the day
   * @type number | undefined
   */
  childrenPrice?: number
  /**
   * @description Rate option price for the day
   * @type number | undefined
   */
  rateOptionPrice?: number
  /**
   * @description Final price for the day
   * @type number | undefined
   */
  finalPrice?: number
  /**
   * @type string | undefined
   */
  status?: ReservationUpdateDTOStatus
  /**
   * @type object | undefined
   */
  summary?: ReservationSummaryInput
  /**
   * @type string | undefined
   */
  userId?: string
  /**
   * @type string
   */
  sellerUserId?: string | null
  /**
   * @type string | undefined
   */
  saleChannel?: ReservationUpdateDTOSaleChannel
  /**
   * @type string | undefined
   */
  startDate?: string
  /**
   * @type string | undefined
   */
  endDate?: string
  /**
   * @type number | undefined
   */
  adults?: number
  /**
   * @type array | undefined
   */
  ageGroups?: ReservationAgeGroupInput[]
  /**
   * @type string | undefined
   */
  notes?: string
  /**
   * @type string | undefined
   */
  housingUnitId?: string
  /**
   * @type string | undefined
   */
  housingUnitTypeId?: string
  /**
   * @type array | undefined
   */
  services?: ReservationServiceInput[]
  /**
   * @type string
   */
  rateOptionId?: string | null
}