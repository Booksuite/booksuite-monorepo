import type { Banner } from '../Banner.ts'
import type { BannerCreateInput } from '../BannerCreateInput.ts'

export type CreateBannerPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateBanner200 = Banner

export type CreateBannerMutationRequest = BannerCreateInput

export type CreateBannerMutationResponse = CreateBanner200

export type CreateBannerMutation = {
  Response: CreateBanner200
  Request: CreateBannerMutationRequest
  PathParams: CreateBannerPathParams
  Errors: any
}