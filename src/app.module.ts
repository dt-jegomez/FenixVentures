import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB_PATH') || ':memory:',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true
      }),
      inject: [ConfigService],
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
