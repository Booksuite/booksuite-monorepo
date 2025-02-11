export type UpdateCompanyDTO = Partial<
  Omit<Company, "id" | "createdAt" | "updatedAt" | "deletedAt">
>;

export type CreateCompanyDTO = Omit<Company, "id" | "createdAt" | "updatedAt" | "deletedAt">;

export type Company = {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  branchBusiness?: string;
  timezone?: string;
  thumbnail?: string;
  logo?: string;
  logoFormat?: string;
  favIcon?: string;
  theme?: string;
  responsible?: string;
  responsibleEmail?: string;
  responsiblePhone?: string;
  docType?: string;
  identification?: string;
  companyName?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  address?: string;
  number?: string;
  country?: string;
  state?: string;
  city?: string;
  policy?: string;
  cancelPolicy?: string;
  createdAt: string;
  updatedAt?: string;
};

interface bands {}

export type CancelPolicy = {
  bands: [
    {
      daysBeforeCheckin: number;
    }
  ];
  description: string;
};
