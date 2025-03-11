import type { Media } from '../Media.ts'

export type GetMediaByIdPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type GetMediaById200 = Media

export type GetMediaByIdQueryResponse = GetMediaById200

export type GetMediaByIdQuery = {
  Response: GetMediaById200
  PathParams: GetMediaByIdPathParams
  Errors: any
}