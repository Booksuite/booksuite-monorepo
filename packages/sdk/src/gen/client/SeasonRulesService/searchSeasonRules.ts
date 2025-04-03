/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SearchSeasonRulesMutationRequest,
  SearchSeasonRulesMutationResponse,
  SearchSeasonRulesPathParams,
  SearchSeasonRulesQueryParams,
} from '../../types/SeasonRulesController/SearchSeasonRules.ts'

export function getSearchSeasonRulesUrl({ companyId }: { companyId: SearchSeasonRulesPathParams['companyId'] }) {
  return `/company/${companyId}/seasonRules/search` as const
}

/**
 * {@link /company/:companyId/seasonRules/search}
 */
export async function searchSeasonRules(
  { companyId }: { companyId: SearchSeasonRulesPathParams['companyId'] },
  data: SearchSeasonRulesMutationRequest,
  params?: SearchSeasonRulesQueryParams,
  config: Partial<RequestConfig<SearchSeasonRulesMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SearchSeasonRulesMutationResponse, ResponseErrorConfig<Error>, SearchSeasonRulesMutationRequest>({
    method: 'POST',
    url: getSearchSeasonRulesUrl({ companyId }).toString(),
    params,
    data,
    ...requestConfig,
  })
  return res.data
}