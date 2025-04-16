import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateOfferMutationRequest, UpdateOfferMutationResponse, UpdateOfferPathParams } from '../../types/OfferController/UpdateOffer.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateOffer } from '../../client/OfferService/updateOffer.ts'
import { useMutation } from '@tanstack/react-query'

export const updateOfferMutationKey = () => [{ url: '/company/{companyId}/offers/{id}' }] as const

export type UpdateOfferMutationKey = ReturnType<typeof updateOfferMutationKey>

/**
 * {@link /company/:companyId/offers/:id}
 */
export function useUpdateOffer<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateOfferMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateOfferPathParams['id']; companyId: UpdateOfferPathParams['companyId']; data?: UpdateOfferMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateOfferMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateOfferMutationKey()

  return useMutation<
    UpdateOfferMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateOfferPathParams['id']; companyId: UpdateOfferPathParams['companyId']; data?: UpdateOfferMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateOffer({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}