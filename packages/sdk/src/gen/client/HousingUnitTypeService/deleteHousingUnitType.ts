/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteHousingUnitTypeMutationResponse, DeleteHousingUnitTypePathParams } from '../../types/HousingUnitTypeController/DeleteHousingUnitType.ts'

export function getDeleteHousingUnitTypeUrl({
  id,
  companyId,
}: {
  id: DeleteHousingUnitTypePathParams['id']
  companyId: DeleteHousingUnitTypePathParams['companyId']
}) {
  return `/company/${companyId}/housingUnitType/${id}` as const
}

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export async function deleteHousingUnitType(
  { id, companyId }: { id: DeleteHousingUnitTypePathParams['id']; companyId: DeleteHousingUnitTypePathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteHousingUnitTypeMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteHousingUnitTypeUrl({ id, companyId }).toString(),
    ...requestConfig,
  })
  return res.data
}