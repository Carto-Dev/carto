export class ReviewImageModel {
  public id: number;
  public image: string;

  fromJson(json: any): void {
    this.id = json.id ?? 0;
    this.image = json.image ?? '';
  }

  toJson(): {id: number; image: string} {
    return {
      id: this.id,
      image: this.image,
    };
  }
}
