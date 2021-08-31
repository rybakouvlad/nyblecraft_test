import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { optionsDB } from '../config/database.option';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...optionsDB,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
