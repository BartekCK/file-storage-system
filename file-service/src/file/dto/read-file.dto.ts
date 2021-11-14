import { FileDocument } from '../schemas/file.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReadFileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  isProcessed?: Date;

  @ApiPropertyOptional()
  url?: string;

  static createFromDoc(file: FileDocument, fileUrl?: string): ReadFileDto {
    const dto = new ReadFileDto();

    dto.id = file.id;
    dto.key = file.key;
    dto.userId = file.userId;
    dto.size = file.size;
    dto.isProcessed = file.isProcessed;
    dto.fileName = file.fileName;
    dto.url = fileUrl;

    return dto;
  }
}
