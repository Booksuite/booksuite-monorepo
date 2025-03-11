/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyAgePolicyMutationRequest,
  UpsertCompanyAgePolicyMutationResponse,
  UpsertCompanyAgePolicyPathParams,
} from '../../types/AgePolicyController/UpsertCompanyAgePolicy.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpsertCompanyAgePolicyUrl({ companyId }: { companyId: UpsertCompanyAgePolicyPathParams['companyId'] }) {
  return `/company/${companyId}/agePolicy` as const
}

/**
 * {@link /company/:companyId/agePolicy}
 */
export async function upsertCompanyAgePolicy(
  { companyId }: { companyId: UpsertCompanyAgePolicyPathParams['companyId'] },
  data: UpsertCompanyAgePolicyMutationRequest,
  config: Partial<RequestConfig<UpsertCompanyAgePolicyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertCompanyAgePolicyMutationResponse, ResponseErrorConfig<Error>, UpsertCompanyAgePolicyMutationRequest>({
    method: 'PATCH',
    url: getUpsertCompanyAgePolicyUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}