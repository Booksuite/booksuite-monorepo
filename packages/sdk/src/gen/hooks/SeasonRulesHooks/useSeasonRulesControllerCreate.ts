import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  SeasonRulesControllerCreateMutationRequest,
  SeasonRulesControllerCreateMutationResponse,
  SeasonRulesControllerCreatePathParams,
} from '../../types/SeasonRulesController/SeasonRulesControllerCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { seasonRulesControllerCreate } from '../../client/SeasonRulesService/seasonRulesControllerCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const seasonRulesControllerCreateMutationKey = () => [{ url: '/company/{companyId}/seasonRules' }] as const

export type SeasonRulesControllerCreateMutationKey = ReturnType<typeof seasonRulesControllerCreateMutationKey>

/**
 * {@link /company/:companyId/seasonRules}
 */
export function useSeasonRulesControllerCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      SeasonRulesControllerCreateMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: SeasonRulesControllerCreatePathParams['companyId']; data: SeasonRulesControllerCreateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<SeasonRulesControllerCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? seasonRulesControllerCreateMutationKey()

  return useMutation<
    SeasonRulesControllerCreateMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: SeasonRulesControllerCreatePathParams['companyId']; data: SeasonRulesControllerCreateMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return seasonRulesControllerCreate({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}