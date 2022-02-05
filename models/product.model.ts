import {CategoryModel} from './category.model';
import {ReviewModel} from './review.model';
import {ProductImageModel} from './product-image.model';
import {ServerUserModel} from './server-user.model';

export class ProductModel {
  public id: number = 0;
  public user: ServerUserModel = new ServerUserModel();
  public title: string = '';
  public description: string = '';
  public cost: number = 0;
  public images: ProductImageModel[] = [];
  public reviews: ReviewModel[] = [];
  public categories: CategoryModel[] = [];

  fromJson(json: any): void {
    if (json.user) {
      this.user.fromJson(json.user);
    }

    if (json.images) {
      this.images = json.images.map((img) => {
        const image = new ProductImageModel();
        image.fromJson(img);

        return image;
      });
    }

    if (json.reviews) {
      this.reviews = json.reviews.map((review) => {
        const newReview = new ReviewModel();
        newReview.fromJson(review);

        return newReview;
      });
    }

    if (json.categories) {
      this.categories = json.categories.map((c) => {
        const category = new CategoryModel();
        category.fromJson(category);

        return category;
      });
    }

    this.id = json.id ?? 0;
    this.title = json.title ?? '';
    this.description = json.description ?? '';
    this.cost = json.cost ?? 0;
  }

  toJson(): {
    id: number;
    user: ServerUserModel;
    title: string;
    description: string;
    cost: number;
    images: ProductImageModel[];
    reviews: ReviewModel[];
    categories: CategoryModel[];
  } {
    return {
      id: this.id,
      user: this.user,
      title: this.title,
      description: this.description,
      cost: this.cost,
      images: this.images,
      reviews: this.reviews,
      categories: this.categories,
    };
  }
}
