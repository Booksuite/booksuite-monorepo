import type { MediaFilterInput } from './MediaFilterInput.ts'
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
  filter?: MediaFilterInput
  /**
   * @type object | undefined
   */
  order?: MediaOrderByInput
}