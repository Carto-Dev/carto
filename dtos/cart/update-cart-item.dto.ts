export class UpdateCartItemDto {
  public id: string = '';
  public quantity: number = 0;

  constructor() {}

  static newDto(id: string, quantity: number): UpdateCartItemDto {
    const updateCartItemDto = new UpdateCartItemDto();

    updateCartItemDto.id = id;
    updateCartItemDto.quantity = quantity;

    return updateCartItemDto;
  }

  static fromJson(json: any): UpdateCartItemDto {
    return UpdateCartItemDto.newDto(json.id ?? '', json.quantity ?? 0);
  }

  toJson(): {id: string; quantity: number} {
    return {
      id: this.id,
      quantity: this.quantity,
    };
  }
}
