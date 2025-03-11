import type { BannerPaginated } from '../BannerPaginated.ts'
import type { BannerSearchBodyInput } from '../BannerSearchBodyInput.ts'

export type SearchBannersPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type SearchBannersQueryParams = {
  /**
   * @type string | undefined
   */
  query?: string
}

export type SearchBanners200 = BannerPaginated

export type SearchBannersMutationRequest = BannerSearchBodyInput

export type SearchBannersMutationResponse = SearchBanners200

export type SearchBannersMutation = {
  Response: SearchBanners200
  Request: SearchBannersMutationRequest
  PathParams: SearchBannersPathParams
  QueryParams: SearchBannersQueryParams
  Errors: any
}