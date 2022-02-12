export class DeleteReviewDto {
  public id: number = 0;

  static newDto(id: number): DeleteReviewDto {
    const deleteReviewDto = new DeleteReviewDto();

    deleteReviewDto.id = id;

    return deleteReviewDto;
  }

  static fromJson(json: any): DeleteReviewDto {
    const deleteReviewDto = new DeleteReviewDto();

    deleteReviewDto.id = json.id ?? 0;

    return deleteReviewDto;
  }

  toJson(): {
    id: number;
  } {
    return {
      id: this.id,
    };
  }
}
