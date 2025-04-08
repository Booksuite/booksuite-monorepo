/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetUtilityLinkQueryResponse, GetUtilityLinkPathParams } from '../../types/UtilityLinksController/GetUtilityLink.ts'

export function getGetUtilityLinkUrl({ id }: { id: GetUtilityLinkPathParams['id'] }) {
  return `/company/${companyId}/utilityLinks/${id}` as const
}

/**
 * {@link /company/:companyId/utilityLinks/:id}
 */
export async function getUtilityLink({ id }: { id: GetUtilityLinkPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetUtilityLinkQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetUtilityLinkUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}