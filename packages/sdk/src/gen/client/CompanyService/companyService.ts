/* eslint-disable no-alert, no-console */
import { createCompany } from './createCompany.ts'
import { deleteCompany } from './deleteCompany.ts'
import { getCompanyById } from './getCompanyById.ts'
import { searchCompanies } from './searchCompanies.ts'
import { updateCompany } from './updateCompany.ts'

export function companyService() {
  return { createCompany, getCompanyById, updateCompany, deleteCompany, searchCompanies }
}