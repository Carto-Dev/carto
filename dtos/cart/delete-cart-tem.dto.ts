export class DeleteCartItemDto {
  public id: string = '';

  constructor() {}

  static newDto(id: string): DeleteCartItemDto {
    const deleteCartItemDto = new DeleteCartItemDto();

    deleteCartItemDto.id = id;

    return deleteCartItemDto;
  }

  static fromJson(json: any): DeleteCartItemDto {
    return DeleteCartItemDto.newDto(json.id ?? '');
  }

  toJson(): {id: string} {
    return {
      id: this.id,
    };
  }
}
