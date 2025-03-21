import type { Banner } from '../Banner.ts'
import type { BannerUpdateInput } from '../BannerUpdateInput.ts'

export type UpdateBannerPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateBanner200 = Banner

export type UpdateBannerMutationRequest = BannerUpdateInput

export type UpdateBannerMutationResponse = UpdateBanner200

export type UpdateBannerMutation = {
  Response: UpdateBanner200
  Request: UpdateBannerMutationRequest
  PathParams: UpdateBannerPathParams
  Errors: any
}