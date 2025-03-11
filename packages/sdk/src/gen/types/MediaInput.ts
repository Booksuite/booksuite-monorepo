import type { MetadataDto } from './MetadataDto.ts'

export type MediaInput = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type string
   */
  url: string
  /**
   * @type string
   */
  companyId: string
  /**
   * @type object
   */
  metadata: MetadataDto
}