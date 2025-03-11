import type { MetadataDto } from './MetadataDto.ts'

export type Media = {
  /**
   * @type string
   */
  id: string
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