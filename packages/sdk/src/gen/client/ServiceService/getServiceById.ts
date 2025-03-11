/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetServiceByIdQueryResponse, GetServiceByIdPathParams } from '../../types/ServiceController/GetServiceById.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetServiceByIdUrl({ id, companyId }: { id: GetServiceByIdPathParams['id']; companyId: GetServiceByIdPathParams['companyId'] }) {
  return `/company/${companyId}/service/${id}` as const
}

/**
 * {@link /company/:companyId/service/:id}
 */
export async function getServiceById(
  { id, companyId }: { id: GetServiceByIdPathParams['id']; companyId: GetServiceByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetServiceByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetServiceByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res
}