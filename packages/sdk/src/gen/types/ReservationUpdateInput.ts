import type { ReservationAgeGroupInput } from './ReservationAgeGroupInput.ts'
import type { ReservationServiceInput } from './ReservationServiceInput.ts'

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
   * @type string | undefined
   */
  status?: ReservationUpdateDTOStatus
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
  totalDays?: number
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
   * @type number | undefined
   */
  finalPrice?: number
  /**
   * @type array | undefined
   */
  services?: ReservationServiceInput[]
  /**
   * @type string
   */
  rateOptionId?: string | null
}