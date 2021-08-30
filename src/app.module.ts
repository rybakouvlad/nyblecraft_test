import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
