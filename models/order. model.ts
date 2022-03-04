import {CategoryModel} from './category.model';
import {OrderItemModel} from './order-item.model';
import {ProductImageModel} from './product-image.model';
import {ReviewModel} from './review.model';
import {ServerUserModel} from './server-user.model';

export class OrderModel {
  public id: number = 0;
  public user: ServerUserModel = new ServerUserModel();
  public orders: OrderItemModel[] = [];
  public createdAt: Date = new Date(Date.now());
  public updatedAt: Date = new Date(Date.now());

  static newModel(
    id: number,
    user: ServerUserModel,
    orders: OrderItemModel[],
    createdAt: Date,
    updatedAt: Date,
  ): OrderModel {
    const orderModel = new OrderModel();

    orderModel.id = id;
    orderModel.user = user;
    orderModel.orders = orders;
    orderModel.createdAt = createdAt;
    orderModel.updatedAt = updatedAt;

    return orderModel;
  }

  static fromJson(json: any): OrderModel {
    const user: ServerUserModel = new ServerUserModel();
    let orders: OrderItemModel[] = [];

    if (json.user) {
      user.fromJson(user);
    }

    if (json.orders) {
      orders = json.orders.map((order: any) => OrderItemModel.fromJson(order));
    }

    return OrderModel.newModel(
      json.id ?? 0,
      user,
      orders,
      json.createdAt ? new Date(json.createdAt) : new Date(Date.now()),
      json.updatedAt ? new Date(json.updatedAt) : new Date(Date.now()),
    );
  }

  toJson(): {
    id: number;
    user: {id: number; firebaseId: string; displayName: string};
    orders: {
      id: number;
      product: {
        id: number;
        user: ServerUserModel;
        title: string;
        description: string;
        cost: number;
        images: ProductImageModel[];
        reviews: ReviewModel[];
        categories: CategoryModel[];
      };
      quantity: number;
    }[];
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id,
      user: this.user.toJson(),
      orders: this.orders.map((order) => order.toJson()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
