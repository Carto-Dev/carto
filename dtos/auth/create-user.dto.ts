export class CreateUserDto {
  public displayName: string = '';
  public emailAddress: string = '';
  public password: string = '';

  constructor() {}

  fromJson(json: any) {
    this.displayName = json.displayName ?? '';
    this.emailAddress = json.emailAddress ?? '';
    this.password = json.password ?? '';
  }

  toJson(): {displayName: string; emailAddress: string; password: string} {
    return {
      displayName: this.displayName,
      emailAddress: this.emailAddress,
      password: this.password,
    };
  }
}
