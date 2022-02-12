export class CreateReviewDto {
  public productId: number = 0;
  public text: string = '';
  public stars: number = 1;
  public imgLinks: string[] = [];

  static newDto(
    productId: number,
    text: string,
    stars: number,
    imgLinks: string[],
  ): CreateReviewDto {
    const createReviewDto = new CreateReviewDto();

    createReviewDto.productId = productId;
    createReviewDto.text = text;
    createReviewDto.stars = stars;
    createReviewDto.imgLinks = imgLinks;

    return createReviewDto;
  }

  static fromJson(json: any): CreateReviewDto {
    const createReviewDto = new CreateReviewDto();

    createReviewDto.productId = json.productId ?? 0;
    createReviewDto.text = json.text ?? '';
    createReviewDto.stars = json.stars ?? 0;
    createReviewDto.imgLinks = json.imgLinks ?? [];

    return createReviewDto;
  }

  toJson(): {
    productId: number;
    text: string;
    stars: number;
    imgLinks: string[];
  } {
    return {
      productId: this.productId,
      text: this.text,
      stars: this.stars,
      imgLinks: this.imgLinks,
    };
  }
}
