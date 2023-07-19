import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port || 3000);
}
bootstrap();
