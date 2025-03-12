export const AgeGroupResponseDTOChargeType = {
  DAILY_PER_CHILDREN: 'DAILY_PER_CHILDREN',
  DAILY_PERCENTAGE_PER_CHILDREN: 'DAILY_PERCENTAGE_PER_CHILDREN',
  FREE: 'FREE',
} as const

type AgeGroupResponseDTOChargeType = (typeof AgeGroupResponseDTOChargeType)[keyof typeof AgeGroupResponseDTOChargeType]

export type AgeGroup = {
  /**
   * @type string
   */
  id: string
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
  chargeType: AgeGroupResponseDTOChargeType
  /**
   * @type object | undefined
   */
  value?: object
}