import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteCompanyMutationResponse, DeleteCompanyPathParams } from '../../types/CompanyController/DeleteCompany.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteCompany } from '../../client/CompanyService/deleteCompany.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyMutationKey = () => [{ url: '/company/{id}' }] as const

export type DeleteCompanyMutationKey = ReturnType<typeof deleteCompanyMutationKey>

/**
 * {@link /company/:id}
 */
export function useDeleteCompany<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteCompanyMutationResponse, ResponseErrorConfig<Error>, { id: DeleteCompanyPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteCompanyMutationKey()

  return useMutation<DeleteCompanyMutationResponse, ResponseErrorConfig<Error>, { id: DeleteCompanyPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteCompany({ id }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}