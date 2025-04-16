/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateCompanyMutationRequest, UpdateCompanyMutationResponse, UpdateCompanyPathParams } from '../../types/CompanyController/UpdateCompany.ts'

export function getUpdateCompanyUrl({ id }: { id: UpdateCompanyPathParams['id'] }) {
  return `/company/${id}` as const
}

/**
 * {@link /company/:id}
 */
export async function updateCompany(
  { id }: { id: UpdateCompanyPathParams['id'] },
  data?: UpdateCompanyMutationRequest,
  config: Partial<RequestConfig<UpdateCompanyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateCompanyMutationResponse, ResponseErrorConfig<Error>, UpdateCompanyMutationRequest>({
    method: 'PATCH',
    url: getUpdateCompanyUrl({ id }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}