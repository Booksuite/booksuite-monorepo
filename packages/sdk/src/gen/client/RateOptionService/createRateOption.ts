/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateRateOptionMutationRequest,
  CreateRateOptionMutationResponse,
  CreateRateOptionPathParams,
} from '../../types/RateOptionController/CreateRateOption.ts'

export function getCreateRateOptionUrl({ companyId }: { companyId: CreateRateOptionPathParams['companyId'] }) {
  return `/company/${companyId}/rateOption` as const
}

/**
 * {@link /company/:companyId/rateOption}
 */
export async function createRateOption(
  { companyId }: { companyId: CreateRateOptionPathParams['companyId'] },
  data: CreateRateOptionMutationRequest,
  config: Partial<RequestConfig<CreateRateOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateRateOptionMutationResponse, ResponseErrorConfig<Error>, CreateRateOptionMutationRequest>({
    method: 'POST',
    url: getCreateRateOptionUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}