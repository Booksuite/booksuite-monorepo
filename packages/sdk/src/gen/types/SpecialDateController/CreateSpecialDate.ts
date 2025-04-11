import type { SpecialDate } from '../SpecialDate.ts'
import type { SpecialDateCreateInput } from '../SpecialDateCreateInput.ts'

export type CreateSpecialDatePathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type CreateSpecialDate200 = SpecialDate

export type CreateSpecialDateMutationRequest = SpecialDateCreateInput

export type CreateSpecialDateMutationResponse = CreateSpecialDate200

export type CreateSpecialDateMutation = {
  Response: CreateSpecialDate200
  Request: CreateSpecialDateMutationRequest
  PathParams: CreateSpecialDatePathParams
  Errors: any
}