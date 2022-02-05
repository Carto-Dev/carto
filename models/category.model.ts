export class CategoryModel {
  public id: number;
  public text: string;
  public key: string;
  public img: string;

  fromJson(json: any) {
    this.id = json.id ?? '';
    this.text = json.text ?? '';
    this.key = json.key ?? '';
    this.img = json.img ?? '';
  }

  toJson(): {id: number; text: string; key: string; img: string} {
    return {
      id: this.id,
      text: this.text,
      key: this.key,
      img: this.img,
    };
  }
}
