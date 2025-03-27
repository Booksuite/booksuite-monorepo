export type CompanyContactDTOType = 'phone' | 'email' | 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp'

export type CompanyContactInput = {
  /**
   * @type string
   */
  type: CompanyContactDTOType
  /**
   * @type string
   */
  category: string
  /**
   * @type string
   */
  value: string
}