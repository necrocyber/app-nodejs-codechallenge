import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AntiFraudModule } from './modules/anti-fraud/anti-fraud.module';

@Module({
  imports: [
    AntiFraudModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'yp-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
