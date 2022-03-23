export class UpdateEmailAddressDto {
  public emailAddress: string = 'EMPTY';
  public password: string = 'EMPTY';

  static newDto(emailAddress: string, password: string): UpdateEmailAddressDto {
    const updateEmailAddressDto = new UpdateEmailAddressDto();

    updateEmailAddressDto.emailAddress = emailAddress;
    updateEmailAddressDto.password = password;

    return updateEmailAddressDto;
  }
  updateEmailAddressDto;

  static fromJson(json: any): UpdateEmailAddressDto {
    const updateEmailAddressDto = UpdateEmailAddressDto.newDto(
      json.emailAddress ?? 'EMPTY',
      json.password ?? 'EMPTY',
    );

    return updateEmailAddressDto;
  }

  toJson(): {emailAddress: string; password: string} {
    return {
      emailAddress: this.emailAddress,
      password: this.password,
    };
  }
}
