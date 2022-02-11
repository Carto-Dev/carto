export class ServerUserModel {
  public id: number = 0;
  public firebaseId: string = '';
  public displayName: string = '';

  constructor() {}

  fromJson(json: any) {
    this.id = json.id ?? 0;
    this.firebaseId = json.firebaseId ?? '';
    this.displayName = json.displayName ?? '';
  }

  toJson(): {id: number; firebaseId: string; displayName: string} {
    return {
      id: this.id,
      firebaseId: this.firebaseId,
      displayName: this.displayName,
    };
  }
}
