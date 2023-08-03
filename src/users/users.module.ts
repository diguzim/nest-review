import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MicroservicesClientModule } from '../common/modules/microservices-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MicroservicesClientModule],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
