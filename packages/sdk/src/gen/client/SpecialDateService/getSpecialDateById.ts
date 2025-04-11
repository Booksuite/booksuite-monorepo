/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetSpecialDateByIdQueryResponse, GetSpecialDateByIdPathParams } from '../../types/SpecialDateController/GetSpecialDateById.ts'

export function getGetSpecialDateByIdUrl({ id }: { id: GetSpecialDateByIdPathParams['id'] }) {
  return `/company/${companyId}/specialDates/${id}` as const
}

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export async function getSpecialDateById({ id }: { id: GetSpecialDateByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetSpecialDateByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetSpecialDateByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}