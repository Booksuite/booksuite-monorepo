/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateCompanyMutationRequest, CreateCompanyMutationResponse } from '../../types/CompanyController/CreateCompany.ts'

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
  return res.data
}