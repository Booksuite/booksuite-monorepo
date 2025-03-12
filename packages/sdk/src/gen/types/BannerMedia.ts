import type { Media } from './Media.ts'

export type BannerMedia = {
  /**
   * @type number
   */
  order: number | null
  /**
   * @type object
   */
  media: Media
}