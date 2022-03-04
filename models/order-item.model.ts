import {CategoryModel} from './category.model';
import {ReviewModel} from './review.model';
import {ProductImageModel} from './product-image.model';
import {ServerUserModel} from './server-user.model';
import {ProductModel} from './product.model';
export class OrderItemModel {
  public id: number = 0;
  public product: ProductModel = new ProductModel();
  public quantity: number = 0;

  static newModel(
    id: number,
    product: ProductModel,
    quantity: number,
  ): OrderItemModel {
    const orderItemModel = new OrderItemModel();

    orderItemModel.id = id;
    orderItemModel.product = product;
    orderItemModel.quantity = quantity;

    return orderItemModel;
  }

  static fromJson(json: any): OrderItemModel {
    const productModel = new ProductModel();

    if (json.product) {
      productModel.fromJson(json.product);
    }

    return OrderItemModel.newModel(
      json.id ?? 0,
      productModel,
      json.quantity ?? 0,
    );
  }

  toJson(): {
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
  } {
    return {
      id: this.id,
      product: this.product.toJson(),
      quantity: this.quantity,
    };
  }
}
