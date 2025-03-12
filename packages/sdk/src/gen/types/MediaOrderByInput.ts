export const MediaOrderByDTOOrderBy = {
  url: 'url',
  createdAt: 'createdAt',
} as const

type MediaOrderByDTOOrderBy = (typeof MediaOrderByDTOOrderBy)[keyof typeof MediaOrderByDTOOrderBy]

export const MediaOrderByDTODirection = {
  asc: 'asc',
  desc: 'desc',
} as const

type MediaOrderByDTODirection = (typeof MediaOrderByDTODirection)[keyof typeof MediaOrderByDTODirection]

export type MediaOrderByInput = {
  /**
   * @type string
   */
  orderBy: MediaOrderByDTOOrderBy
  /**
   * @type string
   */
  direction: MediaOrderByDTODirection
}