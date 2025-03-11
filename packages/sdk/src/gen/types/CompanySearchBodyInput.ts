import type { CompanyOrderByInput } from './CompanyOrderByInput.ts'
import type { CompanySearchFilterInput } from './CompanySearchFilterInput.ts'
import type { PaginationQueryInput } from './PaginationQueryInput.ts'

export type CompanySearchBodyInput = {
  /**
   * @type object
   */
  pagination: PaginationQueryInput
  /**
   * @type object | undefined
   */
  order?: CompanyOrderByInput
  /**
   * @type object | undefined
   */
  filter?: CompanySearchFilterInput
}