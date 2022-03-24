export class DeleteAccountDto {
  public password: string = 'EMPTY';

  static newDto(password: string): DeleteAccountDto {
    const deleteAccountDto = new DeleteAccountDto();

    deleteAccountDto.password = password;

    return deleteAccountDto;
  }

  static fromJson(json: any): DeleteAccountDto {
    const deleteAccountDto = DeleteAccountDto.newDto(json.password ?? 'EMPTY');

    return deleteAccountDto;
  }

  toJson(): {password: string} {
    return {
      password: this.password,
    };
  }
}
