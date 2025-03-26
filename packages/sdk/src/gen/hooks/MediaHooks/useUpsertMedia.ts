import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpsertMediaMutationRequest, UpsertMediaMutationResponse, UpsertMediaPathParams } from '../../types/MediaController/UpsertMedia.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertMedia } from '../../client/MediaService/upsertMedia.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertMediaMutationKey = () => [{ url: '/company/{companyId}/media/upsert' }] as const

export type UpsertMediaMutationKey = ReturnType<typeof upsertMediaMutationKey>

/**
 * {@link /company/:companyId/media/upsert}
 */
export function useUpsertMedia<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpsertMediaMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertMediaPathParams['companyId']; data: UpsertMediaMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpsertMediaMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertMediaMutationKey()

  return useMutation<
    UpsertMediaMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UpsertMediaPathParams['companyId']; data: UpsertMediaMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertMedia({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}