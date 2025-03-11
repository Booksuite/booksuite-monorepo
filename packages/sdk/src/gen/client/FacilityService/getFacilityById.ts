/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetFacilityByIdQueryResponse, GetFacilityByIdPathParams } from '../../types/FacilityController/GetFacilityById.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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
  return res
}