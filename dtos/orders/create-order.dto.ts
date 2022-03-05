import {CreateOrderItemDto} from './create-order-item.dto';
export class CreateOrderDto {
  public orders: CreateOrderItemDto[] = [];

  static newDto(orders: CreateOrderItemDto[]): CreateOrderDto {
    const createOrderDto = new CreateOrderDto();

    createOrderDto.orders = orders;

    return createOrderDto;
  }

  static fromJson(json: any): CreateOrderDto {
    let orders: CreateOrderItemDto[] = [];

    if (json.orders) {
      orders = json.orders.map((order: any) =>
        CreateOrderItemDto.fromJson(order),
      );
    }

    return CreateOrderDto.fromJson(orders);
  }

  toJson(): {
    orders: {productId: number; quantity: number}[];
  } {
    return {
      orders: this.orders.map((order) => order.toJson()),
    };
  }
}
