import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteHousingUnitTypeMutationResponse, DeleteHousingUnitTypePathParams } from '../../types/HousingUnitTypeController/DeleteHousingUnitType.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteHousingUnitType } from '../../client/HousingUnitTypeService/deleteHousingUnitType.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteHousingUnitTypeMutationKey = () => [{ url: '/company/{companyId}/housingUnitType/{id}' }] as const

export type DeleteHousingUnitTypeMutationKey = ReturnType<typeof deleteHousingUnitTypeMutationKey>

/**
 * {@link /company/:companyId/housingUnitType/:id}
 */
export function useDeleteHousingUnitType<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteHousingUnitTypeMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteHousingUnitTypePathParams['id']; companyId: DeleteHousingUnitTypePathParams['companyId'] },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteHousingUnitTypeMutationKey()

  return useMutation<
    DeleteHousingUnitTypeMutationResponse,
    ResponseErrorConfig<Error>,
    { id: DeleteHousingUnitTypePathParams['id']; companyId: DeleteHousingUnitTypePathParams['companyId'] },
    TContext
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteHousingUnitType({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}