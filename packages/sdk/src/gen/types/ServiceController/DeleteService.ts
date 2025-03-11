export type DeleteServicePathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type DeleteService200 = any

export type DeleteServiceMutationResponse = DeleteService200

export type DeleteServiceMutation = {
  Response: DeleteService200
  PathParams: DeleteServicePathParams
  Errors: any
}