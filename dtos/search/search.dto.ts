export class SearchDto {
  public query: string = '';
  public sortBy: string = 'ASC';
  public categories: string[] = ['EMPTY'];

  static newDto(
    query: string,
    sortBy: string,
    categories: string[],
  ): SearchDto {
    const searchDto = new SearchDto();

    searchDto.query = query;
    searchDto.sortBy = sortBy;
    searchDto.categories = categories;

    return searchDto;
  }

  static fromJson(json: any): SearchDto {
    const searchDto = SearchDto.newDto(
      json.query ?? '',
      json.sortBy ?? 'ASC',
      json.categories ?? ['EMPTY'],
    );

    return searchDto;
  }

  toJson(): {query: string; sortBy: string; categories: string[]} {
    return {
      query: this.query,
      sortBy: this.sortBy,
      categories: this.categories,
    };
  }
}
