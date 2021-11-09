import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MessagePattern, PatternMetadata } from '@nestjs/microservices';
import { MsgLoggerInterceptor } from '../interceptors/msg-logger.interceptor';

export const MsgPatternLog = (data: PatternMetadata) =>
  applyDecorators(MessagePattern(data), UseInterceptors(MsgLoggerInterceptor));
