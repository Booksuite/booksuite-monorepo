/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetSpecialDateByIdQueryResponse, GetSpecialDateByIdPathParams } from '../../types/SpecialDateController/GetSpecialDateById.ts'

export function getGetSpecialDateByIdUrl({ id, companyId }: { id: GetSpecialDateByIdPathParams['id']; companyId: GetSpecialDateByIdPathParams['companyId'] }) {
  return `/company/${companyId}/specialDates/${id}` as const
}

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export async function getSpecialDateById(
  { id, companyId }: { id: GetSpecialDateByIdPathParams['id']; companyId: GetSpecialDateByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSpecialDateByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetSpecialDateByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}