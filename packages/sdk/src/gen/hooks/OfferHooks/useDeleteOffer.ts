import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteOfferMutationResponse, DeleteOfferPathParams } from '../../types/OfferController/DeleteOffer.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteOffer } from '../../client/OfferService/deleteOffer.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteOfferMutationKey = () => [{ url: '/company/{companyId}/offers/{id}' }] as const

export type DeleteOfferMutationKey = ReturnType<typeof deleteOfferMutationKey>

/**
 * {@link /company/:companyId/offers/:id}
 */
export function useDeleteOffer<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteOfferMutationResponse, ResponseErrorConfig<Error>, { id: DeleteOfferPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteOfferMutationKey()

  return useMutation<DeleteOfferMutationResponse, ResponseErrorConfig<Error>, { id: DeleteOfferPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteOffer({ id }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}