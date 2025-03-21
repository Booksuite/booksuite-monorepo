import type { BannerAction } from './BannerAction.ts'
import type { BannerMediaInput } from './BannerMediaInput.ts'
import type { BannerPosition } from './BannerPosition.ts'

export type BannerCreateInput = {
  /**
   * @type string
   */
  name: string
  /**
   * @type boolean
   */
  published: boolean
  position: BannerPosition
  /**
   * @type number
   */
  order: number
  /**
   * @type string | undefined
   */
  title?: string
  /**
   * @type string | undefined
   */
  description?: string
  action: BannerAction
  /**
   * @type string | undefined
   */
  actionButtonText?: string
  /**
   * @type string | undefined
   */
  actionButtonLink?: string
  /**
   * @type array
   */
  medias: BannerMediaInput[]
  /**
   * @description ISO format
   * @type string | undefined
   */
  startAt?: string
  /**
   * @description ISO format
   * @type string | undefined
   */
  endAt?: string
}