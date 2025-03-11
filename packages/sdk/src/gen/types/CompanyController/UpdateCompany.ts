import type { Company } from '../Company.ts'
import type { CompanyCreateInput } from '../CompanyCreateInput.ts'

export type UpdateCompanyPathParams = {
  /**
   * @type string
   */
  id: string
}

export type UpdateCompany200 = Company

export type UpdateCompanyMutationRequest = CompanyCreateInput

export type UpdateCompanyMutationResponse = UpdateCompany200

export type UpdateCompanyMutation = {
  Response: UpdateCompany200
  Request: UpdateCompanyMutationRequest
  PathParams: UpdateCompanyPathParams
  Errors: any
}