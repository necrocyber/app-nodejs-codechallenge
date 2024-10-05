import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Itransaction } from '@common/interface/iTransaction.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '@common/entities/transaction.entity';
import { Repository } from 'typeorm';
import { transactionCreateDto } from '@common/dto/transaction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { StatusTransaction } from '@common/enum/status.enum';
import { firstValueFrom } from 'rxjs';
import { MAXVALUE } from '@common/constant/constant';
import { Status } from '@common/entities/status.entity';

@Injectable()
export class AntiFraudService implements Itransaction {
  constructor(
    @Inject('kafka')
    private readonly kafka: ClientProxy,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  // Method DataBase
  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async insertTransaction(transaction: transactionCreateDto): Promise<any> {
    const status = await this.statusRepository.findOneBy({
      id: transaction.status,
    });
    if (!status) {
      throw new BadRequestException('Status not found');
    }
    const track = this.transactionRepository.create({ ...transaction, status });
    return await this.transactionRepository.save(track);
  }

  // Method Kafka
  async createTransaction(
    _transactionCreateDto: transactionCreateDto,
  ): Promise<any> {
    return firstValueFrom(
      this.kafka.emit(
        'transaction.created',
        JSON.stringify(_transactionCreateDto),
      ),
    );
  }

  async AntiFraudTransaction(transaction: transactionCreateDto): Promise<void> {
    transaction.status = transaction.value > MAXVALUE ? 3 : 2;
    Logger.log(
      `Save transaction with ${StatusTransaction[transaction.status]} status`,
    );
    this.insertTransaction(transaction);
  }
}
