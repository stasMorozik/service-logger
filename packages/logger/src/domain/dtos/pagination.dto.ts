export class PaginationDto {
  constructor(
    readonly page: number,
    readonly limit: number
  ){}
}