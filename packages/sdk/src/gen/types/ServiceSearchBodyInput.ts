import type { PaginationQueryInput } from './PaginationQueryInput.ts'
import type { ServiceOrderByInput } from './ServiceOrderByInput.ts'
import type { ServiceSearchFilterInput } from './ServiceSearchFilterInput.ts'

export type ServiceSearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  filter?: ServiceSearchFilterInput
  /**
   * @type object | undefined
   */
  order?: ServiceOrderByInput
}