import type { Status } from "./Status";

export type UpdateAcomodacaoDTO = Partial<
  Omit<Acomodacao, "id" | "createdAt" | "updatedAt" | "deletedAt">
>;

export type CreateAcomodacaoDTO = Omit<Acomodacao, "id" | "createdAt" | "updatedAt" | "deletedAt">;

export type Acomodacao = {
  id: number;
  name: string;
  slug: string;
  description: string;
  avaiableGuests: number;
  minGuests: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  weekdaysPrice: number;
  weekendPrice: number;
  extraAdultPrice: number;
  extraAdultPriceQtd: number;
  videoUrl: string;
  addressId: number;
  policy: string;
  cancelPolicy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
