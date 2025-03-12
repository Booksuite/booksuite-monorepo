/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateFacilityMutationRequest, UpdateFacilityMutationResponse, UpdateFacilityPathParams } from '../../types/FacilityController/UpdateFacility.ts'

export function getUpdateFacilityUrl({ id }: { id: UpdateFacilityPathParams['id'] }) {
  return `/facility/${id}` as const
}

/**
 * {@link /facility/:id}
 */
export async function updateFacility(
  { id }: { id: UpdateFacilityPathParams['id'] },
  data: UpdateFacilityMutationRequest,
  config: Partial<RequestConfig<UpdateFacilityMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateFacilityMutationResponse, ResponseErrorConfig<Error>, UpdateFacilityMutationRequest>({
    method: 'PATCH',
    url: getUpdateFacilityUrl({ id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}