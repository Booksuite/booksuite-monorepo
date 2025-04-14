/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchSpecialDatesMutationRequest,
  SearchSpecialDatesMutationResponse,
  SearchSpecialDatesPathParams,
  SearchSpecialDatesQueryParams,
} from '../../types/SpecialDateController/SearchSpecialDates.ts'

export function getSearchSpecialDatesUrl({ companyId }: { companyId: SearchSpecialDatesPathParams['companyId'] }) {
  return `/company/${companyId}/specialDates/search` as const
}

/**
 * {@link /company/:companyId/specialDates/search}
 */
export async function searchSpecialDates(
  { companyId }: { companyId: SearchSpecialDatesPathParams['companyId'] },
  data: SearchSpecialDatesMutationRequest,
  params?: SearchSpecialDatesQueryParams,
  config: Partial<RequestConfig<SearchSpecialDatesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchSpecialDatesMutationResponse, ResponseErrorConfig<Error>, SearchSpecialDatesMutationRequest>({
    method: 'POST',
    url: getSearchSpecialDatesUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}