export const CompanyContactDTOType = {
  phone: 'phone',
  email: 'email',
  instagram: 'instagram',
  facebook: 'facebook',
  linkedin: 'linkedin',
  x: 'x',
} as const

type CompanyContactDTOType = (typeof CompanyContactDTOType)[keyof typeof CompanyContactDTOType]

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