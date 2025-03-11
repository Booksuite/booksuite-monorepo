/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetCompanyCancellationPolicyQueryResponse,
  GetCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/GetCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetCompanyCancellationPolicyUrl({ companyId }: { companyId: GetCompanyCancellationPolicyPathParams['companyId'] }) {
  return `/company/${companyId}/cancellationPolicy` as const
}

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export async function getCompanyCancellationPolicy(
  { companyId }: { companyId: GetCompanyCancellationPolicyPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyCancellationPolicyQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCompanyCancellationPolicyUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res
}