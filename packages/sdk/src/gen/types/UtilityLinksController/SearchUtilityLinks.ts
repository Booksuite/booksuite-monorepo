import type { UtilityLinks } from '../UtilityLinks.ts'
import type { UtilityLinksInput } from '../UtilityLinksInput.ts'

export type SearchUtilityLinksPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchUtilityLinksQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchUtilityLinks200 = UtilityLinks

export type SearchUtilityLinksMutationRequest = UtilityLinksInput

export type SearchUtilityLinksMutationResponse = SearchUtilityLinks200

export type SearchUtilityLinksMutation = {
  Response: SearchUtilityLinks200
  Request: SearchUtilityLinksMutationRequest
  PathParams: SearchUtilityLinksPathParams
  QueryParams: SearchUtilityLinksQueryParams
  Errors: any
}