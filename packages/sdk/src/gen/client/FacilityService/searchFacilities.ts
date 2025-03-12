/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchFacilitiesMutationRequest,
  SearchFacilitiesMutationResponse,
  SearchFacilitiesQueryParams,
} from '../../types/FacilityController/SearchFacilities.ts'

export function getSearchFacilitiesUrl() {
  return `/facility/search` as const
}

/**
 * {@link /facility/search}
 */
export async function searchFacilities(
  data: SearchFacilitiesMutationRequest,
  params?: SearchFacilitiesQueryParams,
  config: Partial<RequestConfig<SearchFacilitiesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchFacilitiesMutationResponse, ResponseErrorConfig<Error>, SearchFacilitiesMutationRequest>({
    method: 'POST',
    url: getSearchFacilitiesUrl().toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}