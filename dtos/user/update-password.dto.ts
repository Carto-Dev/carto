export class UpdatePasswordDto {
  public oldPassword: string = 'EMPTY';
  public newPassword: string = 'EMPTY';

  static newDto(oldPassword: string, newPassword: string): UpdatePasswordDto {
    const updatePasswordDto = new UpdatePasswordDto();

    updatePasswordDto.oldPassword = oldPassword;
    updatePasswordDto.newPassword = newPassword;

    return updatePasswordDto;
  }

  static fromJson(json: any): UpdatePasswordDto {
    const updatePasswordDto = UpdatePasswordDto.newDto(
      json.oldPassword ?? 'EMPTY',
      json.newPassword ?? 'EMPTY',
    );

    return updatePasswordDto;
  }

  toJson(): {oldPassword: string; newPassword: string} {
    return {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
  }
}
