export class Review {
  constructor(
    id,
    reviewerId,
    reviewerName,
    hasBoughtProduct,
    review,
    stars,
    images,
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
