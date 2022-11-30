export class FilterDto {
  constructor(
    readonly createdFrom?: string,
    readonly createdTo?: string,
    readonly service?: string,
    readonly level?: string
  ){}
}