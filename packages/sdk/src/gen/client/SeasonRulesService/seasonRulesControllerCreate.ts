/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerCreateMutationRequest,
  SeasonRulesControllerCreateMutationResponse,
  SeasonRulesControllerCreatePathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerCreate.ts'

export function getSeasonRulesControllerCreateUrl({ companyId }: { companyId: SeasonRulesControllerCreatePathParams['companyId'] }) {
  return `/company/${companyId}/seasonRules` as const
}

/**
 * {@link /company/:companyId/seasonRules}
 */
export async function seasonRulesControllerCreate(
  { companyId }: { companyId: SeasonRulesControllerCreatePathParams['companyId'] },
  data: SeasonRulesControllerCreateMutationRequest,
  config: Partial<RequestConfig<SeasonRulesControllerCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SeasonRulesControllerCreateMutationResponse, ResponseErrorConfig<Error>, SeasonRulesControllerCreateMutationRequest>({
    method: 'POST',
    url: getSeasonRulesControllerCreateUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}