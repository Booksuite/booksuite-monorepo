/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UtilityLinksControllerCreateMutationRequest,
  UtilityLinksControllerCreateMutationResponse,
  UtilityLinksControllerCreatePathParams,
} from '../../types/UtilityLinksController/UtilityLinksControllerCreate.ts'

export function getUtilityLinksControllerCreateUrl({ companyId }: { companyId: UtilityLinksControllerCreatePathParams['companyId'] }) {
  return `/company/${companyId}/utilityLinks` as const
}

/**
 * {@link /company/:companyId/utilityLinks}
 */
export async function utilityLinksControllerCreate(
  { companyId }: { companyId: UtilityLinksControllerCreatePathParams['companyId'] },
  data: UtilityLinksControllerCreateMutationRequest,
  config: Partial<RequestConfig<UtilityLinksControllerCreateMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UtilityLinksControllerCreateMutationResponse, ResponseErrorConfig<Error>, UtilityLinksControllerCreateMutationRequest>({
    method: 'POST',
    url: getUtilityLinksControllerCreateUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}