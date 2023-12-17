import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { BlocksModule } from './blocks/blocks.module';
import { WalletsModule } from './wallets/wallets.module';
import { ChainModule } from './chain/chain.module';

@Module({
  imports: [TransactionsModule, BlocksModule, WalletsModule, ChainModule],
})
export class BlockChainModule {}
