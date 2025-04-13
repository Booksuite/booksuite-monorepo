import type { OfferOrderByInput } from './OfferOrderByInput.ts'
import type { OfferSearchFilterInput } from './OfferSearchFilterInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type OfferSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  order?: OfferOrderByInput
  /**
   * @type object | undefined
   */
  filter?: OfferSearchFilterInput
}