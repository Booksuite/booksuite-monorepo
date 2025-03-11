/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetCompanyAgePolicyQueryResponse, GetCompanyAgePolicyPathParams } from '../../types/AgePolicyController/GetCompanyAgePolicy.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetCompanyAgePolicyUrl({ companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] }) {
  return `/company/${companyId}/agePolicy` as const
}

/**
 * {@link /company/:companyId/agePolicy}
 */
export async function getCompanyAgePolicy(
  { companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyAgePolicyQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCompanyAgePolicyUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res
}