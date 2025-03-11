export enum CompanyContactResponseDTOType {
  'phone' = 'phone',
  'email' = 'email',
  'instagram' = 'instagram',
  'facebook' = 'facebook',
  'linkedin' = 'linkedin',
  'x' = 'x',
}

export type CompanyContact = {
  /**
   * @type string
   */
  type: CompanyContactResponseDTOType
  /**
   * @type string
   */
  value: string
}