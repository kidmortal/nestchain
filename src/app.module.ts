import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BlocksModule } from './blocks/blocks.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [TransactionsModule, BlocksModule, WalletsModule],
})
export class BlockChainModule {}
