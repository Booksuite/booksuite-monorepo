export type AgeGroupResponseDTOChargeType = 'DAILY_PER_CHILDREN' | 'DAILY_PERCENTAGE_PER_CHILDREN' | 'FREE'

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
   * @type number
   */
  value: number | null
}