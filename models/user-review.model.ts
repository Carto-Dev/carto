import {ProductModel} from './product.model';
import {ReviewImageModel} from './review-image.model';
import {ServerUserModel} from './server-user.model';

export class UserReview {
  public id: number = 0;
  public text: string = '';
  public stars: number = 0;
  public user: ServerUserModel = new ServerUserModel();
  public product: ProductModel = new ProductModel();
  public images: ReviewImageModel[] = [];

  static fromJson(json: any): UserReview {
    const userReview = new UserReview();

    const user: ServerUserModel = new ServerUserModel();
    const images: ReviewImageModel[] = [];

    if (json.user) {
      user.fromJson(json.user);
    }

    userReview.user = user;

    if (json.images) {
      userReview.images = json.images.map((img) => {
        const image = new ReviewImageModel();
        image.fromJson(img);

        return image;
      });
    }

    if (json.product) {
      userReview.product.fromJson(json.product);
    }

    userReview.id = json.id ?? 0;
    userReview.text = json.text ?? '';
    userReview.stars = json.stars ?? 0;

    return userReview;
  }

  toJson(): {
    id: number;
    text: string;
    stars: number;
    user: ServerUserModel;
    images: ReviewImageModel[];
  } {
    return {
      id: this.id,
      text: this.text,
      stars: this.stars,
      user: this.user,
      images: this.images,
    };
  }
}
