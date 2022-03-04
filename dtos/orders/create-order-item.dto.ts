export class CreateOrderItemDto {
  public productId: number = 0;
  public quantity: number = 0;

  static newDto(productId: number, quantity: number): CreateOrderItemDto {
    const createOrderItemDto = new CreateOrderItemDto();

    createOrderItemDto.productId = productId;
    createOrderItemDto.quantity = quantity;

    return createOrderItemDto;
  }

  static fromJson(json: any): CreateOrderItemDto {
    return CreateOrderItemDto.newDto(json.productId ?? 0, json.quantity ?? 0);
  }

  toJson(): {productId: number; quantity: number} {
    return {
      productId: this.productId,
      quantity: this.quantity,
    };
  }
}
