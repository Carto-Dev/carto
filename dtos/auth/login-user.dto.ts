export class LoginUserDto {
  public emailAddress: string = '';
  public password: string = '';

  constructor() {}

  fromJson(json: any) {
    this.emailAddress = json.emailAddress ?? '';
    this.password = json.password ?? '';
  }

  toJson(): {emailAddress: string; password: string} {
    return {
      emailAddress: this.emailAddress,
      password: this.password,
    };
  }
}
