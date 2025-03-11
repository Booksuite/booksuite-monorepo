import type { Media } from './Media.ts'

export type ServiceMedia = {
  /**
   * @type string
   */
  id: string
  /**
   * @type object
   */
  order: object
  /**
   * @type array
   */
  media: Media[]
}