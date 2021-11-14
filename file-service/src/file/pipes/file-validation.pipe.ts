import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

type AllowedFileType = { mime: string; extensions: string[] };

const ALLOWED_FILE_TYPES: AllowedFileType[] = [
  { mime: 'image/jpeg', extensions: ['jpg', 'jpeg'] },
  { mime: 'image/png', extensions: ['png'] },
];

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException('File is required');
    }

    const extension = value.originalname.split('.').pop();

    if (!this.isFileMimeTypeAndExtensionAllowed(value.mimetype, extension)) {
      const allowedTypes = ALLOWED_FILE_TYPES.map(({ extensions }) => extensions.join(', ')).join(', ');
      throw new BadRequestException(`File type not allowed. Allowed file types are: ${allowedTypes}`);
    }

    return value;
  }

  private isFileMimeTypeAndExtensionAllowed(mimeType: string, extension: string) {
    return ALLOWED_FILE_TYPES.some(({ mime, extensions }) => mime === mimeType && extensions.includes(extension));
  }
}
