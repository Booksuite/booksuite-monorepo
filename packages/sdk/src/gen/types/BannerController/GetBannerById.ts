import type { BannerFull } from '../BannerFull.ts'

export type GetBannerByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetBannerById200 = BannerFull | null

export type GetBannerByIdQueryResponse = GetBannerById200

export type GetBannerByIdQuery = {
  Response: GetBannerById200
  PathParams: GetBannerByIdPathParams
  Errors: any
}