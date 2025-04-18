import type { BannerPosition } from './BannerPosition.ts'

export type BannerSearchFilterInput = {
  position?: BannerPosition
  /**
   * @type boolean | undefined
   */
  published?: boolean
}