export class UpdateUserDto {
  public displayName: string = 'EMPTY';

  static newDto(displayName: string): UpdateUserDto {
    const updateUserDto = new UpdateUserDto();

    updateUserDto.displayName = displayName;

    return updateUserDto;
  }

  static fromJson(json: any): UpdateUserDto {
    const updateUserDto = UpdateUserDto.newDto(json.displayName ?? 'EMPTY');

    return updateUserDto;
  }

  toJson(): {displayName: string} {
    return {
      displayName: this.displayName,
    };
  }
}
