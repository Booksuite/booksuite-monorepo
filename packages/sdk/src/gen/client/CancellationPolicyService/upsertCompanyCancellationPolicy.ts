/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyCancellationPolicyMutationRequest,
  UpsertCompanyCancellationPolicyMutationResponse,
  UpsertCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/UpsertCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpsertCompanyCancellationPolicyUrl({ companyId }: { companyId: UpsertCompanyCancellationPolicyPathParams['companyId'] }) {
  return `/company/${companyId}/cancellationPolicy` as const
}

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export async function upsertCompanyCancellationPolicy(
  { companyId }: { companyId: UpsertCompanyCancellationPolicyPathParams['companyId'] },
  data: UpsertCompanyCancellationPolicyMutationRequest,
  config: Partial<RequestConfig<UpsertCompanyCancellationPolicyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertCompanyCancellationPolicyMutationResponse, ResponseErrorConfig<Error>, UpsertCompanyCancellationPolicyMutationRequest>({
    method: 'PATCH',
    url: getUpsertCompanyCancellationPolicyUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}