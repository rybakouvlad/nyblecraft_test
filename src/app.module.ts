import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, User],
})
export class AppModule {}
