import { FileDocument } from '../schemas/file.schema';

export class ReadFileDto {
  id: string;
  key: string;
  userId: string;
  fileName: string;
  size: number;
  isProcessed?: Date;
  url?: string;

  static createFromDoc(file: FileDocument): ReadFileDto {
    const dto = new ReadFileDto();

    dto.id = file.id;
    dto.key = file.key;
    dto.userId = file.userId;
    dto.size = file.size;
    dto.isProcessed = file.isProcessed;
    dto.fileName = file.fileName;
    dto.url = ''; //TODO: specyfied URL

    return dto;
  }
}
