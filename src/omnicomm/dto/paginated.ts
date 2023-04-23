export interface Paginated<D> {
  total: number
  page: number
  pageSize: number
  rows: D[]
}
