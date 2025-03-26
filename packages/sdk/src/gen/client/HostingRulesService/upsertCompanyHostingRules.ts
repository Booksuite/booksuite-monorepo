/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyHostingRulesMutationRequest,
  UpsertCompanyHostingRulesMutationResponse,
  UpsertCompanyHostingRulesPathParams,
} from '../../types/HostingRulesController/UpsertCompanyHostingRules.ts'

export function getUpsertCompanyHostingRulesUrl({ companyId }: { companyId: UpsertCompanyHostingRulesPathParams['companyId'] }) {
  return `/company/${companyId}/hostingRules` as const
}

/**
 * {@link /company/:companyId/hostingRules}
 */
export async function upsertCompanyHostingRules(
  { companyId }: { companyId: UpsertCompanyHostingRulesPathParams['companyId'] },
  data: UpsertCompanyHostingRulesMutationRequest,
  config: Partial<RequestConfig<UpsertCompanyHostingRulesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertCompanyHostingRulesMutationResponse, ResponseErrorConfig<Error>, UpsertCompanyHostingRulesMutationRequest>({
    method: 'PATCH',
    url: getUpsertCompanyHostingRulesUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}