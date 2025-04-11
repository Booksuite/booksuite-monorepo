/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateSpecialDateMutationRequest,
  UpdateSpecialDateMutationResponse,
  UpdateSpecialDatePathParams,
} from '../../types/SpecialDateController/UpdateSpecialDate.ts'

export function getUpdateSpecialDateUrl({ id }: { id: UpdateSpecialDatePathParams['id'] }) {
  return `/company/${companyId}/specialDates/${id}` as const
}

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export async function updateSpecialDate(
  { id }: { id: UpdateSpecialDatePathParams['id'] },
  data?: UpdateSpecialDateMutationRequest,
  config: Partial<RequestConfig<UpdateSpecialDateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateSpecialDateMutationResponse, ResponseErrorConfig<Error>, UpdateSpecialDateMutationRequest>({
    method: 'PATCH',
    url: getUpdateSpecialDateUrl({ id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}