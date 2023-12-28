import { Module } from '@nestjs/common';
import { SocketsService } from './sockets.service';
import { SocketsGateway } from './sockets.gateway';
import { ChainModule } from 'src/chain/chain.module';

@Module({
  imports: [ChainModule],
  providers: [SocketsGateway, SocketsService],
  exports: [SocketsService],
})
export class SocketsModule {}
