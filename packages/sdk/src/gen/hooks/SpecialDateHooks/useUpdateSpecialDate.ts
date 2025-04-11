import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateSpecialDateMutationRequest,
  UpdateSpecialDateMutationResponse,
  UpdateSpecialDatePathParams,
} from '../../types/SpecialDateController/UpdateSpecialDate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateSpecialDate } from '../../client/SpecialDateService/updateSpecialDate.ts'
import { useMutation } from '@tanstack/react-query'

export const updateSpecialDateMutationKey = () => [{ url: '/company/{companyId}/specialDates/{id}' }] as const

export type UpdateSpecialDateMutationKey = ReturnType<typeof updateSpecialDateMutationKey>

/**
 * {@link /company/:companyId/specialDates/:id}
 */
export function useUpdateSpecialDate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateSpecialDateMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateSpecialDatePathParams['id']; data?: UpdateSpecialDateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateSpecialDateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateSpecialDateMutationKey()

  return useMutation<
    UpdateSpecialDateMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateSpecialDatePathParams['id']; data?: UpdateSpecialDateMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateSpecialDate({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}