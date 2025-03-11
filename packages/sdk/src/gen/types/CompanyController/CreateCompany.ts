import type { Company } from '../Company.ts'
import type { CompanyCreateInput } from '../CompanyCreateInput.ts'

export type CreateCompany200 = Company

export type CreateCompanyMutationRequest = CompanyCreateInput

export type CreateCompanyMutationResponse = CreateCompany200

export type CreateCompanyMutation = {
  Response: CreateCompany200
  Request: CreateCompanyMutationRequest
  Errors: any
}