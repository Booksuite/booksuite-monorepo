/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type { GetHousingUnitTypeByIdQueryResponse, GetHousingUnitTypeByIdPathParams } from '../../types/HousingUnitTypeController/GetHousingUnitTypeById.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetHousingUnitTypeByIdUrl({
  id,
  companyId,
}: {
  id: GetHousingUnitTypeByIdPathParams['id']
  companyId: GetHousingUnitTypeByIdPathParams['companyId']
}) {
  return `/company/${companyId}/housingUnitType/${id}` as const
}

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export async function getHousingUnitTypeById(
  { id, companyId }: { id: GetHousingUnitTypeByIdPathParams['id']; companyId: GetHousingUnitTypeByIdPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetHousingUnitTypeByIdQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetHousingUnitTypeByIdUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res
}