export type DeleteMediaPathParams = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  companyId: string
}

export type DeleteMedia200 = any

export type DeleteMediaMutationResponse = DeleteMedia200

export type DeleteMediaMutation = {
  Response: DeleteMedia200
  PathParams: DeleteMediaPathParams
  Errors: any
}