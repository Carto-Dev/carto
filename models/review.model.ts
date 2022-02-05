import {ReviewImageModel} from './review-image.model';
import {ServerUserModel} from './server-user.model';

export class ReviewModel {
  public id: number;
  public text: string;
  public stars: number;
  public user: ServerUserModel;
  public images: ReviewImageModel[];

  fromJson(json: any): void {
    const user: ServerUserModel = new ServerUserModel();
    const images: ReviewImageModel[] = [];

    if (json.user) {
      user.fromJson(json.user);
    }

    this.user = user;

    if (json.images) {
      json.images.forEach((img) => {
        const image = new ReviewImageModel();
        image.fromJson(img);
      });
    }

    this.images = images;

    this.id = json.id ?? 0;
    this.text = json.text ?? '';
    this.stars = json.stars ?? 0;
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
