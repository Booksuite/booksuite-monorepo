import type { Media } from '../Media.ts'

export type UploadMediaPathParams = {
  /**
   * @type string
   */
  companyId: string
}

export type UploadMedia200 = Media

export type UploadMediaMutationResponse = UploadMedia200

export type UploadMediaMutation = {
  Response: UploadMedia200
  PathParams: UploadMediaPathParams
  Errors: any
}