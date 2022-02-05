export class DeleteProductDto {
  public id: number = 0;

  fromJson(json: any): void {
    this.id = json.id ?? 0;
  }

  toJson(): {id: number} {
    return {
      id: this.id,
    };
  }
}
