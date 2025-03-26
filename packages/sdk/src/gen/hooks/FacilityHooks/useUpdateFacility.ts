import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateFacilityMutationRequest, UpdateFacilityMutationResponse, UpdateFacilityPathParams } from '../../types/FacilityController/UpdateFacility.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateFacility } from '../../client/FacilityService/updateFacility.ts'
import { useMutation } from '@tanstack/react-query'

export const updateFacilityMutationKey = () => [{ url: '/facility/{id}' }] as const

export type UpdateFacilityMutationKey = ReturnType<typeof updateFacilityMutationKey>

/**
 * {@link /facility/:id}
 */
export function useUpdateFacility<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateFacilityMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateFacilityPathParams['id']; data: UpdateFacilityMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateFacilityMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateFacilityMutationKey()

  return useMutation<
    UpdateFacilityMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateFacilityPathParams['id']; data: UpdateFacilityMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateFacility({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}