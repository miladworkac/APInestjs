import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './configs/db.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (dbConfigService: ConfigType<typeof dbConfig>) => {
        return {
          type: dbConfigService.type as any,
          host: dbConfigService.host,
          port: dbConfigService.port,
          username: dbConfigService.userName,
          password: dbConfigService.password,
          database: dbConfigService.database,
          synchronize: true,
          autoLoadEntities: true,
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
