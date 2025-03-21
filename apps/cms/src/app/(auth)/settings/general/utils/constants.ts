import { CompanyResponseDTOType } from '@booksuite/sdk'

export const COMPANY_TYPES: Record<CompanyResponseDTOType, string> = {
    AIRBNB: 'Airbnb',
    CAMPING: 'Camping',
    CHALET: 'Chalé',
    FARM_HOTEL: 'Hotel Fazenda',
    FLAT_APART_HOTEL: 'Apart Hotel',
    HOSTEL: 'Hostel',
    HOTEL: 'Hotel',
    INN: 'Inn',
    OTHER: 'Outro',
    RESORT: 'Resort'

}

export const BRAZIL_TIMEZONES: Record<string, string> = {
    BRASILIA: 'Brasília (GMT -03:00)',
    FORTALEZA: 'Fortaleza (GMT -03:00)',
    RECIFE: 'Recife (GMT -03:00)',
    BELEM: 'Belém (GMT -03:00)',
    MANAUS: 'Manaus (GMT -04:00)',
    BOA_VISTA: 'Boa Vista (GMT -04:00)',
    PORTO_VELHO: 'Porto Velho (GMT -04:00)',
    RIO_BRANCO: 'Rio Branco (GMT -05:00)'
};
