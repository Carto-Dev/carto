export class UpdateReviewDto {
  public id: number = 0;
  public text: string = '';
  public stars: number = 1;
  public imgLinks: string[] = [];

  static newDto(
    id: number,
    text: string,
    stars: number,
    imgLinks: string[],
  ): UpdateReviewDto {
    const updateReviewDto = new UpdateReviewDto();

    updateReviewDto.id = id;
    updateReviewDto.text = text;
    updateReviewDto.stars = stars;
    updateReviewDto.imgLinks = imgLinks;

    return updateReviewDto;
  }

  static fromJson(json: any): UpdateReviewDto {
    const updateReviewDto = new UpdateReviewDto();

    updateReviewDto.id = json.id ?? 0;
    updateReviewDto.text = json.text ?? '';
    updateReviewDto.stars = json.stars ?? 0;
    updateReviewDto.imgLinks = json.imgLinks ?? [];

    return updateReviewDto;
  }

  toJson(): {
    id: number;
    text: string;
    stars: number;
    imgLinks: string[];
  } {
    return {
      id: this.id,
      text: this.text,
      stars: this.stars,
      imgLinks: this.imgLinks,
    };
  }
}
