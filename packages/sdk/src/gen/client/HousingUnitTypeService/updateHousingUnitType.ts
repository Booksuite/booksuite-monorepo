/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpdateHousingUnitTypeMutationRequest,
  UpdateHousingUnitTypeMutationResponse,
  UpdateHousingUnitTypePathParams,
} from '../../types/HousingUnitTypeController/UpdateHousingUnitType.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getUpdateHousingUnitTypeUrl({
  id,
  companyId,
}: {
  id: UpdateHousingUnitTypePathParams['id']
  companyId: UpdateHousingUnitTypePathParams['companyId']
}) {
  return `/company/${companyId}/housingUnitType/${id}` as const
}

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export async function updateHousingUnitType(
  { id, companyId }: { id: UpdateHousingUnitTypePathParams['id']; companyId: UpdateHousingUnitTypePathParams['companyId'] },
  data: UpdateHousingUnitTypeMutationRequest,
  config: Partial<RequestConfig<UpdateHousingUnitTypeMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateHousingUnitTypeMutationResponse, ResponseErrorConfig<Error>, UpdateHousingUnitTypeMutationRequest>({
    method: 'PATCH',
    url: getUpdateHousingUnitTypeUrl({ id, companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res
}