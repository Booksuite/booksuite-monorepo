/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateRateOptionMutationRequest,
  UpdateRateOptionMutationResponse,
  UpdateRateOptionPathParams,
} from '../../types/RateOptionController/UpdateRateOption.ts'

export function getUpdateRateOptionUrl({ id, companyId }: { id: UpdateRateOptionPathParams['id']; companyId: UpdateRateOptionPathParams['companyId'] }) {
  return `/company/${companyId}/rateOption/${id}` as const
}

/**
 * {@link /company/:companyId/rateOption/:id}
 */
export async function updateRateOption(
  { id, companyId }: { id: UpdateRateOptionPathParams['id']; companyId: UpdateRateOptionPathParams['companyId'] },
  data?: UpdateRateOptionMutationRequest,
  config: Partial<RequestConfig<UpdateRateOptionMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateRateOptionMutationResponse, ResponseErrorConfig<Error>, UpdateRateOptionMutationRequest>({
    method: 'PATCH',
    url: getUpdateRateOptionUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}