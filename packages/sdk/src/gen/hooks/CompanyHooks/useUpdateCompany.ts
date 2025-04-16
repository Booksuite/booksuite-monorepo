import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateCompanyMutationRequest, UpdateCompanyMutationResponse, UpdateCompanyPathParams } from '../../types/CompanyController/UpdateCompany.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateCompany } from '../../client/CompanyService/updateCompany.ts'
import { useMutation } from '@tanstack/react-query'

export const updateCompanyMutationKey = () => [{ url: '/company/{id}' }] as const

export type UpdateCompanyMutationKey = ReturnType<typeof updateCompanyMutationKey>

/**
 * {@link /company/:id}
 */
export function useUpdateCompany<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateCompanyMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateCompanyPathParams['id']; data?: UpdateCompanyMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateCompanyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateCompanyMutationKey()

  return useMutation<
    UpdateCompanyMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateCompanyPathParams['id']; data?: UpdateCompanyMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateCompany({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}