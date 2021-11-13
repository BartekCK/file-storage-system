import { ApiProperty } from '@nestjs/swagger';

export class ReadAccessTokenDto {
  @ApiProperty()
  accessToken: string;

  static toDto(token: string): ReadAccessTokenDto {
    const dto = new ReadAccessTokenDto();

    dto.accessToken = token;

    return dto;
  }
}
