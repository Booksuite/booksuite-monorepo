export type CompanyContactDTOType = 'phone' | 'email' | 'instagram' | 'facebook' | 'linkedin' | 'x'

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