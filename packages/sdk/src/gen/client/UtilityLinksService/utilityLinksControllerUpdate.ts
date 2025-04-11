/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UtilityLinksControllerUpdateMutationRequest,
  UtilityLinksControllerUpdateMutationResponse,
  UtilityLinksControllerUpdatePathParams,
} from '../../types/UtilityLinksController/UtilityLinksControllerUpdate.ts'

export function getUtilityLinksControllerUpdateUrl({
  id,
  companyId,
}: {
  id: UtilityLinksControllerUpdatePathParams['id']
  companyId: UtilityLinksControllerUpdatePathParams['companyId']
}) {
  return `/company/${companyId}/utilityLinks/${id}` as const
}

/**
 * {@link /company/:companyId/utilityLinks/:id}
 */
export async function utilityLinksControllerUpdate(
  { id, companyId }: { id: UtilityLinksControllerUpdatePathParams['id']; companyId: UtilityLinksControllerUpdatePathParams['companyId'] },
  data?: UtilityLinksControllerUpdateMutationRequest,
  config: Partial<RequestConfig<UtilityLinksControllerUpdateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UtilityLinksControllerUpdateMutationResponse, ResponseErrorConfig<Error>, UtilityLinksControllerUpdateMutationRequest>({
    method: 'PATCH',
    url: getUtilityLinksControllerUpdateUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}