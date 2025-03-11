import type { BannerOrderByInput } from './BannerOrderByInput.ts'
import type { BannerSearchFilterInput } from './BannerSearchFilterInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type BannerSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  order?: BannerOrderByInput
  /**
   * @type object | undefined
   */
  filter?: BannerSearchFilterInput
}