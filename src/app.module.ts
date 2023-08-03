import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { LoggerMiddleware } from './common/middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Creature } from './creatures/creature.entity';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ItemsModule } from './items/items.module';
import { Item } from './items/item.entity';
import { DropsModule } from './drops/drops.module';
import { Drop } from './drops/drop.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './users/users.resolver';
import { CreaturesResolver } from './creatures/creatures.resolver';
import { NotificationsModule } from './notifications/notifications.module';
// import { MicroservicesClientModule } from './common/modules/microservices-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Creature, Item, Drop],
        synchronize: true, //TODO Change this on production
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CreaturesModule,
    AuthModule,
    ItemsModule,
    DropsModule,
    NotificationsModule,
    // MicroservicesClientModule,
  ],
  providers: [
    UsersResolver,
    CreaturesResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
