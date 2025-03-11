export enum AgeGroupResponseDTOChargeType {
  'DAILY_PER_CHILDREN' = 'DAILY_PER_CHILDREN',
  'DAILY_PERCENTAGE_PER_CHILDREN' = 'DAILY_PERCENTAGE_PER_CHILDREN',
  'FREE' = 'FREE',
}

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