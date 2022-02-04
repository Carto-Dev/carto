export class ServerUserModel {
  public id: string = '';
  public firebaseId: string = '';
  public displayName: string = '';

  constructor() {}

  fromJson(json: any) {
    this.id = json.id ?? '';
    this.firebaseId = json.firebaseId ?? '';
    this.displayName = json.displayName ?? '';
  }

  toJson(): {id: string; firebaseId: string; displayName: string} {
    return {
      id: this.id,
      firebaseId: this.firebaseId,
      displayName: this.displayName,
    };
  }
}
