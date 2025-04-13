export type OfferOrderByDTOOrderBy = 'name' | 'createdAt' | 'purchaseStartDate' | 'purchaseEndDate'

export type OfferOrderByDTODirection = 'asc' | 'desc'

export type OfferOrderByInput = {
  /**
   * @default "createdAt"
   * @type string
   */
  orderBy: OfferOrderByDTOOrderBy
  /**
   * @default "desc"
   * @type string
   */
  direction: OfferOrderByDTODirection
}