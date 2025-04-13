import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateOfferMutationRequest, CreateOfferMutationResponse, CreateOfferPathParams } from '../../types/OfferController/CreateOffer.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createOffer } from '../../client/OfferService/createOffer.ts'
import { useMutation } from '@tanstack/react-query'

export const createOfferMutationKey = () => [{ url: '/company/{companyId}/offers' }] as const

export type CreateOfferMutationKey = ReturnType<typeof createOfferMutationKey>

/**
 * {@link /company/:companyId/offers}
 */
export function useCreateOffer<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateOfferMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateOfferPathParams['companyId']; data: CreateOfferMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateOfferMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createOfferMutationKey()

  return useMutation<
    CreateOfferMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateOfferPathParams['companyId']; data: CreateOfferMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return createOffer({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}