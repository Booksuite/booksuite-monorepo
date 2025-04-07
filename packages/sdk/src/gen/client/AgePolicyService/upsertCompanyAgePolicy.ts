/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyAgePolicyMutationRequest,
  UpsertCompanyAgePolicyMutationResponse,
  UpsertCompanyAgePolicyPathParams,
} from '../../types/AgePolicyController/UpsertCompanyAgePolicy.ts'

export function getUpsertCompanyAgePolicyUrl({
  companyId,
  id,
}: {
  companyId: UpsertCompanyAgePolicyPathParams['companyId']
  id: UpsertCompanyAgePolicyPathParams['id']
}) {
  return `/company/${companyId}/agePolicy/${id}` as const
}

/**
 * {@link /company/:companyId/agePolicy/:id}
 */
export async function upsertCompanyAgePolicy(
  { companyId, id }: { companyId: UpsertCompanyAgePolicyPathParams['companyId']; id: UpsertCompanyAgePolicyPathParams['id'] },
  data: UpsertCompanyAgePolicyMutationRequest,
  config: Partial<RequestConfig<UpsertCompanyAgePolicyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpsertCompanyAgePolicyMutationResponse, ResponseErrorConfig<Error>, UpsertCompanyAgePolicyMutationRequest>({
    method: 'PATCH',
    url: getUpsertCompanyAgePolicyUrl({ companyId, id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}