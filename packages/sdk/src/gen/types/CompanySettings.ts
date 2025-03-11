import type { CompanySettingsTheme } from './CompanySettingsTheme.ts'

export type CompanySettings = {
  /**
   * @type string
   */
  id: string
  /**
   * @type object | undefined
   */
  theme?: CompanySettingsTheme
}