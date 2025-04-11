import type { UtilityLinks } from '../UtilityLinks.ts'

export type GetUtilityLinkPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetUtilityLink200 = UtilityLinks | null

export type GetUtilityLinkQueryResponse = GetUtilityLink200

export type GetUtilityLinkQuery = {
  Response: GetUtilityLink200
  PathParams: GetUtilityLinkPathParams
  Errors: any
}