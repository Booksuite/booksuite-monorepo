import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UtilityLinksControllerCreateMutationRequest,
  UtilityLinksControllerCreateMutationResponse,
  UtilityLinksControllerCreatePathParams,
} from '../../types/UtilityLinksController/UtilityLinksControllerCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { utilityLinksControllerCreate } from '../../client/UtilityLinksService/utilityLinksControllerCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const utilityLinksControllerCreateMutationKey = () => [{ url: '/company/{companyId}/utilityLinks' }] as const

export type UtilityLinksControllerCreateMutationKey = ReturnType<typeof utilityLinksControllerCreateMutationKey>

/**
 * {@link /company/:companyId/utilityLinks}
 */
export function useUtilityLinksControllerCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UtilityLinksControllerCreateMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UtilityLinksControllerCreatePathParams['companyId']; data: UtilityLinksControllerCreateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UtilityLinksControllerCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? utilityLinksControllerCreateMutationKey()

  return useMutation<
    UtilityLinksControllerCreateMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UtilityLinksControllerCreatePathParams['companyId']; data: UtilityLinksControllerCreateMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return utilityLinksControllerCreate({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}