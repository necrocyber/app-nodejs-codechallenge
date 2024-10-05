import { Column, Entity, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Status {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.status)
  transactions: Transaction[];
}
