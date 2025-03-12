/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteFacilityMutationResponse, DeleteFacilityPathParams } from '../../types/FacilityController/DeleteFacility.ts'

export function getDeleteFacilityUrl({ id }: { id: DeleteFacilityPathParams['id'] }) {
  return `/facility/${id}` as const
}

/**
 * {@link /facility/:id}
 */
export async function deleteFacility({ id }: { id: DeleteFacilityPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteFacilityMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteFacilityUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}