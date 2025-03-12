/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetFacilityByIdQueryResponse, GetFacilityByIdPathParams } from '../../types/FacilityController/GetFacilityById.ts'

export function getGetFacilityByIdUrl({ id }: { id: GetFacilityByIdPathParams['id'] }) {
  return `/facility/${id}` as const
}

/**
 * {@link /facility/:id}
 */
export async function getFacilityById({ id }: { id: GetFacilityByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetFacilityByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetFacilityByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}