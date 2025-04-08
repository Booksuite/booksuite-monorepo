import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UtilityLinksControllerUpdateMutationRequest,
  UtilityLinksControllerUpdateMutationResponse,
  UtilityLinksControllerUpdatePathParams,
} from '../../types/UtilityLinksController/UtilityLinksControllerUpdate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { utilityLinksControllerUpdate } from '../../client/UtilityLinksService/utilityLinksControllerUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const utilityLinksControllerUpdateMutationKey = () => [{ url: '/company/{companyId}/utilityLinks/{id}' }] as const

export type UtilityLinksControllerUpdateMutationKey = ReturnType<typeof utilityLinksControllerUpdateMutationKey>

/**
 * {@link /company/:companyId/utilityLinks/:id}
 */
export function useUtilityLinksControllerUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UtilityLinksControllerUpdateMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UtilityLinksControllerUpdatePathParams['id']; data: UtilityLinksControllerUpdateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UtilityLinksControllerUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? utilityLinksControllerUpdateMutationKey()

  return useMutation<
    UtilityLinksControllerUpdateMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UtilityLinksControllerUpdatePathParams['id']; data: UtilityLinksControllerUpdateMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return utilityLinksControllerUpdate({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}