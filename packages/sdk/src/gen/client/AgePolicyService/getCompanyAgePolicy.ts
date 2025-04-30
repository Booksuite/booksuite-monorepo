/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetCompanyAgePolicyQueryResponse, GetCompanyAgePolicyPathParams } from '../../types/AgePolicyController/GetCompanyAgePolicy.ts'

export function getGetCompanyAgePolicyUrl({ companyId }: { companyId: GetCompanyAgePolicyPathParams['companyId'] }) {
  return `/company/${companyId}/agePolicy` as const
}

/**
 * @summary Get age policy by company ID
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
  return res.data
}