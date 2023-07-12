import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesController } from './creatures/creatures.controller';

@Module({
  imports: [],
  controllers: [AppController, CreaturesController],
  providers: [AppService],
})
export class AppModule {}
