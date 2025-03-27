export type CompanyContactResponseDTOType = 'phone' | 'email' | 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp'

export type CompanyContact = {
  /**
   * @type string
   */
  type: CompanyContactResponseDTOType
  /**
   * @type string
   */
  category: string
  /**
   * @type string
   */
  value: string
}