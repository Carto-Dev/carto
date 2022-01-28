export class Reviews {
  public reviewBreakdown: any;
  public noOfReviews: number;
  public totalStars: number;
  public reviews: any[];

  constructor() {
    this.reviewBreakdown = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this.noOfReviews = 0;
    this.totalStars = 0;

    this.reviews = [];
  }
}
