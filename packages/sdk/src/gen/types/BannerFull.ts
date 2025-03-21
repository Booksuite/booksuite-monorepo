import type { BannerAction } from './BannerAction.ts'
import type { BannerMedia } from './BannerMedia.ts'
import type { BannerPosition } from './BannerPosition.ts'

export type BannerFull = {
  /**
   * @type string
   */
  id: string
  /**
   * @type boolean
   */
  published: boolean
  /**
   * @type string
   */
  name: string
  position: BannerPosition
  /**
   * @type number
   */
  order: number | null
  /**
   * @type string
   */
  title: string | null
  /**
   * @type string
   */
  description: string | null
  action: BannerAction
  /**
   * @type string
   */
  actionButtonText: string | null
  /**
   * @type string
   */
  actionButtonLink: string | null
  /**
   * @type string, date-time
   */
  startAt: string | null
  /**
   * @type string, date-time
   */
  endAt: string | null
  /**
   * @type array
   */
  medias: BannerMedia[]
}