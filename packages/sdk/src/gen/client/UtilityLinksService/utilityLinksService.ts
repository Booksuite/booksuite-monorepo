/* eslint-disable no-alert, no-console */
import { getUtilityLink } from './getUtilityLink.ts'
import { searchUtilityLinks } from './searchUtilityLinks.ts'
import { utilityLinksControllerCreate } from './utilityLinksControllerCreate.ts'
import { utilityLinksControllerUpdate } from './utilityLinksControllerUpdate.ts'

export function utilityLinksService() {
  return { getUtilityLink, utilityLinksControllerUpdate, utilityLinksControllerCreate, searchUtilityLinks }
}