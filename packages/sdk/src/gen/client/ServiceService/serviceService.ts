/* eslint-disable no-alert, no-console */
import { createService } from './createService.ts'
import { deleteService } from './deleteService.ts'
import { getServiceById } from './getServiceById.ts'
import { searchServices } from './searchServices.ts'
import { updateService } from './updateService.ts'

export function serviceService() {
  return { createService, getServiceById, updateService, deleteService, searchServices }
}