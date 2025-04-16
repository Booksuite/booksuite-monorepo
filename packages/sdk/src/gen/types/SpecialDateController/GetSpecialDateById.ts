import type { SpecialDateFull } from '../SpecialDateFull.ts'

export type GetSpecialDateByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetSpecialDateById200 = SpecialDateFull | null

export type GetSpecialDateByIdQueryResponse = GetSpecialDateById200

export type GetSpecialDateByIdQuery = {
  Response: GetSpecialDateById200
  PathParams: GetSpecialDateByIdPathParams
  Errors: any
}