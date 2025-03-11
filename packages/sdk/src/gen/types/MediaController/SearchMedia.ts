import type { MediaPaginated } from '../MediaPaginated.ts'
import type { MediaSearchBodyInput } from '../MediaSearchBodyInput.ts'

export type SearchMediaPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchMediaQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchMedia200 = MediaPaginated

export type SearchMediaMutationRequest = MediaSearchBodyInput

export type SearchMediaMutationResponse = SearchMedia200

export type SearchMediaMutation = {
  Response: SearchMedia200
  Request: SearchMediaMutationRequest
  PathParams: SearchMediaPathParams
  QueryParams: SearchMediaQueryParams
  Errors: any
}