export type DeleteBannerPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type DeleteBanner200 = any

export type DeleteBannerMutationResponse = DeleteBanner200

export type DeleteBannerMutation = {
  Response: DeleteBanner200
  PathParams: DeleteBannerPathParams
  Errors: any
}