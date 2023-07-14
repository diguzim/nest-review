import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { LoggerMiddleware } from './common/middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Creature } from './creatures/creature.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'nest-review',
      entities: [User, Creature],
      synchronize: true, //TODO Change this on production
    }),
    UsersModule,
    CreaturesModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
