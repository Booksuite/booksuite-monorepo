/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteServiceMutationResponse, DeleteServicePathParams } from '../../types/ServiceController/DeleteService.ts'

export function getDeleteServiceUrl({ id, companyId }: { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] }) {
  return `/company/${companyId}/service/${id}` as const
}

/**
 * {@link /company/:companyId/service/:id}
 */
export async function deleteService(
  { id, companyId }: { id: DeleteServicePathParams['id']; companyId: DeleteServicePathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteServiceMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteServiceUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}