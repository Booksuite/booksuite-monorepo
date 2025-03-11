/* eslint-disable no-alert, no-console */
import { createBanner } from './createBanner.ts'
import { deleteBanner } from './deleteBanner.ts'
import { getBannerById } from './getBannerById.ts'
import { searchBanners } from './searchBanners.ts'
import { updateBanner } from './updateBanner.ts'

export function bannerService() {
  return { createBanner, getBannerById, updateBanner, deleteBanner, searchBanners }
}