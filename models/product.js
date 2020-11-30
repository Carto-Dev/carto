export class Product {
  constructor(
    id,
    userId,
    title,
    description,
    cost,
    imgLinks,
    categories,
    timestamp,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.cost = cost;
    this.imgLinks = imgLinks;
    this.categories = categories;
    this.timestamp;
  }
}
