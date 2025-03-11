/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { CreateServiceMutationRequest, CreateServiceMutationResponse, CreateServicePathParams } from '../../types/ServiceController/CreateService.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getCreateServiceUrl({ companyId }: { companyId: CreateServicePathParams['companyId'] }) {
  return `/company/${companyId}/service/create` as const
}

/**
 * {@link /company/:companyId/service/create}
 */
export async function createService(
  { companyId }: { companyId: CreateServicePathParams['companyId'] },
  data: CreateServiceMutationRequest,
  config: Partial<RequestConfig<CreateServiceMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateServiceMutationResponse, ResponseErrorConfig<Error>, CreateServiceMutationRequest>({
    method: 'POST',
    url: getCreateServiceUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}