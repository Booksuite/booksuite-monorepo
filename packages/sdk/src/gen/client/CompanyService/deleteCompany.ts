/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteCompanyMutationResponse, DeleteCompanyPathParams } from '../../types/CompanyController/DeleteCompany.ts'

export function getDeleteCompanyUrl({ id }: { id: DeleteCompanyPathParams['id'] }) {
  return `/company/${id}` as const
}

/**
 * {@link /company/:id}
 */
export async function deleteCompany({ id }: { id: DeleteCompanyPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteCompanyMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteCompanyUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}