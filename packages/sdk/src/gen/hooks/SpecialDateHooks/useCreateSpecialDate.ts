import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateSpecialDateMutationRequest,
  CreateSpecialDateMutationResponse,
  CreateSpecialDatePathParams,
} from '../../types/SpecialDateController/CreateSpecialDate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createSpecialDate } from '../../client/SpecialDateService/createSpecialDate.ts'
import { useMutation } from '@tanstack/react-query'

export const createSpecialDateMutationKey = () => [{ url: '/company/{companyId}/specialDates' }] as const

export type CreateSpecialDateMutationKey = ReturnType<typeof createSpecialDateMutationKey>

/**
 * {@link /company/:companyId/specialDates}
 */
export function useCreateSpecialDate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateSpecialDateMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateSpecialDatePathParams['companyId']; data: CreateSpecialDateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateSpecialDateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createSpecialDateMutationKey()

  return useMutation<
    CreateSpecialDateMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateSpecialDatePathParams['companyId']; data: CreateSpecialDateMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return createSpecialDate({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}