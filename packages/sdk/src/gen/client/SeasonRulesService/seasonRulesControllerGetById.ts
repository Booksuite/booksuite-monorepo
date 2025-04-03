/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerGetByIdQueryResponse,
  SeasonRulesControllerGetByIdPathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerGetById.ts'

export function getSeasonRulesControllerGetByIdUrl({ id }: { id: SeasonRulesControllerGetByIdPathParams['id'] }) {
  return `/company/${companyId}/seasonRules/${id}` as const
}

/**
 * {@link /company/:companyId/seasonRules/:id}
 */
export async function seasonRulesControllerGetById(
  { id }: { id: SeasonRulesControllerGetByIdPathParams['id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SeasonRulesControllerGetByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getSeasonRulesControllerGetByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}