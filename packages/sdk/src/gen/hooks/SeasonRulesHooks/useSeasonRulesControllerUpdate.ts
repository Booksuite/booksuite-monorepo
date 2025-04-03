import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerUpdateMutationRequest,
  SeasonRulesControllerUpdateMutationResponse,
  SeasonRulesControllerUpdatePathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerUpdate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { seasonRulesControllerUpdate } from '../../client/SeasonRulesService/seasonRulesControllerUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const seasonRulesControllerUpdateMutationKey = () => [{ url: '/company/{companyId}/seasonRules/{id}' }] as const

export type SeasonRulesControllerUpdateMutationKey = ReturnType<typeof seasonRulesControllerUpdateMutationKey>

/**
 * {@link /company/:companyId/seasonRules/:id}
 */
export function useSeasonRulesControllerUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      SeasonRulesControllerUpdateMutationResponse,
      ResponseErrorConfig<Error>,
      { id: SeasonRulesControllerUpdatePathParams['id']; data?: SeasonRulesControllerUpdateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<SeasonRulesControllerUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? seasonRulesControllerUpdateMutationKey()

  return useMutation<
    SeasonRulesControllerUpdateMutationResponse,
    ResponseErrorConfig<Error>,
    { id: SeasonRulesControllerUpdatePathParams['id']; data?: SeasonRulesControllerUpdateMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return seasonRulesControllerUpdate({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}