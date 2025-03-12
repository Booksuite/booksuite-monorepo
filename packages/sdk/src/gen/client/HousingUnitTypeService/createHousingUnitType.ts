/* eslint-disable no-alert, no-console */
import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateHousingUnitTypeMutationRequest,
  CreateHousingUnitTypeMutationResponse,
  CreateHousingUnitTypePathParams,
} from '../../types/HousingUnitTypeController/CreateHousingUnitType.ts'

export function getCreateHousingUnitTypeUrl({ companyId }: { companyId: CreateHousingUnitTypePathParams['companyId'] }) {
  return `/company/${companyId}/housingUnitType/create` as const
}

/**
 * {@link /company/:companyId/housingUnitType/create}
 */
export async function createHousingUnitType(
  { companyId }: { companyId: CreateHousingUnitTypePathParams['companyId'] },
  data: CreateHousingUnitTypeMutationRequest,
  config: Partial<RequestConfig<CreateHousingUnitTypeMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateHousingUnitTypeMutationResponse, ResponseErrorConfig<Error>, CreateHousingUnitTypeMutationRequest>({
    method: 'POST',
    url: getCreateHousingUnitTypeUrl({ companyId }).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}