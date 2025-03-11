import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteHousingUnitTypeMutationResponse, DeleteHousingUnitTypePathParams } from '../../types/HousingUnitTypeController/DeleteHousingUnitType.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteHousingUnitType } from '../../client/HousingUnitTypeService/deleteHousingUnitType.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteHousingUnitTypeMutationKey = () => [{ url: '/company/{companyId}/housingUnitType/{id}' }] as const

export type DeleteHousingUnitTypeMutationKey = ReturnType<typeof deleteHousingUnitTypeMutationKey>

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export function useDeleteHousingUnitType(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<DeleteHousingUnitTypeMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: DeleteHousingUnitTypePathParams['id']; companyId: DeleteHousingUnitTypePathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteHousingUnitTypeMutationKey()

  return useMutation<
    ResponseConfig<DeleteHousingUnitTypeMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: DeleteHousingUnitTypePathParams['id']; companyId: DeleteHousingUnitTypePathParams['companyId'] }
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteHousingUnitType({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}