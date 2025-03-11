/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { CreateCompanyMutationRequest, CreateCompanyMutationResponse } from '../../types/CompanyController/CreateCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getCreateCompanyUrl() {
  return `/company/create` as const
}

/**
 * {@link /company/create}
 */
export async function createCompany(
  data: CreateCompanyMutationRequest,
  config: Partial<RequestConfig<CreateCompanyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateCompanyMutationResponse, ResponseErrorConfig<Error>, CreateCompanyMutationRequest>({
    method: 'POST',
    url: getCreateCompanyUrl().toString(),
    data,
    ...requestConfig,
  })
  return res
}