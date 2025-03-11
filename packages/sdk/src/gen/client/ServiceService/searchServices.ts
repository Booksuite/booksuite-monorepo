/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  SearchServicesMutationRequest,
  SearchServicesMutationResponse,
  SearchServicesPathParams,
  SearchServicesQueryParams,
} from '../../types/ServiceController/SearchServices.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getSearchServicesUrl({ companyId }: { companyId: SearchServicesPathParams['companyId'] }) {
  return `/company/${companyId}/service/search` as const
}

/**
 * {@link /company/:companyId/service/search}
 */
export async function searchServices(
  { companyId }: { companyId: SearchServicesPathParams['companyId'] },
  data: SearchServicesMutationRequest,
  params?: SearchServicesQueryParams,
  config: Partial<RequestConfig<SearchServicesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchServicesMutationResponse, ResponseErrorConfig<Error>, SearchServicesMutationRequest>({
    method: 'POST',
    url: getSearchServicesUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res
}