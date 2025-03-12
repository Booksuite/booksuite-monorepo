import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateFacilityMutationRequest, CreateFacilityMutationResponse } from '../../types/FacilityController/CreateFacility.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createFacility } from '../../client/FacilityService/createFacility.ts'
import { useMutation } from '@tanstack/react-query'

export const createFacilityMutationKey = () => [{ url: '/facility/create' }] as const

export type CreateFacilityMutationKey = ReturnType<typeof createFacilityMutationKey>

/**
 * {@link /facility/create}
 */
export function useCreateFacility(
  options: {
    mutation?: UseMutationOptions<CreateFacilityMutationResponse, ResponseErrorConfig<Error>, { data: CreateFacilityMutationRequest }>
    client?: Partial<RequestConfig<CreateFacilityMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createFacilityMutationKey()

  return useMutation<CreateFacilityMutationResponse, ResponseErrorConfig<Error>, { data: CreateFacilityMutationRequest }>({
    mutationFn: async ({ data }) => {
      return createFacility(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}