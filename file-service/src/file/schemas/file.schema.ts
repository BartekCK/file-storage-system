import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({})
  userId: string;

  @Prop({})
  key: string;

  @Prop({})
  fileName: string;

  @Prop({})
  size: number;

  @Prop({ required: false })
  isProcessed?: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
