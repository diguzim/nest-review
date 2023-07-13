import { Module } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';

@Module({
  imports: [CreaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
