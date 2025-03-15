export type CompanyContactResponseDTOType = 'phone' | 'email' | 'instagram' | 'facebook' | 'linkedin' | 'x'

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