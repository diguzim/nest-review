import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesClientModule {}
