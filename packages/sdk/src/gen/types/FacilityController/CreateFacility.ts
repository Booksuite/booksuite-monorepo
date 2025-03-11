import type { Facility } from '../Facility.ts'
import type { FacilityInput } from '../FacilityInput.ts'

export type CreateFacility200 = Facility

export type CreateFacilityMutationRequest = FacilityInput

export type CreateFacilityMutationResponse = CreateFacility200

export type CreateFacilityMutation = {
  Response: CreateFacility200
  Request: CreateFacilityMutationRequest
  Errors: any
}