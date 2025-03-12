/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateFacilityMutationRequest, CreateFacilityMutationResponse } from '../../types/FacilityController/CreateFacility.ts'

export function getCreateFacilityUrl() {
  return `/facility/create` as const
}

/**
 * {@link /facility/create}
 */
export async function createFacility(
  data: CreateFacilityMutationRequest,
  config: Partial<RequestConfig<CreateFacilityMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateFacilityMutationResponse, ResponseErrorConfig<Error>, CreateFacilityMutationRequest>({
    method: 'POST',
    url: getCreateFacilityUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}