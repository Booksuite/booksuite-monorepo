export type UserCreateInput = {
  /**
   * @type string
   */
  email: string
  /**
   * @type string
   */
  firstName: string
  /**
   * @type string | undefined
   */
  lastName?: string
  /**
   * @type string | undefined
   */
  phone?: string
  /**
   * @type string
   */
  password: string
  /**
   * @type object | undefined
   */
  metaData?: object
}