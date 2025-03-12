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
   * @type object
   */
  metaData?: object | null
}