/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  DeleteCompanyCancellationPolicyMutationResponse,
  DeleteCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/DeleteCompanyCancellationPolicy.ts'

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
  return res.data
}