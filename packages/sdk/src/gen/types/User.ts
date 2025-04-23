export type User = {
  /**
   * @type string
   */
  email: string
  /**
   * @type string
   */
  firstName: string
  /**
   * @type string
   */
  lastName: string | null
  /**
   * @type string
   */
  phone: string | null
  /**
   * @type string
   */
  password: string
  /**
   * @type boolean
   */
  isAdmin: boolean
  /**
   * @type string
   */
  confirmationCode: string | null
  /**
   * @type object
   */
  metaData?: object | null
  /**
   * @type string
   */
  id: string
  /**
   * @type string, date-time
   */
  createdAt: string
  /**
   * @type string, date-time
   */
  updatedAt: string
  /**
   * @type string, date-time
   */
  deletedAt: string | null
}