import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { transactionCreateDto } from '@common/dto/transaction.dto';
import { Itransaction } from '@common/interface/iTransaction.interface';

@Controller()
export class AntiFraudController {
  constructor(
    @Inject('kafka')
    private readonly kafka: ClientProxy,
    private readonly iTransaction: Itransaction,
  ) {
    this.kafka.connect();
  }

  @EventPattern('transaction.created')
  public async messageCreate(@Payload() payload: any) {
    this.iTransaction.AntiFraudTransaction(payload);
  }

  @Get('/transactions')
  public async getTransactions() {
    return await this.iTransaction.findAll();
  }

  @Post('/transaction-created')
  public async sendMessage(
    @Body() _transactionCreateDto: transactionCreateDto,
  ) {
    return await this.iTransaction.createTransaction(_transactionCreateDto);
  }
}
