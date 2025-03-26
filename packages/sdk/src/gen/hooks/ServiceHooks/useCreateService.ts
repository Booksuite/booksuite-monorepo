import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateServiceMutationRequest, CreateServiceMutationResponse, CreateServicePathParams } from '../../types/ServiceController/CreateService.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createService } from '../../client/ServiceService/createService.ts'
import { useMutation } from '@tanstack/react-query'

export const createServiceMutationKey = () => [{ url: '/company/{companyId}/service/create' }] as const

export type CreateServiceMutationKey = ReturnType<typeof createServiceMutationKey>

/**
 * {@link /company/:companyId/service/create}
 */
export function useCreateService<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateServiceMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateServicePathParams['companyId']; data: CreateServiceMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateServiceMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createServiceMutationKey()

  return useMutation<
    CreateServiceMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateServicePathParams['companyId']; data: CreateServiceMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return createService({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}