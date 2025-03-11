import type { ServiceFull } from '../ServiceFull.ts'

export type GetServiceByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetServiceById200 = ServiceFull | null

export type GetServiceByIdQueryResponse = GetServiceById200

export type GetServiceByIdQuery = {
  Response: GetServiceById200
  PathParams: GetServiceByIdPathParams
  Errors: any
}