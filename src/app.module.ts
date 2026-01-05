import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { envValidationSchema } from './config/config.validation';

import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Modulos. / Modules.
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicationsModule } from './applications/applications.module';
import { VacanciesModule } from './vacancies/vacancies.module';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Middlewares.


// - - - - - - - - - - - - - - - - - - - - - - - - - - - 


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.getOrThrow<{
          host: string;
          port: number;
          username: string;
          password: string;
          database: string;
        }>('database');

        return {
          type: 'postgres' as const,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          autoLoadEntities: true,
          synchronize: false,
          logging: process.env.NODE_ENV !== 'production',
        };
      },
    }),
    AuthModule,

    UsersModule,
    
    ApplicationsModule,
    
    VacanciesModule,
    
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})

export class AppModule {}