import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { LoggerMiddleware } from './common/middleware';

@Module({
  imports: [CreaturesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
