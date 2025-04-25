import type { PaymentMethod } from './PaymentMethod.ts'

export type OfferPaymentMethod = {
  /**
   * @type string
   */
  id: string
  /**
   * @type object
   */
  paymentMethod: PaymentMethod
}