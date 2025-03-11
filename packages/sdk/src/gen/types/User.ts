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
   * @type object
   */
  lastName: object | null
  /**
   * @type object
   */
  phone: object | null
  /**
   * @type string
   */
  password: string
  /**
   * @type object
   */
  metaData?: object | null
}