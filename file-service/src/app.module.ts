import { Module } from '@nestjs/common';
import { EnvConfigModule } from './env-config/env-config.module';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigService } from './env-config/services/env-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../files/'),
      serveRoot: '/files',
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
export class AppModule {}
