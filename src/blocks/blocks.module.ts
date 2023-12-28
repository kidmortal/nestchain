import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { ChainModule } from 'src/chain/chain.module';
import { SocketsModule } from 'src/sockets/sockets.module';

@Module({
  imports: [ChainModule, SocketsModule],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}
