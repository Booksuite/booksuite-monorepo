/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  DeleteCompanyCancellationPolicyMutationResponse,
  DeleteCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/DeleteCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getDeleteCompanyCancellationPolicyUrl({ companyId }: { companyId: DeleteCompanyCancellationPolicyPathParams['companyId'] }) {
  return `/company/${companyId}/cancellationPolicy` as const
}

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export async function deleteCompanyCancellationPolicy(
  { companyId }: { companyId: DeleteCompanyCancellationPolicyPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteCompanyCancellationPolicyMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteCompanyCancellationPolicyUrl({ companyId }).toString(),
    ...requestConfig,
  })
  return res
}