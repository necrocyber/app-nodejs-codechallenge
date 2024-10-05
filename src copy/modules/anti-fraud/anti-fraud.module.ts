import { Module } from '@nestjs/common';

import { AntiFraudController } from './anti-fraud.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Partitioners } from 'kafkajs';
import { AntiFraudService } from './anti-fraud.service';
import { Itransaction } from '@common/interface/iTransaction.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@common/entities/transaction.entity';
import { Status } from '@common/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Status]),
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          subscribe: {
            fromBeginning: true,
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
          client: {
            clientId: 'app',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'app-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AntiFraudController],
  providers: [
    {
      provide: Itransaction,
      useClass: AntiFraudService,
    },
  ],
})
export class AntiFraudModule {}
