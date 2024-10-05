import { IsString, IsNumber, IsUUID } from 'class-validator';

export class transactionCreateDto {
  @IsUUID()
  @IsString()
  accountExternalIdDebit: string;

  @IsUUID()
  @IsString()
  accountExternalIdCredit: string;

  @IsNumber()
  tranferTypeId: number;

  @IsNumber()
  value: number;

  @IsNumber()
  status: number;
}
