/* eslint-disable no-alert, no-console */

export const operations = {
  createHousingUnitType: {
    path: '/company/:companyId/housingUnitType/create',
    method: 'post',
  },
  getHousingUnitTypeById: {
    path: '/company/:companyId/housingUnitType/:id',
    method: 'get',
  },
  updateHousingUnitType: {
    path: '/company/:companyId/housingUnitType/:id',
    method: 'patch',
  },
  deleteHousingUnitType: {
    path: '/company/:companyId/housingUnitType/:id',
    method: 'delete',
  },
  searchHousingUnitTypes: {
    path: '/company/:companyId/housingUnitType/search',
    method: 'post',
  },
  createCompany: {
    path: '/company/create',
    method: 'post',
  },
  getCompanyById: {
    path: '/company/:id',
    method: 'get',
  },
  updateCompany: {
    path: '/company/:id',
    method: 'patch',
  },
  deleteCompany: {
    path: '/company/:id',
    method: 'delete',
  },
  searchCompanies: {
    path: '/company/search',
    method: 'post',
  },
  getCompanyAgePolicy: {
    path: '/company/:companyId/agePolicy',
    method: 'get',
  },
  upsertCompanyAgePolicy: {
    path: '/company/:companyId/agePolicy',
    method: 'patch',
  },
  getCompanyReservationConfig: {
    path: '/company/:companyId/reservationConfig',
    method: 'get',
  },
  upsertCompanyReservationConfig: {
    path: '/company/:companyId/reservationConfig',
    method: 'patch',
  },
  getCompanyCancellationPolicy: {
    path: '/company/:companyId/cancellationPolicy',
    method: 'get',
  },
  upsertCompanyCancellationPolicy: {
    path: '/company/:companyId/cancellationPolicy',
    method: 'patch',
  },
  deleteCompanyCancellationPolicy: {
    path: '/company/:companyId/cancellationPolicy',
    method: 'delete',
  },
  createService: {
    path: '/company/:companyId/service/create',
    method: 'post',
  },
  getServiceById: {
    path: '/company/:companyId/service/:id',
    method: 'get',
  },
  updateService: {
    path: '/company/:companyId/service/:id',
    method: 'patch',
  },
  deleteService: {
    path: '/company/:companyId/service/:id',
    method: 'delete',
  },
  searchServices: {
    path: '/company/:companyId/service/search',
    method: 'post',
  },
  createReservation: {
    path: '/company/:companyId/reservation/create',
    method: 'post',
  },
  searchReservations: {
    path: '/company/:companyId/reservation/search',
    method: 'post',
  },
  getReservationById: {
    path: '/company/:companyId/reservation/:id',
    method: 'get',
  },
  updateReservation: {
    path: '/company/:companyId/reservation/:id',
    method: 'patch',
  },
  deleteReservation: {
    path: '/company/:companyId/reservation/:id',
    method: 'delete',
  },
  createFacility: {
    path: '/facility/create',
    method: 'post',
  },
  getFacilityById: {
    path: '/facility/:id',
    method: 'get',
  },
  updateFacility: {
    path: '/facility/:id',
    method: 'patch',
  },
  deleteFacility: {
    path: '/facility/:id',
    method: 'delete',
  },
  searchFacilities: {
    path: '/facility/search',
    method: 'post',
  },
  upsertMedia: {
    path: '/company/:companyId/media/upsert',
    method: 'patch',
  },
  getMediaById: {
    path: '/company/:companyId/media/:id',
    method: 'get',
  },
  deleteMedia: {
    path: '/company/:companyId/media/:id',
    method: 'delete',
  },
  searchMedia: {
    path: '/company/:companyId/media/search',
    method: 'post',
  },
  uploadMedia: {
    path: '/company/:companyId/media/upload',
    method: 'post',
  },
  createBanner: {
    path: '/company/:companyId/banner/create',
    method: 'post',
  },
  getBannerById: {
    path: '/company/:companyId/banner/:id',
    method: 'get',
  },
  updateBanner: {
    path: '/company/:companyId/banner/:id',
    method: 'patch',
  },
  deleteBanner: {
    path: '/company/:companyId/banner/:id',
    method: 'delete',
  },
  searchBanners: {
    path: '/company/:companyId/banner/search',
    method: 'post',
  },
} as const