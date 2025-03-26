/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetCompanyHostingRulesQueryResponse, GetCompanyHostingRulesPathParams } from '../../types/HostingRulesController/GetCompanyHostingRules.ts'

export function getGetCompanyHostingRulesUrl({ companyId }: { companyId: GetCompanyHostingRulesPathParams['companyId'] }) {
  return `/company/${companyId}/hostingRules` as const
}

/**
 * {@link /company/:companyId/hostingRules}
 */
export async function getCompanyHostingRules(
  { companyId }: { companyId: GetCompanyHostingRulesPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyHostingRulesQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCompanyHostingRulesUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}