export class Review {
  public id: string;
  public reviewerId: string;
  public reviewerName: string;
  public review: string;
  public hasBoughtProduct: boolean;
  public stars: number;
  public images: string[];

  constructor(
    id: string,
    reviewerId: string,
    reviewerName: string,
    review: string,
    hasBoughtProduct: boolean,
    stars: number,
    images: string[],
  ) {
    this.id = id;
    this.reviewerId = reviewerId;
    this.reviewerName = reviewerName;
    this.hasBoughtProduct = hasBoughtProduct;
    this.review = review;
    this.stars = stars;
    this.images = images;
  }
}
