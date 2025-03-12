export const CompanyContactResponseDTOType = {
  phone: 'phone',
  email: 'email',
  instagram: 'instagram',
  facebook: 'facebook',
  linkedin: 'linkedin',
  x: 'x',
} as const

type CompanyContactResponseDTOType = (typeof CompanyContactResponseDTOType)[keyof typeof CompanyContactResponseDTOType]

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