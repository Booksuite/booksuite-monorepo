import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteFacilityMutationResponse, DeleteFacilityPathParams } from '../../types/FacilityController/DeleteFacility.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteFacility } from '../../client/FacilityService/deleteFacility.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteFacilityMutationKey = () => [{ url: '/facility/{id}' }] as const

export type DeleteFacilityMutationKey = ReturnType<typeof deleteFacilityMutationKey>

/**
 * {@link /facility/:id}
 */
export function useDeleteFacility(
  options: {
    mutation?: UseMutationOptions<ResponseConfig<DeleteFacilityMutationResponse>, ResponseErrorConfig<Error>, { id: DeleteFacilityPathParams['id'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteFacilityMutationKey()

  return useMutation<ResponseConfig<DeleteFacilityMutationResponse>, ResponseErrorConfig<Error>, { id: DeleteFacilityPathParams['id'] }>({
    mutationFn: async ({ id }) => {
      return deleteFacility({ id }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}