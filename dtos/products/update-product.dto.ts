export class UpdateProductDto {
  public id: number = 0;
  public title: string = '';
  public description: string = '';
  public cost: number = 0;
  public imgLinks: string[] = [];
  public categories: string[] = [];

  fromJson(json: any): void {
    this.id = json.id ?? 0;
    this.title = json.title ?? '';
    this.description = json.description ?? '';
    this.cost = json.cost ?? 0;
    this.imgLinks = json.imgLinks ?? [];
    this.categories = json.categories ?? [];
  }

  toJson(): {
    id: number;
    title: string;
    description: string;
    cost: number;
    imgLinks: string[];
    categories: string[];
  } {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      cost: this.cost,
      imgLinks: this.imgLinks,
      categories: this.categories,
    };
  }
}
