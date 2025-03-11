/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateServiceMutationRequest, UpdateServiceMutationResponse, UpdateServicePathParams } from '../../types/ServiceController/UpdateService.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpdateServiceUrl({ id, companyId }: { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId'] }) {
  return `/company/${companyId}/service/${id}` as const
}

/**
 * {@link /company/:companyId/service/:id}
 */
export async function updateService(
  { id, companyId }: { id: UpdateServicePathParams['id']; companyId: UpdateServicePathParams['companyId'] },
  data: UpdateServiceMutationRequest,
  config: Partial<RequestConfig<UpdateServiceMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateServiceMutationResponse, ResponseErrorConfig<Error>, UpdateServiceMutationRequest>({
    method: 'PATCH',
    url: getUpdateServiceUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}