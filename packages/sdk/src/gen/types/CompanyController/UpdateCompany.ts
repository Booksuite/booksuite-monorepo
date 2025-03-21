import type { Company } from '../Company.ts'
import type { CompanyUpdateInput } from '../CompanyUpdateInput.ts'

export type UpdateCompanyPathParams = {
  /**
   * @type string
   */
  id: string
}

export type UpdateCompany200 = Company

export type UpdateCompanyMutationRequest = CompanyUpdateInput

export type UpdateCompanyMutationResponse = UpdateCompany200

export type UpdateCompanyMutation = {
  Response: UpdateCompany200
  Request: UpdateCompanyMutationRequest
  PathParams: UpdateCompanyPathParams
  Errors: any
}