/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchRateOptionMutationRequest,
  SearchRateOptionMutationResponse,
  SearchRateOptionPathParams,
  SearchRateOptionQueryParams,
} from '../../types/RateOptionController/SearchRateOption.ts'

export function getSearchRateOptionUrl({ companyId }: { companyId: SearchRateOptionPathParams['companyId'] }) {
  return `/company/${companyId}/rateOption/search` as const
}

/**
 * {@link /company/:companyId/rateOption/search}
 */
export async function searchRateOption(
  { companyId }: { companyId: SearchRateOptionPathParams['companyId'] },
  data: SearchRateOptionMutationRequest,
  params?: SearchRateOptionQueryParams,
  config: Partial<RequestConfig<SearchRateOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchRateOptionMutationResponse, ResponseErrorConfig<Error>, SearchRateOptionMutationRequest>({
    method: 'POST',
    url: getSearchRateOptionUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}