import type { Service } from '../Service.ts'
import type { ServiceCreateInput } from '../ServiceCreateInput.ts'

export type CreateServicePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateService200 = Service

export type CreateServiceMutationRequest = ServiceCreateInput

export type CreateServiceMutationResponse = CreateService200

export type CreateServiceMutation = {
  Response: CreateService200
  Request: CreateServiceMutationRequest
  PathParams: CreateServicePathParams
  Errors: any
}