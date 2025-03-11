/* eslint-disable no-alert, no-console */
import { deleteMedia } from './deleteMedia.ts'
import { getMediaById } from './getMediaById.ts'
import { searchMedia } from './searchMedia.ts'
import { uploadMedia } from './uploadMedia.ts'
import { upsertMedia } from './upsertMedia.ts'

export function mediaService() {
  return { upsertMedia, getMediaById, deleteMedia, searchMedia, uploadMedia }
}