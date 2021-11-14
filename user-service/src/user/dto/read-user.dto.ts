import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ReadUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  static mapToEntity(user: User): ReadUserDto {
    const dto = new ReadUserDto();

    dto.id = user.id;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    dto.email = user.email;

    return dto;
  }
}
