import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigService } from './env-config/services/env-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthFileMiddleware } from './auth/middlewares/auth-file.middleware';

@Module({
  imports: [
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../files/for-share'),
      serveRoot: '/files/for-share',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../files/unprocessed'),
      serveRoot: '/files/unprocessed/:token/',
    }),
    MongooseModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (config: EnvConfigService) => {
        return {
          uri: config.getMongoConfig(),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthFileMiddleware).forRoutes('files/unprocessed/:token/:file');
  }
}
