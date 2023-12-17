import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  transactions: Transaction[];
  create(createTransactionDto: CreateTransactionDto) {
    return this.transactions.push(createTransactionDto);
  }
}
