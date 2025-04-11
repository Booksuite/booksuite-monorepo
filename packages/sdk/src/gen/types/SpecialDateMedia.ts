import type { Media } from './Media.ts'

export type SpecialDateMedia = {
  /**
   * @type string
   */
  id: string
  /**
   * @type number
   */
  order: number | null
  /**
   * @type object
   */
  media: Media
}