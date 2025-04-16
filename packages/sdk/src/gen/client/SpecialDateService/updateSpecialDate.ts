/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateSpecialDateMutationRequest,
  UpdateSpecialDateMutationResponse,
  UpdateSpecialDatePathParams,
} from '../../types/SpecialDateController/UpdateSpecialDate.ts'

export function getUpdateSpecialDateUrl({ id, companyId }: { id: UpdateSpecialDatePathParams['id']; companyId: UpdateSpecialDatePathParams['companyId'] }) {
  return `/company/${companyId}/specialDates/${id}` as const
}

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export async function updateSpecialDate(
  { id, companyId }: { id: UpdateSpecialDatePathParams['id']; companyId: UpdateSpecialDatePathParams['companyId'] },
  data?: UpdateSpecialDateMutationRequest,
  config: Partial<RequestConfig<UpdateSpecialDateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateSpecialDateMutationResponse, ResponseErrorConfig<Error>, UpdateSpecialDateMutationRequest>({
    method: 'PATCH',
    url: getUpdateSpecialDateUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}