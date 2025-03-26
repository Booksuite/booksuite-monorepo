/* eslint-disable no-alert, no-console */
import { getCompanyHostingRules } from './getCompanyHostingRules.ts'
import { upsertCompanyHostingRules } from './upsertCompanyHostingRules.ts'

export function hostingRulesService() {
  return { getCompanyHostingRules, upsertCompanyHostingRules }
}