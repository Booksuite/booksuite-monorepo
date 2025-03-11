import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateFacilityMutationRequest, UpdateFacilityMutationResponse, UpdateFacilityPathParams } from '../../types/FacilityController/UpdateFacility.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateFacility } from '../../client/FacilityService/updateFacility.ts'
import { useMutation } from '@tanstack/react-query'

export const updateFacilityMutationKey = () => [{ url: '/facility/{id}' }] as const

export type UpdateFacilityMutationKey = ReturnType<typeof updateFacilityMutationKey>

/**
 * {@link /facility/:id}
 */
export function useUpdateFacility(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateFacilityMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateFacilityPathParams['id']; data: UpdateFacilityMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateFacilityMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateFacilityMutationKey()

  return useMutation<
    ResponseConfig<UpdateFacilityMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: UpdateFacilityPathParams['id']; data: UpdateFacilityMutationRequest }
  >({
    mutationFn: async ({ id, data }) => {
      return updateFacility({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}