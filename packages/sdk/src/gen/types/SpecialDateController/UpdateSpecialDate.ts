import type { SpecialDate } from '../SpecialDate.ts'
import type { SpecialDateUpdateInput } from '../SpecialDateUpdateInput.ts'

export type UpdateSpecialDatePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type UpdateSpecialDate200 = SpecialDate

export type UpdateSpecialDateMutationRequest = SpecialDateUpdateInput

export type UpdateSpecialDateMutationResponse = UpdateSpecialDate200

export type UpdateSpecialDateMutation = {
  Response: UpdateSpecialDate200
  Request: UpdateSpecialDateMutationRequest
  PathParams: UpdateSpecialDatePathParams
  Errors: any
}