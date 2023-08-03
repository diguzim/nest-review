import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrapHTTP() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const env = configService.get<string>('APP_ENV');

  if (env !== 'local') {
    app.enableCors();
    app.use(helmet());
  }

  await app.listen(port || 3000);
}

async function boostrapMicroservice() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
  );
  await app.listen();
}

bootstrapHTTP();
boostrapMicroservice();
