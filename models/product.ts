export class Product {
  public id: string;
  public userId: string;
  public title: string;
  public description: string;
  public cost: number;
  public imgLinks: string[];
  public categories: string[];
  public timestamp: string;

  constructor(
    id: string,
    userId: string,
    title: string,
    description: string,
    cost: number,
    imgLinks: string[],
    categories: string[],
    timestamp: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.cost = cost;
    this.imgLinks = imgLinks;
    this.categories = categories;
    this.timestamp = timestamp;
  }
}
