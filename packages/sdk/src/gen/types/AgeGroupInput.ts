export const AgeGroupDTOChargeType = {
  DAILY_PER_CHILDREN: 'DAILY_PER_CHILDREN',
  DAILY_PERCENTAGE_PER_CHILDREN: 'DAILY_PERCENTAGE_PER_CHILDREN',
  FREE: 'FREE',
} as const

type AgeGroupDTOChargeType = (typeof AgeGroupDTOChargeType)[keyof typeof AgeGroupDTOChargeType]

export type AgeGroupInput = {
  /**
   * @type string | undefined
   */
  id?: string
  /**
   * @type number
   */
  initialAge: number
  /**
   * @type number
   */
  finalAge: number
  /**
   * @type string
   */
  chargeType: AgeGroupDTOChargeType
  /**
   * @type object | undefined
   */
  value?: object
}