export enum CompanyContactDTOType {
  'phone' = 'phone',
  'email' = 'email',
  'instagram' = 'instagram',
  'facebook' = 'facebook',
  'linkedin' = 'linkedin',
  'x' = 'x',
}

export type CompanyContactInput = {
  /**
   * @type string
   */
  type: CompanyContactDTOType
  /**
   * @type string
   */
  value: string
}