/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateSpecialDateMutationRequest,
  CreateSpecialDateMutationResponse,
  CreateSpecialDatePathParams,
} from '../../types/SpecialDateController/CreateSpecialDate.ts'

export function getCreateSpecialDateUrl({ companyId }: { companyId: CreateSpecialDatePathParams['companyId'] }) {
  return `/company/${companyId}/specialDates` as const
}

/**
 * {@link /company/:companyId/specialDates}
 */
export async function createSpecialDate(
  { companyId }: { companyId: CreateSpecialDatePathParams['companyId'] },
  data: CreateSpecialDateMutationRequest,
  config: Partial<RequestConfig<CreateSpecialDateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateSpecialDateMutationResponse, ResponseErrorConfig<Error>, CreateSpecialDateMutationRequest>({
    method: 'POST',
    url: getCreateSpecialDateUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}