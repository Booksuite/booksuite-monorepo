import type { Service } from '../Service.ts'
import type { ServiceUpdateInput } from '../ServiceUpdateInput.ts'

export type UpdateServicePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateService200 = Service

export type UpdateServiceMutationRequest = ServiceUpdateInput

export type UpdateServiceMutationResponse = UpdateService200

export type UpdateServiceMutation = {
  Response: UpdateService200
  Request: UpdateServiceMutationRequest
  PathParams: UpdateServicePathParams
  Errors: any
}