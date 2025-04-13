/* eslint-disable no-alert, no-console */
import { createOffer } from './createOffer.ts'
import { deleteOffer } from './deleteOffer.ts'
import { getOfferById } from './getOfferById.ts'
import { searchOffers } from './searchOffers.ts'
import { updateOffer } from './updateOffer.ts'

export function offerService() {
  return { createOffer, getOfferById, updateOffer, deleteOffer, searchOffers }
}