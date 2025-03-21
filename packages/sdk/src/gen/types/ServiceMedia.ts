import type { Media } from './Media.ts'

export type ServiceMedia = {
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