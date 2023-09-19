import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthenticateUserUseCase } from '../@core/application/auth/authenticate-user.use-case';
import { IUserRepository } from '../@core/domain/user/user.repository';
import { ICryptService, IJWTService } from '../@core/services';
import { UserTypeOrmRepository } from '../common/repositories/typeorm/user-typeorm.repository';
import { DataSource } from 'typeorm';
import { User } from '../@core/domain/user/user.entity';
import { BCryptService } from '../common/services/b-crypt.service';
import { JWTService } from '../common/services/jwt.service';
import { getDataSourceToken } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    UserTypeOrmRepository,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (
        jwtService: JwtService,
        reflector: Reflector,
        configService: ConfigService,
        userRepository: IUserRepository,
      ) => {
        return new AuthGuard(
          jwtService,
          reflector,
          configService,
          userRepository,
        );
      },
      inject: [JwtService, Reflector, ConfigService, UserTypeOrmRepository],
    },
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        cryptService: ICryptService,
        jwtService: IJWTService,
      ) => {
        return new AuthenticateUserUseCase(
          userRepository,
          cryptService,
          jwtService,
        );
      },
      inject: [UserTypeOrmRepository, BCryptService, JWTService],
    },
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    BCryptService,
    {
      provide: JWTService,
      useFactory: (dependencyService: JwtService) => {
        return new JWTService(dependencyService);
      },
      inject: [JwtService],
    },
  ],
})
export class AuthModule {}
