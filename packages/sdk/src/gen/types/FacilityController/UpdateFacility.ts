import type { Facility } from '../Facility.ts'
import type { FacilityInput } from '../FacilityInput.ts'

export type UpdateFacilityPathParams = {
  /**
   * @type string
   */
  id: string
}

export type UpdateFacility200 = Facility

export type UpdateFacilityMutationRequest = FacilityInput

export type UpdateFacilityMutationResponse = UpdateFacility200

export type UpdateFacilityMutation = {
  Response: UpdateFacility200
  Request: UpdateFacilityMutationRequest
  PathParams: UpdateFacilityPathParams
  Errors: any
}