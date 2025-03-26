import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteFacilityMutationResponse, DeleteFacilityPathParams } from '../../types/FacilityController/DeleteFacility.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteFacility } from '../../client/FacilityService/deleteFacility.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteFacilityMutationKey = () => [{ url: '/facility/{id}' }] as const

export type DeleteFacilityMutationKey = ReturnType<typeof deleteFacilityMutationKey>

/**
 * {@link /facility/:id}
 */
export function useDeleteFacility<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteFacilityMutationResponse, ResponseErrorConfig<Error>, { id: DeleteFacilityPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteFacilityMutationKey()

  return useMutation<DeleteFacilityMutationResponse, ResponseErrorConfig<Error>, { id: DeleteFacilityPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteFacility({ id }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}