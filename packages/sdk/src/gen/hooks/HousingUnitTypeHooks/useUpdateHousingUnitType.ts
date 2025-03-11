import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpdateHousingUnitTypeMutationRequest,
  UpdateHousingUnitTypeMutationResponse,
  UpdateHousingUnitTypePathParams,
} from '../../types/HousingUnitTypeController/UpdateHousingUnitType.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateHousingUnitType } from '../../client/HousingUnitTypeService/updateHousingUnitType.ts'
import { useMutation } from '@tanstack/react-query'

export const updateHousingUnitTypeMutationKey = () => [{ url: '/company/{companyId}/housingUnitType/{id}' }] as const

export type UpdateHousingUnitTypeMutationKey = ReturnType<typeof updateHousingUnitTypeMutationKey>

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export function useUpdateHousingUnitType(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateHousingUnitTypeMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateHousingUnitTypePathParams['id']; companyId: UpdateHousingUnitTypePathParams['companyId']; data: UpdateHousingUnitTypeMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateHousingUnitTypeMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateHousingUnitTypeMutationKey()

  return useMutation<
    ResponseConfig<UpdateHousingUnitTypeMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: UpdateHousingUnitTypePathParams['id']; companyId: UpdateHousingUnitTypePathParams['companyId']; data: UpdateHousingUnitTypeMutationRequest }
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateHousingUnitType({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}