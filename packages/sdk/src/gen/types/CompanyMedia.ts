import type { Media } from './Media.ts'

export type CompanyMedia = {
  /**
   * @type string
   */
  id: string
  /**
   * @type boolean
   */
  isFeatured: boolean
  /**
   * @type number
   */
  order: number | null
  /**
   * @type object
   */
  media: Media
}