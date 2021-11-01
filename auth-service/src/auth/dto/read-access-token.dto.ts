export class ReadAccessTokenDto {
  accessToken: string;

  static toDto(token: string): ReadAccessTokenDto {
    const dto = new ReadAccessTokenDto();

    dto.accessToken = token;

    return dto;
  }
}
