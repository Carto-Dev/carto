import {CategoryModel} from './category.model';
import {ProductImageModel} from './product-image.model';
import {ProductModel} from './product.model';
import {ReviewModel} from './review.model';
import {ServerUserModel} from './server-user.model';
export class CartItemModel {
  public product: ProductModel = new ProductModel();
  public quantity: number = 0;

  constructor() {}

  static newCartItem(product: ProductModel, quantity: number): CartItemModel {
    const cartItemModel = new CartItemModel();

    cartItemModel.product = product;
    cartItemModel.quantity = quantity;

    return cartItemModel;
  }

  static fromJson(json: any): CartItemModel {
    const cartItemModel = new CartItemModel();

    if (json.product) {
      const product = new ProductModel();
      product.fromJson(json.product);

      cartItemModel.product = product;
    }

    cartItemModel.quantity = json.quantity ?? 0;

    return cartItemModel;
  }

  toJson(): {
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
      product: this.product.toJson(),
      quantity: this.quantity,
    };
  }
}
