/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateCompanyMutationRequest, UpdateCompanyMutationResponse, UpdateCompanyPathParams } from '../../types/CompanyController/UpdateCompany.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpdateCompanyUrl({ id }: { id: UpdateCompanyPathParams['id'] }) {
  return `/company/${id}` as const
}

/**
 * {@link /company/:id}
 */
export async function updateCompany(
  { id }: { id: UpdateCompanyPathParams['id'] },
  data: UpdateCompanyMutationRequest,
  config: Partial<RequestConfig<UpdateCompanyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateCompanyMutationResponse, ResponseErrorConfig<Error>, UpdateCompanyMutationRequest>({
    method: 'PATCH',
    url: getUpdateCompanyUrl({ id }).toString(),
    data,
    ...requestConfig,
  })
  return res
}