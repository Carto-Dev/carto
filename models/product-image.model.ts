export class ProductImageModel {
  public id: number;
  public image: string;

  fromJson(json: any): void {
    this.id = json.id ?? '';
    this.image = json.image ?? '';
  }

  toJson(): {id: number; image: string} {
    return {
      id: this.id,
      image: this.image,
    };
  }
}
