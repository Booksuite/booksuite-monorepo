import type { Media } from '../Media.ts'

export type UploadMediaPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UploadMedia200 = Media

export type UploadMediaMutationRequest = {
  /**
   * @type string | undefined, binary
   */
  file?: Blob
}

export type UploadMediaMutationResponse = UploadMedia200

export type UploadMediaMutation = {
  Response: UploadMedia200
  Request: UploadMediaMutationRequest
  PathParams: UploadMediaPathParams
  Errors: any
}