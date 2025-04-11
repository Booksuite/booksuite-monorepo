import type { UtilityLinks } from '../UtilityLinks.ts'
import type { UtilityLinksUpdateInput } from '../UtilityLinksUpdateInput.ts'

export type UtilityLinksControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UtilityLinksControllerUpdate200 = UtilityLinks

export type UtilityLinksControllerUpdateMutationRequest = UtilityLinksUpdateInput

export type UtilityLinksControllerUpdateMutationResponse = UtilityLinksControllerUpdate200

export type UtilityLinksControllerUpdateMutation = {
  Response: UtilityLinksControllerUpdate200
  Request: UtilityLinksControllerUpdateMutationRequest
  PathParams: UtilityLinksControllerUpdatePathParams
  Errors: any
}