export type AgeGroupDTOChargeType = 'DAILY_PER_CHILDREN' | 'DAILY_PERCENTAGE_PER_CHILDREN' | 'FREE'

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