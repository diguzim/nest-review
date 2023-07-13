import { Module } from '@nestjs/common';
import { CreaturesController } from './creatures.controller';
import { CreaturesService } from './creatures.service';

@Module({})
export class CreaturesModule {
  controllers: [CreaturesController]
  providers: [CreaturesService]
}
