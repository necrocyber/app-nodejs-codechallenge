import { transactionCreateDto } from '@common/dto/transaction.dto';
import { Transaction } from '@common/entities/transaction.entity';

export abstract class Itransaction {
  // Method DataBase
  abstract findAll(): Promise<Transaction[]>;
  abstract insertTransaction(transaction: transactionCreateDto): Promise<any>;
  // Method Kafka
  abstract createTransaction(transaction: transactionCreateDto): Promise<void>;
  abstract AntiFraudTransaction(transaction: transactionCreateDto): void;
}
