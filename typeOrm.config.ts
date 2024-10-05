import { Transaction } from './src/common/entities/transaction.entity';
import { Status } from './src/common/entities/status.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'yp-db',
  migrations: ['migrations/**'],
  entities: [Status, Transaction],
});
