/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { GetCompanyByIdQueryResponse, GetCompanyByIdPathParams } from '../../types/CompanyController/GetCompanyById.ts'

export function getGetCompanyByIdUrl({ id }: { id: GetCompanyByIdPathParams['id'] }) {
  return `/company/${id}` as const
}

/**
 * {@link /company/:id}
 */
export async function getCompanyById({ id }: { id: GetCompanyByIdPathParams['id'] }, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetCompanyByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetCompanyByIdUrl({ id }).toString(),
    ...requestConfig,
  })
  return res.data
}