import type { Media } from '../Media.ts'
import type { MediaInput } from '../MediaInput.ts'

export type UpsertMediaPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UpsertMedia200 = Media

export type UpsertMediaMutationRequest = MediaInput

export type UpsertMediaMutationResponse = UpsertMedia200

export type UpsertMediaMutation = {
  Response: UpsertMedia200
  Request: UpsertMediaMutationRequest
  PathParams: UpsertMediaPathParams
  Errors: any
}