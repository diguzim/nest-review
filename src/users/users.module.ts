import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { User__OLD as User__OLD } from './user.entity';
import { MicroservicesClientModule } from '../common/modules/microservices-client.module';
import { CreateUserUseCase } from '../@core/application/user/create-user.use-case';
import { IUserRepository } from '../@core/domain/user/user.repository';
import { ICryptService, IEmailService } from '../@core/services';
import { UserTypeOrmRepository } from '../common/repositories/typeorm/user-typeorm.repository';
import { DataSource } from 'typeorm';
import { User } from '../@core/domain/user/user.entity';
import { BCryptService } from '../common/services/b-crypt.service';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User__OLD]), MicroservicesClientModule],
  exports: [TypeOrmModule, UsersService],
  providers: [
    UsersService,
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        emailNotification: IEmailService,
        cryptService: ICryptService,
      ) => {
        return new CreateUserUseCase(
          userRepository,
          emailNotification,
          cryptService,
        );
      },
      inject: [UserTypeOrmRepository, EmailService, BCryptService],
    },
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    BCryptService,
    EmailService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
