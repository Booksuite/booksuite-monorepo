import type { UtilityLinks } from '../UtilityLinks.ts'
import type { UtilityLinksInput } from '../UtilityLinksInput.ts'

export type UtilityLinksControllerCreatePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UtilityLinksControllerCreate200 = UtilityLinks

export type UtilityLinksControllerCreateMutationRequest = UtilityLinksInput

export type UtilityLinksControllerCreateMutationResponse = UtilityLinksControllerCreate200

export type UtilityLinksControllerCreateMutation = {
  Response: UtilityLinksControllerCreate200
  Request: UtilityLinksControllerCreateMutationRequest
  PathParams: UtilityLinksControllerCreatePathParams
  Errors: any
}