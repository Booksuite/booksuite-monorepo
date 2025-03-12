/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpsertMediaMutationRequest, UpsertMediaMutationResponse, UpsertMediaPathParams } from '../../types/MediaController/UpsertMedia.ts'

export function getUpsertMediaUrl({ companyId }: { companyId: UpsertMediaPathParams['companyId'] }) {
  return `/company/${companyId}/media/upsert` as const
}

/**
 * {@link /company/:companyId/media/upsert}
 */
export async function upsertMedia(
  { companyId }: { companyId: UpsertMediaPathParams['companyId'] },
  data: UpsertMediaMutationRequest,
  config: Partial<RequestConfig<UpsertMediaMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertMediaMutationResponse, ResponseErrorConfig<Error>, UpsertMediaMutationRequest>({
    method: 'PATCH',
    url: getUpsertMediaUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}