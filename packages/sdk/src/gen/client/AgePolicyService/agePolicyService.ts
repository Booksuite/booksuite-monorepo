/* eslint-disable no-alert, no-console */
import { getCompanyAgePolicy } from './getCompanyAgePolicy.ts'
import { upsertCompanyAgePolicy } from './upsertCompanyAgePolicy.ts'

export function agePolicyService() {
  return { getCompanyAgePolicy, upsertCompanyAgePolicy }
}