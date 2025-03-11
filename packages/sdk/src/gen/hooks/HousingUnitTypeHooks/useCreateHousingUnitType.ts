import client from '@kubb/plugin-client/clients/fetch'
import type {
  CreateHousingUnitTypeMutationRequest,
  CreateHousingUnitTypeMutationResponse,
  CreateHousingUnitTypePathParams,
} from '../../types/HousingUnitTypeController/CreateHousingUnitType.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createHousingUnitType } from '../../client/HousingUnitTypeService/createHousingUnitType.ts'
import { useMutation } from '@tanstack/react-query'

export const createHousingUnitTypeMutationKey = () => [{ url: '/company/{companyId}/housingUnitType/create' }] as const

export type CreateHousingUnitTypeMutationKey = ReturnType<typeof createHousingUnitTypeMutationKey>

/**
 * {@link /company/:companyId/housingUnitType/create}
 */
export function useCreateHousingUnitType(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<CreateHousingUnitTypeMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: CreateHousingUnitTypePathParams['companyId']; data: CreateHousingUnitTypeMutationRequest }
    >
    client?: Partial<RequestConfig<CreateHousingUnitTypeMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createHousingUnitTypeMutationKey()

  return useMutation<
    ResponseConfig<CreateHousingUnitTypeMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: CreateHousingUnitTypePathParams['companyId']; data: CreateHousingUnitTypeMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return createHousingUnitType({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}