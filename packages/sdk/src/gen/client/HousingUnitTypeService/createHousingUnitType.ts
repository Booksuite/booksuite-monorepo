/* eslint-disable no-alert, no-console */
import client from '@kubb/plugin-client/clients/fetch'
import type {
  CreateHousingUnitTypeMutationRequest,
  CreateHousingUnitTypeMutationResponse,
  CreateHousingUnitTypePathParams,
} from '../../types/HousingUnitTypeController/CreateHousingUnitType.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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
  return res
}