import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from './creatures/creatures.module';

@Module({
  imports: [CreaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
