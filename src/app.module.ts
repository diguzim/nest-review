import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesController } from './creatures/creatures.controller';
import { CreaturesService } from './creatures/creatures.service';

@Module({
  imports: [],
  controllers: [AppController, CreaturesController],
  providers: [AppService, CreaturesService],
})
export class AppModule {}
