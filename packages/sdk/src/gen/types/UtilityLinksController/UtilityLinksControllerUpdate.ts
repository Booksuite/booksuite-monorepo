import type { UtilityLinks } from '../UtilityLinks.ts'
import type { UtilityLinksInput } from '../UtilityLinksInput.ts'

export type UtilityLinksControllerUpdatePathParams = {
  /**
   * @type string
   */
  id: string
}

export type UtilityLinksControllerUpdate200 = UtilityLinks

export type UtilityLinksControllerUpdateMutationRequest = UtilityLinksInput

export type UtilityLinksControllerUpdateMutationResponse = UtilityLinksControllerUpdate200

export type UtilityLinksControllerUpdateMutation = {
  Response: UtilityLinksControllerUpdate200
  Request: UtilityLinksControllerUpdateMutationRequest
  PathParams: UtilityLinksControllerUpdatePathParams
  Errors: any
}