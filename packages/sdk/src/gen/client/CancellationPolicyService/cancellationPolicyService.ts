/* eslint-disable no-alert, no-console */
import { deleteCompanyCancellationPolicy } from './deleteCompanyCancellationPolicy.ts'
import { getCompanyCancellationPolicy } from './getCompanyCancellationPolicy.ts'
import { upsertCompanyCancellationPolicy } from './upsertCompanyCancellationPolicy.ts'

export function cancellationPolicyService() {
  return { getCompanyCancellationPolicy, upsertCompanyCancellationPolicy, deleteCompanyCancellationPolicy }
}