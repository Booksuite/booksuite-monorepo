/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerUpdateMutationRequest,
  SeasonRulesControllerUpdateMutationResponse,
  SeasonRulesControllerUpdatePathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerUpdate.ts'

export function getSeasonRulesControllerUpdateUrl({ id }: { id: SeasonRulesControllerUpdatePathParams['id'] }) {
  return `/company/${companyId}/seasonRules/${id}` as const
}

/**
 * {@link /company/:companyId/seasonRules/:id}
 */
export async function seasonRulesControllerUpdate(
  { id }: { id: SeasonRulesControllerUpdatePathParams['id'] },
  data?: SeasonRulesControllerUpdateMutationRequest,
  config: Partial<RequestConfig<SeasonRulesControllerUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SeasonRulesControllerUpdateMutationResponse, ResponseErrorConfig<Error>, SeasonRulesControllerUpdateMutationRequest>({
    method: 'PATCH',
    url: getSeasonRulesControllerUpdateUrl({ id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}