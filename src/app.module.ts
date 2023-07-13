import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { LoggerMiddleware } from './common/middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CreaturesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
