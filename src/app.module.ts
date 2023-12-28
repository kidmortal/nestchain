import { Module } from '@nestjs/common';
import { BlocksModule } from './blocks/blocks.module';
import { WalletsModule } from './wallets/wallets.module';
import { ChainModule } from './chain/chain.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [BlocksModule, WalletsModule, ChainModule, SocketsModule],
})
export class BlockChainModule {}
