import type { UtilityLinksPaginated } from '../UtilityLinksPaginated.ts'
import type { UtilityLinksSearchBodyInput } from '../UtilityLinksSearchBodyInput.ts'

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

export type SearchUtilityLinks200 = UtilityLinksPaginated

export type SearchUtilityLinksMutationRequest = UtilityLinksSearchBodyInput

export type SearchUtilityLinksMutationResponse = SearchUtilityLinks200

export type SearchUtilityLinksMutation = {
  Response: SearchUtilityLinks200
  Request: SearchUtilityLinksMutationRequest
  PathParams: SearchUtilityLinksPathParams
  QueryParams: SearchUtilityLinksQueryParams
  Errors: any
}