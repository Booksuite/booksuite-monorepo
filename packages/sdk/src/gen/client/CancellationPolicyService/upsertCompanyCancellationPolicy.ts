/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyCancellationPolicyMutationRequest,
  UpsertCompanyCancellationPolicyMutationResponse,
  UpsertCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/UpsertCompanyCancellationPolicy.ts'

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
  return res.data
}