/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchHousingUnitTypesMutationRequest,
  SearchHousingUnitTypesMutationResponse,
  SearchHousingUnitTypesPathParams,
  SearchHousingUnitTypesQueryParams,
} from '../../types/HousingUnitTypeController/SearchHousingUnitTypes.ts'

export function getSearchHousingUnitTypesUrl({ companyId }: { companyId: SearchHousingUnitTypesPathParams['companyId'] }) {
  return `/company/${companyId}/housingUnitType/search` as const
}

/**
 * {@link /company/:companyId/housingUnitType/search}
 */
export async function searchHousingUnitTypes(
  { companyId }: { companyId: SearchHousingUnitTypesPathParams['companyId'] },
  data: SearchHousingUnitTypesMutationRequest,
  params?: SearchHousingUnitTypesQueryParams,
  config: Partial<RequestConfig<SearchHousingUnitTypesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchHousingUnitTypesMutationResponse, ResponseErrorConfig<Error>, SearchHousingUnitTypesMutationRequest>({
    method: 'POST',
    url: getSearchHousingUnitTypesUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}