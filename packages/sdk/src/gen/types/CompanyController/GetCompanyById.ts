import type { CompanyFull } from '../CompanyFull.ts'

export type GetCompanyByIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export type GetCompanyById200 = CompanyFull | null

export type GetCompanyByIdQueryResponse = GetCompanyById200

export type GetCompanyByIdQuery = {
  Response: GetCompanyById200
  PathParams: GetCompanyByIdPathParams
  Errors: any
}