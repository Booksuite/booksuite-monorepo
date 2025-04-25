/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetRateOptionByIdQueryResponse, GetRateOptionByIdPathParams } from '../../types/RateOptionController/GetRateOptionById.ts'

export function getGetRateOptionByIdUrl({ id, companyId }: { id: GetRateOptionByIdPathParams['id']; companyId: GetRateOptionByIdPathParams['companyId'] }) {
  return `/company/${companyId}/rateOption/${id}` as const
}

/**
 * {@link /company/:companyId/rateOption/:id}
 */
export async function getRateOptionById(
  { id, companyId }: { id: GetRateOptionByIdPathParams['id']; companyId: GetRateOptionByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetRateOptionByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetRateOptionByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}