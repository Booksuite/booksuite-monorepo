import type { MediaOrderByInput } from './MediaOrderByInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type MediaSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  order?: MediaOrderByInput
}